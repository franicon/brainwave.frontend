// src/stores/adminSettings.ts
import { defineStore } from 'pinia';
import api from '@/services/api';
import { useToast } from 'vue-toastification';
export const useAdminSettingsStore = defineStore('adminSettings', {
    state: () => ({
        apiKeys: {},
        loading: false,
        passwordLoading: false,
        apiKeysLoading: false,
        seoLoading: false,
        robotsLoading: false,
        errors: [],
        seoSettings: {},
    }),
    actions: {
        async fetchApiKeys() {
            this.loading = true;
            try {
                const { data } = await api.get('/admin/settings/api-keys');
                this.apiKeys = data.data;
                return data.data;
            }
            catch (error) {
                this.errors = error.response?.data?.errors || ['Failed to fetch API keys'];
                useToast().error('Failed to fetch API keys');
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        async updatePassword(currentPassword, newPassword) {
            this.passwordLoading = true;
            this.errors = [];
            try {
                const { data } = await api.put('/admin/settings/password', {
                    current_password: currentPassword,
                    new_password: newPassword,
                    new_password_confirmation: newPassword,
                });
                useToast().success(data.message);
                return data;
            }
            catch (error) {
                this.errors = error.response?.data?.errors || ['Failed to update password'];
                useToast().error('Failed to update password');
                throw error;
            }
            finally {
                this.passwordLoading = false;
            }
        },
        async updateApiKeys(keys) {
            this.apiKeysLoading = true;
            this.errors = [];
            try {
                const { data } = await api.put('/admin/settings/api-keys', { keys });
                useToast().success(data.message);
                await this.fetchApiKeys();
                return data;
            }
            catch (error) {
                this.errors = error.response?.data?.errors || ['Failed to update API keys'];
                useToast().error('Failed to update API keys');
                throw error;
            }
            finally {
                this.apiKeysLoading = false;
            }
        },
        async fetchSeoSettings() {
            this.seoLoading = true;
            try {
                const { data } = await api.get('/admin/settings/seo');
                this.seoSettings = data.data;
                if (!this.seoSettings.sitemap_options) {
                    this.seoSettings.sitemap_options = { pages: true, posts: true, categories: true, images: false };
                }
                return data.data;
            }
            catch (error) {
                this.errors = error.response?.data?.errors || ['Failed to fetch SEO settings'];
                useToast().error('Failed to fetch SEO settings');
                throw error;
            }
            finally {
                this.seoLoading = false;
            }
        },
        async updateSeoSettings(seoData) {
            this.seoLoading = true;
            this.errors = [];
            try {
                const { data } = await api.put('/admin/settings/seo', seoData);
                useToast().success(data.message);
                await this.fetchSeoSettings();
                return data;
            }
            catch (error) {
                this.errors = error.response?.data?.errors || ['Failed to update SEO settings'];
                useToast().error('Failed to update SEO settings');
                throw error;
            }
            finally {
                this.seoLoading = false;
            }
        },
        async fetchRobotsTxt() {
            this.robotsLoading = true;
            try {
                const { data } = await api.get('/admin/settings/robots');
                return data.data;
            }
            catch (error) {
                this.errors = error.response?.data?.errors || ['Failed to fetch robots.txt'];
                useToast().error('Failed to fetch robots.txt');
                throw error;
            }
            finally {
                this.robotsLoading = false;
            }
        },
        async updateRobotsTxt(content) {
            this.robotsLoading = true;
            this.errors = [];
            try {
                const { data } = await api.put('/admin/settings/robots', { content });
                useToast().success(data.message);
                return data;
            }
            catch (error) {
                this.errors = error.response?.data?.errors || ['Failed to update robots.txt'];
                useToast().error('Failed to update robots.txt');
                throw error;
            }
            finally {
                this.robotsLoading = false;
            }
        },
    },
});
