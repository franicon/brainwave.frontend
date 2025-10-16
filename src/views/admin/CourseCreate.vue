
<template>
  <div class="space-y-8 max-w-2xl mx-auto py-8">
    <!-- Header -->
    <div class="p-6 rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Create New Course</h1>
        <router-link
          to="/admin/courses"
          class="btn-3d btn-3d-border rounded-full px-6 py-3 text-white/80 hover:text-white"
        >
          Back to Courses
        </router-link>
      </div>
    </div>

    <!-- Create Form -->
    <div class="p-6 rounded-3xl bg-white/80 dark:bg-navy-800/80 backdrop-blur-md shadow-md">
      <form @submit.prevent="handleCreate" class="space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            v-model="form.description"
            required
            rows="4"
            class="w-full px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md"
          ></textarea>
        </div>

        <!-- Price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
          <input
            v-model.number="form.price"
            type="number"
            min="0"
            step="0.01"
            required
            class="w-full px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md"
          />
        </div>

        <!-- Video Toggle -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Video Source</label>
          <div class="flex space-x-2 mb-3">
            <button
              type="button"
              @click="setVideoSource('url')"
              :class="videoSource === 'url' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-navy-600 text-gray-700 dark:text-gray-300'"
              class="px-4 py-2 rounded-full font-medium transition"
            >
              Video URL
            </button>
            <button
              type="button"
              @click="setVideoSource('upload')"
              :class="videoSource === 'upload' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-navy-600 text-gray-700 dark:text-gray-300'"
              class="px-4 py-2 rounded-full font-medium transition"
            >
              Upload Video
            </button>
          </div>

          <!-- Video URL -->
          <div v-if="videoSource === 'url'">
            <input
              v-model="form.video_url"
              type="url"
              placeholder="Enter video URL"
              class="w-full px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md"
            />
          </div>

          <!-- Video Upload -->
          <div v-if="videoSource === 'upload'">
            <input
              type="file"
              accept="video/mp4,video/avi,video/mov,video/wmv"
              @change="handleVideoUpload"
              class="w-full px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            <p v-if="form.video_path" class="text-sm text-gray-500 mt-2 truncate">
              Selected: {{ form.video_path.name }}
            </p>
          </div>
        </div>

        <!-- Thumbnail -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thumbnail Image (optional)</label>
          <input
            ref="thumbnailInput"
            type="file"
            accept="image/*"
            @change="handleThumbnailChange"
            class="w-full px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
          <div v-if="form.thumbnailPreview" class="mt-2">
            <img :src="form.thumbnailPreview" alt="Preview" class="w-32 h-20 object-cover rounded-lg" />
          </div>
        </div>

        <!-- Active -->
        <div class="flex items-center">
          <input
            id="is_active"
            v-model="form.is_active"
            type="checkbox"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-navy-600 rounded"
          />
          <label for="is_active" class="ml-2 block text-sm text-gray-900 dark:text-white">Is Active</label>
        </div>

        <!-- Errors -->
        <div v-if="errors.length > 0" class="space-y-1">
          <p v-for="error in errors" :key="error" class="text-red-600 text-sm">{{ error }}</p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-3 pt-4">
          <router-link
            to="/admin/courses"
            class="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-navy-600 hover:bg-gray-300 dark:hover:bg-navy-500 rounded-2xl transition"
          >
            Cancel
          </router-link>
          <button type="submit" :disabled="loading" class="btn-3d btn-3d-border rounded-full px-6 py-3">
            {{ loading ? 'Creating...' : 'Create Course' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useAdminCoursesStore } from '@/stores/adminCourses'

const adminCoursesStore = useAdminCoursesStore()
const toast = useToast()
const router = useRouter()

const loading = ref(false)
const errors = ref<string[]>([])
const thumbnailInput = ref<HTMLInputElement | null>(null)
let previewUrl = ref<string | null>(null)
const videoSource = ref<'url' | 'upload'>('url')

const form = reactive({
  title: '',
  description: '',
  price: 0,
  video_url: '',
  video_path: null as File | null,
  thumbnail: null as File | null,
  thumbnailPreview: '',
  is_active: true
})

const setVideoSource = (source: 'url' | 'upload') => {
  videoSource.value = source
  if (source === 'url') {
    form.video_path = null
  } else {
    form.video_url = ''
  }
}

const handleThumbnailChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = URL.createObjectURL(file)
    form.thumbnail = file
    form.thumbnailPreview = previewUrl.value
  }
}

const handleVideoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.video_path = target.files[0]
    form.video_url = ''
  }
}

const handleCreate = async () => {
  // Client-side validation
  if (!form.title?.trim() || !form.description?.trim() || !form.price || form.price <= 0) {
    errors.value = ['Title, description, and a valid price are required']
    return
  }

  try {
    loading.value = true
    errors.value = []

    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('price', form.price.toString())
    formData.append('is_active', form.is_active ? '1' : '0')

    if (videoSource.value === 'url' && form.video_url?.trim()) {
      formData.append('video_url', form.video_url)
    }
    if (videoSource.value === 'upload' && form.video_path instanceof File) {
      formData.append('video_path', form.video_path)
    }
    if (form.thumbnail instanceof File) {
      formData.append('thumbnail', form.thumbnail)
    }

    await adminCoursesStore.createCourse(form)
    toast.success('Course created successfully')
    router.push('/admin/courses')
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to create course'
    errors.value = message.includes(';') ? message.split('; ').filter((m: string) => m) : [message]
    toast.error('Failed to create course')
  } finally {
    loading.value = false
  }
}

onUnmounted(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
})
</script>
