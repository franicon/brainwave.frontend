<template>
  <div class="space-y-8 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <!-- Course Title -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">{{ course?.title }}</h1>
    </div>

    <!-- Access Plan Check -->
    <div v-if="!userStore.activePlan" class="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg shadow-sm p-6 max-w-lg mx-auto text-center border border-neutral-200 dark:border-neutral-700">
      <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-base">
        Purchase a plan to access course content.
      </p>
      <router-link to="/plans" class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium text-sm rounded-md hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200 w-full">
        <font-awesome-icon :icon="['fas', 'credit-card']" class="mr-2" /> View Plans
      </router-link>
    </div>

    <!-- Course Content -->
    <div v-else-if="course" class="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg shadow-sm relative p-6 border border-neutral-200 dark:border-neutral-700">
      <div :class="['grid gap-8 relative', isSidebarCollapsed ? 'lg:grid-cols-1' : 'lg:grid-cols-[1fr_300px]']">
        
        <!-- Video Player -->
        <div class="relative aspect-video max-w-4xl mx-auto lg:mx-0 rounded-lg overflow-hidden bg-neutral-900/50">
          <!-- Debug Info -->
          <div class="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            Debug Source: {{ source }}<br />
            Provider: {{ provider || 'html5' }}
          </div>

          <!-- Loading Placeholder -->
          <div v-if="!source" class="h-[360px] flex items-center justify-center bg-neutral-800 rounded-lg">
            <p class="text-neutral-400">Loading video...</p>
          </div>

          <!-- Plyr Video -->
          <div v-else :id="`plyr-${course.id}`" class="rounded-lg overflow-hidden">
            <!-- HTML5 Video -->
            <video
              v-if="isHtml5"
              ref="videoEl"
              class="w-full h-full rounded-lg"
              playsinline
              controls
              :poster="course.thumbnail || undefined"
            >
              <source :src="source" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <!-- YouTube -->
            <div v-else-if="provider === 'youtube'" class="w-full h-full">
              <iframe
                v-if="extractYouTubeId(source)"
                class="w-full h-full rounded-lg"
                :src="`https://www.youtube.com/embed/${extractYouTubeId(source)}?origin=${windowOrigin}&iv_load_policy=3`"
                allowfullscreen
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>

            <!-- Vimeo -->
            <div v-else-if="provider === 'vimeo'" class="w-full h-full">
              <iframe
                v-if="extractVimeoId(source)"
                class="w-full h-full rounded-lg"
                :src="`https://player.vimeo.com/video/${extractVimeoId(source)}?dnt=1&portrait=0`"
                allowfullscreen
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <transition name="slide">
          <div
            v-if="!isSidebarCollapsed"
            key="sidebar"
            class="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg shadow-sm p-6 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto relative border border-neutral-200 dark:border-neutral-700"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Course Summary</h3>
              <button @click="toggleSidebar" class="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition" title="Collapse Sidebar">
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

        <!-- Toggle Sidebar Button -->
        <button
          v-if="isSidebarCollapsed"
          @click="toggleSidebar"
          class="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-neutral-800 dark:bg-neutral-900 hover:bg-primary-600 text-white rounded-full p-3 shadow-md transition z-10"
          title="Open Course Summary"
        >
          <font-awesome-icon icon="chevron-left" />
        </button>
      </div>

      <!-- Course Description -->
      <div class="mt-8 max-w-4xl mx-auto">
        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
          {{ course.description }}
        </p>
      </div>

      <!-- Back Button -->
      <router-link
        :to="`/courses/${course.id}`"
        class="inline-flex items-center justify-center px-6 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white font-medium text-sm rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all duration-200 w-full max-w-xs text-center mx-auto block mt-6"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" class="mr-2" /> Back to Details
      </router-link>
    </div>

    <!-- No Course Found -->
    <div v-else class="text-center py-12">
      <p class="text-neutral-600 dark:text-neutral-400 text-base">Course not found.</p>
    </div>

    <!-- Other Courses -->
    <div v-if="otherCourses.length > 0" class="space-y-6">
      <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white">Explore More Courses</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="otherCourse in otherCourses" :key="otherCourse.id" class="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-neutral-200 dark:border-neutral-700">
          <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-2">{{ otherCourse.title }}</h3>
          <p class="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-4">
            {{ otherCourse.description }}
          </p>
          <router-link :to="`/courses/${otherCourse.id}`" class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium text-sm rounded-md hover:from-pink-600 hover:to-blue-600 transition-all duration-200 w-full text-center">
            View Course
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import * as Plyr from 'plyr'
import type { PlyrEvent } from 'plyr'
import { Course, useCourseStore } from '@/stores/course'
import { useUserStore } from '@/stores/user'
import { useLoadingStore } from '@/stores/loading'
import { useToast } from 'vue-toastification'
import api from '@/services/api'

