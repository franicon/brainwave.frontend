<template>
  <DefaultLayoutComponent>
    <template #header-title>
      <div>
        <router-link
          to="/courses"
          class="text-primary-500 hover:text-primary-600 mb-2 inline-flex items-center"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" class="mr-2" />
          Back to Courses
        </router-link>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white font-sans mt-2">
          {{ course?.title }}
        </h1>
      </div>
    </template>

    <div class="space-y-8 max-w-4xl mx-auto py-8">
      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <font-awesome-icon
          :icon="['fas', 'spinner']"
          spin
          class="text-4xl text-primary-500 mb-4"
        />
        <p>Loading course details...</p>
      </div>

      <!-- Plan Required Prompt -->
      <div
        v-else-if="!userStore.activePlan"
        class="card p-6 rounded-3xl text-center max-w-md mx-auto"
      >
        <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-lg">
          Purchase a plan to access course details.
        </p>
        <router-link to="/plans" class="btn-3d btn-3d-border w-full rounded-full">
          <font-awesome-icon :icon="['fas', 'credit-card']" class="mr-2" />
          View Plans
        </router-link>
      </div>

      <!-- Course Details -->
      <div v-else-if="course" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column -->
        <div>
          <img
            v-if="course.thumbnail"
            :src="course.thumbnail"
            alt="Thumbnail"
            class="w-full h-64 object-cover rounded-2xl mb-6"
          />

          <div v-if="course.video_url || course.video_path" class="mb-6">
            <video
              v-if="course.video_path"
              controls
              class="w-full rounded-2xl shadow-soft bg-neutral-100 dark:bg-neutral-700"
            >
              <source :src="course.video_path" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <iframe
              v-else-if="course.video_url && isEmbeddable(course.video_url)"
              :src="getEmbedUrl(course.video_url)"
              class="w-full h-64 rounded-2xl shadow-soft"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>

          <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed text-left">
            {{ course.description }}
          </p>
        </div>

        <!-- Right Column -->
        <div class="card p-6 rounded-3xl bg-white/80 dark:bg-navy-800/80 backdrop-blur-md">
          <!-- Course Summary -->
          <div class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Course Summary
              </h2>
              <div class="space-y-3 text-gray-700 dark:text-gray-300">
                <p class="flex items-center">
                  <font-awesome-icon :icon="['fas', 'book']" class="mr-2 text-gray-500 dark:text-gray-400" />
                  <strong>Title:</strong><span class="ml-2">{{ course.title }}</span>
                </p>
                <p class="flex items-center">
                  <font-awesome-icon :icon="['fas', 'pen']" class="mr-2 text-gray-500 dark:text-gray-400" />
                  <strong>Description:</strong><span class="ml-2">{{ course.description }}</span>
                </p>
                <p class="flex items-center">
                  <font-awesome-icon
                    :icon="['fas', course.is_active ? 'check' : 'times']"
                    :class="{
                      'text-green-500': course.is_active,
                      'text-red-500': !course.is_active,
                    }"
                    class="mr-2"
                  />
                  <strong>Status:</strong>
                  <span class="ml-2">{{ course.is_active ? 'Active' : 'Inactive' }}</span>
                </p>
                <p v-if="course.thumbnail" class="flex items-center">
                  <font-awesome-icon :icon="['fas', 'video']" class="mr-2 text-gray-500 dark:text-gray-400" />
                  <strong>Thumbnail:</strong>
                  <span class="ml-2 text-gray-500 dark:text-gray-400">Available</span>
                </p>
              </div>
            </div>

            <!-- Enrollment Action -->
            <div class="mb-6">
              <!-- Enroll -->
              <p
                v-if="!isEnrolled && !isCompleted"
                class="text-neutral-600 dark:text-neutral-400 mb-4"
              >
                Enroll to access full content.
              </p>
              <button
                v-if="!isEnrolled && !isCompleted"
                @click="enrollCourse"
                :disabled="enrollLoading"
                class="btn-3d btn-3d-border w-full rounded-full"
              >
                {{ enrollLoading ? 'Enrolling...' : 'Enroll Now' }}
              </button>

              <!-- Continue Learning -->
              <button
                v-else-if="isEnrolled && !isCompleted"
                class="btn-3d btn-3d-border w-full rounded-full"
                @click="$router.push(`/courses/${course.id}/play`)"
              >
                {{ enrollLoading ? 'Loading...' : continueLabel }}
              </button>

              <!-- Re-enroll -->
              <button
                v-else-if="isCompleted"
                @click="enrollCourse"
                :disabled="enrollLoading"
                class="btn-3d btn-3d-border w-full rounded-full"
              >
                {{ enrollLoading ? 'Re-enrolling...' : 'Re-enroll' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="text-center py-12">
        <p class="text-neutral-600 dark:text-neutral-400 text-lg">Course not found.</p>
      </div>
    </div>
  </DefaultLayoutComponent>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Course, useCourseStore } from '@/stores/course';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import type { Component } from 'vue';

const route = useRoute();
const courseStore = useCourseStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const toast = useToast();

const course = ref<Course | null>(null);
const loading = ref(true);
const enrollLoading = ref(false);

const DefaultLayoutComponent = DefaultLayout as unknown as Component & {
  $slots: { 'header-title': () => any; default: () => any };
};

onMounted(async () => {
  try {
    await userStore.fetchDashboard();
    await courseStore.fetchCourse(Number(route.params.id));
    course.value = courseStore.currentCourse;
  } catch (error) {
    console.error('Failed to load course:', error);
  } finally {
    loading.value = false;
  }
});

// use enrollment directly from store
const enrollment = computed(() => courseStore.currentEnrollment);
const isEnrolled = computed(() => enrollment.value?.status === 'active');
const isCompleted = computed(() => enrollment.value?.status === 'completed');

// label for continue button with progress
const continueLabel = computed(() => {
  if (enrollment.value && enrollment.value.progress > 0) {
    return `Continue Learning (${enrollment.value.progress}%)`;
  }
  return 'Continue Learning';
});

const enrollCourse = async () => {
  if (!course.value) return;
  try {
    enrollLoading.value = true;
    await courseStore.enrollCourse(course.value.id, isCompleted.value);
    toast.success(isCompleted.value ? 'Re-enrolled successfully!' : 'Enrolled successfully!');
    await userStore.fetchDashboard();
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Action failed');
  } finally {
    enrollLoading.value = false;
  }
};

const isEmbeddable = (url?: string) =>
  url ? ['youtube.com', 'youtu.be', 'vimeo.com'].some(s => url.includes(s)) : false;

const getEmbedUrl = (url?: string) => {
  if (!url) return '';
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }
  if (url.includes('vimeo.com')) {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  }
  return url;
};
</script>
