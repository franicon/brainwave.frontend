<!-- Updated: src/layouts/AdminLayout.vue -->
<!-- Changes: Remove logs; compute prefix for paths based on role; remove v-if for settings gear (now conditional path) -->

<template>
  <div class="flex min-h-screen bg-neutral-50 dark:bg-neutral-900 relative">
    <!-- Overlay for mobile -->
    <div
      v-if="isMobile && isOpen"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
      @click="isOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
      class="bg-neutral-800 dark:bg-neutral-900 text-white h-screen fixed top-0 left-0 overflow-y-auto z-50 flex flex-col justify-between transition-all duration-300 ease-in-out border-r border-neutral-200 dark:border-neutral-700"
      :class="[
        isMobile
          ? (isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64')
          : (isCollapsed ? 'w-16' : 'w-64'),
        'lg:translate-x-0'
      ]"
    >
      <!-- Floating Close Button (Mobile Only) -->
      <button
        v-if="isMobile && isOpen"
        @click="isOpen = false"
        class="absolute top-4 right-4 p-2 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white z-50"
      >
        <XMarkIcon class="w-5 h-5" />
      </button>

      <div>
        <!-- Top -->
        <div class="relative p-6 border-b border-neutral-700">
          <h1 v-if="!isCollapsed || isMobile" class="text-2xl font-semibold text-white text-center">
            BRAINWAVE
          </h1>
          <!-- Collapse button only for desktop -->
          <button
            v-if="!isMobile"
            @click="toggleCollapse"
            class="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 hover:bg-neutral-700 rounded transition-colors"
          >
            <ChevronRightIcon
              v-if="isCollapsed"
              class="w-5 h-5 text-white"
            />
            <ChevronLeftIcon
              v-else
              class="w-5 h-5 text-white"
            />
          </button>
        </div>

        <!-- Menu -->
        <nav :class="[isCollapsed && !isMobile ? 'p-3 space-y-2' : 'p-6 space-y-2']">
          <ul :key="`menu-${isCollapsed ? 'collapsed' : 'expanded'}`">
            <li
              v-for="(item) in filteredAdminMenu"
              :key="item.path"
              class="rounded-md hover:bg-neutral-700 transition-colors duration-200"
            >
              <router-link
                :to="getFullPath(item.path)"
                class="flex items-center py-2.5 px-4 text-white font-medium text-base transition-colors duration-200"
                :class="[isCollapsed && !isMobile ? 'justify-center px-0' : '']"
                @click="handleMenuClick"
              >
                <component
                  :is="item.icon"
                  class="w-5 h-5 text-white mr-3 transition-colors flex-shrink-0"
                  :class="[{ 'mr-0': isCollapsed && !isMobile }]"
                />
                <span v-if="!isCollapsed || isMobile">{{ item.label }}</span>
              </router-link>
              <!-- Divider -->
              <div v-if="!isCollapsed || isMobile" class="border-b border-neutral-700 mx-4"></div>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Logout -->
      <div :class="[isCollapsed && !isMobile ? 'p-3' : 'p-6', 'border-t border-neutral-700']">
        <button
          @click="openLogoutConfirm"
          class="flex items-center py-2.5 w-full text-white font-medium text-base hover:bg-neutral-700 rounded-md transition-all duration-200"
          :class="[isCollapsed && !isMobile ? 'justify-center' : '']"
        >
          <ArrowRightOnRectangleIcon
            class="w-5 h-5 text-white transition-colors flex-shrink-0"
            :class="[{ 'mr-3': !isCollapsed || isMobile }]"
          />
          <span v-if="!isCollapsed || isMobile">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div
      class="flex-1 transition-all duration-300"
      :class="[!isMobile ? (isCollapsed ? 'ml-16' : 'ml-64') : 'ml-0']"
    >
      <header
        class="flex items-center justify-between px-6 py-4 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 shadow-sm"
      >
        <div class="flex items-center space-x-4">
          <!-- Mobile Drawer Toggle -->
          <button
            @click="isOpen = !isOpen"
            class="lg:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 rounded-md transition-colors"
          >
            <Bars3Icon class="w-6 h-6" />
          </button>

          <slot name="header-title">
            <h1 class="text-xl font-semibold text-neutral-900 dark:text-white">{{ headerTitle }}</h1>
          </slot>
        </div>

        <div class="flex items-center space-x-4">
          <button
            class="p-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 rounded-md transition-colors"
          >
            <BellIcon class="w-5 h-5" />
          </button>
          <button
            @click="toggleDark"
            class="p-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 rounded-md transition-colors"
          >
            <SunIcon
              v-if="isDark"
              class="w-5 h-5"
            />
            <MoonIcon
              v-else
              class="w-5 h-5"
            />
          </button>
          <router-link
            :to="settingsPath"
            class="p-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 rounded-md transition-colors"
          >
            <CogIcon class="w-5 h-5" />
          </router-link>
        </div>
      </header>

      <main class="p-6">
        <slot></slot>
      </main>
    </div>

    <!-- Logout Confirm Modal -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="card p-6 max-w-sm w-full">
        <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Confirm Logout</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6 text-base">Are you sure you want to log out?</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="modalOpen = false"
            class="btn-secondary"
          >
            Cancel
          </button>
          <button
            @click="confirmLogout"
            class="btn-primary"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDarkMode } from '@/composables/useDarkMode';
