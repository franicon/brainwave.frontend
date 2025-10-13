<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-navy-900 relative">
    <!-- Overlay for mobile -->
    <div
      v-if="isMobile && isOpen"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
      @click="isOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
      class="bg-gradient-to-b from-navy-900 to-navy-700 text-white shadow-2xl h-screen fixed top-0 left-0 overflow-y-auto z-50 flex flex-col justify-between transition-all duration-300 ease-in-out"
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
        class="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white z-50"
      >
        <XMarkIcon class="w-4 h-4" />
      </button>

      <div>
        <!-- Top -->
        <div class="relative p-6 border-b border-navy-600">
          <h1 v-if="!isCollapsed || isMobile" class="text-2xl font-bold text-white text-center">
           BRAINWAVE
          </h1>
          <!-- Collapse button only for desktop -->
          <button
            v-if="!isMobile"
            @click="toggleCollapse"
            class="absolute top-1/2 right-4 transform -translate-y-1/2 p-1.5 hover:bg-navy-600 rounded transition-colors"
          >
            <ChevronRightIcon
              v-if="isCollapsed"
              class="w-4 h-4 text-white"
            />
            <ChevronLeftIcon
              v-else
              class="w-4 h-4 text-white"
            />
          </button>
        </div>

        <!-- Menu -->
        <nav :class="[isCollapsed && !isMobile ? 'p-3 space-y-2' : 'p-6 space-y-2']">
          <ul :key="`menu-${isCollapsed ? 'collapsed' : 'expanded'}`">
            <li
              v-for="(item) in adminMenu"
              :key="item.path"
              class="rounded-lg hover:bg-navy-700 transition-colors"
            >
              <router-link
                :to="item.path"
                class="flex items-center py-3 px-4 text-white font-medium text-lg transition-colors duration-200"
                :class="[isCollapsed && !isMobile ? 'justify-center px-0' : '']"
                @click="handleMenuClick"
              >
                <component
                  :is="item.icon"
                  class="w-5 h-5 text-white mr-4 transition-colors flex-shrink-0"
                  :class="[{ 'mr-0': isCollapsed && !isMobile }]"
                />
                <span v-if="!isCollapsed || isMobile">{{ item.label }}</span>
              </router-link>
              <!-- Divider -->
              <div class="border-b border-navy-600 mx-4"></div>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Logout -->
      <div :class="[isCollapsed && !isMobile ? 'p-3' : 'p-6', 'border-t border-navy-600']">
        <button
          @click="openLogoutConfirm"
          class="flex items-center py-3 w-full text-white font-semibold text-lg hover:bg-navy-600 rounded-lg transition-all duration-200 hover:shadow-md group"
          :class="[isCollapsed && !isMobile ? 'justify-center' : '']"
        >
          <ArrowRightOnRectangleIcon
            class="w-5 h-5 group-hover:text-primary-300 transition-colors flex-shrink-0"
            :class="[{ 'mr-4': !isCollapsed || isMobile }]"
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
        class="flex items-center justify-between px-6 py-4 bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 shadow-sm"
      >
        <div class="flex items-center space-x-4">
          <!-- Mobile Drawer Toggle -->
          <button
            @click="isOpen = !isOpen"
            class="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 rounded-lg transition-colors"
          >
            <Bars3Icon class="w-6 h-6" />
          </button>

          <slot name="header-title">
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Admin Panel</h1>
          </slot>
        </div>

        <div class="flex items-center space-x-4">
          <button
            class="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 rounded-lg transition-colors"
          >
            <BellIcon class="w-5 h-5" />
          </button>
          <button
            @click="toggleDark"
            class="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 rounded-lg transition-colors"
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
            to="/settings"
            class="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 rounded-lg transition-colors"
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
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Confirm Logout</h2>
        <p class="text-gray-600 mb-6">Are you sure you want to log out?</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="modalOpen = false"
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition"
          >
            Cancel
          </button>
          <button
            @click="confirmLogout"
            class="px-4 py-2 bg-navy-600 text-white hover:bg-navy-700 rounded transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode'
import { useCollapse } from '@/composables/useCollapse'
import { useAuthStore } from '@/stores/auth'
import {
  ChartBarIcon,
  UsersIcon,
  BookOpenIcon,
  PlusIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@/plugins/heroicons'

const { isDark, toggleDark } = useDarkMode()
const { isCollapsed, isMobile, toggleCollapse } = useCollapse()
const authStore = useAuthStore()

const isOpen = ref(false)
const modalOpen = ref(false)

const adminMenu = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: ChartBarIcon },
  { path: '/admin/users', label: 'Users', icon: UsersIcon },
  { path: '/admin/courses', label: 'Courses', icon: BookOpenIcon },
  { path: '/admin/courses/create', label: 'Create Course', icon: PlusIcon },
  { path: '/admin/plans', label: 'Plans', icon: Cog6ToothIcon },
]

const openLogoutConfirm = () => {
  modalOpen.value = true
}

const confirmLogout = () => {
  authStore.logout()
  modalOpen.value = false
}

const handleMenuClick = () => {
  if (isMobile.value) {
    isOpen.value = false
  }
}
</script>