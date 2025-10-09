<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700 animate-fade-in">
    <div class="card p-8 rounded-3xl w-full max-w-md mx-4 bg-white/80 dark:bg-navy-800/80 backdrop-blur-md shadow-lg">

      <!-- Step 1: Signup -->
      <div v-if="step === 1">
        <h2 class="text-3xl font-bold text-center mb-8 text-neutral-900 dark:text-white font-heading">
          Create Account
        </h2>

        <form @submit.prevent="submitSignup" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <input v-model="form.name" type="text" placeholder="Full Name" required class="w-full rounded-full px-5 py-4 text-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 transition-all outline-none" />
          </div>

          <div>
            <input v-model="form.username" type="text" placeholder="Username" required class="w-full rounded-full px-5 py-4 text-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 transition-all outline-none" />
          </div>

          <div>
            <input v-model="form.email" type="email" placeholder="Email Address" required class="w-full rounded-full px-5 py-4 text-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 transition-all outline-none" />
          </div>

          <div>
            <input v-model="form.phone" type="tel" placeholder="Phone Number" required class="w-full rounded-full px-5 py-4 text-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 transition-all outline-none" />
          </div>

          <div>
            <input v-model="form.age" type="number" placeholder="Age (min 18)" min="18" required class="w-full rounded-full px-5 py-4 text-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 transition-all outline-none" />
          </div>

          <div class="md:col-span-2 relative">
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Password (min 8 chars)" minlength="8" required class="w-full rounded-full px-5 py-4 text-lg pr-12 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 transition-all outline-none" />
            <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-4 flex items-center text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
              <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
            </button>
          </div>

          <div class="md:col-span-2 relative">
            <input v-model="form.password_confirmation" :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm Password" required class="w-full rounded-full px-5 py-4 text-lg pr-12 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 transition-all outline-none" />
            <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-4 flex items-center text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
              <font-awesome-icon :icon="showConfirmPassword ? 'eye-slash' : 'eye'" />
            </button>
          </div>

          <div class="md:col-span-2">
            <button type="submit" :disabled="loading" class="w-full btn-3d btn-3d-border rounded-full py-4 text-lg">
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </div>
        </form>

        <p class="text-center mt-6 text-neutral-600 dark:text-neutral-400 text-sm">
          Already have an account? 
          <router-link to="/login" class="text-primary-500 hover:text-primary-600 font-medium transition-colors">
            Sign in
          </router-link>
        </p>
      </div>

      <!-- Step 2: OTP Verification -->
      <div v-else>
        <h2 class="text-3xl font-bold text-center mb-6 text-neutral-900 dark:text-white font-heading">Verify OTP</h2>
        <p class="text-center text-neutral-600 dark:text-neutral-400 mb-6 text-sm">
          Enter the 6-digit code sent to {{ form.email }}
        </p>
        <form @submit.prevent="verifyOtp" class="space-y-6">
          <div>
            <input v-model="otp" type="text" placeholder="6-digit OTP" maxlength="6" required class="w-full rounded-full px-5 py-4 text-2xl text-center tracking-widest border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-600 transition-all outline-none" />
          </div>
          <button type="submit" :disabled="loading" class="w-full btn-3d btn-3d-border rounded-full py-4 text-lg">
            {{ loading ? 'Verifying...' : 'Verify OTP' }}
          </button>
          <button type="button" @click="resendOtp" :disabled="loading" class="w-full text-primary-500 hover:text-primary-600 font-medium transition-colors py-3">
            {{ loading ? 'Sending...' : 'Resend OTP' }}
          </button>
        </form>
        <p class="text-center mt-6 text-neutral-600 dark:text-neutral-400 text-sm">
          Have an account? 
          <router-link to="/login" class="text-primary-500 hover:text-primary-600 font-medium transition-colors">
            Sign in
          </router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const form = ref({ name: '', username: '', email: '', phone: '', age: '', password: '', password_confirmation: '' });
const otp = ref('');
const step = ref(1);
const loading = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const pendingUserId = ref<string | null>(localStorage.getItem('pending_user_id'));

const showPassword = ref(false);
const showConfirmPassword = ref(false);

watch(() => form.value.email, () => {
  if (step.value === 2) otp.value = '';
});

const submitSignup = async () => {
  if (form.value.password !== form.value.password_confirmation) {
    toast.error('Passwords do not match');
    return;
  }

  try {
    loading.value = true;

    const payload = {
      ...form.value,
      age: Number(form.value.age),
    };

    await authStore.signup(payload);

    pendingUserId.value = localStorage.getItem('pending_user_id');
    if (!pendingUserId.value) {
      toast.error('Failed to get pending user ID. Please try again.');
      return;
    }

    step.value = 2;
    toast.success('OTP sent to your email');
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Signup failed');
  } finally {
    loading.value = false;
  }
};


const verifyOtp = async () => {
  if (!pendingUserId.value) {
    toast.error('No pending user ID found. Please signup again.');
    return;
  }

  if (otp.value.length !== 6) {
    toast.error('Enter a valid 6-digit OTP');
    return;
  }

  try {
    loading.value = true;
    await authStore.verifyOtp(pendingUserId.value, otp.value);
    router.push('/login');
    toast.success('Account verified! Please login.');
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Verification failed');
  } finally {
    loading.value = false;
  }
};

const resendOtp = async () => {
  if (!pendingUserId.value) {
    toast.error('No pending user ID found. Please signup again.');
    return;
  }

  try {
    loading.value = true;
    await authStore.resendOtp(pendingUserId.value);
    toast.success('OTP resent successfully');
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Resend failed');
  } finally {
    loading.value = false;
  }
};
</script>
