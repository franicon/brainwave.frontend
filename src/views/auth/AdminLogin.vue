<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700 animate-fade-in">
    <div class="card p-8 rounded-3xl w-full max-w-md mx-4 bg-white/80 dark:bg-navy-800/80 backdrop-blur-md shadow-lg">
      <!-- Title -->
      <h2 class="text-3xl font-bold text-center mb-8 text-neutral-900 dark:text-white font-heading">
        Admin Portal
      </h2>

      <!-- Form -->
      <form @submit.prevent="login" class="space-y-6">
        <!-- Email -->
        <div>
          <input
            v-model="form.email"
            type="email"
            placeholder="Admin Email"
            required
            class="w-full rounded-full px-5 py-4 text-lg border border-neutral-300 dark:border-neutral-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 outline-none transition"
          />
        </div>

        <!-- Password with toggle -->
        <div class="relative">
          <input 
            v-model="form.password" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Admin Password" 
            required 
            class="w-full rounded-full px-5 py-4 text-lg pr-12 border border-neutral-300 dark:border-neutral-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 outline-none transition" 
          />
          <button 
            type="button" 
            @click="showPassword = !showPassword" 
            class="absolute inset-y-0 right-4 flex items-center text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
          </button>
        </div>

        <!-- Submit -->
        <button 
          type="submit" 
          :disabled="loading" 
          class="w-full btn-3d btn-3d-border rounded-full py-4 text-lg"
        >
          {{ loading ? 'Signing In...' : 'Admin Sign In' }}
        </button>
      </form>

      <!-- Link -->
      <p class="text-center mt-6 text-neutral-600 dark:text-neutral-400 text-sm">
        Student? 
        <router-link 
          to="/login" 
          class="text-primary-500 hover:text-primary-600 font-medium transition-colors"
        >
          Sign in here
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

const form = ref({ email: '', password: '' });
const loading = ref(false);
const showPassword = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const login = async () => {
  // Basic form validation
  if (!form.value.email || !form.value.password) {
    toast.error('Please enter email and password');
    return;
  }

  try {
    loading.value = true;
    await authStore.adminLogin(form.value);
    toast.success('Admin login successful');
    // Navigation handled in authStore (to /admin/dashboard)
  } catch (error: any) {
    let message = 'Admin login failed';
    
    if (error.response) {
      const status = error.response.status;
      message = error.response.data?.message || message;
      
      if (status === 401) {
        message = 'Invalid credentials. Please try again.';
      } else if (status === 403) {
        message = 'Unauthorized for admin access. Contact support if you believe this is an error.';
      }
    } else if (error.message === 'needs_verification') {
      message = 'Account needs verification. Please check your email.';
      await router.push('/verify-otp');  // Redirect to OTP if needed
    }
    
    toast.error(message);
    console.error('Admin login error:', error);
    // Stay on /admin-login—no redirect
  } finally {
    loading.value = false;
  }
};

// Auth check on mount
onMounted(async () => {
  await authStore.checkAuthStatus();  // Ensure store is hydrated
  
  if (authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      // Already admin → Redirect to dashboard
      toast.info('Welcome back, admin!');
      await router.push('/admin/dashboard');
    } else {
      // Authenticated but not admin → Redirect to user dashboard
      toast.warning('Redirecting to user dashboard...');
      await router.push('/dashboard');
    }
  }
  // Not authenticated → Show form

  // Auto-focus on email input
  const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
  if (emailInput) emailInput.focus();
});
</script>