<template>
  <div class="space-y-8 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">{{ course?.title }}</h1>
    </div>

    <div v-if="!userStore.activePlan" class="card backdrop-blur text-center max-w-lg mx-auto">
      <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-base">
        Purchase a plan to access course content.
      </p>
      <router-link to="/plans" class="btn-3d w-full">
        <font-awesome-icon :icon="['fas', 'credit-card']" class="mr-2" /> View Plans
      </router-link>
    </div>

    <div v-else-if="course" class="card backdrop-blur relative">
      <div :class="['grid gap-8 relative', isSidebarCollapsed ? 'lg:grid-cols-1' : 'lg:grid-cols-[1fr_300px]']">
        <div class="relative aspect-video max-w-4xl mx-auto lg:mx-0">
          <!-- Debug: Show source and provider -->
          <div class="text-sm text-neutral-600 mb-2">
            Debug Source: {{ source }}<br />
            Provider: {{ provider || 'html5' }}
          </div>
          <!-- Loading placeholder -->
          <div v-if="!source" class="h-[360px] flex items-center justify-center bg-neutral-800 rounded-lg">
            <p class="text-neutral-400">Loading video...</p>
          </div>
          <!-- Plyr Player Container -->
          <div v-else class="plyr__video-wrapper rounded-lg overflow-hidden" :id="`plyr-${course.id}`">
            <!-- HTML5 Video for MP4 -->
            <video
              v-if="isHtml5"
              ref="videoEl"
              class="plyr"
              playsinline
              controls
              :poster="course.thumbnail || undefined"
              :data-poster="course.thumbnail || undefined"
            >
              <source :src="source" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <!-- YouTube Embed -->
            <div
              v-else-if="provider === 'youtube'"
              class="plyr__video-embed"
              :id="`youtube-${course.id}`"
            >
             <iframe
            v-if="extractYouTubeId(source)"
            :src="`https://www.youtube.com/embed/${extractYouTubeId(source)}?origin=${windowOrigin}`"
            allowfullscreen
            allow="autoplay; encrypted-media; picture-in-picture"
            allowtransparency="true"
            loading="lazy"
          ></iframe>

            </div>
            <!-- Vimeo Embed -->
            <div
              v-else-if="provider === 'vimeo'"
              class="plyr__video-embed"
              :id="`vimeo-${course.id}`"
            >
              <iframe
                :src="`https://player.vimeo.com/video/${extractVimeoId(source)}?dnt=1&portrait=0`"
                allowfullscreen
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <transition name="slide">
          <div
            v-if="!isSidebarCollapsed"
            key="sidebar"
            class="card backdrop-blur p-6 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto relative"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Course Summary</h3>
              <button
                @click="toggleSidebar"
                class="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
                title="Collapse Sidebar"
              >
                <font-awesome-icon icon="chevron-right" />
              </button>
            </div>

            <div class="space-y-4 text-sm text-neutral-700 dark:text-neutral-300">
              <p><strong>Title:</strong> {{ course.title }}</p>
              <p><strong>Description:</strong> {{ course.description }}</p>
              <p>
                <strong>Status:</strong>
                <span :class="course.is_active ? 'text-green-600' : 'text-red-600'">
                  {{ course.is_active ? 'Active' : 'Inactive' }}
                </span>
              </p>
            </div>
          </div>
        </transition>

        <button
          v-if="isSidebarCollapsed"
          @click="toggleSidebar"
          class="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-neutral-800 hover:bg-primary-600 text-white rounded-full p-3 shadow-md transition z-10"
          title="Open Course Summary"
        >
          <font-awesome-icon icon="chevron-left" />
        </button>
      </div>

      <div class="mt-8 max-w-4xl mx-auto">
        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
          {{ course.description }}
        </p>
      </div>

      <router-link
        :to="`/courses/${course.id}`"
        class="btn-secondary w-full max-w-xs text-center mx-auto block mt-6"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" class="mr-2" /> Back to Details
      </router-link>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-neutral-600 dark:text-neutral-400 text-base">Course not found.</p>
    </div>

    <div v-if="otherCourses.length > 0" class="space-y-6">
      <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white">Explore More Courses</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="otherCourse in otherCourses" :key="otherCourse.id" class="card backdrop-blur">
          <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-2">{{ otherCourse.title }}</h3>
          <p class="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-4">
            {{ otherCourse.description }}
          </p>
          <router-link :to="`/courses/${otherCourse.id}`" class="btn-3d w-full text-center">
            View Course
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const windowOrigin = typeof window !== 'undefined' ? window.location.origin : ''


import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Plyr from 'plyr'
import type { PlyrEvent } from 'plyr'
import { Course, useCourseStore } from '@/stores/course'
import { useUserStore } from '@/stores/user'
import { useLoadingStore } from '@/stores/loading'
import { useToast } from 'vue-toastification'
import api from '@/services/api'

// TypeScript refs
const loadingStore = useLoadingStore()
const route = useRoute()
const courseStore = useCourseStore()
const userStore = useUserStore()
const toast = useToast()

const videoEl = ref<HTMLVideoElement | null>(null)
const playerInstance = ref<Plyr | null>(null)
const course = ref<Course | null>(null)
const otherCourses = ref<Course[]>([])
const isSidebarCollapsed = ref<boolean>(false)

// Video source and provider
const source = ref<string>('')
const provider = ref<'youtube' | 'vimeo' | undefined>(undefined)
const isHtml5 = computed(() => !provider.value)

