<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 shadow-sm">
    <div class="flex items-center space-x-4">
      <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
    </div>
    <div class="flex items-center space-x-4">
      <button class="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 rounded-lg transition-colors">
        <font-awesome-icon icon="bell" class="w-5 h-5" />
      </button>
      <button @click="toggleDark" class="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 rounded-lg transition-colors">
        <font-awesome-icon :icon="['fas', isDark ? 'sun' : 'moon']" class="w-5 h-5" />
      </button>
      <router-link to="/settings" class="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 rounded-lg transition-colors">
        <font-awesome-icon icon="cog" class="w-5 h-5" />
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>