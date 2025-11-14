<!-- src\views\admin\Courses.vue -->
<template>
  <div class="space-y-8">
    <!-- Header Card -->
    <div class="card backdrop-blur">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-neutral-900 dark:text-white">Courses Management</h1>
        <span class="text-sm text-neutral-600 dark:text-neutral-400">
          Total: {{ adminCoursesStore.totalCourses }} ({{ adminStore.totalCourses }})
        </span>
      </div>
      <div class="flex justify-end">
        <button @click="showModal = true; isEdit = false; resetForm()" class="btn-3d">
          Create New Course
        </button>
      </div>
    </div>

    <!-- Advanced Search & Filters Card -->
    <div class="card backdrop-blur">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Advanced Search</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <!-- Search -->
        <div>
          <input
            v-model="searchQuery"
            @input="debouncedSearch"
            type="text"
            placeholder="Search by title or description..."
            class="input"
          />
        </div>

        <!-- Status Filter -->
        <div>
          <select v-model="filters.status" @change="applyFilters" class="input">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <!-- Date Range -->
        <div class="grid grid-cols-2 gap-2 md:col-span-2">
          <input
            v-model="filters.dateFrom"
            type="date"
            @change="applyFilters"
            class="input"
          />
          <input
            v-model="filters.dateTo"
            type="date"
            @change="applyFilters"
            class="input"
          />
        </div>
      </div>

      <!-- Apply/Reset Buttons -->
      <div class="flex justify-end mt-4 space-x-3">
        <button @click="resetFilters" class="btn-secondary">Reset</button>
        <button
          @click="applyFilters"
          :disabled="adminCoursesStore.loading"
          class="btn-3d"
        >
          {{ adminCoursesStore.loading ? 'Searching...' : 'Apply Filters' }}
        </button>
        <button @click="refreshCourses" class="btn-3d">Refresh</button>
      </div>
    </div>

    <!-- Courses Table Card -->
    <div class="card backdrop-blur">
      <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">All Courses</h2>

      <div v-if="adminCoursesStore.loading" class="flex justify-center items-center h-64">
        <p class="text-base text-neutral-600 dark:text-neutral-400">Loading courses...</p>
      </div>

      <div v-else-if="adminCoursesStore.courses.length > 0" class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-neutral-50 dark:bg-neutral-800">
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Title</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Description</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Status</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Created</th>
              <th class="px-4 py-3 text-right text-sm font-semibold text-neutral-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
            <tr
              v-for="course in adminCoursesStore.courses"
              :key="course.id"
              class="hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="font-medium text-neutral-900 dark:text-white">{{ course.title }}</div>
                <div v-if="course.thumbnail" class="mt-1">
                  <img :src="course.thumbnail" alt="Thumbnail" class="w-12 h-8 object-cover rounded-md" />
                </div>
              </td>
              <td class="px-4 py-4 text-sm text-neutral-900 dark:text-white max-w-xs truncate">
                {{ course.description }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="course.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'"
                >
                  {{ course.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                {{ new Date(course.created_at).toLocaleDateString() }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="editCourse(course)"
                    class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 px-3 py-1 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(course.id)"
                    class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-center py-6 text-neutral-600 dark:text-neutral-400">
        No courses found{{ Object.values(filters).some(v => v && v !== 'all') ? ' matching filters' : '' }}.
      </div>

      <!-- Pagination -->
      <div v-if="adminCoursesStore.lastPage > 1" class="flex justify-center items-center mt-6 space-x-2">
        <button
          @click="adminCoursesStore.prevPage"
          :disabled="adminCoursesStore.currentPage === 1 || adminCoursesStore.loading"
          class="btn-secondary px-4 py-2"
        >
          Prev
        </button>
        <span class="px-3 py-1 text-sm font-medium text-neutral-900 dark:text-white">
          Page {{ adminCoursesStore.currentPage }} of {{ adminCoursesStore.lastPage }}
        </span>
        <button
          @click="adminCoursesStore.nextPage"
          :disabled="adminCoursesStore.currentPage === adminCoursesStore.lastPage || adminCoursesStore.loading"
          class="btn-secondary px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="showModal = false">
      <div class="card backdrop-blur max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{{ isEdit ? 'Edit Course' : 'Create Course' }}</h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Title</label>
            <input v-model="form.title" type="text" required class="input"/>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Description</label>
            <textarea v-model="form.description" required rows="3" class="input"></textarea>
          </div>

          <!-- Video Toggle -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Video Source</label>
            <div class="flex space-x-2 mb-3">
              <button type="button" @click="setVideoSource('url')" :class="videoSource === 'url' ? 'btn-primary' : 'btn-secondary'" class="px-4 py-2 text-sm">Video URL</button>
              <button type="button" @click="setVideoSource('upload')" :class="videoSource === 'upload' ? 'btn-primary' : 'btn-secondary'" class="px-4 py-2 text-sm">Upload Video</button>
            </div>

            <div v-if="videoSource === 'url'">
              <input v-model="form.video_url" type="url" placeholder="Enter video URL" class="input"/>
            </div>

            <div v-if="videoSource === 'upload'">
              <p v-if="currentVideoPath && !form.video_path" class="text-sm text-neutral-500 dark:text-neutral-400 mt-2 truncate">
                Current: {{ currentVideoPath }}
              </p>
              <input
                type="file"
                accept="video/*"
                @change="handleVideoChange"
                class="input file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              <p v-if="form.video_path" class="text-sm text-neutral-500 dark:text-neutral-400 mt-2 truncate">
                Selected: {{ (form.video_path as File).name }}
              </p>
            </div>
          </div>

         <!-- Thumbnail (Required) -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Thumbnail <span class="text-red-600">*</span>
            </label>
            <input
              ref="thumbnailInput"
              type="file"
              accept="image/*"
              @change="handleThumbnailChange"
              class="input file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            <div v-if="form.thumbnailPreview" class="mt-2">
              <img :src="form.thumbnailPreview" alt="Preview" class="w-32 h-20 object-cover rounded-md" />
            </div>
          </div>


          <!-- Is Active -->
          <div class="flex items-center">
            <input id="is_active" v-model="form.is_active" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-600 rounded"/>
            <label for="is_active" class="ml-2 block text-sm text-neutral-900 dark:text-white">Is Active</label>
          </div>

          <!-- Errors -->
          <div v-if="errors.length > 0" class="space-y-1">
            <p v-for="error in errors" :key="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showModal = false; resetForm()" class="btn-secondary">Cancel</button>
            <button type="submit" :disabled="loading" class="btn-3d">
              {{ loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Course' : 'Create Course') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="card backdrop-blur max-w-sm w-full">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-sm">Are you sure you want to delete this course? This action cannot be undone.</p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="btn-secondary">Cancel</button>
          <button @click="handleDelete" class="btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { AdminCourse, useAdminCoursesStore } from '@/stores/adminCourses';
import { useAdminStore } from '@/stores/admin';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const adminCoursesStore = useAdminCoursesStore();
const adminStore = useAdminStore();
const authStore = useAuthStore();
const toast = useToast();

interface CourseForm {
  id: number;
  title: string;
  description: string;
  video_url: string;
  video_path: File | null;
  thumbnail: File | null;
  thumbnailPreview: string;
  is_active: boolean;
}

const searchQuery = ref('');
const debouncedSearch = (() => {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => applyFilters(), 300);
  };
})();

const filters = ref({
  status: 'all' as 'all' | 'active' | 'inactive',
  dateFrom: '',
  dateTo: '',
});

const showModal = ref(false);
const isEdit = ref(false);
const form = ref<CourseForm>({
  id: 0,
  title: '',
  description: '',
  video_url: '',
  video_path: null,
  thumbnail: null,
  thumbnailPreview: '',
  is_active: true,
});
const loading = ref(false);
const errors = ref<string[]>([]);
const thumbnailInput = ref<HTMLInputElement | null>(null);
const showDeleteModal = ref(false);
const courseToDelete = ref<number | null>(null);
let previewUrl = ref<string | null>(null);
const videoSource = ref<'url' | 'upload'>('url');
const currentVideoPath = ref<string | null>(null);

const getParams = () => {
  const params: any = {};
  if (searchQuery.value) params.search = searchQuery.value;
  if (filters.value.status !== 'all') params.status = filters.value.status;
  if (filters.value.dateFrom) params.date_from = filters.value.dateFrom;
  if (filters.value.dateTo) params.date_to = filters.value.dateTo;
  if (authStore.isEmployee && authStore.user) {
    params.creator_id = authStore.user.id;
  }
  return params;
};

const applyFilters = async () => {
  const params = getParams();
  await adminCoursesStore.fetchCourses(1, params);
};

const resetFilters = async () => {
  searchQuery.value = '';
  filters.value = { status: 'all', dateFrom: '', dateTo: '' };
  const params = getParams();
  await adminCoursesStore.fetchCourses(1, params);
};

const refreshCourses = async () => {
  const params = getParams();
  await adminCoursesStore.fetchCourses(adminCoursesStore.currentPage, params);
};

const resetForm = () => {
  form.value = {
    id: 0,
    title: '',
    description: '',
    video_url: '',
    video_path: null,
    thumbnail: null,
    thumbnailPreview: '',
    is_active: true,
  };
  videoSource.value = 'url';
  currentVideoPath.value = null;
  if (thumbnailInput.value) thumbnailInput.value.value = '';
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
};

const setVideoSource = (source: 'url' | 'upload') => {
  videoSource.value = source;
  if (source === 'url') form.value.video_path = null;
  else form.value.video_url = '';
};

const editCourse = (course: AdminCourse) => {
  form.value = {
    id: course.id,
    title: course.title,
    description: course.description,
    video_url: course.video_url || '',
    video_path: null,
    thumbnail: null,
    thumbnailPreview: course.thumbnail || '',
    is_active: course.is_active,
  };
  currentVideoPath.value = course.video_path || null;
  videoSource.value = course.video_url ? 'url' : 'upload';
  errors.value = [];
  isEdit.value = true;
  showModal.value = true;
  nextTick(() => {
    const titleInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (titleInput) titleInput.focus();
  });
};

const handleThumbnailChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = URL.createObjectURL(file);
    form.value.thumbnail = file;
    form.value.thumbnailPreview = previewUrl.value;
  }
};

const handleVideoChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) form.value.video_path = target.files[0];
};

