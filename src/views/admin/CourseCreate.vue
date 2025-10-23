<template>
  <div class="space-y-8 max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="card backdrop-blur">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-neutral-900 dark:text-white">Create New Course</h1>
        <router-link to="/admin/courses" class="btn-3d">Back to Courses</router-link>
      </div>
    </div>

    <!-- Create Form -->
    <div class="card backdrop-blur">
      <form @submit.prevent="handleCreate" class="space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Title</label>
          <input v-model="form.title" type="text" required class="input" />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Description</label>
          <textarea v-model="form.description" required rows="4" class="input"></textarea>
        </div>

        <!-- Price -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Price ($)</label>
          <input v-model.number="form.price" type="number" min="0" step="0.01" required class="input" />
        </div>

        <!-- Video Toggle -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Video Source</label>
          <div class="flex space-x-2 mb-3">
            <button
              type="button"
              @click="setVideoSource('url')"
              :class="videoSource === 'url' ? 'btn-primary' : 'btn-secondary'"
              class="px-4 py-2 text-sm"
            >
              Video URL
            </button>
            <button
              type="button"
              @click="setVideoSource('upload')"
              :class="videoSource === 'upload' ? 'btn-primary' : 'btn-secondary'"
              class="px-4 py-2 text-sm"
            >
              Upload Video
            </button>
          </div>

          <!-- Video URL -->
          <div v-if="videoSource === 'url'">
            <input v-model="form.video_url" type="url" placeholder="Enter video URL" class="input" />
          </div>

          <!-- Video Upload -->
          <div v-if="videoSource === 'upload'">
            <input
              type="file"
              accept="video/mp4,video/avi,video/mov,video/wmv"
              @change="handleVideoUpload"
              class="input file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            <p v-if="form.video_path" class="text-sm text-neutral-500 dark:text-neutral-400 mt-2 truncate">
              Selected: {{ form.video_path.name }}
            </p>
          </div>
        </div>

        <!-- Thumbnail (Required) -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Thumbnail Image <span class="text-red-600">*</span>
          </label>
          <input
            ref="thumbnailInput"
            type="file"
            accept="image/*"
            required
            @change="handleThumbnailChange"
            class="input file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
          <div v-if="form.thumbnailPreview" class="mt-2">
            <img :src="form.thumbnailPreview" alt="Preview" class="w-32 h-20 object-cover rounded-md" />
          </div>
        </div>

        <!-- Active -->
        <div class="flex items-center">
          <input
            id="is_active"
            v-model="form.is_active"
            type="checkbox"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-600 rounded"
          />
          <label for="is_active" class="ml-2 block text-sm text-neutral-900 dark:text-white">Is Active</label>
        </div>

        <!-- Errors -->
        <div v-if="errors.length > 0" class="space-y-1">
          <p v-for="error in errors" :key="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-3 pt-4">
          <router-link to="/admin/courses" class="btn-secondary">Cancel</router-link>
          <button type="submit" :disabled="loading" class="btn-3d">
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
  if (source === 'url') form.video_path = null
  else form.video_url = ''
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
  if (!form.title?.trim() || !form.description?.trim() || !form.price || form.price <= 0) {
    errors.value = ['Title, description, and a valid price are required']
    return
  }

  if (!form.thumbnail) {
    errors.value = ['Thumbnail is required']
    return
  }

  try {
    loading.value = true
    errors.value = []

    const submitData: any = {
      title: form.title,
      description: form.description,
      price: form.price,
      is_active: form.is_active
    }

    if (videoSource.value === 'url') {
      submitData.video_url = form.video_url || ''
      submitData.video_path = ''
    } else if (form.video_path instanceof File) {
      submitData.video_path = form.video_path
      submitData.video_url = ''
    }

    submitData.thumbnail = form.thumbnail

    await adminCoursesStore.createCourse(submitData)
    toast.success('Course created successfully')
    router.push('/admin/courses')
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to create course'
    errors.value = Array.isArray(message) ? message : [message]
    toast.error('Failed to create course')
  } finally {
    loading.value = false
  }
}

onUnmounted(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
})
</script>
