import { defineStore } from 'pinia';
import api from '@/services/api';
import { useAdminStore } from './admin';
export const useAdminCoursesStore = defineStore('adminCourses', {
    state: () => ({
        courses: [],
        currentPage: 1,
        total: 0,
        perPage: 10,
        lastPage: 1,
        loading: false
    }),
    getters: {
        totalCourses: (state) => state.total,
        adminTotalCourses: () => useAdminStore().totalCourses ?? 0
    },
    actions: {
        async fetchCourses(page = 1, filters = {}) {
            this.loading = true;
            try {
                const params = { page, per_page: this.perPage, ...filters };
                const { data } = await api.get('/admin/courses', { params });
                this.courses = data.data.data;
                this.currentPage = data.data.current_page;
                this.total = data.data.total;
                this.perPage = data.data.per_page;
                this.lastPage = data.data.last_page;
                return data.data;
            }
            catch (error) {
                console.error('Failed to fetch courses:', error);
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        async searchCourses(query, otherFilters = {}) {
            const filters = { search: query, ...otherFilters };
            return this.fetchCourses(1, filters);
        },
        async createCourse(data) {
            try {
                const formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                    if ((key === 'thumbnail' || key === 'video_path') && value instanceof File) {
                        formData.append(key, value);
                    }
                    else if (value !== undefined && value !== null && key !== 'thumbnailPreview') {
                        const val = key === 'is_active' ? (value ? '1' : '0') : value;
                        formData.append(key, String(val));
                    }
                });
                const { data: response } = await api.post('/admin/courses', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                await this.fetchCourses(this.currentPage);
                return response.data.course;
            }
            catch (error) {
                console.error('Failed to create course:', error);
                throw error;
            }
        },
        async updateCourse(id, data) {
            try {
                const formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                    if ((key === 'thumbnail' || key === 'video_path') && value instanceof File) {
                        formData.append(key, value);
                    }
                    else if (value !== undefined && value !== null && key !== 'thumbnailPreview') {
                        const val = key === 'is_active' ? (value ? '1' : '0') : value;
                        formData.append(key, String(val));
                    }
                });
                const { data: response } = await api.post(`/admin/courses/${id}?_method=PUT`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                await this.fetchCourses(this.currentPage);
                return response.data.course;
            }
            catch (error) {
                console.error('Failed to update course:', error);
                throw error;
            }
        },
        async deleteCourse(id) {
            try {
                await api.delete(`/admin/courses/${id}`);
                await this.fetchCourses(this.currentPage);
                return true;
            }
            catch (error) {
                console.error('Failed to delete course:', error);
                throw error;
            }
        },
        async nextPage() {
            if (this.currentPage < this.lastPage) {
                return this.fetchCourses(this.currentPage + 1);
            }
        },
        async prevPage() {
            if (this.currentPage > 1) {
                return this.fetchCourses(this.currentPage - 1);
            }
        }
    }
});
