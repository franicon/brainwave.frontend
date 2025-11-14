<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700">
    <div class="w-full max-w-md">
      <div class="card bg-white/95 dark:bg-navy-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in">
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-heading">
            Verify Account
          </h1>
          <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <form @submit.prevent="verifyOtp" class="space-y-6">
          <input v-model="otp" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder="000000" required
            class="mx-auto block w-64 h-16 text-center text-3xl font-semibold tracking-widest rounded-xl border-2 border-neutral-300 dark:border-neutral-700 
                   bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 
                   outline-none transition-all duration-200 placeholder:text-neutral-400" />

          <button type="submit" :disabled="loading"
            class="w-full py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-pink-600 to-pink-500 
                   hover:from-pink-700 hover:to-pink-600 active:scale-95 disabled:opacity-70 
                   shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3">
            <font-awesome-icon v-if="loading" icon="spinner" spin class="w-5 h-5" />
            {{ loading ? 'Verifying...' : 'Verify OTP' }}
          </button>

          <button type="button" @click="resendOtp" :disabled="loading"
            class="w-full py-3 text-primary-500 hover:text-primary-600 font-medium transition">
            {{ loading ? 'Sending...' : 'Resend OTP' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Back to
          <router-link to="/login" class="font-medium text-primary-500 hover:text-primary-600 underline underline-offset-2 transition">
            Sign In
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const otp = ref('')
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const userId = localStorage.getItem('pending_user_id') || ''

onMounted(() => {
  if (!userId) {
    toast.error('No verification in progress')
    router.push('/login')
  }
})

const verifyOtp = async () => {
  if (otp.value.length !== 6) {
    toast.error('Enter 6-digit OTP')
    return
  }
  loading.value = true
  try {
    await authStore.verifyOtp(userId, otp.value)
    localStorage.removeItem('pending_user_id')
    toast.success('Verified! Please login.')
    router.push('/login')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Verification failed')
  } finally {
    loading.value = false
  }
}

const resendOtp = async () => {
  loading.value = true
  try {
    await authStore.resendOtp(userId)
    toast.success('OTP resent')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Resend failed')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
</style>