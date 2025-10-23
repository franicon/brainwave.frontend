<template>
  <div class="space-y-8">
    <!-- Header Card -->
    <div class="card backdrop-blur">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-neutral-900 dark:text-white">Blogs Management</h1>
        <span class="text-sm text-neutral-600 dark:text-neutral-400">
          Total: {{ adminBlogsStore.totalBlogs }}
        </span>
      </div>
      <div class="flex justify-end">
        <button @click="openModal" class="btn-3d">
        Create New Blog
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
            placeholder="Search by title or body..."
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
          :disabled="adminBlogsStore.loading"
          class="btn-3d"
        >
          {{ adminBlogsStore.loading ? 'Searching...' : 'Apply Filters' }}
        </button>
        <button @click="refreshBlogs" class="btn-3d">Refresh</button>
      </div>
    </div>

    <!-- Blogs Table Card -->
    <div class="card backdrop-blur">
      <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">All Blogs</h2>

      <div v-if="adminBlogsStore.loading" class="flex justify-center items-center h-64">
        <p class="text-base text-neutral-600 dark:text-neutral-400">Loading blogs...</p>
      </div>

      <div v-else-if="adminBlogsStore.blogs.length > 0" class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-neutral-50 dark:bg-neutral-800">
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Title</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Body</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Status</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Created</th>
              <th class="px-4 py-3 text-right text-sm font-semibold text-neutral-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
            <tr
              v-for="blog in adminBlogsStore.blogs"
              :key="blog.id"
              class="hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="font-medium text-neutral-900 dark:text-white">{{ blog.title }}</div>
                <div v-if="blog.image" class="mt-1">
                  <img :src="blog.image" alt="Image" class="w-12 h-8 object-cover rounded-md" />
                </div>
              </td>
              <td class="px-4 py-4 text-sm text-neutral-900 dark:text-white max-w-xs truncate">
                {{ stripHtml(blog.body).substring(0, 100) }}...
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="blog.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'"
                >
                  {{ blog.status.charAt(0).toUpperCase() + blog.status.slice(1) }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                {{ new Date(blog.created_at).toLocaleDateString() }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="editBlog(blog)"
                    class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 px-3 py-1 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(blog.id)"
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
        No blogs found{{ Object.values(filters).some(v => v && v !== 'all') ? ' matching filters' : '' }}.
      </div>

      <!-- Pagination -->
      <div v-if="adminBlogsStore.lastPage > 1" class="flex justify-center items-center mt-6 space-x-2">
        <button
          @click="adminBlogsStore.prevPage"
          :disabled="adminBlogsStore.currentPage === 1 || adminBlogsStore.loading"
          class="btn-secondary px-4 py-2"
        >
          Prev
        </button>
        <span class="px-3 py-1 text-sm font-medium text-neutral-900 dark:text-white">
          Page {{ adminBlogsStore.currentPage }} of {{ adminBlogsStore.lastPage }}
        </span>
        <button
          @click="adminBlogsStore.nextPage"
          :disabled="adminBlogsStore.currentPage === adminBlogsStore.lastPage || adminBlogsStore.loading"
          class="btn-secondary px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="showModal = false">
      <div class="card backdrop-blur max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{{ isEdit ? 'Edit Blog' : 'Create Blog' }}</h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Title</label>
            <input v-model="form.title" type="text" required class="input"/>
          </div>

          <!-- Body (Rich Editor) -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Body</label>
            <QuillEditor
                v-model:content="form.body"
                contentType="html"
                theme="snow"
                :readOnly="false"
                class="quill-editor"
                />

          </div>

          <!-- Image -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Image</label>
            <input
              ref="imageInput"
              type="file"
              accept="image/*"
              @change="handleImageChange"
              class="input file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            <div v-if="form.imagePreview" class="mt-2">
              <img :src="form.imagePreview" alt="Preview" class="w-32 h-20 object-cover rounded-md" />
            </div>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Status</label>
            <select v-model="form.status" required class="input">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Errors -->
          <div v-if="errors.length > 0" class="space-y-1">
            <p v-for="error in errors" :key="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showModal = false; resetForm()" class="btn-secondary">Cancel</button>
            <button type="submit" :disabled="loading" class="btn-3d">
              {{ loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Blog' : 'Create Blog') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="card backdrop-blur max-w-sm w-full">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-sm">Are you sure you want to delete this blog? This action cannot be undone.</p>
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
import { QuillEditor } from '@vueup/vue-quill';
import { AdminBlog, useAdminBlogsStore } from '@/stores/adminBlogs';
import { useToast } from 'vue-toastification';

const adminBlogsStore = useAdminBlogsStore();
const toast = useToast();

interface BlogForm {
  id: number;
  title: string;
  body: string;
  image: File | null;
  imagePreview: string;
  status: 'active' | 'inactive';
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
const form = ref<BlogForm>({
  id: 0,
  title: '',
  body: '',
  image: null,
  imagePreview: '',
  status: 'active',
});
const loading = ref(false);
const errors = ref<string[]>([]);
const imageInput = ref<HTMLInputElement | null>(null);
const showDeleteModal = ref(false);
const blogToDelete = ref<number | null>(null);
let previewUrl = ref<string | null>(null);

const applyFilters = async () => {
  const params: any = {};
  if (searchQuery.value) params.search = searchQuery.value;
  if (filters.value.status !== 'all') params.status = filters.value.status;
  if (filters.value.dateFrom) params.date_from = filters.value.dateFrom;
  if (filters.value.dateTo) params.date_to = filters.value.dateTo;
  await adminBlogsStore.fetchBlogs(1, params);
};

const resetFilters = () => {
  searchQuery.value = '';
  filters.value = { status: 'all', dateFrom: '', dateTo: '' };
  adminBlogsStore.fetchBlogs(1);
};

const refreshBlogs = async () => {
  await adminBlogsStore.fetchBlogs(adminBlogsStore.currentPage);
};

const resetForm = () => {
  form.value = {
    id: 0,
    title: '',
    body: '',
    image: null,
    imagePreview: '',
    status: 'active',
  };
  if (imageInput.value) imageInput.value.value = '';
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
};

const openModal = async () => {
  showModal.value = true
  isEdit.value = false
  resetForm()
  await nextTick()
  // Ensure Quill re-renders properly inside modal
  const quillContainer = document.querySelector('.quill-editor .ql-editor') as HTMLElement
  if (quillContainer) {
    quillContainer.focus()
  }
}


const editBlog = (blog: AdminBlog) => {
  form.value = {
    id: blog.id,
    title: blog.title,
    body: blog.body,
    image: null,
    imagePreview: blog.image || '',
    status: blog.status,
  };
  errors.value = [];
  isEdit.value = true;
  showModal.value = true;
  nextTick(() => {
    const titleInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (titleInput) titleInput.focus();
  });
};

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = URL.createObjectURL(file);
    form.value.image = file;
    form.value.imagePreview = previewUrl.value;
  }
};

const handleSubmit = async () => {
  if (!form.value.title || !form.value.body) {
    errors.value = ['Title and body are required'];
    return;
  }

  try {
    loading.value = true;
    errors.value = [];
    const submitData: any = {
      title: form.value.title,
      body: form.value.body,
      status: form.value.status,
    };

    if (form.value.image instanceof File) submitData.image = form.value.image;

    if (isEdit.value) {
      await adminBlogsStore.updateBlog(form.value.id, submitData);
      toast.success('Blog updated successfully');
    } else {
      await adminBlogsStore.createBlog(submitData);
      toast.success('Blog created successfully');
    }

    showModal.value = false;
    resetForm();
    await refreshBlogs();
  } catch (error: any) {
    const message = error.response?.data?.message || 'Operation failed';
    errors.value = Array.isArray(message) ? message : [message];
    toast.error(`Failed to ${isEdit.value ? 'update' : 'create'} blog`);
  } finally {
    loading.value = false;
  }
};

const confirmDelete = (id: number) => {
  blogToDelete.value = id;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  if (!blogToDelete.value) return;
  try {
    await adminBlogsStore.deleteBlog(blogToDelete.value);
    toast.success('Blog deleted successfully');
    showDeleteModal.value = false;
  } catch {
    toast.error('Failed to delete blog');
  }
};

const stripHtml = (text: string) => {
  return text.replace(/<[^>]*>/g, '');
};

onUnmounted(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
});

onMounted(async () => {
  await adminBlogsStore.fetchBlogs();
});
</script>