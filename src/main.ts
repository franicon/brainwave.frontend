import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import { configureIcons } from '@/plugins/fontawesome'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loading'
import '@/assets/main.css'

const app = createApp(App)

app.use(Toast, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: true,
})

app.use(createPinia())

const authStore = useAuthStore();
authStore.checkAuthStatus().catch((err) => {
  console.error('Auth hydration failed on startup:', err);
 
});

app.use(router)
configureIcons(app)

const loadingStore = useLoadingStore()


router.beforeEach(async (_to, _from, next) => {
  if (!authStore.user) {
    await authStore.checkAuthStatus();
  }
  loadingStore.start()
  next()
})

router.afterEach(() => {
  loadingStore.stop()
})

app.mount('#app')
