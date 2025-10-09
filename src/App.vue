<template>
  <component :is="currentLayout" v-if="currentLayout">
    <RouterView />
  </component>
  <RouterView v-else />  <!-- No layout for public/auth routes (e.g., /login, /signup) -->

  <!-- Global Loading Overlay (works across all layouts/pages) -->
  <div
    v-if="loadingStore.isLoading"
    class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
  >
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useLoadingStore } from '@/stores/loading';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

const route = useRoute();
const loadingStore = useLoadingStore();

const currentLayout = computed(() => {
  // Admin routes: Use AdminLayout
  if (route.meta.adminOnly) {
    return AdminLayout;
  }
  // User auth routes: Use DefaultLayout
  if (route.meta.requiresAuth && !route.meta.adminOnly) {
    return DefaultLayout;
  }
  // Public/auth routes (e.g., /login, /signup): No layout
  return null;
});
</script>

<style>
.loader {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>