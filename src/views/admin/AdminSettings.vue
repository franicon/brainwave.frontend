<!-- src/views/admin/AdminSettings.vue (completed - full template and script with all sections) -->

<template>
  <div class="space-y-8 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="card backdrop-blur">
      <h1 class="text-2xl font-semibold text-neutral-900 dark:text-white">Admin Settings</h1>
    </div>

    <!-- Security Section -->
    <div class="card backdrop-blur">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Security</h3>
      <form @submit.prevent="handlePasswordUpdate" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Current Password</label>
          <input
            v-model="passwordForm.currentPassword"
            type="password"
            required
            class="input"
            placeholder="Enter current password"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">New Password</label>
          <input
            v-model="passwordForm.newPassword"
            type="password"
            required
            class="input"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Confirm New Password</label>
          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            required
            class="input"
            placeholder="Confirm new password"
          />
        </div>
        <div v-if="settingsStore.errors.length > 0" class="space-y-1">
          <p v-for="error in settingsStore.errors" :key="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</p>
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" @click="resetPasswordForm" class="btn-secondary">Reset</button>
          <button type="submit" :disabled="settingsStore.passwordLoading" class="btn-3d">
            {{ settingsStore.passwordLoading ? 'Saving...' : 'Update Password' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Payment Section -->
    <div class="card backdrop-blur">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Payment API Keys</h3>
      <div v-if="settingsStore.loading" class="flex justify-center items-center h-32">
        <p class="text-base text-neutral-600 dark:text-neutral-400">Loading API keys...</p>
      </div>
      <div v-else-if="!apiKeysForm.length" class="flex justify-center items-center h-32">
        <p class="text-base text-neutral-600 dark:text-neutral-400">No API keys available</p>
      </div>
      <form v-else @submit.prevent="handleApiKeysUpdate" class="space-y-4">
        <div v-for="(key, index) in apiKeysForm" :key="key.key_name">
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{{ key.key_name }}</label>
          <input
            v-model="apiKeysForm[index].key_value"
            type="text"
            required
            class="input"
            placeholder="Enter API key value"
          />
          <input v-model="apiKeysForm[index].key_name" type="hidden" />
        </div>
        <div v-if="settingsStore.errors.length > 0" class="space-y-1">
          <p v-for="error in settingsStore.errors" :key="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</p>
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" @click="resetApiKeysForm" class="btn-secondary">Reset</button>
          <button type="submit" :disabled="settingsStore.apiKeysLoading" class="btn-3d">
            {{ settingsStore.apiKeysLoading ? 'Saving...' : 'Update API Keys' }}
          </button>
        </div>
      </form>
    </div>

    <!-- SEO Section -->
    <div class="card backdrop-blur">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">SEO Settings</h3>
      <form @submit.prevent="handleSeoUpdate" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Site Title</label>
            <input v-model="seoForm.site_title" required class="input" placeholder="Site Title" />
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Canonical Base URL</label>
            <input v-model="seoForm.canonical_base_url" required type="url" class="input" placeholder="https://brainwave.com" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Site Description</label>
            <textarea v-model="seoForm.site_description" rows="3" class="input" placeholder="Site meta description"></textarea>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Default Meta Keywords (optional)</label>
            <input v-model="seoForm.default_keywords" class="input" placeholder="keyword1, keyword2" />
            <label class="flex items-center mt-2">
              <input type="checkbox" v-model="seoForm.enable_meta_keywords" class="mr-2" />
              <span>Enable Meta Keywords</span>
            </label>
          </div>
        </div>

        <!-- Analytics -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Google Search Console ID</label>
            <input v-model="seoForm.google_search_console_id" class="input" placeholder="G-XXXXXXX" />
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Google Analytics (GA4) ID</label>
            <input v-model="seoForm.google_analytics_id" class="input" placeholder="G-XXXXXXX" />
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Google Tag Manager ID</label>
            <input v-model="seoForm.google_tag_manager_id" class="input" placeholder="GTM-XXXXXX" />
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Facebook Pixel ID</label>
            <input v-model="seoForm.facebook_pixel_id" class="input" placeholder="XXXXXXXXXX" />
          </div>
        </div>

        <!-- Sitemap Options -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Sitemap Include Options</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label class="flex items-center">
              <input type="checkbox" v-model="seoForm.sitemap_options.pages" class="mr-2" />
              <span>Pages</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="seoForm.sitemap_options.posts" class="mr-2" />
              <span>Posts</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="seoForm.sitemap_options.categories" class="mr-2" />
              <span>Categories</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="seoForm.sitemap_options.images" class="mr-2" />
              <span>Images</span>
            </label>
          </div>
        </div>

        <div v-if="settingsStore.errors.length > 0" class="space-y-1">
          <p v-for="error in settingsStore.errors" :key="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</p>
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" @click="resetSeoForm" class="btn-secondary">Reset</button>
          <button type="submit" :disabled="settingsStore.seoLoading" class="btn-3d">
            {{ settingsStore.seoLoading ? 'Saving...' : 'Update SEO Settings' }}
          </button>
        </div>
      </form>

      <!-- Robots.txt Editor -->
      <div class="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <h4 class="text-md font-medium text-neutral-900 dark:text-white mb-2">Robots.txt Editor</h4>
        <textarea
          v-model="robotsForm.content"
          :disabled="settingsStore.robotsLoading"
          rows="6"
          class="input w-full"
          placeholder="User-agent: *\nAllow: /"
        ></textarea>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" @click="resetRobotsForm" class="btn-secondary">Reset</button>
          <button @click="handleRobotsUpdate" :disabled="settingsStore.robotsLoading" class="btn-3d">
            {{ settingsStore.robotsLoading ? 'Saving...' : 'Update Robots.txt' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAdminSettingsStore } from '@/stores/adminSettings';
import { useToast } from 'vue-toastification';

const settingsStore = useAdminSettingsStore();
const toast = useToast();

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const apiKeysForm = ref<{ key_name: string; key_value: string }[]>([]);

const seoForm = ref({
  site_title: '',
  site_description: '',
  default_keywords: '',
  canonical_base_url: '',
  enable_meta_keywords: false,
  sitemap_options: { pages: true, posts: true, categories: true, images: false },
  google_search_console_id: '',
  google_analytics_id: '',
  google_tag_manager_id: '',
  facebook_pixel_id: '',
});

const robotsForm = ref({ content: '' });

const resetPasswordForm = () => {
  passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
  settingsStore.errors = [];
};

const resetApiKeysForm = () => {
  apiKeysForm.value = Object.entries(settingsStore.apiKeys || {}).map(([key_name, key_value]) => ({
    key_name,
    key_value: String(key_value),
  }));
  settingsStore.errors = [];
};

const handlePasswordUpdate = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    settingsStore.errors = ['New password and confirmation do not match'];
    toast.error('New password and confirmation do not match');
    return;
  }

  try {
    await settingsStore.updatePassword(passwordForm.value.currentPassword, passwordForm.value.newPassword);
    resetPasswordForm();
  } catch (error) {
    // Errors are handled in the store
  }
};

const handleApiKeysUpdate = async () => {
  try {
    await settingsStore.updateApiKeys(apiKeysForm.value);
  } catch (error) {
    // Errors are handled in the store
  }
};

const resetSeoForm = () => {
  seoForm.value = { ...settingsStore.seoSettings };
  // Ensure defaults for sitemap_options
  if (!seoForm.value.sitemap_options) {
    seoForm.value.sitemap_options = { pages: true, posts: true, categories: true, images: false };
  }
  settingsStore.errors = [];
};

const resetRobotsForm = async () => {
  try {
    robotsForm.value.content = await settingsStore.fetchRobotsTxt();
  } catch {}
  settingsStore.errors = [];
};

const handleSeoUpdate = async () => {
  try {
    await settingsStore.updateSeoSettings(seoForm.value);
    resetSeoForm();
  } catch (error) {
    // Handled in store
  }
};

const handleRobotsUpdate = async () => {
  try {
    await settingsStore.updateRobotsTxt(robotsForm.value.content);
    resetRobotsForm();
  } catch (error) {
    // Handled in store
  }
};

onMounted(async () => {
  try {
    await settingsStore.fetchApiKeys();
    resetApiKeysForm();
  } catch (error) {
    // Errors are handled in the store
  }

  try {
    await settingsStore.fetchSeoSettings();
    resetSeoForm();
    await settingsStore.fetchRobotsTxt();
    resetRobotsForm();
  } catch (error) {
    // Errors are handled in the store
  }
});
</script>