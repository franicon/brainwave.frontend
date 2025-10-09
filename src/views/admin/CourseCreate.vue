<!-- src/views/admin/CourseCreate.vue -->
<template>
  <AdminLayout>
    <div class="max-w-2xl mx-auto py-8 px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white font-heading">Create New Course</h1>
        <router-link to="/admin/courses" class="btn-secondary flex items-center">
          <font-awesome-icon icon="arrow-left" class="mr-2" /> Back to Courses
        </router-link>
      </div>
      <form @submit.prevent="createCourse" class="card space-y-6" enctype="multipart/form-data">
        <div>
          <input v-model="form.title" type="text" placeholder="Course Title" required class="input-field" />
        </div>
        <div>
          <textarea v-model="form.description" placeholder="Course Description" required rows="4" class="input-field resize-none"></textarea>
        </div>
        <div>
          <input v-model="form.price" type="number" placeholder="Price (PKR)" min="0" step="0.01" required class="input-field" />
        </div>
        <div>
          <input v-model="form.video_url" type="url" placeholder="External Video URL (YouTube, Vimeo, AWS S3, etc.)" class="input-field" />
        </div>
        <div>
          <input type="file" @change="handleVideoUpload" accept="video/*" class="input-field" />
          <p v-if="form.video_path" class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Uploaded: {{ form.video_path.split('/').pop() }}</p>
        </div>
        <div>
          <input type="file" @change="handleThumbnailUpload" accept="image/*" class="input-field" />
          <p v-if="form.thumbnail" class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Uploaded: {{ form.thumbnail.split('/').pop() }}</p>
        </div>
        <div class="flex space-x-4">
          <button type="submit" :disabled="loading" class="btn-primary px-6 py-3 disabled:opacity-50">
            <font-awesome-icon icon="plus" class="mr-2" /> Create Course
          </button>
          <button type="button" @click="resetForm" class="btn-secondary px-6 py-3">Reset</button>
        </div>
      </form>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AdminLayout from '@/layouts/AdminLayout.vue';
import api from '@/services/api';

const router = useRouter();
const authStore = useAuthStore();
const form = ref({
  title: '',
  description: '',
  price: 0,
  video_url: '',
  video_path: '',
  thumbnail: '',
  is_active: true,
});
const loading = ref<boolean>(false);

const handleVideoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    // For preview or direct upload, but since FormData in submit, just set for display
    // Actual upload happens in submit
  }
};

const handleThumbnailUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    // Similar
  }
};

const createCourse = async () => {
  if (!authStore.isAdmin) {
    router.push('/admin/dashboard');
    return;
  }
  try {
    loading.value = true;
    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('description', form.value.description);
    formData.append('price', form.value.price.toString());
    if (form.value.video_url) formData.append('video_url', form.value.video_url);
    if (form.value.video_path) formData.append('video_path', form.value.video_path); 
    
    const videoFileInput = document.querySelector('input[type="file"][accept="video/*"]') as HTMLInputElement;
    const thumbnailFileInput = document.querySelector('input[type="file"][accept="image/*"]') as HTMLInputElement;
    if (videoFileInput?.files?.[0]) {
      formData.append('video', videoFileInput.files[0]);
    }
    if (thumbnailFileInput?.files?.[0]) {
      formData.append('thumbnail', thumbnailFileInput.files[0]);
    }
    formData.append('is_active', form.value.is_active.toString());

    await api.post('/courses', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    router.push('/admin/courses');
    resetForm();
  } catch (error: any) {
    console.error('Course creation failed:', error);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.value = { title: '', description: '', price: 0, video_url: '', video_path: '', thumbnail: '', is_active: true };
  // Reset file inputs
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(input => (input as HTMLInputElement).value = '');
};
</script>