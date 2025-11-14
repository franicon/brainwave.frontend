<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700">
    <div class="w-full max-w-2xl">
      <div class="bg-white/95 dark:bg-navy-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in">

        <!-- ==== STEP 1 – SIGNUP ==== -->
        <div v-if="step === 1">
          <div class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-heading">
              Create Account
            </h1>
            <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Join us and start learning today
            </p>
          </div>

          <form @submit.prevent="submitSignup" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <input v-model="form.name" type="text" placeholder="Full Name" required
                class="w-full px-5 py-4 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" />
            </div>

            <input v-model="form.username" type="text" placeholder="Username" required
              class="w-full px-5 py-4 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" />

            <input v-model="form.email" type="email" placeholder="Email Address" required
              class="w-full px-5 py-4 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" />

            <input v-model="form.phone" type="tel" placeholder="Phone Number" required
              class="w-full px-5 py-4 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" />

            <input v-model="form.age" type="number" placeholder="Age (min 18)" min="18" required
              class="w-full px-5 py-4 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" />

            <div class="md:col-span-2 relative">
              <input v-model="form.password"
                     :type="showPassword ? 'text' : 'password'"
                     placeholder="Password (min 8)"
                     minlength="8"
                     required
                     class="w-full px-5 py-4 pr-14 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" />
              <EyeToggle v-model="showPassword" />
            </div>

            <div class="md:col-span-2 relative">
              <input v-model="form.password_confirmation"
                     :type="showConfirmPassword ? 'text' : 'password'"
                     placeholder="Confirm Password"
                     required
                     class="w-full px-5 py-4 pr-14 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" />
              <EyeToggle v-model="showConfirmPassword" />
            </div>

            <div class="md:col-span-2">
              <button type="submit"
                      :disabled="loading"
                      class="w-full py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-pink-600 to-pink-500
                             hover:from-pink-700 hover:to-pink-600 active:scale-95 disabled:opacity-70
                             shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3">
                <font-awesome-icon v-if="loading" icon="spinner" spin class="w-5 h-5" />
                {{ loading ? 'Creating...' : 'Create Account' }}
              </button>
            </div>
          </form>

          <p class="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Already have an account?
            <router-link to="/login"
                         class="font-medium text-primary-500 hover:text-primary-600 underline underline-offset-2 transition">
              Sign in
            </router-link>
          </p>
        </div>

        <!-- ==== STEP 2 – OTP ==== -->
        <div v-else>
          <div class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-heading">
              Verify OTP
            </h1>
            <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Code sent to <span class="font-medium">{{ form.email }}</span>
            </p>
          </div>

          <form @submit.prevent="verifyOtp" class="space-y-6">
            <input v-model="otp"
                   type="text"
                   inputmode="numeric"
                   pattern="[0-9]*"
                   maxlength="6"
                   placeholder="000000"
                   required
                   class="mx-auto block w-64 h-16 text-center text-3xl font-semibold tracking-widest rounded-xl
                          border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50
                          focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none
                          transition-all duration-200 placeholder:text-neutral-400" />

            <button type="submit"
                    :disabled="loading"
                    class="w-full py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-pink-600 to-pink-500
                           hover:from-pink-700 hover:to-pink-600 active:scale-95 disabled:opacity-70
                           shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3">
              <font-awesome-icon v-if="loading" icon="spinner" spin class="w-5 h-5" />
              {{ loading ? 'Verifying...' : 'Verify OTP' }}
            </button>

            <button type="button"
                    @click="resendOtp"
                    :disabled="loading"
                    class="w-full py-3 text-primary-500 hover:text-primary-600 font-medium transition">
              {{ loading ? 'Sending...' : 'Resend OTP' }}
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Back to
            <router-link to="/login"
                         class="font-medium text-primary-500 hover:text-primary-600 underline underline-offset-2 transition">
              Sign In
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const form = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
  age: '',
  password: '',
  password_confirmation: ''
})
const otp = ref('')
const step = ref(1)
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const pendingUserId = ref(localStorage.getItem('pending_user_id'))

// Eye-toggle component (typed)
const EyeToggle = defineComponent({
  props: { modelValue: { type: Boolean, required: true } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const toggle = () => emit('update:modelValue', !props.modelValue)
    return { toggle }
  }
})

watch(() => form.value.email, () => (otp.value = ''))

onMounted(() => {
  if (pendingUserId.value) step.value = 2
})

const submitSignup = async () => {
  if (form.value.password !== form.value.password_confirmation) {
    toast.error('Passwords do not match')
    return
  }

  loading.value = true
  try {
    await authStore.signup({ ...form.value, age: Number(form.value.age) })
    pendingUserId.value = localStorage.getItem('pending_user_id')
    if (!pendingUserId.value) throw new Error('No pending user ID')
    step.value = 2
    toast.success('OTP sent!')
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Signup failed')
  } finally {
    loading.value = false
  }
}

const verifyOtp = async () => {
  if (otp.value.length !== 6) {
    toast.error('Enter a 6-digit OTP')
    return
  }
  loading.value = true
  try {
    await authStore.verifyOtp(pendingUserId.value!, otp.value)
    localStorage.removeItem('pending_user_id')
    toast.success('Verified! Please login.')
    router.push('/login')
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Verification failed')
  } finally {
    loading.value = false
  }
}

const resendOtp = async () => {
  loading.value = true
  try {
    await authStore.resendOtp(pendingUserId.value!)
    toast.success('OTP resent')
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Resend failed')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
</style>