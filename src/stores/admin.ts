// src\stores\admin.ts
import { defineStore } from 'pinia';
import api from '@/services/api';

export interface AdminDashboardData {
  total_users: number;
  active_users: number;
  total_revenue: number;
  active_subscriptions: number;
  total_courses: number;
  active_courses: number;
  total_blogs: number;
  active_blogs: number;
  total_enrollments: number;
  pending_enrollments: number;
  total_wallet_balance: number;
  total_plans: number;
  total_transactions: number;
  revenue: number[]; 
  transactions: number[];
  plans_active: number;
  transaction_types: { [key: string]: number };
  top_wallets: { name: string; balance: number }[];
  total_employees: number;
  active_employees: number;
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
    activeUsers: (state) => state.dashboard?.active_users ?? 0,
    totalRevenue: (state) => state.dashboard?.total_revenue ?? 0,
    activeSubscriptions: (state) => state.dashboard?.active_subscriptions ?? 0,
    totalCourses: (state) => state.dashboard?.total_courses ?? 0,
    activeCourses: (state) => state.dashboard?.active_courses ?? 0,
    totalBlogs: (state) => state.dashboard?.total_blogs ?? 0,
    activeBlogs: (state) => state.dashboard?.active_blogs ?? 0,
    totalEnrollments: (state) => state.dashboard?.total_enrollments ?? 0,
    pendingEnrollments: (state) => state.dashboard?.pending_enrollments ?? 0,
    totalWalletBalance: (state) => state.dashboard?.total_wallet_balance ?? 0,
    totalPlans: (state) => state.dashboard?.total_plans ?? 0,
    totalTransactions: (state) => state.dashboard?.total_transactions ?? 0,
    revenue: (state) => state.dashboard?.revenue ?? [],
    transactions: (state) => state.dashboard?.transactions ?? [],
    plansActive: (state) => state.dashboard?.plans_active ?? 0,
    transactionTypes: (state) => state.dashboard?.transaction_types ?? {},
    topWallets: (state) => state.dashboard?.top_wallets ?? [],
    totalEmployees: (state) => state.dashboard?.total_employees ?? 0,
    activeEmployees: (state) => state.dashboard?.active_employees ?? 0,
  },
  actions: {
    async fetchDashboard(params: { from_date?: string; to_date?: string } = {}) {
      this.loading = true;
      try {
        let url = '/admin/dashboard';
        if (params.from_date || params.to_date) {
          const query = new URLSearchParams();
          if (params.from_date) query.append('from_date', params.from_date);
          if (params.to_date) query.append('to_date', params.to_date);
          url += `?${query.toString()}`;
        }
        const { data } = await api.get<ApiResponse<AdminDashboardData>>(url);
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