<template>
  <div class="space-y-8">
    <!-- Welcome Card -->
    <div class="card backdrop-blur">
      <h2 class="text-xl font-semibold text-neutral-900 dark:text-white">Welcome back, {{ userName }}!</h2>
      <p class="text-neutral-600 dark:text-neutral-400 mt-2 text-base">Here's what's happening with your account.</p>
    </div>

    <!-- Continue Learning Card -->
    <div v-if="purchasedCourses.length > 0" class="card backdrop-blur">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-neutral-900 dark:text-white">Continue Learning</h2>
      </div>
      <div v-for="pc in purchasedCourses" :key="pc.id" class="flex items-start space-x-4 p-4 border rounded-lg">
        <img v-if="pc.course.thumbnail" :src="pc.course.thumbnail" alt="Course thumbnail" class="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
        <div v-else class="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <font-awesome-icon icon="image" class="w-8 h-8 text-gray-400" />
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-neutral-900 dark:text-white truncate">{{ pc.course.title }}</h3>
          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
            <div class="bg-primary-600 h-2.5 rounded-full transition-all duration-300" :style="{ width: pc.progress + '%' }"></div>
          </div>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ pc.progress }}% Complete</p>
        </div>
        <router-link 
          :to="`/courses/${pc.course.id}/play`" 
          class="btn-3d btn-3d-border whitespace-nowrap px-4 py-2"
        >
          Continue
        </router-link>
      </div>
    </div>

    <!-- Dashboard Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="card backdrop-blur">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Completed Courses</h3>
        <div class="text-2xl font-bold text-primary-600 mb-2">{{ completedCount > 99 ? '99+' : completedCount }}</div>
        <p class="text-neutral-600 dark:text-neutral-400 text-base">Completed Courses</p>
      </div>
      <div class="card backdrop-blur">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Course in Progress</h3>
        <div class="text-2xl font-bold text-green-500 mb-2">{{ inProgressCount > 99 ? '99+' : inProgressCount }}</div>
        <p class="text-neutral-600 dark:text-neutral-400 text-base">Course in Progress</p>
      </div>
      <div class="card backdrop-blur border-l-4 border-green-500">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Wallet Balance</h3>
        <div class="text-2xl font-bold text-green-500 mb-2">
          PKR {{ balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </div>
        <router-link to="/wallet" class="text-primary-600 hover:text-primary-700 text-base font-medium">Top Up</router-link>
      </div>
      <div class="card backdrop-blur">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Active Plan</h3>
        <div v-if="activePlan" class="flex items-center justify-between">
          <div>
            <div class="bg-green-100 dark:bg-green-900/20 px-3 py-2 rounded-full mb-4">
              <p class="text-sm font-medium text-green-800 dark:text-green-200">{{ activePlan.name }}</p>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Expires on: {{ formatDate(activePlan.end_date) }}</p>
          </div>
          <div class="bg-primary-600 px-2 py-1 rounded-full">
            <router-link to="/plans" class="text-white font-medium text-sm">Upgrade</router-link>
          </div>
        </div>
        <div v-else class="text-center py-6">
          <p class="text-neutral-600 dark:text-neutral-400 mb-4 text-base">No active plan</p>
          <router-link to="/plans" class="btn-3d btn-3d-border w-full">Choose Plan</router-link>
        </div>
      </div>
    </div>

    <!-- My Progress -->
    <div class="card backdrop-blur">
      <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">My Progress</h2>
      <div v-if="inProgressCount > 0 || completedCount > 0" class="flex items-center justify-between">
        <div class="flex-1">
          <p class="text-neutral-600 dark:text-neutral-400 text-base">Total Completed Courses: {{ completedCount }}</p>
          <p class="text-neutral-600 dark:text-neutral-400 text-base">Courses in Progress: {{ inProgressCount }}</p>
          <div class="flex space-x-2 mt-2 flex-wrap">
            <span v-for="enrollment in enrollments" :key="enrollment.id" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-200': enrollment.progress < 100,
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200': enrollment.progress === 100
                  }">
              {{ enrollment.course.title }}: {{ enrollment.progress }}%
            </span>
          </div>
        </div>
        <div class="w-24 h-24 flex-shrink-0">
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" stroke-width="8" class="dark:stroke-[#4B5563]"></circle>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" stroke-width="8" :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * (averageProgress / 100))" class="progress-ring"></circle>
            <text x="50" y="50" text-anchor="middle" dy=".3em" class="text-neutral-900 dark:text-white font-bold text-lg">{{ averageProgress }}%</text>
          </svg>
        </div>
      </div>
      <div v-else class="text-center py-6">
        <p class="text-neutral-600 dark:text-neutral-400 mb-4 text-base">No progress or completed courses yet.</p>
        <router-link to="/courses" class="btn-3d btn-3d-border w-full">Enroll Now</router-link>
      </div>
    </div>

    <!-- Top Courses Pick for You -->
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-neutral-900 dark:text-white">Top Courses Pick for You</h2>
        <router-link to="/courses" class="text-primary-600 hover:text-primary-700 text-base font-medium">See All</router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="course in availableCourses" :key="course.id" class="card backdrop-blur">
          <h4 class="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">{{ course.title }}</h4>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{{ course.description.substring(0, 60) }}...</p>
          <router-link :to="`/courses/${course.id}/play`" class="btn-3d btn-3d-border w-full justify-center">
            <font-awesome-icon icon="play" class="mr-2 w-4 h-4" /> View Details
          </router-link>
        </div>
      </div>
    </div>

    <!-- Purchased Courses (now Enrollments) -->
    <div v-if="purchasedCourses.length > 0">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-neutral-900 dark:text-white">Your Courses</h2>
        <router-link to="/courses" class="text-primary-600 hover:text-primary-700 text-base font-medium">Browse More</router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="pc in purchasedCourses" :key="pc.id" class="card backdrop-blur">
          <img v-if="pc.course.thumbnail" :src="pc.course.thumbnail" alt="Thumbnail" class="w-full h-32 object-cover rounded-lg mb-4" />
          <h4 class="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">{{ pc.course.title }}</h4>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{{ pc.course.description.substring(0, 60) }}...</p>
          <router-link 
            :to="`/courses/${pc.course.id}/play`" 
            class="btn-3d btn-3d-border w-full justify-center"
          >
            <font-awesome-icon icon="play" class="mr-2 w-4 h-4" /> Play Course
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
  const totalCourses = inProgressCount.value + completedCount.value;
  if (totalCourses === 0) return 0;
  let sum = completedCount.value * 100;
  const activeProgresses = enrollments.value.map(e => e.progress || 0);
  sum += activeProgresses.reduce((a, b) => a + b, 0);
  return Math.round(sum / totalCourses);
});

const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
</script>