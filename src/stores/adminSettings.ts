// src/stores/adminSettings.ts
import { defineStore } from 'pinia';
import api from '@/services/api';
import { useToast } from 'vue-toastification';

export interface ApiKey {
  key_name: string;
  key_value: string;
}

export interface ApiKeysResponse {
  success: boolean;
  message: string;
  data: Record<string, string>;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

export interface UpdateApiKeysResponse {
  success: boolean;
  message: string;
}

export interface SeoSettings {
  id?: number;
  sitemap_options: {
    pages: boolean;
    posts: boolean;
    categories: boolean;
    images: boolean;
  };
  google_search_console_id: string;
  google_analytics_id: string;
  google_tag_manager_id: string;
  facebook_pixel_id: string;
}

export interface SeoResponse {
  success: boolean;
  message: string;
  data: SeoSettings;
}

export const useAdminSettingsStore = defineStore('adminSettings', {
  state: () => ({
    apiKeys: {} as Record<string, string>,
    loading: false,
    passwordLoading: false,
    apiKeysLoading: false,
    seoLoading: false,
    robotsLoading: false,
    errors: [] as string[],
    seoSettings: {} as SeoSettings,
  }),
  actions: {
    async fetchApiKeys() {
      this.loading = true;
      try {
        const { data } = await api.get<ApiKeysResponse>('/admin/settings/api-keys');
        this.apiKeys = data.data;
        return data.data;
      } catch (error: any) {
        this.errors = error.response?.data?.errors || ['Failed to fetch API keys'];
        useToast().error('Failed to fetch API keys');
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async updatePassword(currentPassword: string, newPassword: string) {
      this.passwordLoading = true;
      this.errors = [];
      try {
        const { data } = await api.put<UpdatePasswordResponse>('/admin/settings/password', {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPassword,
        });
        useToast().success(data.message);
        return data;
      } catch (error: any) {
        this.errors = error.response?.data?.errors || ['Failed to update password'];
        useToast().error('Failed to update password');
        throw error;
      } finally {
        this.passwordLoading = false;
      }
    },
    async updateApiKeys(keys: ApiKey[]) {
      this.apiKeysLoading = true;
      this.errors = [];
      try {
        const { data } = await api.put<UpdateApiKeysResponse>('/admin/settings/api-keys', { keys });
        useToast().success(data.message);
        await this.fetchApiKeys();
        return data;
      } catch (error: any) {
        this.errors = error.response?.data?.errors || ['Failed to update API keys'];
        useToast().error('Failed to update API keys');
        throw error;
      } finally {
        this.apiKeysLoading = false;
      }
    },
    async fetchSeoSettings() {
      this.seoLoading = true;
      try {
        const { data } = await api.get<SeoResponse>('/admin/settings/seo');
        this.seoSettings = data.data;
        if (!this.seoSettings.sitemap_options) {
          this.seoSettings.sitemap_options = { pages: true, posts: true, categories: true, images: false };
        }
        return data.data;
      } catch (error: any) {
        this.errors = error.response?.data?.errors || ['Failed to fetch SEO settings'];
        useToast().error('Failed to fetch SEO settings');
        throw error;
      } finally {
        this.seoLoading = false;
      }
    },
    async updateSeoSettings(seoData: Partial<SeoSettings>) {
      this.seoLoading = true;
      this.errors = [];
      try {
        const { data } = await api.put<SeoResponse>('/admin/settings/seo', seoData);
        useToast().success(data.message);
        await this.fetchSeoSettings();
        return data;
      } catch (error: any) {
        this.errors = error.response?.data?.errors || ['Failed to update SEO settings'];
        useToast().error('Failed to update SEO settings');
        throw error;
      } finally {
        this.seoLoading = false;
      }
    },
    async fetchRobotsTxt() {
      this.robotsLoading = true;
      try {
        const { data } = await api.get<{ success: boolean; data: string }>('/admin/settings/robots');
        return data.data;
      } catch (error: any) {
        this.errors = error.response?.data?.errors || ['Failed to fetch robots.txt'];
        useToast().error('Failed to fetch robots.txt');
        throw error;
      } finally {
        this.robotsLoading = false;
      }
    },
    async updateRobotsTxt(content: string) {
      this.robotsLoading = true;
      this.errors = [];
      try {
        const { data } = await api.put<{ success: boolean; message: string }>('/admin/settings/robots', { content });
        useToast().success(data.message);
        return data;
      } catch (error: any) {
        this.errors = error.response?.data?.errors || ['Failed to update robots.txt'];
        useToast().error('Failed to update robots.txt');
        throw error;
      } finally {
        this.robotsLoading = false;
      }
    },
  },
});