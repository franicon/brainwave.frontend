<template>
  <DefaultLayoutComponent>
    <template #header-title>
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white font-sans">Subscription Plans</h1>
    </template>

    <div class="space-y-8 max-w-7xl mx-auto py-8">
      <!-- Login Prompt -->
      <div v-if="!authStore.isAuthenticated" class="card p-6 rounded-3xl text-center max-w-md mx-auto">
        <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-lg">Please login to view and purchase plans.</p>
        <router-link to="/login" class="btn-3d btn-3d-border w-full rounded-full">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="mr-2" /> Sign In
        </router-link>
      </div>

      <!-- Plans Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="plan in displayPlans"
          :key="plan.id"
          class="card p-6 rounded-3xl bg-white/80 dark:bg-navy-800/80 backdrop-blur-md relative"
        >
          <!-- Current Plan Badge -->
          <div v-if="plan.id === activePlan?.id" class="absolute top-3 right-3 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full text-xs font-medium text-green-700 dark:text-green-300">
            Current Plan
          </div>

          <h3 class="text-xl font-semibold mb-3 text-neutral-900 dark:text-white font-sans">{{ plan.name }}</h3>
          <p class="text-3xl font-bold text-primary-500 mb-2 font-sans">
            {{ plan.discounted_price ? `PKR ${plan.discounted_price}` : `PKR ${plan.price}` }}
          </p>
          <p v-if="plan.discounted_price" class="text-sm text-neutral-500 line-through mb-6">PKR {{ plan.price }}</p>

          <!-- Features -->
          <ul class="space-y-3 mb-6 text-neutral-600 dark:text-neutral-400">
            <li
              v-for="(feature, index) in plan.features"
              :key="feature"
              v-show="index < 4 || expandedFeatures[plan.id]"
              class="flex items-center"
            >
              <font-awesome-icon :icon="['fas', 'check']" class="text-green-500 mr-3 w-4 h-4" />
              <span class="font-medium">{{ feature }}</span>
            </li>
            <li
              v-if="plan.features.length > 4 && !expandedFeatures[plan.id]"
              class="text-sm text-blue-500 cursor-pointer"
              @click="expandedFeatures[plan.id] = true"
            >
              More Features
            </li>
          </ul>

          <!-- Purchase Button -->
          <button
            @click="purchasePlan(plan.id)"
            :disabled="plan.id === activePlan?.id || loading"
            class="btn-3d btn-3d-border w-full rounded-full transition-all duration-300"
            :class="plan.id === activePlan?.id ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed' : ''"
          >
            {{ plan.id === activePlan?.id
                ? 'Active'
                : (activePlan && activePlan.price < plan.price ? 'Upgrade' : (loading ? 'Processing...' : 'Purchase Plan'))
            }}
          </button>
        </div>
      </div>

      <!-- Show All Plans Button -->
      <div v-if="plans.length > 4 && !showAllPlans" class="text-center mt-4">
        <button @click="showAllPlans = true" class="text-blue-500 font-medium hover:underline">
          Show All Plans
        </button>
      </div>
    </div>
  </DefaultLayoutComponent>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Plan, useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import type { Component } from 'vue';
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();
const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();

const plans = ref<Plan[]>([]);
const loading = ref(false);
const showAllPlans = ref(false);

// Object to track expanded features per plan
const expandedFeatures = ref<{ [key: number]: boolean }>({});

const DefaultLayoutComponent = DefaultLayout as unknown as Component & { $slots: { 'header-title': () => any; default: () => any } };

onMounted(async () => {
  try {
    loadingStore.start();
    await userStore.fetchDashboard();
    plans.value = await userStore.fetchPlans();

    // Initialize all plans with collapsed features
    plans.value.forEach(plan => expandedFeatures.value[plan.id] = false);
  } catch (err) {
    console.error('Failed to fetch plans:', err);
  } finally {
    loadingStore.stop();
  }
});

const activePlan = computed(() => userStore.activePlan);

const displayPlans = computed(() =>
  showAllPlans.value ? plans.value : plans.value.slice(0, 4)
);

const purchasePlan = async (planId: number) => {
  if (planId === activePlan.value?.id) return;
  try {
    loading.value = true;
    await userStore.purchasePlan(planId);
    await userStore.fetchDashboard();
    router.push('/dashboard');
  } catch (error: any) {
    console.error('Purchase failed:', error);
  } finally {
    loading.value = false;
  }
};
</script>
