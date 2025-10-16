<!-- src/views/admin/Plans.vue -->
<template>
  <div class="space-y-8 max-w-7xl mx-auto py-8">
    <!-- Header Card -->
    <div class="p-6 rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold opacity-90">Plans Management</h1>
        <span class="text-sm opacity-80">Total: {{ adminPlansStore.totalPlans }} ({{ adminStore.totalPlans }})</span>
      </div>
      <div class="flex justify-end">
        <button @click="showModal = true; isEdit = false; form = { id: 0, name: '', price: 0, discounted_price: undefined, features: [], is_active: true }; featuresText = '';" class="btn-3d btn-3d-border rounded-full px-6 py-3">
          Create New Plan
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
            placeholder="Search by name..."
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
          :disabled="adminPlansStore.loading"
          class="btn-3d btn-3d-border rounded-full px-6 py-3"
        >
          {{ adminPlansStore.loading ? 'Searching...' : 'Apply Filters' }}
        </button>
        <button
          @click="refreshPlans"
          class="btn-3d btn-3d-border rounded-full px-6 py-3"
        >
          Refresh
        </button>
      </div>
    </div>

    <!-- Plans Table Card -->
    <div class="p-6 rounded-3xl bg-white/80 dark:bg-navy-800/80 backdrop-blur-md shadow-md">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Plans</h2>

      <div v-if="adminPlansStore.loading" class="flex justify-center items-center h-64">
        <p class="text-lg text-gray-600">Loading plans...</p>
      </div>

      <div v-else-if="adminPlansStore.plans.length > 0" class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-50 dark:bg-navy-700">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Price</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Discounted Price</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Features</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Created</th>
              <th class="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-navy-600">
            <tr
              v-for="plan in adminPlansStore.plans"
              :key="plan.id"
              class="hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors"
            >
              <td class="px-4 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {{ plan.name }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${{ plan.price.toFixed(2) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ plan.discounted_price ? `$${plan.discounted_price.toFixed(2)}` : 'N/A' }}
              </td>
              <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                <ul class="list-disc list-inside space-y-1">
                  <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
                </ul>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="plan.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'"
                >
                  {{ plan.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ new Date(plan.created_at).toLocaleDateString() }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="editPlan(plan)"
                    class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 px-3 py-1 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(plan.id)"
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
        No plans found{{ Object.values(filters).some(v => v && v !== 'all') ? ' matching filters' : '' }}.
      </div>

      <!-- Pagination -->
      <div v-if="adminPlansStore.lastPage > 1" class="flex justify-center items-center mt-6 space-x-2">
        <button
          @click="adminPlansStore.prevPage"
          :disabled="adminPlansStore.currentPage === 1 || adminPlansStore.loading"
          class="px-3 py-1 rounded-full bg-gray-200 dark:bg-navy-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span class="px-3 py-1 font-medium">
          Page {{ adminPlansStore.currentPage }} of {{ adminPlansStore.lastPage }}
        </span>
        <button
          @click="adminPlansStore.nextPage"
          :disabled="adminPlansStore.currentPage === adminPlansStore.lastPage || adminPlansStore.loading"
          class="px-3 py-1 rounded-full bg-gray-200 dark:bg-navy-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="showModal = false">
      <div class="bg-white dark:bg-navy-800 rounded-3xl p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto" @click.stop>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ isEdit ? 'Edit Plan' : 'Create Plan' }}</h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input v-model="form.name" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400"/>
          </div>

          <!-- Price -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
            <input v-model.number="form.price" type="number" min="0" step="0.01" required class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400"/>
          </div>

          <!-- Discounted Price -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discounted Price ($)</label>
            <input v-model.number="form.discounted_price" type="number" min="0" step="0.01" class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400"/>
          </div>

          <!-- Features -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Features (one per line)</label>
            <textarea
              v-model="featuresText"
              :placeholder="isEdit ? '' : 'e.g. Unlimited access\nPremium support'"
              rows="4"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
            ></textarea>
          </div>

          <!-- Is Active -->
          <div class="flex items-center">
            <input id="plan_active" v-model="form.is_active" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-navy-600 rounded"/>
            <label for="plan_active" class="ml-2 block text-sm text-gray-900 dark:text-white">Is Active</label>
          </div>

          <!-- Errors -->
          <div v-if="errors.length > 0" class="space-y-1">
            <p v-for="error in errors" :key="error" class="text-red-600 text-sm">{{ error }}</p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showModal = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg transition">Cancel</button>
            <button type="submit" :disabled="loading" class="btn-3d btn-3d-border rounded-full px-6 py-2">
              {{ loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Plan' : 'Create Plan') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-navy-800 rounded-3xl p-6 max-w-sm w-full shadow-xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Are you sure you want to permanently delete this plan? This action cannot be undone.</p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
          <button @click="handleDelete" class="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { AdminPlan, useAdminPlansStore } from '@/stores/adminPlans';
import { useAdminStore } from '@/stores/admin';
import { useToast } from 'vue-toastification';

const adminPlansStore = useAdminPlansStore();
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
  status: 'all' as 'all' | 'active' | 'inactive',
  minPrice: null as number | null,
  maxPrice: null as number | null,
  dateFrom: '',
  dateTo: '',
});

