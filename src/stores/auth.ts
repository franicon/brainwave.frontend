import { defineStore } from 'pinia';
import router from '@/router';
import api from '@/services/api';

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
      phone?: string;
      age?: number;
      is_verified: boolean;
      email_verified_at?: string;
      status: string;
      is_admin: boolean;
      created_at: string;
      updated_at: string;
    };
    token?: string;
    needs_verification?: boolean;
  };
}

export interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  age?: number;
  is_verified: boolean;
  email_verified_at?: string;
  status: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null as UserProfile | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    isAdmin: (state) => state.user?.is_admin || false,
  },
  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        console.log('[Auth Store] Attempting login with:', credentials.email);
        const { data } = await api.post<AuthResponse>('/login', credentials);
        
        if (data.data.needs_verification) {
          const userId = data.data.user.id.toString();
          localStorage.setItem('pending_user_id', userId);
          console.log('[Auth Store] Verification needed for user:', userId);
          await router.push('/verify-otp');
          throw new Error('needs_verification');
        }
        
        console.log('[Auth Store] Login successful. API response:', data);
        
        this.token = data.data.token as string; 
        localStorage.setItem('token', this.token);
        
        // Use response user as initial, then fetch full profile for consistency
        this.user = data.data.user;
        await this.fetchUserProfile();  // Ensures latest data
        
        console.log('[Auth Store] Navigating to dashboard...');
        await router.push('/dashboard');

      } catch (error: any) {
        console.error("[Auth Store] Login failed:", error);
        throw error; 
      }
    },

    async adminLogin(credentials: { email: string; password: string }) {
      try {
        console.log('[Auth Store] Attempting admin login with:', credentials.email);
        const { data } = await api.post<AuthResponse>('/admin/login', credentials);
        
        console.log('[Auth Store] Admin login successful. API response:', data);
        
        this.token = data.data.token as string; 
        localStorage.setItem('token', this.token);
        
        // Use response user as initial, then fetch full profile
        this.user = data.data.user;
        await this.fetchUserProfile();
        
        await new Promise(resolve => setTimeout(resolve, 100));  // Reactivity delay
        
        console.log('[Auth Store] Navigating to admin dashboard...');
        await router.push('/admin/dashboard');

      } catch (error: any) {
        console.error("[Auth Store] Admin login failed:", error);
        await router.push('/admin-login');  // Stay on admin login
        throw error; 
      }
    },

    async signup(data: {
      name: string;
      username: string;
      email: string;
      phone: string;
      age: number;
      password: string;
      password_confirmation: string;
    }) {
      try {
        console.log('[Auth Store] Attempting signup with:', data.email);
        const { data: responseData } = await api.post<AuthResponse>('/signup', data);
        
        console.log('[Auth Store] Signup successful. Response:', responseData);
        const userId = responseData.data.user.id.toString();
        localStorage.setItem('pending_user_id', userId);
        
        await router.push('/verify-otp');
        
        return responseData;
      } catch (error: any) {
        console.error("[Auth Store] Signup failed:", error);
        throw error;
      }
    },

    async verifyOtp(userId: string, otp: string) {
      try {
        if (!userId) {
          throw new Error('User ID is required');
        }
        console.log('[Auth Store] Attempting OTP verification for user:', userId);
        const { data } = await api.post<AuthResponse>(`/verify-otp/${userId}`, { otp });
        
        console.log('[Auth Store] OTP verification successful. Response:', data);
        localStorage.removeItem('pending_user_id');
        
        // Fetch full profile after verification
        await this.fetchUserProfile();
        
        await router.push('/login');
        
        return data;
      } catch (error: any) {
        console.error("[Auth Store] OTP verification failed:", error);
        throw error;
      }
    },

    async resendOtp(userId: string) {
      try {
        if (!userId) {
          throw new Error('User ID is required');
        }
        console.log('[Auth Store] Resending OTP for user:', userId);
        const { data } = await api.post(`/resend-otp/${userId}`);
        
        console.log('[Auth Store] OTP resent successful. Response:', data);
        return data;
      } catch (error: any) {
        console.error("[Auth Store] OTP resend failed:", error);
        throw error;
      }
    },

    async fetchUserProfile() {
      try {
        console.log('[Auth Store] Fetching user profile...');
        const { data } = await api.get<UserProfile>('/user');
        this.user = data;
        console.log('[Auth Store] User profile fetched:', this.user);
        return data;
      } catch (error: any) {
        console.error("[Auth Store] Fetch user profile failed:", error);
        if (error.response?.status === 401) {
          this.logout();
        } else if (error.response?.status === 403) {
          this.user = null;  // Clear user but keep token for retry
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
      } else if (!token || !this.user) {
        this.token = null;
        this.user = null;
      }
      console.log('[Auth Store] Is authenticated:', this.isAuthenticated, 'Is admin:', this.isAdmin);
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