import { defineStore } from 'pinia';
import api from '@/services/api';

export interface AdminDashboardData {
  total_users: number;
  total_revenue: number;
  active_subscriptions: number;
  total_courses: number;
  pending_enrollments: number;
  monthly_revenue: number[]; 
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useAdminStore = defineStore('admin', {
  state: () => ({
    dashboard: null as AdminDashboardData | null,
    loading: false,
  }),
  getters: {
    totalUsers: (state) => state.dashboard?.total_users ?? 0,
    totalRevenue: (state) => state.dashboard?.total_revenue ?? 0,
    activeSubscriptions: (state) => state.dashboard?.active_subscriptions ?? 0,
    totalCourses: (state) => state.dashboard?.total_courses ?? 0,
    pendingEnrollments: (state) => state.dashboard?.pending_enrollments ?? 0,
    monthlyRevenue: (state) => state.dashboard?.monthly_revenue ?? [],
  },
  actions: {
    async fetchDashboard() {
      this.loading = true;
      try {
        const { data } = await api.get<ApiResponse<AdminDashboardData>>('/admin/dashboard');
        this.dashboard = data.data;
        return data.data;
      } catch (error) {
        console.error('Failed to fetch admin dashboard', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});