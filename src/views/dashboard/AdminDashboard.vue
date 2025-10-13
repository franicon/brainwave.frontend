<template>
  <div v-if="adminStore.loading" class="flex justify-center items-center h-64">
    <p class="text-lg text-gray-600">Loading dashboard...</p>
  </div>

  <div v-else class="space-y-8">
    <!-- Dashboard Header -->
    <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
      <h1 class="text-xl font-bold text-gray-900">Overview</h1>
      <span class="text-sm text-gray-600">Current Month: {{ currentMonth }}</span>
    </div>

    <!-- Main Widgets Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Users Overview Widget -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Users Overview</h3>
        <div class="relative h-64 mb-6">
          <ApexChart
            type="donut"
            :options="doughnutOptions"
            :series="doughnutSeries"
            height="100%"
          />
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="text-center">
              <p class="text-3xl font-bold text-primary-500">{{ adminStore.totalUsers }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Active</p>
            <p class="text-gray-500 dark:text-gray-400">{{ adminStore.activeUsers }}</p>
          </div>
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Inactive</p>
            <p class="text-gray-500 dark:text-gray-400">{{ adminStore.totalUsers - adminStore.activeUsers }}</p>
          </div>
        </div>
      </div>

      <!-- Analytics Overview Widget -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analytics Overview</h3>
        <div class="text-center mb-6">
          <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ adminStore.totalRevenue.toLocaleString() }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Total Revenue PKR</p>
        </div>
        <div class="h-48">
          <ApexChart
            type="bar"
            :options="metricsOptions"
            :series="metricsSeries"
            height="100%"
          />
        </div>
      </div>

      <!-- Daily Revenue Widget -->
      <div class="card p-6">
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Daily Revenue</h3>
          <div class="mt-2">
            <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">Select Date</label>
            <input type="date" v-model="selectedDate" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm dark:bg-navy-700 dark:text-white">
          </div>
        </div>
        <div class="h-64">
          <ApexChart
            type="bar"
            :options="revenueOptions"
            :series="revenueSeries"
            height="100%"
          />
        </div>
      </div>
    </div>

    <!-- Additional Metrics Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Top Wallet Balances Widget -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Wallet Balances</h3>
        <div class="h-64 mb-2">
          <ApexChart
            type="bar"
            :options="walletOptions"
            :series="walletSeries"
            height="100%"
          />
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 text-center">Top 5 Users</p>
      </div>

      <!-- Plans Overview Widget -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Plans Overview</h3>
        <div class="relative h-64 mb-6">
          <ApexChart
            type="donut"
            :options="plansOptions"
            :series="plansSeries"
            height="100%"
          />
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="text-center">
              <p class="text-3xl font-bold text-primary-500">{{ adminStore.totalPlans }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Total Plans</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Active</p>
            <p class="text-gray-500 dark:text-gray-400">{{ adminStore.plansActive }}</p>
          </div>
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Inactive</p>
            <p class="text-gray-500 dark:text-gray-400">{{ adminStore.totalPlans - adminStore.plansActive }}</p>
          </div>
        </div>
      </div>

      <!-- Transaction Types Widget -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transaction Types</h3>
        <div class="h-64">
          <ApexChart
            type="pie"
            :options="transactionsOptions"
            :series="transactionsSeries"
            height="100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import ApexChart from 'vue3-apexcharts';
import { useAdminStore } from '@/stores/admin';

const adminStore = useAdminStore();

const now = new Date();
const selectedDate = ref(now.toISOString().split('T')[0]);
const currentMonth = now.toLocaleString('default', { month: 'long' });

const isDark = ref(document.documentElement.classList.contains('dark'));
const updateDarkMode = () => {
  isDark.value = document.documentElement.classList.contains('dark');
};
watch(() => document.documentElement.classList.contains('dark'), updateDarkMode);
onMounted(updateDarkMode);

const themeMode = computed(() => isDark.value ? 'dark' : 'light');

// Doughnut Chart for Users
const doughnutSeries = computed(() => [adminStore.activeUsers, Math.max(0, adminStore.totalUsers - adminStore.activeUsers)]);
const doughnutOptions = computed(() => ({
  labels: ['Active Users', 'Inactive Users'],
  colors: ['#10B981', '#EF4444'],
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
      },
    },
  },
  legend: {
    position: 'bottom',
  },
  dataLabels: {
    enabled: false,
  },
  theme: {
    mode: themeMode.value,
  },
}));

// Metrics Bar Chart
const metricsCategories = ['Active Subscriptions', 'Total Courses', 'Pending Enrollments'];
const metricsSeries = computed(() => [{ name: 'Count', data: [adminStore.activeSubscriptions, adminStore.totalCourses, adminStore.pendingEnrollments] }]);
const metricsOptions = computed(() => ({
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '70%',
    },
  },
  colors: ['#10B981', '#6366F1', '#F59E0B'],
  xaxis: {
    categories: metricsCategories,
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toFixed(0),
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  theme: {
    mode: themeMode.value,
  },
}));

// Revenue Bar Chart
const revenueLabel = computed(() => {
  const date = new Date(selectedDate.value);
  return date.getDate().toString() + ' ' + date.toLocaleString('default', { month: 'long' });
});
const revenueSeries = computed(() => [{ name: 'Revenue (PKR)', data: adminStore.revenue }]);
const revenueOptions = computed(() => ({
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '70%',
    },
  },
  colors: ['#10B981'],
  xaxis: {
    categories: [revenueLabel.value],
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toLocaleString() + ' PKR',
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  theme: {
    mode: themeMode.value,
  },
}));

// Wallet Horizontal Bar Chart
const walletLabels = computed(() => adminStore.topWallets.map(w => w.name.length > 15 ? w.name.slice(0, 12) + '...' : w.name));
const walletSeries = computed(() => [{ name: 'Balance', data: adminStore.topWallets.map(w => w.balance) }]);
const walletOptions = computed(() => ({
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 4,
    },
  },
  colors: ['#3B82F6'],
  xaxis: {
    categories: walletLabels.value,
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toLocaleString() + ' PKR',
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  grid: {
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  theme: {
    mode: themeMode.value,
  },
}));

// Plans Donut Chart
const plansSeries = computed(() => [adminStore.plansActive, Math.max(0, adminStore.totalPlans - adminStore.plansActive)]);
const plansOptions = computed(() => ({
  labels: ['Active Plans', 'Inactive Plans'],
  colors: ['#10B981', '#EF4444'],
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
      },
    },
  },
  legend: {
    position: 'bottom',
  },
  dataLabels: {
    enabled: false,
  },
  theme: {
    mode: themeMode.value,
  },
}));

// Transactions Pie Chart
const transactionsSeries = computed(() => Object.values(adminStore.transactionTypes) as number[]);
const transactionsOptions = computed(() => ({
  labels: Object.keys(adminStore.transactionTypes),
  colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
  legend: {
    position: 'bottom',
  },
  dataLabels: {
    enabled: false,
  },
  theme: {
    mode: themeMode.value,
  },
}));

watch(selectedDate, async () => {
  await adminStore.fetchDashboard({ from_date: selectedDate.value, to_date: selectedDate.value });
});

onMounted(async () => {
  await adminStore.fetchDashboard({ from_date: selectedDate.value, to_date: selectedDate.value });
});
</script>