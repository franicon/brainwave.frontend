<!-- src\views\dashboard\AdminDashboard.vue -->
<template>
  <div v-if="adminStore.loading" class="flex justify-center items-center h-64">
    <p class="text-base text-neutral-600 dark:text-neutral-400">Loading dashboard...</p>
  </div>

  <div v-else class="space-y-8">
    <!-- Dashboard Header -->
    <div class="card flex justify-between items-center p-6">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">Dashboard Overview</h1>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Welcome back! Here's what's happening today.</p>
      </div>
      <div class="text-right">
        <span class="text-sm text-neutral-600 dark:text-neutral-400 block">Current Month: {{ currentMonth }}</span>
        <span class="text-xs text-neutral-500 dark:text-neutral-500 mt-1 block">Updated: {{ currentTime }}</span>
      </div>
    </div>

    <!-- Key Metrics Row (Always Visible, Adaptive) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Users (Super Admin) / Total Enrollments (Employee) -->
      <div class="card p-6 text-center">
        <div class="flex justify-center items-center w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4 mx-auto">
          <span class="text-xl font-bold text-primary-600 dark:text-primary-400">👥</span>
        </div>
        <h3 class="text-2xl font-bold text-neutral-900 dark:text-white mb-1">{{ authStore.isSuperAdmin ? adminStore.totalUsers.toLocaleString() : adminStore.totalEnrollments.toLocaleString() }}</h3>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 capitalize">{{ authStore.isSuperAdmin ? 'Total Users' : 'Total Enrollments' }}</p>
      </div>

      <!-- Total Employees / Total Courses -->
      <div class="card p-6 text-center">
        <div class="flex justify-center items-center w-12 h-12 bg-accent-100 dark:bg-accent-900/20 rounded-full mb-4 mx-auto">
          <span class="text-xl font-bold text-accent-600 dark:text-accent-400">👨‍💼</span>
        </div>
        <h3 class="text-2xl font-bold text-neutral-900 dark:text-white mb-1">{{ authStore.isSuperAdmin ? adminStore.totalEmployees.toLocaleString() : adminStore.totalCourses.toLocaleString() }}</h3>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 capitalize">{{ authStore.isSuperAdmin ? 'Total Employees' : 'Total Courses' }}</p>
      </div>

      <!-- Total Revenue / Total Blogs -->
      <div class="card p-6 text-center">
        <div class="flex justify-center items-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full mb-4 mx-auto">
          <span class="text-xl font-bold text-green-600 dark:text-green-400">💰</span>
        </div>
        <h3 class="text-2xl font-bold text-neutral-900 dark:text-white mb-1">{{ authStore.isSuperAdmin ? adminStore.totalRevenue.toLocaleString() + ' PKR' : adminStore.totalBlogs.toLocaleString() }}</h3>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 capitalize">{{ authStore.isSuperAdmin ? 'Total Revenue' : 'Total Blogs' }}</p>
      </div>

      <!-- Pending Enrollments -->
      <div class="card p-6 text-center">
        <div class="flex justify-center items-center w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full mb-4 mx-auto">
          <span class="text-xl font-bold text-orange-600 dark:text-orange-400">⏳</span>
        </div>
        <h3 class="text-2xl font-bold text-neutral-900 dark:text-white mb-1">{{ adminStore.pendingEnrollments.toLocaleString() }}</h3>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">Pending Enrollments</p>
      </div>
    </div>

    <!-- Main Charts Section (Super Admin vs Employee) -->
    <div v-if="authStore.isSuperAdmin" class="space-y-6">
      <!-- Users & Employees Donuts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
            <span class="text-primary-600 dark:text-primary-400 mr-2">👥</span> Users Overview
          </h3>
          <div class="relative h-72 mb-6">
            <ApexChart
              type="donut"
              :options="doughnutOptions"
              :series="doughnutSeries"
              height="100%"
            />
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="text-center">
                <p class="text-4xl font-bold text-primary-600 dark:text-primary-400">{{ adminStore.totalUsers }}</p>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">Total</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <div>
                <p class="font-medium text-neutral-900 dark:text-white">Active</p>
                <p class="text-neutral-500 dark:text-neutral-400">{{ adminStore.activeUsers }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div>
                <p class="font-medium text-neutral-900 dark:text-white">Inactive</p>
                <p class="text-neutral-500 dark:text-neutral-400">{{ adminStore.totalUsers - adminStore.activeUsers }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
            <span class="text-accent-600 dark:text-accent-400 mr-2">👨‍💼</span> Employees Overview
          </h3>
          <div class="relative h-72 mb-6">
            <ApexChart
              type="donut"
              :options="employeesOptions"
              :series="employeesSeries"
              height="100%"
            />
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="text-center">
                <p class="text-4xl font-bold text-accent-600 dark:text-accent-400">{{ adminStore.totalEmployees }}</p>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">Total</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <div>
                <p class="font-medium text-neutral-900 dark:text-white">Active</p>
                <p class="text-neutral-500 dark:text-neutral-400">{{ adminStore.activeEmployees }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div>
                <p class="font-medium text-neutral-900 dark:text-white">Inactive</p>
                <p class="text-neutral-500 dark:text-neutral-400">{{ adminStore.totalEmployees - adminStore.activeEmployees }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics & Daily Revenue Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
            <span class="text-green-600 dark:text-green-400 mr-2">📊</span> Analytics Overview
          </h3>
          <div class="text-center mb-6">
            <p class="text-4xl font-bold text-green-600 dark:text-green-400">{{ adminStore.totalRevenue.toLocaleString() }}</p>
            <p class="text-sm text-neutral-500 dark:text-neutral-400">Total Revenue (PKR)</p>
          </div>
          <div class="h-64">
            <ApexChart
              type="bar"
              :options="metricsOptions"
              :series="metricsSeries"
              height="100%"
            />
          </div>
        </div>

        <div class="card p-6">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white flex items-center">
              <span class="text-primary-600 dark:text-primary-400 mr-2">📈</span> Daily Revenue
            </h3>
            <div class="mt-4">
              <label class="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Select Date</label>
              <input type="date" v-model="selectedDate" class="input w-full" />
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

      <!-- Additional Super Admin Widgets Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
            <span class="text-blue-600 dark:text-blue-400 mr-2">💳</span> Top Wallet Balances
          </h3>
          <div class="h-64">
            <ApexChart
              type="bar"
              :options="walletOptions"
              :series="walletSeries"
              height="100%"
            />
          </div>
          <p class="text-sm text-neutral-500 dark:text-neutral-400 text-center mt-2">Top 5 Users (PKR)</p>
        </div>

        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
            <span class="text-purple-600 dark:text-purple-400 mr-2">📋</span> Plans Overview
          </h3>
          <div class="relative h-72 mb-6">
            <ApexChart
              type="donut"
              :options="plansOptions"
              :series="plansSeries"
              height="100%"
            />
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="text-center">
                <p class="text-4xl font-bold text-purple-600 dark:text-purple-400">{{ adminStore.totalPlans }}</p>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">Total</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <div>
                <p class="font-medium text-neutral-900 dark:text-white">Active</p>
                <p class="text-neutral-500 dark:text-neutral-400">{{ adminStore.plansActive }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div>
                <p class="font-medium text-neutral-900 dark:text-white">Inactive</p>
                <p class="text-neutral-500 dark:text-neutral-400">{{ adminStore.totalPlans - adminStore.plansActive }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
            <span class="text-indigo-600 dark:text-indigo-400 mr-2">🔄</span> Transaction Types
          </h3>
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

    <!-- Employee-Specific Section -->
    <div v-else class="space-y-6">
      <!-- Your Analytics & Daily Enrollments Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
            <span class="text-green-600 dark:text-green-400 mr-2">📊</span> Your Analytics
          </h3>
          <div class="text-center mb-6">
            <p class="text-4xl font-bold text-green-600 dark:text-green-400">{{ adminStore.totalEnrollments.toLocaleString() }}</p>
            <p class="text-sm text-neutral-500 dark:text-neutral-400">Total Enrollments</p>
          </div>
          <div class="h-64">
            <ApexChart
              type="bar"
              :options="employeeMetricsOptions"
              :series="employeeMetricsSeries"
              height="100%"
            />
          </div>
        </div>

        <div class="card p-6">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white flex items-center">
              <span class="text-primary-600 dark:text-primary-400 mr-2">📈</span> Daily Enrollments
            </h3>
            <div class="mt-4">
              <label class="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">Select Date</label>
              <input type="date" v-model="selectedDate" class="input w-full" />
            </div>
          </div>
          <div class="h-64">
            <ApexChart
              type="bar"
              :options="enrollmentsOptions"
              :series="enrollmentsSeries"
              height="100%"
            />
          </div>
        </div>
      </div>

      <!-- Courses & Blogs Donuts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
            <span class="text-accent-600 dark:text-accent-400 mr-2">📚</span> Your Courses Overview
          </h3>
          <div class="relative h-72 mb-6">
            <ApexChart
              type="donut"
              :options="employeeCoursesOptions"
              :series="employeeCoursesSeries"
              height="100%"
            />
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="text-center">
                <p class="text-4xl font-bold text-accent-600 dark:text-accent-400">{{ adminStore.totalCourses }}</p>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">Total</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <div>
                <p class="font-medium text-neutral-900 dark:text-white">Active</p>
                <p class="text-neutral-500 dark:text-neutral-400">{{ adminStore.activeCourses }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div>
                <p class="font-medium text-neutral-900 dark:text-white">Inactive</p>
                <p class="text-neutral-500 dark:text-neutral-400">{{ adminStore.totalCourses - adminStore.activeCourses }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
            <span class="text-purple-600 dark:text-purple-400 mr-2">✍️</span> Your Blogs Overview
          </h3>
          <div class="relative h-72 mb-6">
            <ApexChart
              type="donut"
              :options="employeeBlogsOptions"
              :series="employeeBlogsSeries"
              height="100%"
            />
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="text-center">
                <p class="text-4xl font-bold text-purple-600 dark:text-purple-400">{{ adminStore.totalBlogs }}</p>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">Total</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <div>
                <p class="font-medium text-neutral-900 dark:text-white">Active</p>
                <p class="text-neutral-500 dark:text-neutral-400">{{ adminStore.activeBlogs }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div>
                <p class="font-medium text-neutral-900 dark:text-white">Inactive</p>
                <p class="text-neutral-500 dark:text-neutral-400">{{ adminStore.totalBlogs - adminStore.activeBlogs }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import ApexChart from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useAdminStore } from '@/stores/admin';
import { useAuthStore } from '@/stores/auth';

const adminStore = useAdminStore();
const authStore = useAuthStore();

const now = new Date();
const selectedDate = ref(now.toISOString().split('T')[0]);
const currentMonth = now.toLocaleString('default', { month: 'long' });
const currentTime = ref(now.toLocaleTimeString());

const isDark = ref(document.documentElement.classList.contains('dark'));
const updateDarkMode = () => {
  isDark.value = document.documentElement.classList.contains('dark');
};
watch(() => document.documentElement.classList.contains('dark'), updateDarkMode);
onMounted(updateDarkMode);

const themeMode = computed<'dark' | 'light'>(() => isDark.value ? 'dark' : 'light');

// Update time every minute
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString();
}, 60000);

// Doughnut Chart for Users (Super Admin)
const doughnutSeries = computed(() => [adminStore.activeUsers, Math.max(0, adminStore.totalUsers - adminStore.activeUsers)]);
const doughnutOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'donut' as const,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
    },
    background: 'transparent',
  },
  labels: ['Active Users', 'Inactive Users'],
  colors: ['#10B981', '#EF4444'],
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: false,
        },
      },
      startAngle: -90,
      endAngle: 90,
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '12px',
    labels: {
      colors: isDark.value ? '#E5E7EB' : '#374151',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  tooltip: {
    theme: themeMode.value,
    y: {
      formatter: (val: number) => `${val} users`,
    },
  },
  theme: {
    mode: themeMode.value,
    palette: 'palette1',
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200,
      },
      legend: {
        position: 'bottom',
      },
    },
  }],
}));

