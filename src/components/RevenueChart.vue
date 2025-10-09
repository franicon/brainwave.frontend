<template>
  <LineChart :chart-data="chartData" :chart-options="chartOptions" class="rounded-xl"/>
</template>

<script setup>
import { computed } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  labels: {
    type: Array,
    default: () => [],
  },
});

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Revenue',
      data: props.data,
      backgroundColor: 'rgba(34,197,94,0.2)',
      borderColor: 'rgba(34,197,94,1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
};
</script>

<style scoped>
</style>
