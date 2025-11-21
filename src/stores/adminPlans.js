import { defineStore } from 'pinia';
import api from '@/services/api';
import { useAdminStore } from './admin';
export const useAdminPlansStore = defineStore('adminPlans', {
    state: () => ({
        plans: [],
        currentPage: 1,
        total: 0,
        perPage: 10,
        lastPage: 1,
        loading: false,
    }),
    getters: {
        totalPlans: (state) => state.total,
        adminTotalPlans: () => useAdminStore().totalPlans ?? 0,
    },
    actions: {
        async fetchPlans(page = 1, filters = {}) {
            this.loading = true;
            try {
                const params = {
                    page,
                    per_page: this.perPage,
                    ...filters
                };
                const { data } = await api.get('/admin/plans', { params });
                this.plans = data.data.data;
                this.currentPage = data.data.current_page;
                this.total = data.data.total;
                this.perPage = data.data.per_page;
                this.lastPage = data.data.last_page;
                return data.data;
            }
            catch (error) {
                console.error('Failed to fetch plans:', error);
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        async searchPlans(query, otherFilters = {}) {
            const filters = { search: query, ...otherFilters };
            return this.fetchPlans(1, filters);
        },
        async createPlan(data) {
            try {
                const payload = {
                    name: data.name || '',
                    price: data.price !== undefined ? Number(data.price) : 0,
                    is_active: data.is_active !== undefined ? data.is_active : true,
                    features: Array.isArray(data.features) ? data.features : [],
                };
                if (data.discounted_price !== undefined && data.discounted_price !== null) {
                    payload.discounted_price = Number(data.discounted_price);
                }
                const { data: response } = await api.post('/admin/plans', payload);
                await this.fetchPlans(this.currentPage);
                return response.data.plan;
            }
            catch (error) {
                console.error('Failed to create plan:', error);
                throw error;
            }
        },
        async updatePlan(id, data) {
            try {
                const payload = {
                    name: data.name || '',
                    price: data.price !== undefined ? Number(data.price) : 0,
                    is_active: data.is_active !== undefined ? data.is_active : true,
                    features: Array.isArray(data.features) ? data.features : [],
                };
                if (data.discounted_price !== undefined && data.discounted_price !== null) {
                    payload.discounted_price = Number(data.discounted_price);
                }
                const { data: response } = await api.put(`/admin/plans/${id}`, payload);
                await this.fetchPlans(this.currentPage);
                return response.data.plan;
            }
            catch (error) {
                console.error('Failed to update plan:', error);
                throw error;
            }
        },
        async deletePlan(id) {
            try {
                await api.delete(`/admin/plans/${id}`);
                await this.fetchPlans(this.currentPage);
                return true;
            }
            catch (error) {
                console.error('Failed to delete plan:', error);
                throw error;
            }
        },
        async nextPage() {
            if (this.currentPage < this.lastPage) {
                return this.fetchPlans(this.currentPage + 1);
            }
        },
        async prevPage() {
            if (this.currentPage > 1) {
                return this.fetchPlans(this.currentPage - 1);
            }
        },
    },
});
