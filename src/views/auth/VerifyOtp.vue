<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700 animate-fade-in">
    <div class="card w-full max-w-md mx-4 p-6 bg-white/80 dark:bg-navy-800/80 backdrop-blur-md rounded-3xl shadow-lg">
      <!-- Title -->
      <h2 class="text-3xl font-bold text-center mb-6 text-neutral-900 dark:text-white font-heading">
        Verify Account
      </h2>
      <p class="text-center text-neutral-600 dark:text-neutral-400 mb-8 text-sm">
        Enter the 6-digit OTP sent to your email
      </p>
      
      <!-- Form -->
      <form @submit.prevent="verifyOtp" class="space-y-6">
        <!-- OTP Input -->
        <div class="flex justify-center">
          <input
            v-model="otp"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            placeholder="Enter 6-digit OTP"
            maxlength="6"
            required
            class="w-64 h-14 text-center text-2xl font-semibold rounded-xl border border-neutral-300 dark:border-neutral-600 
                   focus:border-pink-500 focus:ring-2 focus:ring-pink-600 focus:outline-none 
                   bg-white dark:bg-neutral-800 transition"
          />
        </div>

        <!-- Verify -->
        <button 
          type="submit" 
          :disabled="loading" 
          class="w-full btn-3d btn-3d-border rounded-full py-4 text-lg"
        >
          {{ loading ? 'Verifying...' : 'Verify OTP' }}
        </button>

  
       <!-- Resend --> <button type="button" @click="resendOtp" :disabled="loading" class="w-full text-primary-500 hover:text-primary-600 font-medium transition-colors py-3"> {{ loading ? 'Sending...' : 'Resend OTP' }} </button>

      </form>

      <!-- Back link -->
      <p class="text-center mt-6 text-neutral-600 dark:text-neutral-400 text-sm">
        Back to 
        <router-link to="/login" class="text-primary-500 hover:text-primary-600 font-medium transition-colors">
          Sign In
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const otp = ref('');
const loading = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// Safely get pending_user_id from localStorage
const storedUserId = localStorage.getItem('pending_user_id');
const userId = storedUserId ? storedUserId : '';

onMounted(() => {
  if (!userId) {
    toast.error('No pending verification found');
    router.push('/login');
  }
});

const verifyOtp = async () => {
  if (!userId) return; // safety check
  if (otp.value.length !== 6) {
    toast.error('Enter a valid 6-digit OTP');
    return;
  }

  try {
    loading.value = true;
    await authStore.verifyOtp(userId, otp.value);
    toast.success('Account verified! Please login.');
    router.push('/login');
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Verification failed');
  } finally {
    loading.value = false;
  }
};

const resendOtp = async () => {
  if (!userId) return;
  try {
    loading.value = true;
    await authStore.resendOtp(userId);
    toast.success('OTP resent successfully');
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Resend failed');
  } finally {
    loading.value = false;
  }
};
</script>
