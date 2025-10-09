<template>
  <div class="flex">
    <Sidebar :menu-items="adminMenu" />

    <div class="ml-64 flex-1">
      <!-- Header -->
      <nav class="bg-white dark:bg-neutral-800 shadow p-4 flex justify-between items-center">
        <div>
          <slot name="header-title">
            <h2 class="text-xl font-semibold text-neutral-900 dark:text-white">Admin Panel</h2>
          </slot>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="toggleDark" class="p-2 text-neutral-700 dark:text-neutral-300 hover:text-primary-500">
            <font-awesome-icon :icon="['fas', isDark ? 'sun' : 'moon']" />
          </button>
          <button @click="authStore.logout" class="flex items-center bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">
            <font-awesome-icon icon="sign-out-alt" class="mr-2" /> Logout
          </button>
        </div>
      </nav>

      <!-- Main content -->
      <main class="p-6 bg-gray-50 dark:bg-neutral-900 min-h-screen">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode';
import { useAuthStore } from '@/stores/auth';
import Sidebar from '@/components/Sidebar.vue';

const { isDark, toggleDark } = useDarkMode();
const authStore = useAuthStore();

const adminMenu = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/admin/users', label: 'Users', icon: 'users' },
  { path: '/admin/courses', label: 'Courses', icon: 'book' },
  { path: '/admin/courses/create', label: 'Create Course', icon: 'plus' },
  { path: '/admin/plans', label: 'Plans', icon: 'cog' },
];
</script>
