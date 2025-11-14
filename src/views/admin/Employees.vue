<template>
  <div class="space-y-8">
    <!-- Header Card -->
    <div class="card backdrop-blur">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-neutral-900 dark:text-white">Employees Management</h1>
        <span class="text-sm text-neutral-600 dark:text-neutral-400">
          Total: {{ adminEmployeesStore.totalEmployees }}
        </span>
      </div>
      <div class="flex justify-end">
        <button 
          v-if="authStore.isSuperAdmin" 
          @click="showModal = true; isEdit = false; resetForm()" 
          class="btn-3d"
        >
          Create New Employee
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
            placeholder="Search by name, email, or username..."
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
          :disabled="adminEmployeesStore.loading"
          class="btn-3d"
        >
          {{ adminEmployeesStore.loading ? 'Searching...' : 'Apply Filters' }}
        </button>
        <button @click="refreshEmployees" class="btn-3d">Refresh</button>
      </div>
    </div>

    <!-- Employees Table Card -->
    <div class="card backdrop-blur">
      <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">All Employees</h2>

      <div v-if="adminEmployeesStore.loading" class="flex justify-center items-center h-64">
        <p class="text-base text-neutral-600 dark:text-neutral-400">Loading employees...</p>
      </div>

      <div v-else-if="adminEmployeesStore.employees.length > 0" class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-neutral-50 dark:bg-neutral-800">
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Name</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Email</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Status</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white">Created</th>
              <th class="px-4 py-3 text-right text-sm font-semibold text-neutral-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
            <tr
              v-for="employee in adminEmployeesStore.employees"
              :key="employee.id"
              class="hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="font-medium text-neutral-900 dark:text-white">{{ employee.name }}</div>
                <div class="text-sm text-neutral-500 dark:text-neutral-400">{{ employee.username }}</div>
              </td>
              <td class="px-4 py-4 text-sm text-neutral-900 dark:text-white">
                {{ employee.email }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="employee.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'"
                >
                  {{ employee.status }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                {{ new Date(employee.created_at).toLocaleDateString() }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="editEmployee(employee)"
                    class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 px-3 py-1 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(employee.id)"
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
        No employees found{{ Object.values(filters).some(v => v && v !== 'all') ? ' matching filters' : '' }}.
      </div>

      <!-- Pagination -->
      <div v-if="adminEmployeesStore.lastPage > 1" class="flex justify-center items-center mt-6 space-x-2">
        <button
          @click="adminEmployeesStore.prevPage"
          :disabled="adminEmployeesStore.currentPage === 1 || adminEmployeesStore.loading"
          class="btn-secondary px-4 py-2"
        >
          Prev
        </button>
        <span class="px-3 py-1 text-sm font-medium text-neutral-900 dark:text-white">
          Page {{ adminEmployeesStore.currentPage }} of {{ adminEmployeesStore.lastPage }}
        </span>
        <button
          @click="adminEmployeesStore.nextPage"
          :disabled="adminEmployeesStore.currentPage === adminEmployeesStore.lastPage || adminEmployeesStore.loading"
          class="btn-secondary px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="showModal = false">
      <div class="card backdrop-blur max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{{ isEdit ? 'Edit Employee' : 'Create Employee' }}</h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Name</label>
            <input v-model="form.name" type="text" required class="input"/>
          </div>

          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Username</label>
            <input v-model="form.username" type="text" required class="input"/>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
            <input v-model="form.email" type="email" required class="input"/>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Phone</label>
            <input v-model="form.phone" type="tel" required class="input"/>
          </div>

          <!-- Age -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Age</label>
            <input v-model.number="form.age" type="number" min="18" required class="input"/>
          </div>

          <!-- Password -->
          <div class="relative">
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Password {{ !isEdit ? '*' : '(Optional)' }}
            </label>
            <input 
              v-model="form.password" 
              :type="showPassword ? 'text' : 'password'" 
              :required="!isEdit"
              :placeholder="isEdit ? 'Leave blank to keep current' : 'Required'"
              class="input pr-10"
            />
            <button 
              type="button" 
              @click="showPassword = !showPassword" 
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-400"
            >
              <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" class="w-4 h-4" />
            </button>
          </div>

          <!-- Permissions -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Permissions</label>
            <div class="space-y-2">
              <label v-for="perm in availablePermissions" :key="perm" class="flex items-center">
                <input 
                  type="checkbox" 
                  :value="perm" 
                  v-model="form.permissions" 
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-600 rounded mr-2"
                />
                <span class="text-sm text-neutral-900 dark:text-white capitalize">{{ perm }}</span>
              </label>
            </div>
          </div>

          <!-- Errors -->
          <div v-if="errors.length > 0" class="space-y-1">
            <p v-for="error in errors" :key="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showModal = false; resetForm()" class="btn-secondary">Cancel</button>
            <button type="submit" :disabled="loading" class="btn-3d">
              {{ loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Employee' : 'Create Employee') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="card backdrop-blur max-w-sm w-full">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-sm">Are you sure you want to delete this employee? This action cannot be undone.</p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="btn-secondary">Cancel</button>
          <button @click="handleDelete" class="btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useAdminEmployeesStore, type AdminEmployee } from '@/stores/adminEmployees';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const adminEmployeesStore = useAdminEmployeesStore();
const authStore = useAuthStore();
const toast = useToast();

interface EmployeeForm {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  age: number;
  password: string;
  permissions: string[];
}

interface EmployeeSubmitData {
  name: string;
  username: string;
  email: string;
  phone: string;
  age: number;
  permissions: string[];
  password?: string;
  password_confirmation?: string;
}

const availablePermissions = ['users', 'courses', 'plans', 'blogs', 'settings', 'employees'];

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
const form = ref<EmployeeForm>({
  id: 0,
  name: '',
  username: '',
  email: '',
  phone: '',
  age: 18,
  password: '',
  permissions: [],
});
const loading = ref(false);
const errors = ref<string[]>([]);
const showPassword = ref(false);
const showDeleteModal = ref(false);
const employeeToDelete = ref<number | null>(null);

const applyFilters = async () => {
  const params: any = {};
  if (searchQuery.value) params.search = searchQuery.value;
  if (filters.value.status !== 'all') params.status = filters.value.status;
  if (filters.value.dateFrom) params.date_from = filters.value.dateFrom;
  if (filters.value.dateTo) params.date_to = filters.value.dateTo;
  await adminEmployeesStore.fetchEmployees(1, params);
};

const resetFilters = () => {
  searchQuery.value = '';
  filters.value = { status: 'all', dateFrom: '', dateTo: '' };
  adminEmployeesStore.fetchEmployees(1);
};

const refreshEmployees = async () => {
  await adminEmployeesStore.fetchEmployees(adminEmployeesStore.currentPage);
};

const resetForm = () => {
  form.value = {
    id: 0,
    name: '',
    username: '',
    email: '',
    phone: '',
    age: 18,
    password: '',
    permissions: [],
  };
  showPassword.value = false;
  errors.value = [];
};

const editEmployee = (employee: AdminEmployee) => {
  form.value = {
    id: employee.id,
    name: employee.name,
    username: employee.username,
    email: employee.email,
    phone: employee.phone || '',
    age: employee.age || 18,
    password: '',
    permissions: employee.permissions,
  };
  errors.value = [];
  isEdit.value = true;
  showModal.value = true;
  nextTick(() => {
    const nameInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (nameInput) nameInput.focus();
  });
};

const handleSubmit = async () => {
  if (!form.value.name || !form.value.username || !form.value.email || !form.value.phone || !form.value.age || form.value.permissions.length === 0) {
    errors.value = ['All fields except password (for edit) and permissions are required'];
    return;
  }
  if (!isEdit && (!form.value.password || form.value.password.length < 8)) {
    errors.value = ['Password is required and must be at least 8 characters'];
    return;
  }

  try {
    loading.value = true;
    errors.value = [];
    const submitData: EmployeeSubmitData = {
      name: form.value.name,
      username: form.value.username,
      email: form.value.email,
      phone: form.value.phone,
      age: form.value.age,
      permissions: form.value.permissions,
    };
    if (form.value.password) {
      submitData.password = form.value.password;
      if (isEdit) {
        submitData.password_confirmation = form.value.password; 
      }
    }

    if (isEdit.value) {
      await adminEmployeesStore.updateEmployee(form.value.id, submitData);
      toast.success('Employee updated successfully');
    } else {
      await adminEmployeesStore.createEmployee(submitData as any);
      toast.success('Employee created successfully');
    }

    showModal.value = false;
    resetForm();
    await refreshEmployees();
  } catch (error: any) {
    const message = error.response?.data?.message || 'Operation failed';
    errors.value = Array.isArray(message) ? message : [message];
    toast.error(`Failed to ${isEdit.value ? 'update' : 'create'} employee`);
  } finally {
    loading.value = false;
  }
};

const confirmDelete = (id: number) => {
  employeeToDelete.value = id;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  if (!employeeToDelete.value) return;
  try {
    await adminEmployeesStore.deleteEmployee(employeeToDelete.value);
    toast.success('Employee deleted successfully');
    showDeleteModal.value = false;
  } catch {
    toast.error('Failed to delete employee');
  }
};

onMounted(async () => {
  await authStore.checkAuthStatus();
  await adminEmployeesStore.fetchEmployees();
});
</script>