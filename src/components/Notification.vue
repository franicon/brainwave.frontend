<template>
  <div v-if="notification.show" :class="['fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all', notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white']">
    {{ notification.message }}
  </div>
</template>

<script setup>
defineProps(['notification']);
</script>