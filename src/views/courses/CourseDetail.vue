<template>
  <div class="space-y-8">
    <!-- Back Link and Title -->
    <div>
      <router-link
        to="/courses"
        class="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center text-base font-medium"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" class="mr-2 w-4 h-4" />
        Back to Courses
      </router-link>
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white mt-2">
        {{ course?.title }}
      </h1>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <font-awesome-icon
        :icon="['fas', 'spinner']"
        spin
        class="text-4xl text-primary-600 mb-4"
      />
      <p class="text-neutral-600 dark:text-neutral-400 text-base">Loading course details...</p>
    </div>

    <!-- Plan Required Prompt -->
    <div
      v-else-if="!userStore.activePlan"
      class="card text-center max-w-md mx-auto"
    >
      <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-base">
        Purchase a plan to access course details.
      </p>
      <router-link to="/plans" class="btn-3d btn-3d-border w-full">
        <font-awesome-icon :icon="['fas', 'credit-card']" class="mr-2 w-4 h-4" />
        View Plans
      </router-link>
    </div>

    <!-- Course Details -->
    <div v-else-if="course" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column -->
      <div>
        <img
          v-if="course.thumbnail"
          :src="getAssetUrl(course.thumbnail)"
          alt="Thumbnail"
          class="w-full h-64 object-cover rounded-lg mb-6"
        />

        <div v-if="course.video_url || course.video_path" class="mb-8 relative">
          <!-- Preview for non-enrolled (local video only) -->
          <div v-if="isPreviewMode && course.video_path" class="relative">
            <video
              ref="previewVideo"
              controls
              preload="metadata"
              class="video-container"
              :poster="course.thumbnail ? getAssetUrl(course.thumbnail) : undefined"
            >
              <source :src="getAssetUrl(course.video_path)" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div
              v-if="showPreviewOverlay"
              class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-10"
            >
              <div class="text-center text-white px-4">
                <p class="text-lg font-semibold mb-2">Preview Ended</p>
                <p class="text-sm mb-4">Enroll to watch the full video.</p>
                <button
                  @click="enrollCourse"
                  :disabled="enrollLoading"
                  class="btn-3d btn-3d-border px-6 py-2"
                >
                  {{ enrollLoading ? 'Enrolling...' : 'Enroll Now' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Full local video for enrolled -->
          <video
            v-else-if="course.video_path"
            controls
            class="video-container"
            :poster="course.thumbnail ? getAssetUrl(course.thumbnail) : undefined"
          >
            <source :src="getAssetUrl(course.video_path)" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <!-- Preview for embeds: show thumbnail with overlay -->
          <div v-else-if="isPreviewMode && course.video_url" class="relative bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
            <img
              :src="course.thumbnail ? getAssetUrl(course.thumbnail) : undefined"
              alt="Video Preview"
              class="w-full h-64 md:h-96 object-cover"
            />
            <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div class="text-center text-white px-4">
                <p class="text-lg font-semibold mb-2">Video Preview</p>
                <p class="text-sm mb-4">Enroll to watch the full video.</p>
                <button
                  @click="enrollCourse"
                  :disabled="enrollLoading"
                  class="btn-3d btn-3d-border px-6 py-2"
                >
                  {{ enrollLoading ? 'Enrolling...' : 'Enroll Now' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Full embed for enrolled -->
          <iframe
            v-else-if="course.video_url && isEmbeddable(course.video_url)"
            :src="getEmbedUrl(course.video_url)"
            class="video-container h-64 md:h-96"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>

        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
          {{ course.description }}
        </p>
      </div>

      <!-- Right Column -->
      <div class="card backdrop-blur">
        <!-- Course Summary -->
        <div class="space-y-6">
          <div>
            <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Course Summary
            </h2>
            <div class="space-y-3 text-neutral-700 dark:text-neutral-300 text-base">
              <p class="flex items-center">
                <font-awesome-icon :icon="['fas', 'book']" class="mr-2 text-neutral-500 dark:text-neutral-400 w-4 h-4" />
                <strong>Title:</strong><span class="ml-2">{{ course.title }}</span>
              </p>
              <p class="flex items-center">
                <font-awesome-icon :icon="['fas', 'pen']" class="mr-2 text-neutral-500 dark:text-neutral-400 w-4 h-4" />
                <strong>Description:</strong><span class="ml-2">{{ course.description }}</span>
              </p>
              <p class="flex items-center">
                <font-awesome-icon
                  :icon="['fas', course.is_active ? 'check' : 'times']"
                  :class="{
                    'text-green-500': course.is_active,
                    'text-red-500': !course.is_active,
                  }"
                  class="mr-2 w-4 h-4"
                />
                <strong>Status:</strong>
                <span class="ml-2">{{ course.is_active ? 'Active' : 'Inactive' }}</span>
              </p>
              <p v-if="course.thumbnail" class="flex items-center">
                <font-awesome-icon :icon="['fas', 'video']" class="mr-2 text-neutral-500 dark:text-neutral-400 w-4 h-4" />
                <strong>Thumbnail:</strong>
                <span class="ml-2 text-neutral-500 dark:text-neutral-400">Available</span>
              </p>
            </div>
          </div>

          <!-- Enrollment Action -->
          <div class="mb-6">
            <!-- Enroll -->
            <p
              v-if="!isEnrolled && !isCompleted"
              class="text-neutral-600 dark:text-neutral-400 mb-4 text-base"
            >
              Enroll to access full content.
            </p>
            <button
              v-if="!isEnrolled && !isCompleted"
              @click="enrollCourse"
              :disabled="enrollLoading"
              class="btn-3d btn-3d-border w-full"
            >
              {{ enrollLoading ? 'Enrolling...' : 'Enroll Now' }}
            </button>

            <!-- Continue Learning -->
            <button
              v-else-if="isEnrolled && !isCompleted"
              class="btn-3d btn-3d-border w-full"
              @click="$router.push(`/courses/${course.id}/play`)"
            >
              {{ enrollLoading ? 'Loading...' : continueLabel }}
            </button>

            <!-- Re-enroll -->
            <button
              v-else-if="isCompleted"
              @click="enrollCourse"
              :disabled="enrollLoading"
              class="btn-3d btn-3d-border w-full"
            >
              {{ enrollLoading ? 'Re-enrolling...' : 'Re-enroll' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-12">
      <p class="text-neutral-600 dark:text-neutral-400 text-base">Course not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Course, useCourseStore } from '@/stores/course';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toastification';
import api from '@/services/api';

const route = useRoute();
const courseStore = useCourseStore();
const userStore = useUserStore();
const toast = useToast();

const course = ref<Course | null>(null);
const loading = ref(true);
const enrollLoading = ref(false);

const previewVideo = ref<HTMLVideoElement | null>(null);
const showPreviewOverlay = ref(false);
let timeupdateHandler: (() => void) | null = null;
let endedHandler: (() => void) | null = null;
let seekingHandler: (() => void) | null = null;
const previewDuration = ref(5);

const setupPreview = () => {
  if (!previewVideo.value) return;

  const video = previewVideo.value;
  const totalDuration = video.duration || 0;
  previewDuration.value = Math.min(5, totalDuration);

  // Timeupdate handler to pause at preview duration
  timeupdateHandler = () => {
    if (video.currentTime >= previewDuration.value) {
      video.pause();
      showPreviewOverlay.value = true;
    }
  };
  video.addEventListener('timeupdate', timeupdateHandler);

  // Play handler to hide overlay
  const playHandler = () => {
    showPreviewOverlay.value = false;
  };
  video.addEventListener('play', playHandler);

  // Ended handler to show overlay for short videos
  endedHandler = () => {
    showPreviewOverlay.value = true;
  };
  video.addEventListener('ended', endedHandler);

  // Seeking handler to prevent seeking beyond preview
  seekingHandler = () => {
    if (video.currentTime > previewDuration.value) {
      video.currentTime = 0;
      showPreviewOverlay.value = true;
    }
  };
  video.addEventListener('seeking', seekingHandler);

  // Clean up handlers on unmount or when mode changes
  const cleanup = () => {
    if (timeupdateHandler) {
      video.removeEventListener('timeupdate', timeupdateHandler);
      timeupdateHandler = null;
    }
    video.removeEventListener('play', playHandler);
    if (endedHandler) {
      video.removeEventListener('ended', endedHandler);
      endedHandler = null;
    }
    if (seekingHandler) {
      video.removeEventListener('seeking', seekingHandler);
      seekingHandler = null;
    }
  };

  // If component unmounts or preview mode changes
  onUnmounted(cleanup);
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

// Use enrollment directly from store
const enrollment = computed(() => courseStore.currentEnrollment);
const isEnrolled = computed(() => enrollment.value?.status === 'active');
const isCompleted = computed(() => enrollment.value?.status === 'completed');
const isPreviewMode = computed(() => !isEnrolled.value && !isCompleted.value);
// Watch for changes in preview mode and course to setup preview
watch([isPreviewMode, () => course.value?.video_path], async ([preview, path]) => {
  await nextTick();
  if (preview && path && previewVideo.value) {
    const video = previewVideo.value;
    if (video.readyState >= 1) { // HAVE_METADATA or higher
      setupPreview();
    } else {
      const metadataHandler = () => {
        setupPreview();
        video.removeEventListener('loadedmetadata', metadataHandler);
      };
      video.addEventListener('loadedmetadata', metadataHandler);
    }
  }
}, { immediate: true });

// Label for continue button with progress
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

const getAssetUrl = (path: string | undefined) => {
  if (!path) return '';
  const base = api.defaults.baseURL
    ? api.defaults.baseURL.replace(/\/api\/?$/, '/storage')
    : '/storage';
  return `${base}${path.startsWith('/') ? path : '/' + path}`;
};
</script>