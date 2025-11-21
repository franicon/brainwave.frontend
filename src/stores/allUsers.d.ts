export interface AdminUser {
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
export interface UsersResponse {
    success: boolean;
    message: string;
    data: {
        data: AdminUser[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    };
}
export interface UpdateUserResponse {
    success: boolean;
    message: string;
    data: {
        user: AdminUser;
    };
}
export declare const useAllUsersStore: import("pinia").StoreDefinition<"allUsers", {
    users: AdminUser[];
    currentPage: number;
    total: number;
    perPage: number;
    lastPage: number;
    loading: boolean;
}, {
    totalUsers: (state: {
        users: {
            id: number;
            name: string;
            username: string;
            email: string;
            phone?: string | undefined;
            age?: number | undefined;
            is_verified: boolean;
            status: string;
            is_admin: number;
            permissions: string[];
            created_at: string;
            updated_at: string;
        }[];
        currentPage: number;
        total: number;
        perPage: number;
        lastPage: number;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        users: AdminUser[];
        currentPage: number;
        total: number;
        perPage: number;
        lastPage: number;
        loading: boolean;
    }>) => number;
    adminTotalUsers: () => number;
}, {
    fetchUsers(page?: number, filters?: Record<string, any>): Promise<{
        data: AdminUser[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    }>;
    searchUsers(query: string, otherFilters?: Record<string, any>): Promise<{
        data: AdminUser[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    }>;
    updateUser(id: number, data: Partial<AdminUser>): Promise<AdminUser>;
    deleteUser(id: number): Promise<boolean>;
    nextPage(): Promise<{
        data: AdminUser[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    } | undefined>;
    prevPage(): Promise<{
        data: AdminUser[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    } | undefined>;
}>;