// Modals
const showModal = ref(false);
const isEdit = ref(false);
const form = ref<Partial<AdminPlan>>({
  id: 0,
  name: '',
  price: 0,
  discounted_price: undefined,
  features: [],
  is_active: true,
});
const featuresText = ref('');
const loading = ref(false);
const errors = ref<string[]>([]);
const showDeleteModal = ref(false);
const planToDelete = ref<number | null>(null);

// Watch featuresText to update form.features
watch(featuresText, (newVal) => {
  form.value.features = newVal ? newVal.split('\n').map(f => f.trim()).filter(f => f) : [];
});

// Methods
const applyFilters = async () => {
  const params: any = {};
  if (searchQuery.value) params.search = searchQuery.value;
  if (filters.value.status !== 'all') params.status = filters.value.status;
  if (filters.value.minPrice !== null) params.min_price = filters.value.minPrice;
  if (filters.value.maxPrice !== null) params.max_price = filters.value.maxPrice;
  if (filters.value.dateFrom) params.date_from = filters.value.dateFrom;
  if (filters.value.dateTo) params.date_to = filters.value.dateTo;
  
  await adminPlansStore.fetchPlans(1, params);
};

const resetFilters = () => {
  searchQuery.value = '';
  filters.value = { status: 'all', minPrice: null, maxPrice: null, dateFrom: '', dateTo: '' };
  adminPlansStore.fetchPlans(1);
};

const refreshPlans = async () => {
  await adminPlansStore.fetchPlans(adminPlansStore.currentPage);
};

const editPlan = (plan: AdminPlan) => {
  form.value = { ...plan, discounted_price: plan.discounted_price ?? undefined };
  featuresText.value = plan.features.join('\n');
  errors.value = [];
  isEdit.value = true;
  showModal.value = true;
  nextTick(() => {
    const nameInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (nameInput) nameInput.focus();
  });
};

const handleSubmit = async () => {
  // Client-side validation
  if (!form.value.name?.trim() || form.value.price === undefined || !form.value.features?.length) {
    errors.value = ['Name, price, and at least one feature are required'];
    return;
  }

  try {
    loading.value = true;
    errors.value = [];

    const submitData: Partial<AdminPlan> = {
      name: form.value.name,
      price: Number(form.value.price),
      is_active: form.value.is_active ?? true,
      features: form.value.features,
    };
    if (form.value.discounted_price !== undefined) {
      submitData.discounted_price = Number(form.value.discounted_price);
    }

    if (isEdit.value) {
      await adminPlansStore.updatePlan(form.value.id as number, submitData);
      toast.success('Plan updated successfully');
    } else {
      await adminPlansStore.createPlan(submitData);
      toast.success('Plan created successfully');
    }
    showModal.value = false;
    form.value = { id: 0, name: '', price: 0, discounted_price: undefined, features: [], is_active: true };
    featuresText.value = '';
    await refreshPlans();
  } catch (error: any) {
    const message = error.response?.data?.message || 'Operation failed';
    errors.value = message.includes(';') ? message.split('; ').filter((m: string) => m) : [message];
    toast.error(`Failed to ${isEdit.value ? 'update' : 'create'} plan`);
  } finally {
    loading.value = false;
  }
};

const confirmDelete = (id: number) => {
  planToDelete.value = id;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  if (!planToDelete.value) return;
  try {
    await adminPlansStore.deletePlan(planToDelete.value);
    toast.success('Plan deleted successfully');
    showDeleteModal.value = false;
  } catch (error) {
    toast.error('Failed to delete plan');
  }
};

// onMounted
onMounted(async () => {
  await adminStore.fetchDashboard();
  await adminPlansStore.fetchPlans();
});
</script>