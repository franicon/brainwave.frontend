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
export declare const useAdminSettingsStore: import("pinia").StoreDefinition<"adminSettings", {
    apiKeys: Record<string, string>;
    loading: boolean;
    passwordLoading: boolean;
    apiKeysLoading: boolean;
    seoLoading: boolean;
    robotsLoading: boolean;
    errors: string[];
    seoSettings: SeoSettings;
}, {}, {
    fetchApiKeys(): Promise<Record<string, string>>;
    updatePassword(currentPassword: string, newPassword: string): Promise<UpdatePasswordResponse>;
    updateApiKeys(keys: ApiKey[]): Promise<UpdateApiKeysResponse>;
    fetchSeoSettings(): Promise<SeoSettings>;
    updateSeoSettings(seoData: Partial<SeoSettings>): Promise<SeoResponse>;
    fetchRobotsTxt(): Promise<string>;
    updateRobotsTxt(content: string): Promise<{
        success: boolean;
        message: string;
    }>;
}>;