const windowOrigin = typeof window !== 'undefined' ? window.location.origin : ''

const route = useRoute()
const courseStore = useCourseStore()
const userStore = useUserStore()
const loadingStore = useLoadingStore()
const toast = useToast()

const videoEl = ref<HTMLVideoElement | null>(null)
const playerInstance = ref<Plyr | null>(null)
const course = ref<Course | null>(null)
const otherCourses = ref<Course[]>([])
const isSidebarCollapsed = ref<boolean>(false)

const source = ref<string>('')
const provider = ref<'youtube' | 'vimeo' | undefined>(undefined)
const isHtml5 = computed(() => !provider.value)

const extractYouTubeId = (url: string) => {
  const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)
  return match && match[2].length === 11 ? match[2] : null
}

const extractVimeoId = (url: string) => {
  const match = url.match(/^.*vimeo\.com\/(?:video\/)?(\d+)(?:\/[a-z0-9]+)?/)
  return match ? match[1] : null
}

const getAssetUrl = (path?: string) => {
  if (!path) return ''
  const base = api.defaults.baseURL ? api.defaults.baseURL.replace(/\/api\/?$/, '/storage') : '/storage'
  return `${base}${path.startsWith('/') ? path : '/' + path}`
}

const initPlayer = async () => {
  if (!source.value || !course.value) return
  const target = document.getElementById(`plyr-${course.value.id}`) as HTMLElement
  if (!target) return

  if (playerInstance.value) playerInstance.value.destroy()

  const options = {
    title: course.value.title,
    controls: ['play-large','restart','rewind','play','fast-forward','progress','current-time','duration','mute','volume','settings','pip','airplay','fullscreen'],
    settings: ['quality', 'speed'],
    quality: { default: 1, options: [1] },
    speed: { selected: 1, options: [0.5,0.75,1,1.25,1.5,2] },
    ratio: '16:9'
  }

  if (isHtml5.value && videoEl.value) {
    videoEl.value.addEventListener('loadedmetadata', () => {
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
  playerInstance.value.on('play', () => console.log('[CoursePlay] Playing'))
  playerInstance.value.on('pause', () => console.log('[CoursePlay] Paused'))
  playerInstance.value.on('error', (event: PlyrEvent) => {
    console.error('[CoursePlay] Plyr error', event)
    toast.error('Failed to load video. Please check the source.')
  })
}

const destroyPlayer = () => {
  if (playerInstance.value) {
    playerInstance.value.destroy()
    playerInstance.value = null
  }
}

const initializePlayer = async () => {
  if (!course.value) return
  source.value = course.value.video_path ? getAssetUrl(course.value.video_path) : course.value.video_url || ''

  if (!source.value) return

  if (source.value.includes('youtube.com') || source.value.includes('youtu.be')) {
    provider.value = 'youtube'
    if (!extractYouTubeId(source.value)) toast.error('Invalid YouTube URL.')
  } else if (source.value.includes('vimeo.com')) {
    provider.value = 'vimeo'
    if (!extractVimeoId(source.value)) toast.error('Invalid Vimeo URL.')
  }

  await nextTick()
  initPlayer()
}

onMounted(async () => {
  loadingStore.start()
  try {
    await userStore.fetchDashboard()
    await courseStore.fetchCourse(Number(route.params.id))
    course.value = courseStore.currentCourse
    if (!course.value) throw new Error('Course not found')

    await initializePlayer()

    const allCourses = await courseStore.fetchCourses()
    otherCourses.value = allCourses.filter(c => c.id !== Number(route.params.id) && c.is_active).slice(0, 6)
  } catch (error) {
    console.error(error)
    toast.error('Failed to load course. Please try again.')
    course.value = null
  } finally {
    loadingStore.stop()
  }
})

onUnmounted(() => destroyPlayer())
const toggleSidebar = () => { isSidebarCollapsed.value = !isSidebarCollapsed.value }
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from,
.slide-leave-to { transform: translateX(100%); }
.aspect-video { aspect-ratio: 16 / 9; }
</style>
