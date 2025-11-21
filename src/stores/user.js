import { defineStore } from 'pinia';
import api from '@/services/api';
export const useUserStore = defineStore('user', {
    state: () => ({
        dashboard: null,
        user: null,
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
                const response = await api.get('/user');
                console.log('[User Store] Raw /user response:', JSON.stringify(response, null, 2));
                console.log('[User Store] Extracted user data:', JSON.stringify(response.data, null, 2));
                this.user = response.data;
                return response.data;
            }
            catch (error) {
                console.error("[User Store] Fetch user failed:", JSON.stringify(error, null, 2));
                throw error;
            }
        },
        async fetchDashboard() {
            try {
                console.log('[User Store] Fetching dashboard...');
                const { data } = await api.get('/dashboard');
                console.log('[User Store] Dashboard fetched successfully:', JSON.stringify(data, null, 2));
                this.dashboard = data.data;
                this.user = data.data.user;
                return data;
            }
            catch (error) {
                console.error("[User Store] Fetch dashboard failed:", JSON.stringify(error, null, 2));
                throw error;
            }
        },
        async fetchBalance() {
            try {
                const { data } = await api.get('/wallet/balance');
                if (this.dashboard) {
                    this.dashboard.balance = data.data.balance;
                }
                return data;
            }
            catch (error) {
                console.error("[User Store] Fetch balance failed:", error);
                throw error;
            }
        },
        async purchasePlan(planId) {
            try {
                console.log('[User Store] Purchasing plan:', planId);
                const { data } = await api.post(`/plans/${planId}/purchase`);
                console.log('[User Store] Plan purchase successful:', data);
                await this.fetchDashboard();
                return data;
            }
            catch (error) {
                console.error("[User Store] Plan purchase failed:", error);
                throw error;
            }
        },
        async fetchPlans() {
            try {
                console.log('[User Store] Fetching plans...');
                const { data } = await api.get('/plans');
                console.log('[User Store] Plans fetched successfully:', data);
                return data.data;
            }
            catch (error) {
                console.error("[User Store] Fetch plans failed:", error);
                throw error;
            }
        },
        async updateProfile(profile) {
            try {
                console.log('[User Store] Updating profile:', profile);
                const { data } = await api.put('/profile', profile);
                console.log('[User Store] Profile updated successfully:', data);
                this.user = data.data;
                if (this.dashboard) {
                    this.dashboard.user = data.data;
                }
                return data;
            }
            catch (error) {
                console.error("[User Store] Profile update failed:", error);
                throw error;
            }
        },
        async updatePassword(passwordData) {
            try {
                console.log('[User Store] Updating password');
                const { data } = await api.put('/password', passwordData);
                console.log('[User Store] Password updated successfully:', data);
                return data;
            }
            catch (error) {
                console.error("[User Store] Password update failed:", error);
                throw error;
            }
        },
    },
});
