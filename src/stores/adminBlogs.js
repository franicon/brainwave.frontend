import { defineStore } from 'pinia';
import api from '@/services/api';
export const useAdminBlogsStore = defineStore('adminBlogs', {
    state: () => ({
        blogs: [],
        currentPage: 1,
        total: 0,
        perPage: 10,
        lastPage: 1,
        loading: false
    }),
    getters: {
        totalBlogs: (state) => state.total,
    },
    actions: {
        async fetchBlogs(page = 1, filters = {}) {
            this.loading = true;
            try {
                const params = { page, per_page: this.perPage, ...filters };
                const { data } = await api.get('/admin/blogs', { params });
                this.blogs = data.data.data;
                this.currentPage = data.data.current_page;
                this.total = data.data.total;
                this.perPage = data.data.per_page;
                this.lastPage = data.data.last_page;
                return data.data;
            }
            catch (error) {
                console.error('Failed to fetch blogs:', error);
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        async searchBlogs(query, otherFilters = {}) {
            const filters = { search: query, ...otherFilters };
            return this.fetchBlogs(1, filters);
        },
        async createBlog(data) {
            try {
                const formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== undefined &&
                        value !== null &&
                        key !== 'imagePreview' &&
                        typeof value !== 'boolean' &&
                        typeof value !== 'function') {
                        if (key === 'image' &&
                            typeof File !== 'undefined' &&
                            value instanceof File) {
                            formData.append(key, value);
                        }
                        else {
                            formData.append(key, String(value));
                        }
                    }
                });
                const { data: response } = await api.post('/admin/blogs', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                await this.fetchBlogs(this.currentPage);
                return response.data.blog;
            }
            catch (error) {
                console.error('Failed to create blog:', error);
                throw error;
            }
        },
        async updateBlog(id, data) {
            try {
                const formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== undefined &&
                        value !== null &&
                        key !== 'imagePreview' &&
                        typeof value !== 'boolean' &&
                        typeof value !== 'function') {
                        if (key === 'image' &&
                            typeof File !== 'undefined' &&
                            value instanceof File) {
                            formData.append(key, value);
                        }
                        else {
                            formData.append(key, String(value));
                        }
                    }
                });
                const { data: response } = await api.post(`/admin/blogs/${id}?_method=PUT`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                await this.fetchBlogs(this.currentPage);
                return response.data.blog;
            }
            catch (error) {
                console.error('Failed to update blog:', error);
                throw error;
            }
        },
        async deleteBlog(id) {
            try {
                await api.delete(`/admin/blogs/${id}`);
                await this.fetchBlogs(this.currentPage);
                return true;
            }
            catch (error) {
                console.error('Failed to delete blog:', error);
                throw error;
            }
        },
        async nextPage() {
            if (this.currentPage < this.lastPage) {
                return this.fetchBlogs(this.currentPage + 1);
            }
        },
        async prevPage() {
            if (this.currentPage > 1) {
                return this.fetchBlogs(this.currentPage - 1);
            }
        }
    }
});
