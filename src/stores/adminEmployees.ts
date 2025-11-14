import { defineStore } from 'pinia';
import api from '@/services/api';

export interface AdminEmployee {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  age?: number;
  is_verified: boolean;
  status: string;
  is_admin: number;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

export interface EmployeesResponse {
  success: boolean;
  message: string;
  data: {
    data: AdminEmployee[];
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  };
}

export interface UpdateEmployeeResponse {
  success: boolean;
  message: string;
  data: {
    user: AdminEmployee;
  };
}

export const useAdminEmployeesStore = defineStore('adminEmployees', {
  state: () => ({
    employees: [] as AdminEmployee[],
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
    async fetchEmployees(page = 1, filters: Record<string, any> = {}) {
      this.loading = true;
      try {
        const params = { 
          page, 
          per_page: this.perPage, 
          ...filters
        };
        const { data } = await api.get<EmployeesResponse>('/admin/employees', { params });
        this.employees = data.data.data;
        this.currentPage = data.data.current_page;
        this.total = data.data.total;
        this.perPage = data.data.per_page;
        this.lastPage = data.data.last_page;
        return data.data;
      } catch (error) {
        console.error('Failed to fetch employees:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async searchEmployees(query: string, otherFilters: Record<string, any> = {}) {
      const filters = { search: query, ...otherFilters };
      return this.fetchEmployees(1, filters);
    },

    async createEmployee(data: {
      name: string;
      username: string;
      email: string;
      phone: string;
      age: number;
      password: string;
      permissions: string[];
    }) {
      try {
        const { data: response } = await api.post<UpdateEmployeeResponse>('/admin/employees', data);
        await this.fetchEmployees(this.currentPage);
        return response.data.user;
      } catch (error) {
        console.error('Failed to create employee:', error);
        throw error;
      }
    },

    async updateEmployee(id: number, data: Partial<{
      name: string;
      username: string;
      email: string;
      phone: string;
      age: number;
      password?: string;
      permissions: string[];
    }>) {
      try {
        const { data: response } = await api.put<UpdateEmployeeResponse>(`/admin/employees/${id}`, data);
        await this.fetchEmployees(this.currentPage);
        return response.data.user;
      } catch (error) {
        console.error('Failed to update employee:', error);
        throw error;
      }
    },

    async deleteEmployee(id: number) {
      try {
        await api.delete(`/admin/employees/${id}`);
        await this.fetchEmployees(this.currentPage);
        return true;
      } catch (error) {
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