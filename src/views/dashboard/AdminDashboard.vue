<template>
  <div v-if="adminStore.loading" class="flex justify-center items-center h-64">
    <p class="text-lg text-gray-600">Loading dashboard...</p>
  </div>

  <div v-else class="space-y-8">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <div class="card text-center p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Users</h3>
        <p class="text-2xl font-bold text-blue-500">{{ adminStore.totalUsers }}</p>
      </div>
      <div class="card text-center p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Revenue</h3>
        <p class="text-2xl font-bold text-green-500">{{ adminStore.totalRevenue.toLocaleString() }} PKR</p>
      </div>
      <div class="card text-center p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Active Subscriptions</h3>
        <p class="text-2xl font-bold text-purple-500">{{ adminStore.activeSubscriptions }}</p>
      </div>
      <div class="card text-center p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Courses</h3>
        <p class="text-2xl font-bold text-indigo-500">{{ adminStore.totalCourses }}</p>
      </div>
      <div class="card text-center p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pending Enrollments</h3>
        <p class="text-2xl font-bold text-orange-500">{{ adminStore.pendingEnrollments }}</p>
      </div>
    </div>

    <!-- Revenue Chart -->
    <div class="card p-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Monthly Revenue ({{ new Date().getFullYear() }})</h2>
      <div class="w-full h-80">
        <!-- Embedded Chart.js for Revenue -->
        <canvas id="revenueChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useAdminStore } from '@/stores/admin';
import Chart from 'chart.js/auto';

const adminStore = useAdminStore();
const chartInstance = ref<Chart | null>(null);

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

onMounted(async () => {
  await adminStore.fetchDashboard();

  // Real data for chart
  const ctx = (document.getElementById('revenueChart') as HTMLCanvasElement)?.getContext('2d');
  if (ctx && adminStore.monthlyRevenue.length === 12) {
    if (chartInstance.value) {
      chartInstance.value.destroy();  // Clean up previous instance if exists
    }
    chartInstance.value = new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [{
          label: 'Revenue (PKR)',
          data: adminStore.monthlyRevenue,
          borderColor: '#10B981',  // Green for light/dark themes
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { 
            beginAtZero: true,
            ticks: { callback: (value: any) => value.toLocaleString() + ' PKR' }
          }
        },
        plugins: {
          legend: { display: true, position: 'top' }
        }
      }
    });
  }
});

// Cleanup on unmount
onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }
});
</script>