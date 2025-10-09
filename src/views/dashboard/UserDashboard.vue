<template>
  <div class="space-y-8">
    <!-- Welcome Card -->
    <div class="card">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {{ userName }}!</h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening with your account.</p>
    </div>

    <!-- Dashboard Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Completed Courses</h3>
        <div class="text-2xl font-bold text-blue-500 mb-2">{{ completedCount > 99 ? '99+' : completedCount }}</div>
        <p class="text-gray-600 dark:text-gray-400">Completed Courses</p>
      </div>
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course in Progress</h3>
        <div class="text-2xl font-bold text-green-500 mb-2">{{ inProgressCount > 99 ? '99+' : inProgressCount }}</div>
        <p class="text-gray-600 dark:text-gray-400">Course in Progress</p>
      </div>
      <div class="card bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-green-900/20 dark:via-green-800/10 dark:to-navy-800 border-l-4 border-green-500">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Wallet Balance</h3>
        <div class="text-2xl font-bold text-green-500 mb-2">
          PKR {{ balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </div>
        <router-link to="/wallet" class="text-blue-500 hover:text-blue-600">Top Up</router-link>
      </div>
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Plan</h3>
        <div v-if="activePlan" class="flex items-center justify-between">
          <div>
            <div class="bg-green-100 dark:bg-green-900/20 px-3 py-2 rounded-full mb-4">
              <p class="text-sm font-medium text-green-800 dark:text-green-200">{{ activePlan.name }}</p>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Expires on: {{ formatDate(activePlan.end_date) }}</p>
          </div>
          <div class="bg-red-500 px-2 py-1 rounded-full">
            <router-link to="/plans" class="text-white font-medium text-sm">Upgrade</router-link>
          </div>
        </div>
        <div v-else class="text-center py-6">
          <p class="text-gray-600 dark:text-gray-400 mb-4">No active plan</p>
          <router-link to="/plans" class="btn-3d btn-3d-border w-full rounded-full">Choose Plan</router-link>
        </div>
      </div>
    </div>

    <!-- My Progress -->
    <div class="card">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Progress</h2>
      <div v-if="inProgressCount > 0 || completedCount > 0" class="flex items-center justify-between">
        <div>
          <p class="text-gray-600 dark:text-gray-400">Total Completed Courses: {{ completedCount }}</p>
          <div class="flex space-x-2 mt-2">
            <span v-for="enrollment in enrollments" :key="enrollment.id" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200': enrollment.progress < 100,
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200': enrollment.progress === 100
                  }">
              {{ enrollment.progress }}%
            </span>
          </div>
        </div>
        <div class="w-24 h-24">
          <svg class="w-full h-full">
            <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#E5E7EB" stroke-width="8"></circle>
            <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#4CAF50" stroke-width="8" :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * (averageProgress / 100))"></circle>
            <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="text-gray-900 dark:text-white font-bold text-lg">{{ averageProgress }}%</text>
          </svg>
        </div>
      </div>
      <div v-else class="text-center py-6">
        <p class="text-gray-600 dark:text-gray-400 mb-4">No progress or completed courses yet.</p>
        <router-link to="/courses" class="btn-3d btn-3d-border w-full rounded-full">Enroll Now</router-link>
      </div>
    </div>

    <!-- Top Courses Pick for You -->
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white font-sans">Top Courses Pick for You</h2>
        <router-link to="/courses" class="text-blue-500 hover:text-blue-600 font-medium transition-colors">See All</router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="course in availableCourses" :key="course.id" class="card">
          <h4 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white font-sans">{{ course.title }}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ course.description.substring(0, 60) }}...</p>
          <router-link :to="`/courses/${course.id}/play`" class="btn-3d btn-3d-border w-full justify-center rounded-full">
            <font-awesome-icon icon="play" class="mr-2" /> View Details
          </router-link>
        </div>
      </div>
    </div>

    <!-- Purchased Courses (now Enrollments) -->
    <div v-if="purchasedCourses.length > 0">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white font-sans">Your Courses</h2>
        <router-link to="/courses" class="text-primary-500 hover:text-primary-600 font-medium transition-colors">Browse More</router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="pc in purchasedCourses" :key="pc.id" class="card">
          <img v-if="pc.course.thumbnail" :src="pc.course.thumbnail" alt="Thumbnail" class="w-full h-32 object-cover rounded-2xl mb-4" />
          <h4 class="text-lg font-semibold mb-2 text-neutral-900 dark:text-white font-sans">{{ pc.course.title }}</h4>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{{ pc.course.description.substring(0, 60) }}...</p>
          <router-link 
            :to="`/courses/${pc.course.id}/play`" 
            class="btn-3d btn-3d-border w-full justify-center rounded-full"
          >
            <font-awesome-icon icon="play" class="mr-2" /> Play Course
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
onMounted(() => userStore.fetchDashboard());

const userName = computed(() => userStore.dashboard?.user?.name || 'User');
const balance = computed(() => userStore.balance);
const activePlan = computed(() => userStore.activePlan);
const purchasedCourses = computed(() => userStore.purchasedCourses);
const availableCourses = computed(() => userStore.availableCourses);
const completedCount = computed(() => userStore.completedCount);
const inProgressCount = computed(() => userStore.inProgressCount);
const enrollments = computed(() => userStore.dashboard?.purchased_courses || []);
const averageProgress = computed(() => {
  const progresses = enrollments.value.map(e => e.progress || 0);
  return progresses.length ? progresses.reduce((a, b) => a + b, 0) / progresses.length : 0;
});

const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
</script>