// Donut Chart for Employees (Super Admin)
const employeesSeries = computed(() => [adminStore.activeEmployees, Math.max(0, adminStore.totalEmployees - adminStore.activeEmployees)]);
const employeesOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'donut' as const,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    background: 'transparent',
  },
  labels: ['Active Employees', 'Inactive Employees'],
  colors: ['#10B981', '#EF4444'],
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: false,
        },
      },
      startAngle: -90,
      endAngle: 90,
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '12px',
    labels: {
      colors: isDark.value ? '#E5E7EB' : '#374151',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  tooltip: {
    theme: themeMode.value,
    y: {
      formatter: (val: number) => `${val} employees`,
    },
  },
  theme: {
    mode: themeMode.value,
    palette: 'palette2',
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200,
      },
      legend: {
        position: 'bottom',
      },
    },
  }],
}));

// Metrics Bar Chart (Super Admin)
const metricsCategories = ['Subscriptions', 'Courses', 'Pending'];
const metricsSeries = computed(() => [{ name: 'Count', data: [adminStore.activeSubscriptions, adminStore.activeCourses, adminStore.pendingEnrollments] }]);
const metricsOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'bar' as const,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    toolbar: {
      show: false,
    },
    background: 'transparent',
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '60%',
      dataLabels: {
        position: 'top',
      },
    },
  },
  colors: ['#10B981', '#6366F1', '#F59E0B'],
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#fff'],
    },
    offsetY: -20,
  },
  xaxis: {
    categories: metricsCategories,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: isDark.value ? '#E5E7EB' : '#374151',
        fontSize: '12px',
      },
    },
    crosshairs: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toFixed(0),
      style: {
        colors: isDark.value ? '#E5E7EB' : '#374151',
      },
    },
  },
  grid: {
    borderColor: isDark.value ? '#334155' : '#E5E7EB',
    strokeDashArray: 3,
  },
  legend: {
    show: false,
  },
  tooltip: {
    theme: themeMode.value,
    y: {
      formatter: (val: number) => `${val} items`,
    },
  },
  theme: {
    mode: themeMode.value,
  },
}));

