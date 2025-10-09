<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700 animate-fade-in">
    <div class="card p-8 rounded-3xl w-full max-w-md mx-4 bg-white/80 dark:bg-navy-800/80 backdrop-blur-md shadow-lg">
      <!-- Title -->
      <h2 class="text-3xl font-bold text-center mb-8 text-neutral-900 dark:text-white font-heading">
        Welcome Back
      </h2>

      <!-- Form -->
      <form @submit.prevent="login" class="space-y-6">
        <!-- Email -->
        <div>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            required
            class="w-full rounded-full px-5 py-4 text-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400
                   focus:border-pink-500 focus:ring-2 focus:ring-pink-600 transition-all outline-none"
          />
        </div>

        <!-- Password with toggle -->
        <div class="relative">
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            required
            class="w-full rounded-full px-5 py-4 text-lg pr-12 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400
                   focus:border-pink-300 focus:ring-2 focus:ring-pink-300 transition-all outline-none"
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
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="mr-2" />
          {{ loading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>

      <!-- Links -->
      <div class="text-center mt-8 space-y-4">
        <p class="text-neutral-600 dark:text-neutral-400 text-sm">
          Admin? 
          <router-link
            to="/admin-login"
            class="text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            Login here
          </router-link>
        </p>
        <p class="text-neutral-600 dark:text-neutral-400 text-sm">
          New here? 
          <router-link
            to="/signup"
            class="text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            Create an account
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
  try {
    loading.value = true
    await authStore.login(form.value)
    router.push('/dashboard')
    toast.success('Login successful')
  } catch (error: any) {
    if (error.message === 'needs_verification') {
      router.push('/verify-otp')
      toast.info('Account not verified. Please check your OTP.')
      return
    }
    const message = error.response?.data?.message || 'Login failed'
    toast.error(message)
  } finally {
    loading.value = false
  }
}
</script>