const handleSubmit = async () => {
  if (!form.value.title || !form.value.description) {
    errors.value = ['Title and description are required'];
    return;
  }

  try {
    loading.value = true;
    errors.value = [];
    const submitData: any = {
      title: form.value.title,
      description: form.value.description,
      is_active: form.value.is_active,
    };

    if (videoSource.value === 'url') {
      submitData.video_url = form.value.video_url || '';
      submitData.video_path = '';
    } else {
      if (form.value.video_path instanceof File) {
        submitData.video_path = form.value.video_path;
      }
      submitData.video_url = '';
    }

    if (form.value.thumbnail instanceof File) submitData.thumbnail = form.value.thumbnail;

    if (isEdit.value) {
      await adminCoursesStore.updateCourse(form.value.id, submitData);
      toast.success('Course updated successfully');
    } else {
      await adminCoursesStore.createCourse(submitData);
      toast.success('Course created successfully');
    }

    showModal.value = false;
    resetForm();
    await refreshCourses();
  } catch (error: any) {
    const message = error.response?.data?.message || 'Operation failed';
    errors.value = Array.isArray(message) ? message : [message];
    toast.error(`Failed to ${isEdit.value ? 'update' : 'create'} course`);
  } finally {
    loading.value = false;
  }
};

const confirmDelete = (id: number) => {
  courseToDelete.value = id;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  if (!courseToDelete.value) return;
  try {
    await adminCoursesStore.deleteCourse(courseToDelete.value);
    toast.success('Course deleted successfully');
    showDeleteModal.value = false;
  } catch {
    toast.error('Failed to delete course');
  }
  await refreshCourses();
};

onUnmounted(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
});

onMounted(async () => {
  await adminStore.fetchDashboard();
  const initialParams = authStore.isEmployee && authStore.user ? { creator_id: authStore.user.id } : {};
  await adminCoursesStore.fetchCourses(1, initialParams);
});
</script>