// Employee Metrics Bar Chart
const employeeMetricsCategories = ['Courses', 'Blogs', 'Pending'];
const employeeMetricsSeries = computed(() => [{ name: 'Count', data: [adminStore.totalCourses, adminStore.totalBlogs, adminStore.pendingEnrollments] }]);
const employeeMetricsOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'bar' as const,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    toolbar: {
      show: false,
    },
    background: 'transparent',
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '60%',
      dataLabels: {
        position: 'top',
      },
    },
  },
  colors: ['#10B981', '#6366F1', '#F59E0B'],
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#fff'],
    },
    offsetY: -20,
  },
  xaxis: {
    categories: employeeMetricsCategories,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: isDark.value ? '#E5E7EB' : '#374151',
        fontSize: '12px',
      },
    },
    crosshairs: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toFixed(0),
      style: {
        colors: isDark.value ? '#E5E7EB' : '#374151',
      },
    },
  },
  grid: {
    borderColor: isDark.value ? '#334155' : '#E5E7EB',
    strokeDashArray: 3,
  },
  legend: {
    show: false,
  },
  tooltip: {
    theme: themeMode.value,
    y: {
      formatter: (val: number) => `${val} items`,
    },
  },
  theme: {
    mode: themeMode.value,
  },
}));

// Employee Courses Donut
const employeeCoursesSeries = computed(() => [adminStore.activeCourses, Math.max(0, adminStore.totalCourses - adminStore.activeCourses)]);
const employeeCoursesOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'donut' as const,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    background: 'transparent',
  },
  labels: ['Active Courses', 'Inactive Courses'],
  colors: ['#10B981', '#EF4444'],
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: false,
        },
      },
      startAngle: -90,
      endAngle: 90,
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '12px',
    labels: {
      colors: isDark.value ? '#E5E7EB' : '#374151',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  tooltip: {
    theme: themeMode.value,
    y: {
      formatter: (val: number) => `${val} courses`,
    },
  },
  theme: {
    mode: themeMode.value,
    palette: 'palette3',
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200,
      },
      legend: {
        position: 'bottom',
      },
    },
  }],
}));