// Utility functions
const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const extractVimeoId = (url: string): string | null => {
  const regExp = /^.*vimeo\.com\/(?:video\/)?(\d+)(?:\/[a-z0-9]+)?/
  const match = url.match(regExp)
  return match ? match[1] : null
}

const getAssetUrl = (path: string | undefined): string => {
  if (!path) return ''
  const base = api.defaults.baseURL
    ? api.defaults.baseURL.replace(/\/api\/?$/, '/storage')
    : '/storage'
  const url = `${base}${path.startsWith('/') ? path : '/' + path}`
  console.log('[CoursePlay] Asset URL:', url)
  return url
}

const initPlayer = async () => {
  if (!source.value || !course.value) return

  const target = document.getElementById(`plyr-${course.value.id}`) as HTMLElement
  if (!target) return

  const options = {
    title: course.value.title,
    controls: [
      'play-large', 'restart', 'rewind', 'play', 'fast-forward', 'progress',
      'current-time', 'duration', 'mute', 'volume', 'settings', 'pip', 'airplay', 'fullscreen'
    ],
    settings: ['quality', 'speed'],
    quality: { default: 1, options: [1] },
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
    ratio: '16:9'
  }

  if (isHtml5.value && videoEl.value) {
    // Wait until metadata is loaded before initializing Plyr
    videoEl.value.addEventListener('loadedmetadata', () => {
      console.log('[CoursePlay] Video metadata ready, initializing Plyr...')
      playerInstance.value = new Plyr(videoEl.value!, options)
      bindPlyrEvents()
    })
  } else {
    playerInstance.value = new Plyr(target, options)
    bindPlyrEvents()
  }
}

const bindPlyrEvents = () => {
  if (!playerInstance.value) return
  console.log('[CoursePlay] Plyr initialized')

  playerInstance.value.on('play', () => console.log('[CoursePlay] Video playing'))
  playerInstance.value.on('pause', () => console.log('[CoursePlay] Video paused'))
  playerInstance.value.on('error', (event: PlyrEvent) => {
    console.error('[CoursePlay] Plyr error:', event)
    toast.error('Failed to load video. Please check the source.')
  })
  playerInstance.value.on('ready', () => {
  console.log('[CoursePlay] Plyr ready')})

}


const destroyPlayer = () => {
  if (playerInstance.value) {
    playerInstance.value.destroy()
    playerInstance.value = null
  }
}

// Initialize video source
const initializePlayer = async () => {
  if (!course.value) {
    console.error('Player initialization failed: Missing course')
    toast.error('Failed to initialize video player.')
    return
  }

  source.value = course.value.video_path
    ? getAssetUrl(course.value.video_path)
    : course.value.video_url || ''
  // source.value = 'https://files.vidstack.io/sprite-fight/720p.mp4'; // Uncomment for testing

  console.log('[CoursePlay] Initializing player with source:', source.value)

  if (!source.value) {
    toast.error('No video source available for this course.')
    return
  }

  if (source.value.includes('youtube.com') || source.value.includes('youtu.be')) {
    provider.value = 'youtube'
    if (!extractYouTubeId(source.value)) {
      toast.error('Invalid YouTube URL.')
      return
    }
  } else if (source.value.includes('vimeo.com')) {
    provider.value = 'vimeo'
    if (!extractVimeoId(source.value)) {
      toast.error('Invalid Vimeo URL.')
      return
    }
  }

  // Force re-compute and wait for next tick
  await nextTick()
  console.log('[CoursePlay] Source set:', source.value)

  // Init Plyr after DOM update
  await nextTick()
  initPlayer()
}

onMounted(async () => {
  loadingStore.start()
  try {
    await userStore.fetchDashboard()
  } catch (error) {
    console.error('Failed to fetch user dashboard:', error)
    toast.error('Failed to load user data. Some features may be unavailable.')
  }

  try {
    await courseStore.fetchCourse(Number(route.params.id))
    course.value = courseStore.currentCourse
    if (!course.value) {
      throw new Error('Course not found')
    }

    // Auto-enroll or re-enroll
    if (
      (!courseStore.currentEnrollment || courseStore.currentEnrollment.status !== 'active') &&
      userStore.activePlan
    ) {
      const force = !!courseStore.currentEnrollment
      try {
        await courseStore.enrollCourse(course.value.id, force)
        toast.success(force ? 'Re-enrolled in course successfully!' : 'Enrolled in course successfully!')
        await courseStore.fetchCourse(course.value.id)
      } catch (error) {
        console.error('Enrollment error:', error)
        toast.error('Failed to enroll in course. Please try again.')
      }
    }

    try {
      const allCourses = await courseStore.fetchCourses()
      otherCourses.value = allCourses
        .filter((c) => c.id !== Number(route.params.id) && c.is_active)
        .slice(0, 6)
    } catch (error) {
      console.error('Failed to fetch other courses:', error)
    }

    // Initialize player after course is loaded
    await initializePlayer()
  } catch (error) {
    console.error('Failed to load course:', error)
    toast.error('Failed to load course. Please try again.')
    course.value = null
  } finally {
    loadingStore.stop()
  }
})

onUnmounted(() => {
  destroyPlayer()
})

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<style scoped>
@reference '../../assets/main.css';

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Plyr Styling */
:deep(.plyr) {
  @apply bg-neutral-900/50 rounded-lg;
}
:deep(.plyr--video) {
  @apply rounded-lg;
}
:deep(.plyr__control) {
  @apply bg-primary-600 hover:bg-primary-700;
}
:deep(.plyr__controls) {
  @apply bg-neutral-900/80 backdrop-blur;
}
</style>