import { useCollapse } from '@/composables/useCollapse';
import { useAuthStore } from '@/stores/auth';
import {
  ChartBarIcon,
  UsersIcon,
  BookOpenIcon,
  PlusIcon,
  Cog6ToothIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@/plugins/heroicons';

const { isDark, toggleDark } = useDarkMode();
const { isCollapsed, isMobile, toggleCollapse } = useCollapse();
const authStore = useAuthStore();

const isOpen = ref(false);
const modalOpen = ref(false);

// Base menu items (relative paths without prefix)
const baseAdminMenu = [
  { path: '/dashboard', label: 'Dashboard', icon: ChartBarIcon },
  { path: '/users', label: 'Users', icon: UsersIcon },
  { path: '/employees', label: 'Employees', icon: UsersIcon },
  { path: '/courses', label: 'Courses', icon: BookOpenIcon },
  { path: '/courses/create', label: 'Create Course', icon: PlusIcon },
  { path: '/plans', label: 'Plans', icon: Cog6ToothIcon },
  { path: '/blogs', label: 'Blogs', icon: BookOpenIcon },
  { path: '/settings', label: 'Settings', icon: CogIcon },
];

const getPermissionKey = (path: string): string | true | false => {
  if (path === '/dashboard') return true; 
  if (path.startsWith('/users')) return 'users';
  if (path.startsWith('/employees')) return 'employees';
  if (path.startsWith('/courses')) return 'courses';
  if (path.startsWith('/plans')) return 'plans';
  if (path.startsWith('/blogs')) return 'blogs';
  if (path.startsWith('/settings')) return 'settings';
  return false;
};

// Compute prefix based on role
const prefix = computed(() => {
  return authStore.isSuperAdmin ? '/admin' : '/employee';
});

// Compute full path for menu items
const getFullPath = (relativePath: string) => computed(() => prefix.value + relativePath).value;

// Filter menu based on permissions
const filteredAdminMenu = computed(() => {
  if (authStore.isSuperAdmin) {
    return baseAdminMenu;
  }
  const permissions = authStore.user?.permissions || [];
  return baseAdminMenu.filter((item) => {
    const key = getPermissionKey(item.path);
    return key === true || permissions.includes(key as string);
  });
});

// Settings path
const settingsPath = computed(() => prefix.value + '/settings');

// Header title based on role
const headerTitle = computed(() => {
  if (authStore.isEmployee) return 'Employee Panel';
  return 'Admin Panel';
});

const openLogoutConfirm = () => {
  modalOpen.value = true;
};

const confirmLogout = () => {
  authStore.logout();
  modalOpen.value = false;
};

const handleMenuClick = () => {
  if (isMobile.value) {
    isOpen.value = false;
  }
};
</script>