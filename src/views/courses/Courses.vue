<template>
  <div class="space-y-8 max-w-7xl mx-auto py-8">
    <!-- Login Prompt -->
    <div v-if="!authStore.isAuthenticated" class="card p-6 rounded-3xl text-center max-w-md mx-auto">
      <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-lg">Please login to access courses.</p>
      <router-link to="/login" class="btn-3d btn-3d-border w-full rounded-full">
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="mr-2" /> Sign In
      </router-link>
    </div>

    <!-- Plan Required Prompt -->
   <div v-else-if="!userStore.activePlan" class="card p-6 rounded-3xl text-center max-w-md mx-auto">
      <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-lg">Purchase a plan to access courses.</p>
      <router-link to="/plans" class="btn-3d btn-3d-border w-full rounded-full">
        <font-awesome-icon :icon="['fas', 'credit-card']" class="mr-2" /> View Plans
      </router-link>
    </div>

    <!-- Courses Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="course in courses" :key="course.id" class="card p-6 rounded-3xl bg-white/80 dark:bg-navy-800/80 backdrop-blur-md">
        <img v-if="course.thumbnail" :src="course.thumbnail" alt="Thumbnail" class="w-full h-48 object-cover rounded-2xl mb-4" />
        <h3 class="text-xl font-semibold mb-3 text-neutral-900 dark:text-white font-sans">{{ course.title }}</h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">{{ course.description }}</p>
        <router-link :to="`/courses/${course.id}`" class="btn-3d btn-3d-border w-full rounded-full text-center">
          <font-awesome-icon :icon="['fas', 'book']" class="mr-2" /> View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { Course, useCourseStore } from '@/stores/course';
import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loading';
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const courseStore = useCourseStore();
const courses = ref<Course[]>([]);

onMounted(async () => {
  try {
    loadingStore.start();
    await userStore.fetchDashboard();
    courses.value = await courseStore.fetchCourses();
  } catch (error) {
    console.error('Failed to fetch courses:', error);
  } finally {
    loadingStore.stop();
  }
});
</script>