<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="card backdrop-blur">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-neutral-900 dark:text-white">Settings</h1>
        <router-link
          to="/dashboard"
          class="btn-3d"
        >
          Back to Dashboard
        </router-link>
      </div>
    </div>

    <!-- Profile Settings -->
    <div class="card backdrop-blur">
      <form @submit.prevent="handleProfileUpdate" class="space-y-6">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Name</label>
          <input
            v-model="profile.name"
            type="text"
            placeholder="Enter your name"
            required
            class="input"
          />
        </div>

        <!-- Username -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Username</label>
          <input
            v-model="profile.username"
            type="text"
            disabled
            placeholder="Enter your username"
            required
            class="input bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 cursor-not-allowed"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
          <input
            v-model="profile.email"
            type="email"
            disabled
            class="input bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 cursor-not-allowed"
          />
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Phone</label>
          <input
            v-model="profile.phone"
            type="text"
            placeholder="Enter your phone number"
            class="input"
          />
        </div>

        <!-- Age -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Age</label>
          <input
            v-model.number="profile.age"
            type="number"
            min="1"
            placeholder="Enter your age"
            class="input"
          />
        </div>

        <!-- Button -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="submit"
            :disabled="profileLoading"
            class="btn-3d"
          >
            {{ profileLoading ? 'Updating...' : 'Update Profile' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Change Password -->
    <div class="card backdrop-blur">
      <form @submit.prevent="handlePasswordUpdate" class="space-y-6">
        <!-- Current Password -->
        <div class="relative">
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Current Password</label>
          <input
            v-model="password.current_password"
            :type="showCurrentPassword ? 'text' : 'password'"
            placeholder="Enter current password"
            required
            class="input pr-12"
          />
          <font-awesome-icon
            :icon="showCurrentPassword ? 'eye-slash' : 'eye'"
            class="absolute right-3 top-[2.6rem] transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 cursor-pointer"
            @click="showCurrentPassword = !showCurrentPassword"
          />
        </div>

        <!-- New Password -->
        <div class="relative">
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">New Password</label>
          <input
            v-model="password.password"
            :type="showNewPassword ? 'text' : 'password'"
            placeholder="Enter new password"
            required
            class="input pr-12"
          />
          <font-awesome-icon
            :icon="showNewPassword ? 'eye-slash' : 'eye'"
            class="absolute right-3 top-[2.6rem] transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 cursor-pointer"
            @click="showNewPassword = !showNewPassword"
          />
        </div>

        <!-- Confirm New Password -->
        <div class="relative">
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Confirm New Password</label>
          <input
            v-model="password.password_confirmation"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm new password"
            required
            class="input pr-12"
          />
          <font-awesome-icon
            :icon="showConfirmPassword ? 'eye-slash' : 'eye'"
            class="absolute right-3 top-[2.6rem] transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 cursor-pointer"
            @click="showConfirmPassword = !showConfirmPassword"
          />
        </div>

        <!-- Button -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="submit"
            :disabled="passwordLoading"
            class="btn-3d"
          >
            {{ passwordLoading ? 'Updating...' : 'Update Password' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toastification';

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