// Employee Blogs Donut
const employeeBlogsSeries = computed(() => [adminStore.activeBlogs, Math.max(0, adminStore.totalBlogs - adminStore.activeBlogs)]);
const employeeBlogsOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'donut' as const,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    background: 'transparent',
  },
  labels: ['Active Blogs', 'Inactive Blogs'],
  colors: ['#10B981', '#EF4444'],
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: false,
        },
      },
      startAngle: -90,
      endAngle: 90,
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '12px',
    labels: {
      colors: isDark.value ? '#E5E7EB' : '#374151',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  tooltip: {
    theme: themeMode.value,
    y: {
      formatter: (val: number) => `${val} blogs`,
    },
  },
  theme: {
    mode: themeMode.value,
    palette: 'palette4',
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200,
      },
      legend: {
        position: 'bottom',
      },
    },
  }],
}));

// Revenue Bar Chart (Super Admin) - Switched to bar for prominence
const revenueLabel = computed(() => {
  const date = new Date(selectedDate.value);
  return [date.getDate().toString() + ' ' + date.toLocaleString('default', { month: 'short' })];
});
const revenueSeries = computed(() => {
  const data = adminStore.revenue.length > 0 ? adminStore.revenue : [adminStore.totalRevenue || 0];
  return [{ name: 'Revenue (PKR)', data }];
});
const revenueOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'bar' as const,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    toolbar: {
      show: false,
    },
    background: 'transparent',
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '80%',
      dataLabels: {
        position: 'top',
      },
    },
  },
  colors: ['#10B981'],
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#fff'],
    },
    offsetY: -20,
  },
  xaxis: {
    categories: revenueLabel.value,
    labels: {
      style: {
        colors: isDark.value ? '#E5E7EB' : '#374151',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toLocaleString() + ' PKR',
      style: {
        colors: isDark.value ? '#E5E7EB' : '#374151',
      },
    },
  },
  grid: {
    borderColor: isDark.value ? '#334155' : '#E5E7EB',
    strokeDashArray: 3,
  },
  legend: {
    show: false,
  },
  tooltip: {
    theme: themeMode.value,
    y: {
      formatter: (val: number) => `${val.toLocaleString()} PKR`,
    },
  },
  theme: {
    mode: themeMode.value,
  },
}));

