<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700">
    <div class="w-full max-w-md">
      <div class="card bg-white/95 dark:bg-navy-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in">
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-heading">
            BRAINWAVE
          </h1>
          <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Sign in to continue learning
          </p>
        </div>

        <form @submit.prevent="login" class="space-y-6">
          <input
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            required
            autocomplete="email"
            class="w-full px-5 py-4 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 
                   bg-white dark:bg-neutral-900/50 
                   focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 
                   outline-none transition-all duration-200 
                   placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          />

          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              required
              autocomplete="current-password"
              class="w-full px-5 py-4 pr-14 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 
                     bg-white dark:bg-neutral-900/50 
                     focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 
                     outline-none transition-all duration-200 
                     placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full 
                     text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 
                     hover:bg-neutral-100 dark:hover:bg-neutral-800 
                     transition-all duration-200"
              tabindex="-1"
            >
              <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" class="w-5 h-5" />
            </button>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-4 text-lg font-semibold text-white rounded-full 
                   bg-gradient-to-r from-pink-600 to-pink-500 
                   hover:from-pink-700 hover:to-pink-600 
                   active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed 
                   shadow-lg hover:shadow-xl 
                   transition-all duration-200 
                   flex items-center justify-center gap-3"
          >
            <font-awesome-icon v-if="loading" icon="spinner" spin class="w-5 h-5" />
            <span>{{ loading ? 'Signing In...' : 'Sign In' }}</span>
          </button>
        </form>

        <div class="mt-8 text-center space-y-3">
          <!-- <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Admin?
            <router-link
              to="/admin-login"
              class="font-medium text-primary-500 hover:text-primary-600 
                     underline underline-offset-2 transition-all"
            >
              Admin Portal
            </router-link>
          </p> -->
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            New here?
            <router-link
              to="/signup"
              class="font-medium text-primary-500 hover:text-primary-600 
                     underline underline-offset-2 transition-all"
            >
              Create an account
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const form = ref({ email: '', password: '' })
const loading = ref(false)
const showPassword = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const login = async () => {
  if (!form.value.email || !form.value.password) {
    toast.error('Email and password are required')
    return
  }

  loading.value = true
  try {
    await authStore.login(form.value)
    toast.success('Welcome back!')
    await router.push('/dashboard')
  } catch (error: any) {
    if (error.message === 'needs_verification') {
      toast.info('Check your email for OTP')
      await router.push('/verify-otp')
      return
    }
    const message = error.response?.data?.message || 'Login failed'
    toast.error(message)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await authStore.checkAuthStatus()
  if (authStore.isAuthenticated) {
    await router.push(authStore.isAdmin ? '/admin/dashboard' : '/dashboard')
  } else {
    setTimeout(() => {
      const input = document.querySelector('input[type="email"]') as HTMLInputElement
      input?.focus()
    }, 150)
  }
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>