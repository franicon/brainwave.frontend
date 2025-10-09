<template>
  <DefaultLayoutComponent>
    <template #header-title>
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white font-sans">{{ course?.title }} - Play</h1>
    </template>

    <div class="space-y-8 max-w-7xl mx-auto py-8">
      <!-- Plan Required Prompt -->
      <div v-if="!userStore.activePlan" class="card p-6 rounded-3xl text-center max-w-md mx-auto">
        <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-lg">Purchase a plan to access course content.</p>
        <router-link to="/plans" class="btn-3d btn-3d-border w-full rounded-full">
          <font-awesome-icon :icon="['fas', 'credit-card']" class="mr-2" /> View Plans
        </router-link>
      </div>

      <!-- Course Content -->
      <div v-else-if="course" class="card p-6 rounded-3xl bg-white/80 dark:bg-navy-800/80 backdrop-blur-md">
        <div v-if="course.video_url || course.video_path" class="mb-6">
          <video v-if="course.video_path" controls class="w-full rounded-2xl shadow-soft bg-neutral-100 dark:bg-neutral-700">
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
        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed text-left mb-6">{{ course.description }}</p>
        <router-link :to="`/courses/${course.id}`" class="btn-3d btn-3d-border w-full rounded-full text-center">
          <font-awesome-icon :icon="['fas', 'chevron-left']" class="mr-2" /> Back to Details
        </router-link>
      </div>

      <!-- Not Found -->
      <div v-else class="text-center py-12">
        <p class="text-neutral-600 dark:text-neutral-400 text-lg">Course not found.</p>
      </div>
    </div>
  </DefaultLayoutComponent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Course, useCourseStore } from '@/stores/course';
import { useUserStore } from '@/stores/user';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import type { Component } from 'vue';
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();

const route = useRoute();
const courseStore = useCourseStore();
const userStore = useUserStore();

const course = ref<Course | null>(null);

const DefaultLayoutComponent = DefaultLayout as unknown as Component & { $slots: { 'header-title': () => any; default: () => any } };

onMounted(async () => {
  try {
    loadingStore.start();
    await userStore.fetchDashboard();
    await courseStore.fetchCourse(Number(route.params.id));
    course.value = courseStore.currentCourse;
  } catch (error) {
    console.error('Failed to load course:', error);
  }
  finally {
  
    loadingStore.stop();
  }
});

const isEmbeddable = (url?: string) => url ? ['youtube.com', 'youtu.be', 'vimeo.com'].some(s => url.includes(s)) : false;

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