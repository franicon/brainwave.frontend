import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../views/auth/Login.vue') },
  { path: '/admin-login', component: () => import('../views/auth/AdminLogin.vue') },
  { path: '/signup', component: () => import('../views/auth/Signup.vue') },
  { path: '/verify-otp', component: () => import('../views/auth/VerifyOtp.vue') },
  { 
    path: '/dashboard', 
    component: () => import('../views/dashboard/UserDashboard.vue'),
    meta: { requiresAuth: true, userOnly: true }
  },
  { 
    path: '/admin/dashboard', 
    component: () => import('../views/dashboard/AdminDashboard.vue'),
    meta: { requiresAuth: true, adminOnly: true }
  },
  { path: '/plans', component: () => import('../views/plans/Plans.vue'), meta: { requiresAuth: true, userOnly: true } },
  { path: '/courses', component: () => import('../views/courses/Courses.vue'), meta: { requiresAuth: true, userOnly: true } },
  { path: '/courses/:id', component: () => import('../views/courses/CourseDetail.vue'), meta: { requiresAuth: true, userOnly: true } },
  { path: '/courses/:id/play', component: () => import('../views/courses/CoursePlay.vue'), meta: { requiresAuth: true, userOnly: true } },
  { path: '/wallet', component: () => import('../views/wallet/Wallet.vue'), meta: { requiresAuth: true, userOnly: true } },
  { path: '/settings', component: () => import('../views/Settings.vue'), meta: { requiresAuth: true, userOnly: true } },
  { path: '/admin/courses/create', component: () => import('../views/admin/CourseCreate.vue'), meta: { requiresAuth: true, adminOnly: true } },
  { path: '/admin/users', component: () => import('../views/admin/Users.vue'), meta: { requiresAuth: true, adminOnly: true } },
  { path: '/admin/courses', component: () => import('../views/admin/Courses.vue'), meta: { requiresAuth: true, adminOnly: true } },
  { path: '/admin/plans', component: () => import('../views/admin/Plans.vue'), meta: { requiresAuth: true, adminOnly: true } },
  { path: '/admin/blogs', component: () => import('../views/admin/Blogs.vue'), meta: { requiresAuth: true, adminOnly: true } },
  { path: '/admin/settings', component: () => import('../views/admin/AdminSettings.vue'), meta: { requiresAuth: true, adminOnly: true } },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();
  if (!authStore.user) {
    await authStore.checkAuthStatus();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next(to.path.startsWith('/admin') ? '/admin-login' : '/login');
    return;
  }
  if (to.meta.userOnly && authStore.isAdmin) {
    next('/admin/dashboard');
    return;
  }
  if (to.meta.adminOnly && !authStore.isAdmin) {
    next('/admin-login');
    return;
  }
  next();
});

export default router;