// Enrollments Bar Chart (Employee) - Switched to bar for prominence
const enrollmentsSeries = computed(() => {
  const data = adminStore.revenue.length > 0 ? adminStore.revenue : [adminStore.totalEnrollments || 0];
  return [{ name: 'Enrollments', data }];
});
const enrollmentsOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'bar' as const,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    toolbar: {
      show: false,
    },
    background: 'transparent',
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '80%',
      dataLabels: {
        position: 'top',
      },
    },
  },
  colors: ['#6366F1'],
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#fff'],
    },
    offsetY: -20,
  },
  xaxis: {
    categories: revenueLabel.value,
    labels: {
      style: {
        colors: isDark.value ? '#E5E7EB' : '#374151',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toFixed(0),
      style: {
        colors: isDark.value ? '#E5E7EB' : '#374151',
      },
    },
  },
  grid: {
    borderColor: isDark.value ? '#334155' : '#E5E7EB',
    strokeDashArray: 3,
  },
  legend: {
    show: false,
  },
  tooltip: {
    theme: themeMode.value,
    y: {
      formatter: (val: number) => `${val} enrollments`,
    },
  },
  theme: {
    mode: themeMode.value,
  },
}));

// Wallet Horizontal Bar Chart (Super Admin)
const walletLabels = computed(() => adminStore.topWallets.map(w => w.name.length > 15 ? w.name.slice(0, 12) + '...' : w.name));
const walletSeries = computed(() => [{ name: 'Balance', data: adminStore.topWallets.map(w => w.balance) }]);
const walletOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'bar' as const,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    toolbar: {
      show: false,
    },
    background: 'transparent',
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 8,
      dataLabels: {
        position: 'top',
      },
    },
  },
  colors: ['#3B82F6'],
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#fff'],
    },
    offsetX: 0,
    dropShadow: {
      enabled: true,
    },
  },
  xaxis: {
    categories: walletLabels.value,
    labels: {
      style: {
        colors: isDark.value ? '#E5E7EB' : '#374151',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toLocaleString() + ' PKR',
      style: {
        colors: isDark.value ? '#E5E7EB' : '#374151',
      },
    },
  },
  grid: {
    yaxis: {
      lines: {
        show: false,
      },
    },
    borderColor: isDark.value ? '#334155' : '#E5E7EB',
  },
  legend: {
    show: false,
  },
  tooltip: {
    theme: themeMode.value,
    y: {
      formatter: (val: number) => `${val.toLocaleString()} PKR`,
    },
  },
  theme: {
    mode: themeMode.value,
  },
}));

