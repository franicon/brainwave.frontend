<template>
  <DefaultLayout>
    <template #header-title>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">/ Settings</h2>
    </template>
    <div class="space-y-8 max-w-7xl mx-auto p-6">
      <!-- Profile Update Section -->
      <div class="card p-6 rounded-3xl bg-white/80 dark:bg-navy-800/80 backdrop-blur-md">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profile Settings</h2>
        <form @submit.prevent="handleProfileUpdate" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              v-model="profile.name"
              type="text"
              placeholder="Enter your name"
              class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-full bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
            <input
              v-model="profile.username"
              type="text"
              disabled
              placeholder="Enter your username"
              class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-full bg-gray-100 dark:bg-navy-600 text-gray-600 dark:text-gray-400 cursor-not-allowed" 
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              v-model="profile.email"
              type="email"
              disabled
              class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-full bg-gray-100 dark:bg-navy-600 text-gray-600 dark:text-gray-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
            <input
              v-model="profile.phone"
              type="text"
              placeholder="Enter your phone number"
              class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-full bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
            <input
              v-model.number="profile.age"
              type="number"
              min="1"
              placeholder="Enter your age"
              class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-full bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm"
            />
          </div>
          <button
            type="submit"
            :disabled="profileLoading"
            class="btn-3d btn-3d-border w-full rounded-full"
          >
            {{ profileLoading ? 'Updating...' : 'Update Profile' }}
          </button>
        </form>
      </div>

      <!-- Password Update Section -->
      <div class="card p-6 rounded-3xl bg-white/80 dark:bg-navy-800/80 backdrop-blur-md">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Change Password</h2>
        <form @submit.prevent="handlePasswordUpdate" class="space-y-4">
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
            <input
              v-model="password.current_password"
              :type="showCurrentPassword ? 'text' : 'password'"
              placeholder="Enter current password"
              class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-full bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm pr-10"
              required
            />
            <font-awesome-icon
              :icon="showCurrentPassword ? 'eye-slash' : 'eye'"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer"
              @click="showCurrentPassword = !showCurrentPassword"
            />
          </div>
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
            <input
              v-model="password.password"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="Enter new password"
              class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-full bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm pr-10"
              required
            />
            <font-awesome-icon
              :icon="showNewPassword ? 'eye-slash' : 'eye'"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer"
              @click="showNewPassword = !showNewPassword"
            />
          </div>
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
            <input
              v-model="password.password_confirmation"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm new password"
              class="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-full bg-white dark:bg-navy-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm pr-10"
              required
            />
            <font-awesome-icon
              :icon="showConfirmPassword ? 'eye-slash' : 'eye'"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer"
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </div>
          <button
            type="submit"
            :disabled="passwordLoading"
            class="btn-3d btn-3d-border w-full rounded-full"
          >
            {{ passwordLoading ? 'Updating...' : 'Update Password' }}
          </button>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toastification';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

const profile = ref({
  name: '',
  username: '',
  email: '',
  phone: '' as string | undefined,
  age: undefined as number | undefined,
});

const password = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
});

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const profileLoading = ref(false);
const passwordLoading = ref(false);

onMounted(async () => {
  try {
    console.log('[Settings] Before fetching user, userStore.user:', JSON.stringify(userStore.user, null, 2));
    await userStore.fetchUser();
    console.log('[Settings] After fetching user, userStore.user:', JSON.stringify(userStore.user, null, 2));
    if (userStore.user) {
      profile.value = {
        name: userStore.user.name || '',
        username: userStore.user.username || '',
        email: userStore.user.email || '',
        phone: userStore.user.phone || '',
        age: userStore.user.age,
      };
      console.log('[Settings] Profile set to:', JSON.stringify(profile.value, null, 2));
    } else {
      console.error('[Settings] No user data available after fetch');
      toast.error('No user data available');
    }
  } catch (error: any) {
    console.error('[Settings] Failed to fetch user:', JSON.stringify(error, null, 2));
    toast.error('Failed to load profile data');
  }
});

const handleProfileUpdate = async () => {
  try {
    profileLoading.value = true;
    console.log('[Settings] Updating profile with:', JSON.stringify(profile.value, null, 2));
    await userStore.updateProfile({
      name: profile.value.name,
      username: profile.value.username,
      phone: profile.value.phone,
      age: profile.value.age,
    });
    toast.success('Profile updated successfully!');
  } catch (error: any) {
    console.error('[Settings] Profile update failed:', JSON.stringify(error, null, 2));
    const errorMessage = error.response?.data?.errors
      ? Object.values(error.response.data.errors).flat().join(', ')
      : 'Failed to update profile';
    toast.error(errorMessage);
  } finally {
    profileLoading.value = false;
  }
};

const handlePasswordUpdate = async () => {
  try {
    passwordLoading.value = true;
    console.log('[Settings] Updating password');
    await userStore.updatePassword(password.value);
    password.value = { current_password: '', password: '', password_confirmation: '' };
    toast.success('Password updated successfully!');
    router.push('/dashboard');
  } catch (error: any) {
    console.error('[Settings] Password update failed:', JSON.stringify(error, null, 2));
    const errorMessage = error.response?.data?.errors
      ? Object.values(error.response.data.errors).flat().join(', ')
      : 'Failed to update password';
    toast.error(errorMessage);
  } finally {
    passwordLoading.value = false;
  }
};
</script>