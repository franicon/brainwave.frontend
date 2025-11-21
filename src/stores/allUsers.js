// src/stores/allUsers.ts
import { defineStore } from 'pinia';
import api from '@/services/api';
import { useAdminStore } from './admin';
export const useAllUsersStore = defineStore('allUsers', {
    state: () => ({
        users: [],
        currentPage: 1,
        total: 0,
        perPage: 10,
        lastPage: 1,
        loading: false,
    }),
    getters: {
        totalUsers: (state) => state.total,
        adminTotalUsers: () => useAdminStore().totalUsers ?? 0,
    },
    actions: {
        async fetchUsers(page = 1, filters = {}) {
            this.loading = true;
            try {
                const params = {
                    page,
                    per_page: this.perPage,
                    ...filters // Spread search/status/role/date params
                };
                const { data } = await api.get('/admin/users', { params });
                this.users = data.data.data;
                this.currentPage = data.data.current_page;
                this.total = data.data.total;
                this.perPage = data.data.per_page;
                this.lastPage = data.data.last_page;
                return data.data;
            }
            catch (error) {
                console.error('Failed to fetch users:', error);
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        async searchUsers(query, otherFilters = {}) {
            // Fixed: Build filters object with search
            const filters = { search: query, ...otherFilters };
            return this.fetchUsers(1, filters);
        },
        // Fixed: Typed response for updateUser
        async updateUser(id, data) {
            try {
                const { data: response } = await api.put(`/admin/users/${id}`, data);
                await this.fetchUsers(this.currentPage); // Refresh list
                return response.data.user; // Typed: AdminUser
            }
            catch (error) {
                console.error('Failed to update user:', error);
                throw error;
            }
        },
        async deleteUser(id) {
            try {
                await api.delete(`/admin/users/${id}`);
                await this.fetchUsers(this.currentPage); // Refresh current page
                return true;
            }
            catch (error) {
                console.error('Failed to delete user:', error);
                throw error;
            }
        },
        async nextPage() {
            if (this.currentPage < this.lastPage) {
                return this.fetchUsers(this.currentPage + 1);
            }
        },
        async prevPage() {
            if (this.currentPage > 1) {
                return this.fetchUsers(this.currentPage - 1);
            }
        },
    },
});
