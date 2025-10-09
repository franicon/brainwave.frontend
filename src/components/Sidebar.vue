src/components/Sidebar.vue
<template>
  <aside
    class="w-64 bg-gradient-to-b from-navy-900 to-navy-700 text-white shadow-2xl h-screen fixed left-0 top-0 overflow-y-auto z-50 flex flex-col justify-between transition-all duration-300 ease-in-out lg:translate-x-0"
    :class="[
      isOpen ? 'translate-x-0' : '-translate-x-full',
      { 'w-16': !isMobile && isCollapsed }
    ]"
  >
    <!-- Top Section -->
    <div>
      <div class="relative p-6 border-b border-navy-600">
        <h1 v-if="showLabels" class="text-2xl font-bold text-white text-center">Brainwave LMS</h1>
        <button
          v-if="!isMobile"
          @click="toggleCollapse"
          class="absolute top-1/2 right-4 transform -translate-y-1/2 p-1.5 hover:bg-navy-600 rounded transition-colors"
        >
          <font-awesome-icon
            :icon="isCollapsed ? ['fas', 'chevron-right'] : ['fas', 'chevron-left']"
            class="w-4 h-4 text-white"
          />
        </button>
      </div>

      <nav :class="['p-6 space-y-3', { 'p-3': !isMobile && isCollapsed }]">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center py-3 text-white font-semibold text-lg hover:bg-navy-600 rounded-lg transition-all duration-200 hover:shadow-md group"
          :class="[
            { 'px-5': showLabels },
            { 'px-3 justify-center': !showLabels }
          ]"
        >
          <font-awesome-icon
            :icon="item.icon"
            :class="[
              'w-5 h-5 group-hover:text-primary-300 transition-colors',
              { 'mr-4': showLabels }
            ]"
          />
          <span v-if="showLabels">{{ item.label }}</span>
        </router-link>
      </nav>
    </div>

    <!-- Bottom Section -->
    <div :class="['border-t border-navy-600', { 'p-3': !isMobile && isCollapsed }, { 'p-6': showLabels }]">
      <button
        @click="openLogoutConfirm"
        class="flex items-center py-3 w-full text-white font-semibold text-lg hover:bg-navy-600 rounded-lg transition-all duration-200 hover:shadow-md group"
        :class="[
          { 'px-5': showLabels },
          { 'px-3 justify-center': !showLabels }
        ]"
      >
        <font-awesome-icon
          :icon="['fas', 'right-from-bracket']"
          :class="[
            'w-5 h-5 group-hover:text-primary-300 transition-colors',
            { 'mr-4': showLabels }
          ]"
        />
        <span v-if="showLabels">Logout</span>
      </button>
    </div>
  </aside>

  <!-- Confirmation Modal -->
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ title }}</h2>
      <p class="text-gray-600 mb-6">{{ message }}</p>
      <div class="flex justify-end space-x-4">
        <button @click="close" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition">
          Cancel
        </button>
        <button @click="confirm" class="px-4 py-2 bg-navy-600 text-white hover:bg-navy-700 rounded transition">
          Confirm
        </button>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useCollapse } from '@/composables/useCollapse';
import { useModalConfirm } from '@/composables/useModalConfirm';

const props = defineProps({
  menuItems: Array,
  isOpen: Boolean
});

const { isCollapsed, isMobile, toggleCollapse, showLabels } = useCollapse();
const authStore = useAuthStore();
const { isOpen, title, message, onConfirm, open, close, confirm } = useModalConfirm();


const openLogoutConfirm = () => {
  open({
    title: 'Confirm Logout',
    message: 'Are you sure you want to log out?',
    onConfirm: () => authStore.logout()
  });
};

</script>