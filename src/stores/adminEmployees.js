import { defineStore } from 'pinia';
import api from '@/services/api';
export const useAdminEmployeesStore = defineStore('adminEmployees', {
    state: () => ({
        employees: [],
        currentPage: 1,
        total: 0,
        perPage: 10,
        lastPage: 1,
        loading: false,
    }),
    getters: {
        totalEmployees: (state) => state.total,
    },
    actions: {
        async fetchEmployees(page = 1, filters = {}) {
            this.loading = true;
            try {
                const params = {
                    page,
                    per_page: this.perPage,
                    ...filters
                };
                const { data } = await api.get('/admin/employees', { params });
                this.employees = data.data.data;
                this.currentPage = data.data.current_page;
                this.total = data.data.total;
                this.perPage = data.data.per_page;
                this.lastPage = data.data.last_page;
                return data.data;
            }
            catch (error) {
                console.error('Failed to fetch employees:', error);
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        async searchEmployees(query, otherFilters = {}) {
            const filters = { search: query, ...otherFilters };
            return this.fetchEmployees(1, filters);
        },
        async createEmployee(data) {
            try {
                const { data: response } = await api.post('/admin/employees', data);
                await this.fetchEmployees(this.currentPage);
                return response.data.user;
            }
            catch (error) {
                console.error('Failed to create employee:', error);
                throw error;
            }
        },
        async updateEmployee(id, data) {
            try {
                const { data: response } = await api.put(`/admin/employees/${id}`, data);
                await this.fetchEmployees(this.currentPage);
                return response.data.user;
            }
            catch (error) {
                console.error('Failed to update employee:', error);
                throw error;
            }
        },
        async deleteEmployee(id) {
            try {
                await api.delete(`/admin/employees/${id}`);
                await this.fetchEmployees(this.currentPage);
                return true;
            }
            catch (error) {
                console.error('Failed to delete employee:', error);
                throw error;
            }
        },
        async nextPage() {
            if (this.currentPage < this.lastPage) {
                return this.fetchEmployees(this.currentPage + 1);
            }
        },
        async prevPage() {
            if (this.currentPage > 1) {
                return this.fetchEmployees(this.currentPage - 1);
            }
        },
    },
});