// Plans Donut Chart (Super Admin)
const plansSeries = computed(() => [adminStore.plansActive, Math.max(0, adminStore.totalPlans - adminStore.plansActive)]);
const plansOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'donut' as const,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    background: 'transparent',
  },
  labels: ['Active Plans', 'Inactive Plans'],
  colors: ['#10B981', '#EF4444'],
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: false,
        },
      },
      startAngle: -90,
      endAngle: 90,
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '12px',
    labels: {
      colors: isDark.value ? '#E5E7EB' : '#374151',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  tooltip: {
    theme: themeMode.value,
    y: {
      formatter: (val: number) => `${val} plans`,
    },
  },
  theme: {
    mode: themeMode.value,
    palette: 'palette5',
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200,
      },
      legend: {
        position: 'bottom',
      },
    },
  }],
}));

// Transactions Pie Chart (Super Admin)
const transactionsSeries = computed(() => Object.values(adminStore.transactionTypes) as number[]);
const transactionsOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'pie' as const,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    background: 'transparent',
  },
  labels: Object.keys(adminStore.transactionTypes),
  colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      donut: {
        size: '0%',
      },
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '12px',
    labels: {
      colors: isDark.value ? '#E5E7EB' : '#374151',
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => {
      const total = transactionsSeries.value.reduce((a, b) => a + b, 0);
      return total > 0 ? `${Math.round(val / total * 100)}%` : '0%';
    },
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      colors: ['#fff'],
    },
  },
  stroke: {
    width: 2,
    colors: ['transparent'],
  },
  tooltip: {
    theme: themeMode.value,
    y: {
      formatter: (val: number) => `${val} transactions`,
    },
  },
  theme: {
    mode: themeMode.value,
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200,
      },
      legend: {
        position: 'bottom',
      },
    },
  }],
}));

watch(selectedDate, async () => {
  await adminStore.fetchDashboard({ from_date: selectedDate.value, to_date: selectedDate.value });
});

onMounted(async () => {
  await adminStore.fetchDashboard({ from_date: selectedDate.value, to_date: selectedDate.value });
});
</script>