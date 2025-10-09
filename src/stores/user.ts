import { defineStore } from 'pinia';
import api from '@/services/api';

export interface Plan {
  id: number;
  name: string;
  price: number;
  discounted_price?: number;
  features: string[];
  is_active: boolean;
  end_date?: string;
}

export interface Purchase {
  id: number;
  user_id: number;
  plan_id?: number;
  amount_paid: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled';
}

export interface User {
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

export interface DashboardData {
  balance: number;
  active_plan?: Plan;
  purchased_courses: any[]; 
  available_courses: any[]; 
  completed_courses_count: number;
  in_progress_count: number;
  features?: string[];
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    dashboard: null as DashboardData | null,
    user: null as User | null,
  }),
  getters: {
    balance: (state) => state.dashboard?.balance || 0,
    activePlan: (state) => state.dashboard?.active_plan,
    purchasedCourses: (state) => state.dashboard?.purchased_courses || [],
    availableCourses: (state) => state.dashboard?.available_courses || [],
    completedCount: (state) => state.dashboard?.completed_courses_count || 0,
    inProgressCount: (state) => state.dashboard?.in_progress_count || 0,
    features: (state) => state.dashboard?.features || [],
  },
  actions: {
    async fetchUser() {
      try {
        console.log('[User Store] Fetching user...');
        const response = await api.get<User>('/user');
        console.log('[User Store] Raw /user response:', JSON.stringify(response, null, 2));
        console.log('[User Store] Extracted user data:', JSON.stringify(response.data, null, 2));
        this.user = response.data;
        return response.data;
      } catch (error) {
        console.error("[User Store] Fetch user failed:", JSON.stringify(error, null, 2));
        throw error;
      }
    },
    async fetchDashboard() {
      try {
        console.log('[User Store] Fetching dashboard...');
        const { data } = await api.get<ApiResponse<DashboardData>>('/dashboard');
        console.log('[User Store] Dashboard fetched successfully:', JSON.stringify(data, null, 2));
        this.dashboard = data.data;
        this.user = data.data.user;
        return data;
      } catch (error) {
        console.error("[User Store] Fetch dashboard failed:", JSON.stringify(error, null, 2));
        throw error;
      }
    },
    async fetchBalance() {
      try {
        const { data } = await api.get<ApiResponse<{ balance: number }>>('/wallet/balance');
        if (this.dashboard) {
          this.dashboard.balance = data.data.balance;
        }
        return data;
      } catch (error) {
        console.error("[User Store] Fetch balance failed:", error);
        throw error;
      }
    },
   
    async purchasePlan(planId: number) {
      try {
        console.log('[User Store] Purchasing plan:', planId);
        const { data } = await api.post<ApiResponse<Purchase>>(`/plans/${planId}/purchase`);
        console.log('[User Store] Plan purchase successful:', data);
        await this.fetchDashboard();
        return data;
      } catch (error) {
        console.error("[User Store] Plan purchase failed:", error);
        throw error;
      }
    },
    async fetchPlans() {
      try {
        console.log('[User Store] Fetching plans...');
        const { data } = await api.get<ApiResponse<Plan[]>>('/plans');
        console.log('[User Store] Plans fetched successfully:', data);
        return data.data;
      } catch (error) {
        console.error("[User Store] Fetch plans failed:", error);
        throw error;
      }
    },
    async updateProfile(profile: Partial<User>) {
      try {
        console.log('[User Store] Updating profile:', profile);
        const { data } = await api.put<ApiResponse<User>>('/profile', profile);
        console.log('[User Store] Profile updated successfully:', data);
        this.user = data.data;
        if (this.dashboard) {
          this.dashboard.user = data.data;
        }
        return data;
      } catch (error) {
        console.error("[User Store] Profile update failed:", error);
        throw error;
      }
    },
    async updatePassword(passwordData: { current_password: string; password: string; password_confirmation: string }) {
      try {
        console.log('[User Store] Updating password');
        const { data } = await api.put<ApiResponse<null>>('/password', passwordData);
        console.log('[User Store] Password updated successfully:', data);
        return data;
      } catch (error) {
        console.error("[User Store] Password update failed:", error);
        throw error;
      }
    },
  },
});