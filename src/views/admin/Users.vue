<template>
  <div class="space-y-8">
    <!-- Header Card -->
    <div class="card backdrop-blur">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-neutral-900 dark:text-white">Users Management</h1>
        <span class="text-sm text-neutral-600 dark:text-neutral-400">Total: {{ allUsersStore.totalUsers }} ({{ adminStore.totalUsers }})</span>
      </div>
    </div>

    <!-- Advanced Search & Filters Card -->
    <div class="card backdrop-blur">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Advanced Search</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <!-- Search -->
        <div class="md:col-span-1">
          <input
            v-model="searchQuery"
            @input="debouncedSearch"
            type="text"
            placeholder="Search by name, email, or username..."
            class="input"
          />
        </div>

        <!-- Status Filter -->
        <div class="md:col-span-1">
          <select
            v-model="filters.status"
            @change="applyFilters"
            class="input"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <!-- Role Filter -->
        <div class="md:col-span-1">
          <select
            v-model="filters.role"
            @change="applyFilters"
            class="input"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <!-- Date Range -->
        <div class="md:col-span-1 grid grid-cols-2 gap-2">
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
        <button
          @click="resetFilters"
          class="btn-secondary"
        >
          Reset
        </button>
        <button
          @click="applyFilters"
          :disabled="allUsersStore.loading"
          class="btn-3d"
        >
          {{ allUsersStore.loading ? 'Searching...' : 'Apply Filters' }}
        </button>
        <button
          @click="refreshUsers"
          class="btn-3d"
        >
          Refresh
        </button>
      </div>
    </div>

    <!-- Users Table Card -->
    <div class="card backdrop-blur">
      <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">All Users</h2>

      <div v-if="allUsersStore.loading" class="flex justify-center items-center h-64">
        <p class="text-base text-neutral-600 dark:text-neutral-400">Loading users...</p>
      </div>

      <div v-else-if="allUsersStore.users.length > 0" class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-neutral-50 dark:bg-neutral-800">
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Name</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Email</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Status</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Role</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Created</th>
              <th class="px-4 py-3 text-right text-sm font-semibold text-neutral-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
            <tr
              v-for="user in allUsersStore.users"
              :key="user.id"
              class="hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="font-medium text-neutral-900 dark:text-white">{{ user.name }}</div>
                <div class="text-sm text-neutral-500 dark:text-neutral-400">{{ user.username }}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                {{ user.email }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="user.is_admin ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'"
                >
                  {{ user.is_admin ? 'Admin' : 'User' }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                {{ new Date(user.created_at).toLocaleDateString() }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="editUser(user)"
                    class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 px-3 py-1 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(user.id)"
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
        No users found{{ Object.values(filters).some(v => v && v !== 'all') ? ' matching filters' : '' }}.
      </div>

      <!-- Pagination -->
      <div v-if="allUsersStore.lastPage > 1" class="flex justify-center items-center mt-6 space-x-2">
        <button
          @click="allUsersStore.prevPage"
          :disabled="allUsersStore.currentPage === 1 || allUsersStore.loading"
          class="btn-secondary px-4 py-2"
        >
          Prev
        </button>
        <span class="px-3 py-1 text-sm font-medium text-neutral-900 dark:text-white">
          Page {{ allUsersStore.currentPage }} of {{ allUsersStore.lastPage }}
        </span>
        <button
          @click="allUsersStore.nextPage"
          :disabled="allUsersStore.currentPage === allUsersStore.lastPage || allUsersStore.loading"
          class="btn-secondary px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="showEditModal = false">
      <div class="card backdrop-blur max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Edit User</h3>
        <form @submit.prevent="handleEdit" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Name</label>
            <input v-model="editForm.name" type="text" required class="input"/>
          </div>

          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Username</label>
            <input v-model="editForm.username" type="text" required class="input"/>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
            <input v-model="editForm.email" type="email" required class="input"/>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Phone</label>
            <input v-model="editForm.phone" type="tel" class="input"/>
          </div>

          <!-- Age -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Age</label>
            <input v-model.number="editForm.age" type="number" min="18" class="input"/>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Status</label>
            <select v-model="editForm.status" required class="input">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <!-- Is Admin -->
          <div class="flex items-center">
            <input id="is_admin" v-model="editForm.is_admin" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-600 rounded"/>
            <label for="is_admin" class="ml-2 block text-sm text-neutral-900 dark:text-white">Is Admin</label>
          </div>

          <!-- Errors -->
          <div v-if="editErrors.length > 0" class="space-y-1">
            <p v-for="error in editErrors" :key="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showEditModal = false" class="btn-secondary">Cancel</button>
            <button type="submit" :disabled="editLoading" class="btn-3d">
              {{ editLoading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="card backdrop-blur max-w-sm w-full">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-sm">Are you sure you want to delete this user? This action cannot be undone.</p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="btn-secondary">Cancel</button>
          <button @click="handleDelete" class="btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, Ref } from 'vue';
import { AdminUser, useAllUsersStore } from '@/stores/allUsers';
import { useAdminStore } from '@/stores/admin';
import { useToast } from 'vue-toastification';

const allUsersStore = useAllUsersStore();
const adminStore = useAdminStore();
const toast = useToast();

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
  status: 'all' as 'all' | 'active' | 'inactive' | 'suspended',
  role: 'all' as 'all' | 'admin' | 'user',
  dateFrom: '',
  dateTo: '',
});

// Edit Modal
const showEditModal = ref(false);
const editForm: Ref<Partial<AdminUser> & { id: number }> = ref({
  id: 0,
  name: '',
  username: '',
  email: '',
  phone: '',
  age: 0,
  status: 'active',
  is_admin: false,
});
const editLoading = ref(false);
const editErrors = ref<string[]>([]);

// Delete Modal
const showDeleteModal = ref(false);
const userToDelete = ref<number | null>(null);

// Methods
const applyFilters = async () => {
  const params: any = {};
  if (searchQuery.value) params.search = searchQuery.value;
  if (filters.value.status !== 'all') params.status = filters.value.status;
  if (filters.value.role !== 'all') params.role = filters.value.role;
  if (filters.value.dateFrom) params.date_from = filters.value.dateFrom;
  if (filters.value.dateTo) params.date_to = filters.value.dateTo;
  
  await allUsersStore.fetchUsers(1, params);
};

const resetFilters = () => {
  searchQuery.value = '';
  filters.value = { status: 'all', role: 'all', dateFrom: '', dateTo: '' };
  allUsersStore.fetchUsers(1);
};

const refreshUsers = async () => {
  await allUsersStore.fetchUsers(allUsersStore.currentPage);
};

const editUser = (user: AdminUser) => {
  editForm.value = { ...user, age: user.age || 0 };
  editErrors.value = [];
  showEditModal.value = true;
  nextTick(() => {
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    if (nameInput) nameInput.focus();
  });
};

const handleEdit = async () => {
  if (!editForm.value.name || !editForm.value.email) {
    editErrors.value = ['Name and email are required'];
    return;
  }

  try {
    editLoading.value = true;
    editErrors.value = [];
    await allUsersStore.updateUser(editForm.value.id, editForm.value);
    toast.success('User updated successfully');
    showEditModal.value = false;
    await refreshUsers();
  } catch (error: any) {
    const message = error.response?.data?.message || 'Update failed';
    editErrors.value = Array.isArray(message) ? message : [message];
    toast.error('Failed to update user');
  } finally {
    editLoading.value = false;
  }
};

const confirmDelete = (id: number) => {
  userToDelete.value = id;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  if (!userToDelete.value) return;
  try {
    await allUsersStore.deleteUser(userToDelete.value);
    toast.success('User deleted successfully');
    showDeleteModal.value = false;
  } catch (error) {
    toast.error('Failed to delete user');
  }
};

// onMounted
onMounted(async () => {
  await adminStore.fetchDashboard();
  await allUsersStore.fetchUsers();
});
</script>