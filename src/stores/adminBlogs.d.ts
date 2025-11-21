export interface AdminBlog {
    id: number;
    title: string;
    body: string;
    image?: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}
export type AdminBlogForm = Partial<AdminBlog> & {
    image?: File | string | null;
    imagePreview?: string;
};
export interface BlogsResponse {
    success: boolean;
    message: string;
    data: {
        data: AdminBlog[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    };
}
export interface CreateBlogResponse {
    success: boolean;
    message: string;
    data: {
        blog: AdminBlog;
    };
}
export interface UpdateBlogResponse {
    success: boolean;
    message: string;
    data: {
        blog: AdminBlog;
    };
}
export declare const useAdminBlogsStore: import("pinia").StoreDefinition<"adminBlogs", {
    blogs: AdminBlog[];
    currentPage: number;
    total: number;
    perPage: number;
    lastPage: number;
    loading: boolean;
}, {
    totalBlogs: (state: {
        blogs: {
            id: number;
            title: string;
            body: string;
            image?: string | undefined;
            status: "active" | "inactive";
            created_at: string;
            updated_at: string;
        }[];
        currentPage: number;
        total: number;
        perPage: number;
        lastPage: number;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        blogs: AdminBlog[];
        currentPage: number;
        total: number;
        perPage: number;
        lastPage: number;
        loading: boolean;
    }>) => number;
}, {
    fetchBlogs(page?: number, filters?: Record<string, any>): Promise<{
        data: AdminBlog[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    }>;
    searchBlogs(query: string, otherFilters?: Record<string, any>): Promise<{
        data: AdminBlog[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    }>;
    createBlog(data: AdminBlogForm): Promise<AdminBlog>;
    updateBlog(id: number, data: AdminBlogForm): Promise<AdminBlog>;
    deleteBlog(id: number): Promise<boolean>;
    nextPage(): Promise<{
        data: AdminBlog[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    } | undefined>;
    prevPage(): Promise<{
        data: AdminBlog[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    } | undefined>;
}>;
