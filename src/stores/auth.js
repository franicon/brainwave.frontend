// Updated: src/stores/auth.ts
// Changes: Ensure permissions are always included; log for debugging
import { defineStore } from 'pinia';
import router from '@/router';
import api from '@/services/api';
export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token && !!state.user,
        isAdmin: (state) => state.user && state.user.is_admin > 0,
        isSuperAdmin: (state) => state.user && state.user.is_admin === 1,
        isEmployee: (state) => state.user && state.user.is_admin === 3,
    },
    actions: {
        async login(credentials) {
            try {
                console.log('[Auth Store] Attempting login with:', credentials.email);
                const { data } = await api.post('/login', credentials);
                if (data.data.needs_verification) {
                    const userId = data.data.user.id.toString();
                    localStorage.setItem('pending_user_id', userId);
                    console.log('[Auth Store] Verification needed for user:', userId);
                    await router.push('/verify-otp');
                    throw new Error('needs_verification');
                }
                console.log('[Auth Store] Login successful. API response:', data);
                this.token = data.data.token;
                localStorage.setItem('token', this.token);
                this.user = { ...data.data.user, permissions: data.data.user.permissions || [] }; // Ensure permissions
                console.log('[Auth Store] Initial user set with permissions:', this.user.permissions);
                await this.fetchUserProfile();
                const redirectPath = this.user.is_admin > 0 ? '/admin/dashboard' : '/dashboard';
                console.log('[Auth Store] Navigating to:', redirectPath);
                await router.push(redirectPath);
            }
            catch (error) {
                console.error("[Auth Store] Login failed:", error);
                throw error;
            }
        },
        async adminLogin(credentials) {
            try {
                console.log('[Auth Store] Attempting admin login with:', credentials.email);
                const { data } = await api.post('/admin/login', credentials);
                console.log('[Auth Store] Admin login successful. API response:', data);
                this.token = data.data.token;
                localStorage.setItem('token', this.token);
                this.user = { ...data.data.user, permissions: data.data.user.permissions || [] }; // Ensure permissions
                console.log('[Auth Store] Initial user set with permissions:', this.user.permissions);
                await this.fetchUserProfile();
                await new Promise(resolve => setTimeout(resolve, 100));
                console.log('[Auth Store] Navigating to admin dashboard...');
                await router.push('/admin/dashboard');
            }
            catch (error) {
                console.error("[Auth Store] Admin login failed:", error);
                await router.push('/admin-login'); // Stay on admin login
                throw error;
            }
        },
        async signup(data) {
            try {
                console.log('[Auth Store] Attempting signup with:', data.email);
                const { data: responseData } = await api.post('/signup', data);
                console.log('[Auth Store] Signup successful. Response:', responseData);
                const userId = responseData.data.user.id.toString();
                localStorage.setItem('pending_user_id', userId);
                await router.push('/verify-otp');
                return responseData;
            }
            catch (error) {
                console.error("[Auth Store] Signup failed:", error);
                throw error;
            }
        },
        async verifyOtp(userId, otp) {
            try {
                if (!userId) {
                    throw new Error('User ID is required');
                }
                console.log('[Auth Store] Attempting OTP verification for user:', userId);
                const { data } = await api.post(`/verify-otp/${userId}`, { otp });
                console.log('[Auth Store] OTP verification successful. Response:', data);
                localStorage.removeItem('pending_user_id');
                // Fetch full profile after verification
                await this.fetchUserProfile();
                await router.push('/login');
                return data;
            }
            catch (error) {
                console.error("[Auth Store] OTP verification failed:", error);
                throw error;
            }
        },
        async resendOtp(userId) {
            try {
                if (!userId) {
                    throw new Error('User ID is required');
                }
                console.log('[Auth Store] Resending OTP for user:', userId);
                const { data } = await api.post(`/resend-otp/${userId}`);
                console.log('[Auth Store] OTP resent successful. Response:', data);
                return data;
            }
            catch (error) {
                console.error("[Auth Store] OTP resend failed:", error);
                throw error;
            }
        },
        async fetchUserProfile() {
            try {
                console.log('[Auth Store] Fetching user profile...');
                const { data } = await api.get('/user');
                this.user = { ...data, permissions: data.permissions || [] }; // Ensure permissions
                console.log('[Auth Store] User profile fetched with permissions:', this.user.permissions);
                return data;
            }
            catch (error) {
                console.error("[Auth Store] Fetch user profile failed:", error);
                if (error.response?.status === 401) {
                    this.logout();
                }
                else if (error.response?.status === 403) {
                    this.user = null; // Clear user but keep token for retry
                }
                throw error;
            }
        },
        async checkAuthStatus() {
            console.log('[Auth Store] Checking auth status...');
            const token = localStorage.getItem('token');
            if (token && !this.token) {
                console.log('[Auth Store] Token found in localStorage. Hydrating store.');
                this.token = token;
                await this.fetchUserProfile();
            }
            else if (!token || !this.user) {
                this.token = null;
                this.user = null;
            }
            console.log('[Auth Store] Is authenticated:', this.isAuthenticated, 'Is admin:', this.isAdmin, 'Permissions:', this.user?.permissions);
        },
        logout() {
            console.log('[Auth Store] Logging out user.');
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('pending_user_id');
            router.push('/login');
        },
    },
});
