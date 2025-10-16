<template>
  <div class="space-y-8 max-w-7xl mx-auto py-8">
    <!-- Header Card -->
    <div class="p-6 rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold opacity-90">Courses Management</h1>
        <span class="text-sm opacity-80">Total: {{ adminCoursesStore.totalCourses }} ({{ adminStore.totalCourses }})</span>
      </div>
      <div class="flex justify-end">
        <button @click="showModal = true; isEdit = false; resetForm()" class="btn-3d btn-3d-border rounded-full px-6 py-3">
          Create New Course
        </button>
      </div>
    </div>

    <!-- Advanced Search & Filters Card -->
    <div class="p-6 rounded-3xl bg-white/80 dark:bg-navy-800/80 backdrop-blur-md shadow-md">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Advanced Search</h3>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <!-- Search -->
        <div class="md:col-span-1">
          <input
            v-model="searchQuery"
            @input="debouncedSearch"
            type="text"
            placeholder="Search by title or description..."
            class="w-full px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md"
          />
        </div>

        <!-- Status Filter -->
        <div class="md:col-span-1">
          <select
            v-model="filters.status"
            @change="applyFilters"
            class="w-full px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <!-- Price Range -->
        <div class="md:col-span-2 grid grid-cols-2 gap-2">
          <input
            v-model.number="filters.minPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Min Price"
            @change="applyFilters"
            class="px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md"
          />
          <input
            v-model.number="filters.maxPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Max Price"
            @change="applyFilters"
            class="px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md"
          />
        </div>

        <!-- Date Range -->
        <div class="md:col-span-1 grid grid-cols-2 gap-2">
          <input
            v-model="filters.dateFrom"
            type="date"
            @change="applyFilters"
            class="px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md"
          />
          <input
            v-model="filters.dateTo"
            type="date"
            @change="applyFilters"
            class="px-4 py-3 text-lg border border-gray-300 dark:border-navy-600 rounded-2xl bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-md"
          />
        </div>
      </div>

      <!-- Apply/Reset Buttons -->
      <div class="flex justify-end mt-4 space-x-3">
        <button
          @click="resetFilters"
          class="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-navy-600 hover:bg-gray-300 dark:hover:bg-navy-500 rounded-2xl transition"
        >
          Reset
        </button>
        <button
          @click="applyFilters"
          :disabled="adminCoursesStore.loading"
          class="btn-3d btn-3d-border rounded-full px-6 py-3"
        >
          {{ adminCoursesStore.loading ? 'Searching...' : 'Apply Filters' }}
        </button>
        <button
          @click="refreshCourses"
          class="btn-3d btn-3d-border rounded-full px-6 py-3"
        >
          Refresh
        </button>
      </div>
    </div>

    <!-- Courses Table Card -->
    <div class="p-6 rounded-3xl bg-white/80 dark:bg-navy-800/80 backdrop-blur-md shadow-md">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Courses</h2>

      <div v-if="adminCoursesStore.loading" class="flex justify-center items-center h-64">
        <p class="text-lg text-gray-600">Loading courses...</p>
      </div>

      <div v-else-if="adminCoursesStore.courses.length > 0" class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-50 dark:bg-navy-700">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Title</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Price</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Created</th>
              <th class="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-navy-600">
            <tr
              v-for="course in adminCoursesStore.courses"
              :key="course.id"
              class="hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors"
            >
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900 dark:text-white">{{ course.title }}</div>
                <div v-if="course.thumbnail" class="mt-1">
                  <img :src="course.thumbnail" alt="Thumbnail" class="w-12 h-8 object-cover rounded" />
                </div>
              </td>
              <td class="px-4 py-4 text-sm text-gray-900 dark:text-white max-w-xs truncate">
                {{ course.description }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${{ course.price.toFixed(2) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="course.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'"
                >
                  {{ course.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ new Date(course.created_at).toLocaleDateString() }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="editCourse(course)"
                    class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 px-3 py-1 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(course.id)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-center py-6 text-gray-600 dark:text-gray-400">
        No courses found{{ Object.values(filters).some(v => v && v !== 'all') ? ' matching filters' : '' }}.
      </div>

      <!-- Pagination -->
      <div v-if="adminCoursesStore.lastPage > 1" class="flex justify-center items-center mt-6 space-x-2">
        <button
          @click="adminCoursesStore.prevPage"
          :disabled="adminCoursesStore.currentPage === 1 || adminCoursesStore.loading"
          class="px-3 py-1 rounded-full bg-gray-200 dark:bg-navy-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span class="px-3 py-1 font-medium">
          Page {{ adminCoursesStore.currentPage }} of {{ adminCoursesStore.lastPage }}
        </span>
        <button
          @click="adminCoursesStore.nextPage"
          :disabled="adminCoursesStore.currentPage === adminCoursesStore.lastPage || adminCoursesStore.loading"
          class="px-3 py-1 rounded-full bg-gray-200 dark:bg-navy-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="showModal = false">
      <div class="bg-white dark:bg-navy-800 rounded-3xl p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto" @click.stop>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ isEdit ? 'Edit Course' : 'Create Course' }}</h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input v-model="form.title" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400"/>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea v-model="form.description" required rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400"></textarea>
          </div>

          <!-- Price -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
            <input v-model.number="form.price" type="number" min="0" step="0.01" required class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400"/>
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
                class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>

            <!-- Video Upload -->
            <div v-if="videoSource === 'upload'">
              <p v-if="currentVideoPath && !form.video_path" class="text-sm text-gray-500 mt-2 truncate">Current: {{ currentVideoPath }}</p>
              <input
                type="file"
                accept="video/*"
                @change="handleVideoChange"
                class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              <p v-if="form.video_path" class="text-sm text-gray-500 mt-2 truncate">Selected: {{ (form.video_path as File).name }}</p>
            </div>
          </div>

          <!-- Thumbnail -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thumbnail</label>
            <input ref="thumbnailInput" type="file" accept="image/*" @change="handleThumbnailChange" class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"/>
            <div v-if="form.thumbnailPreview" class="mt-2">
              <img :src="form.thumbnailPreview" alt="Preview" class="w-32 h-20 object-cover rounded-lg" />
            </div>
          </div>

          <!-- Is Active -->
          <div class="flex items-center">
            <input id="is_active" v-model="form.is_active" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-navy-600 rounded"/>
            <label for="is_active" class="ml-2 block text-sm text-gray-900 dark:text-white">Is Active</label>
          </div>

          <!-- Errors -->
          <div v-if="errors.length > 0" class="space-y-1">
            <p v-for="error in errors" :key="error" class="text-red-600 text-sm">{{ error }}</p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showModal = false; resetForm()" class="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg transition">Cancel</button>
            <button type="submit" :disabled="loading" class="btn-3d btn-3d-border rounded-full px-6 py-2">
              {{ loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Course' : 'Create Course') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-navy-800 rounded-3xl p-6 max-w-sm w-full shadow-xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Are you sure you want to delete this course? This action cannot be undone.</p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
          <button @click="handleDelete" class="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { AdminCourse, useAdminCoursesStore } from '@/stores/adminCourses';
import { useAdminStore } from '@/stores/admin';
import { useToast } from 'vue-toastification';

const adminCoursesStore = useAdminCoursesStore();
const adminStore = useAdminStore();
const toast = useToast();

interface CourseForm {
  id: number;
  title: string;
  description: string;
  price: number;
  video_url: string;
  video_path: File | null;
  thumbnail: File | null;
  thumbnailPreview: string;
  is_active: boolean;
}

// Search
const searchQuery = ref('');
const debouncedSearch = (function() {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => applyFilters(), 300);
  };
})();

// Filters
const filters = ref({
  status: 'all' as 'all' | 'active' | 'inactive',
  minPrice: null as number | null,
  maxPrice: null as number | null,
  dateFrom: '',
  dateTo: '',
});

// Modals
const showModal = ref(false);
const isEdit = ref(false);
const form = ref<CourseForm>({
  id: 0,
  title: '',
  description: '',
  price: 0,
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

// Methods
const applyFilters = async () => {
  const params: any = {};
  if (searchQuery.value) params.search = searchQuery.value;
  if (filters.value.status !== 'all') params.status = filters.value.status;
  if (filters.value.minPrice !== null) params.min_price = filters.value.minPrice;
  if (filters.value.maxPrice !== null) params.max_price = filters.value.maxPrice;
  if (filters.value.dateFrom) params.date_from = filters.value.dateFrom;
  if (filters.value.dateTo) params.date_to = filters.value.dateTo;
  
  await adminCoursesStore.fetchCourses(1, params);
};

const resetFilters = () => {
  searchQuery.value = '';
  filters.value = { status: 'all', minPrice: null, maxPrice: null, dateFrom: '', dateTo: '' };
  adminCoursesStore.fetchCourses(1);
};

const refreshCourses = async () => {
  await adminCoursesStore.fetchCourses(adminCoursesStore.currentPage);
};

const resetForm = () => {
  form.value = {
    id: 0,
    title: '',
    description: '',
    price: 0,
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
  if (source === 'url') {
    form.value.video_path = null;
  } else {
    form.value.video_url = '';
  }
};

const editCourse = (course: AdminCourse) => {
  form.value = { 
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price,
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
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value);
    }
    previewUrl.value = URL.createObjectURL(file);
    form.value.thumbnail = file;
    form.value.thumbnailPreview = previewUrl.value;
  }
};

const handleVideoChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    form.value.video_path = target.files[0];
  }
};

const handleSubmit = async () => {
  if (!form.value.title || !form.value.description || form.value.price <= 0) {
    errors.value = ['Title, description, and a valid price are required'];
    return;
  }

  try {
    loading.value = true;
    errors.value = [];
    const submitData: any = { 
      title: form.value.title,
      description: form.value.description,
      price: form.value.price,
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

    if (form.value.thumbnail instanceof File) {
      submitData.thumbnail = form.value.thumbnail;
    }

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
  } catch (error) {
    toast.error('Failed to delete course');
  }
};

onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});

// onMounted
onMounted(async () => {
  await adminStore.fetchDashboard();
  await adminCoursesStore.fetchCourses();
});
</script>