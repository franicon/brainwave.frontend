<!-- src/views/dashboard/UserDashboard.vue -->
<template>
  <div class="space-y-8">

    <!-- Welcome Header -->
    <div class="card backdrop-blur flex justify-between items-center p-6">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
          Welcome back, {{ userName }}!
        </h1>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Here's what's happening with your learning journey.
        </p>
      </div>
      <div class="text-right">
        <span class="text-sm text-neutral-600 dark:text-neutral-400 block">{{ currentMonth }}</span>
        <span class="text-xs text-neutral-500 dark:text-neutral-500 block">Updated {{ currentTime }}</span>
      </div>
    </div>

    <!-- Continue Learning -->
    <section v-if="purchasedCourses.length" class="card backdrop-blur p-6">
      <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-5">Continue Learning</h2>

      <div
        v-for="pc in purchasedCourses"
        :key="pc.id"
        class="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 transition hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
      >
        <div class="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img
            v-if="pc.course.thumbnail"
            :src="resolveImage(pc.course.thumbnail)"
            alt="Thumbnail"
            class="w-full h-full object-cover"
          />
          <font-awesome-icon v-else icon="image" class="w-8 h-8 text-gray-400 self-center" />
        </div>

        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-neutral-900 dark:text-white truncate">{{ pc.course.title }}</h3>
          <div class="mt-2 flex items-center gap-2">
            <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${pc.progress}%` }"
              ></div>
            </div>
            <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ pc.progress }}%</span>
          </div>
        </div>

        <router-link
          :to="`/courses/${pc.course.id}/play`"
          class="btn-3d btn-3d-border whitespace-nowrap px-4 py-2"
        >
          Continue
        </router-link>
      </div>
    </section>

    <!-- Key Metrics (4 Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <!-- Completed Courses -->
      <div class="card backdrop-blur p-6 text-center">
        <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
          <font-awesome-icon icon="check" class="text-xl text-primary-600 dark:text-primary-400" />
        </div>
        <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {{ completedCount > 99 ? '99+' : completedCount }}
        </p>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Completed Courses</p>
      </div>

      <!-- In Progress -->
      <div class="card backdrop-blur p-6 text-center">
        <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
          <font-awesome-icon icon="tachometer-alt" class="text-xl text-green-600 dark:text-green-400" />
        </div>
        <p class="text-2xl font-bold text-green-600 dark:text-green-400">
          {{ inProgressCount > 99 ? '99+' : inProgressCount }}
        </p>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">In Progress</p>
      </div>

      <!-- Wallet Balance -->
      <div class="card backdrop-blur p-6 text-center border-l-4 border-green-500">
        <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
          <font-awesome-icon icon="wallet" class="text-xl text-green-600 dark:text-green-400" />
        </div>
        <p class="text-2xl font-bold text-green-600 dark:text-green-400">
          PKR {{ balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </p>
        <router-link to="/wallet" class="mt-2 inline-block text-primary-600 hover:text-primary-700 text-sm font-medium">
          Top-up
        </router-link>
      </div>

      <!-- Active Plan -->
      <div class="card backdrop-blur p-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-medium text-neutral-900 dark:text-white">Active Plan</h3>
          <font-awesome-icon icon="credit-card" class="text-lg text-indigo-600 dark:text-indigo-400" />
        </div>

        <template v-if="activePlan">
          <div class="flex items-center justify-between">
            <div>
              <span class="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 text-sm font-medium">
                {{ activePlan.name }}
              </span>
              <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Expires {{ formatDate(activePlan.end_date || '') }}
              </p>
            </div>
            <router-link
              to="/plans"
              class="bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-700 transition"
            >
              Upgrade
            </router-link>
          </div>
        </template>

        <div v-else class="text-center py-4">
          <p class="text-neutral-600 dark:text-neutral-400 text-sm mb-3">No active plan</p>
          <router-link to="/plans" class="btn-3d btn-3d-border w-full">Choose Plan</router-link>
        </div>
      </div>
    </div>

    <!-- My Progress (Ring) -->
    <section class="card backdrop-blur p-6">
      <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-5 flex items-center">
        <font-awesome-icon icon="chart-bar" class="mr-2 text-primary-600 dark:text-primary-400" />
        My Progress
      </h2>

      <div v-if="totalCourses" class="flex items-center justify-between gap-6">
        <div class="flex-1 space-y-2">
          <p class="text-neutral-600 dark:text-neutral-400">
            <strong>{{ completedCount }}</strong> completed
          </p>
          <p class="text-neutral-600 dark:text-neutral-400">
            <strong>{{ inProgressCount }}</strong> in progress
          </p>

          <div class="flex flex-wrap gap-2 mt-3">
            <span
              v-for="enr in enrollments"
              :key="enr.id"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="{
                'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-200': enr.progress < 100,
                'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200': enr.progress === 100
              }"
            >
              {{ enr.course.title }}: {{ enr.progress }}%
            </span>
          </div>
        </div>

        <div class="relative w-28 h-28 flex-shrink-0">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" stroke-width="10" class="dark:stroke-[#374151]" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#10B981"
              stroke-width="10"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - (circumference * averageProgress) / 100"
              class="transition-all duration-700"
            />
            <text x="50" y="50" text-anchor="middle" dy=".3em" class="fill-neutral-900 dark:fill-white font-bold text-xl">
              {{ averageProgress }}%
            </text>
          </svg>
        </div>
      </div>

      <div v-else class="text-center py-6">
        <p class="text-neutral-600 dark:text-neutral-400 mb-4">No progress yet – start learning!</p>
        <router-link to="/courses" class="btn-3d btn-3d-border w-full">Enroll Now</router-link>
      </div>
    </section>

    <!-- Recommended Courses -->
    <section>
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl font-semibold text-neutral-900 dark:text-white">Top Picks for You</h2>
        <router-link to="/courses" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
          See All
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="c in availableCourses"
          :key="c.id"
          class="card backdrop-blur p-5 flex flex-col"
        >
          <div class="w-full h-36 rounded-lg overflow-hidden mb-4 bg-gray-200 dark:bg-gray-700">
            <img
              v-if="c.thumbnail"
              :src="resolveImage(c.thumbnail)"
              alt="Thumbnail"
              class="w-full h-full object-cover"
            />
            <font-awesome-icon v-else icon="image" class="w-12 h-12 text-gray-400 self-center mt-12" />
          </div>

          <h3 class="font-medium text-neutral-900 dark:text-white line-clamp-2 mb-2">{{ c.title }}</h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
            {{ c.description?.substring(0, 80) || 'No description' }}...
          </p>

          <router-link
            :to="`/courses/${c.id}/play`"
            class="mt-auto btn-3d btn-3d-border w-full flex items-center justify-center"
          >
            <font-awesome-icon icon="play" class="mr-2 w-4 h-4" /> Enroll Now
          </router-link>
        </article>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
onMounted(() => userStore.fetchDashboard())

const baseUrl = import.meta.env.VITE_API_BASE_URL_STORAGE;

const resolveImage = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('//')) return path;

  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
};



const now = new Date()
const currentMonth = now.toLocaleString('default', { month: 'long' })
const currentTime = ref(now.toLocaleTimeString())
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString()
}, 60_000)

// Data
const userName = computed(() => userStore.dashboard?.user?.name ?? 'User')
const balance = computed(() => userStore.balance)
const activePlan = computed(() => userStore.activePlan)
const purchasedCourses = computed(() => userStore.purchasedCourses)
const availableCourses = computed(() => userStore.availableCourses)
const completedCount = computed(() => userStore.completedCount)
const inProgressCount = computed(() => userStore.inProgressCount)
const enrollments = computed(() => userStore.dashboard?.purchased_courses ?? [])
const totalCourses = computed(() => completedCount.value + inProgressCount.value)

// Progress Ring
const circumference = 2 * Math.PI * 42
const averageProgress = computed(() => {
  if (!totalCourses.value) return 0
  const completedPoints = completedCount.value * 100
  const inProgressPoints = enrollments.value.reduce((s, e) => s + (e.progress ?? 0), 0)
  return Math.round((completedPoints + inProgressPoints) / totalCourses.value)
})

const formatDate = (d: string) => new Date(d).toLocaleDateString()
</script>

<style scoped>
.progress-ring {
  transition: stroke-dashoffset 0.7s ease-in-out;
}
</style>