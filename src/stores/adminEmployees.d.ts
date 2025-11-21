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
export declare const useAdminEmployeesStore: import("pinia").StoreDefinition<"adminEmployees", {
    employees: AdminEmployee[];
    currentPage: number;
    total: number;
    perPage: number;
    lastPage: number;
    loading: boolean;
}, {
    totalEmployees: (state: {
        employees: {
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
        employees: AdminEmployee[];
        currentPage: number;
        total: number;
        perPage: number;
        lastPage: number;
        loading: boolean;
    }>) => number;
}, {
    fetchEmployees(page?: number, filters?: Record<string, any>): Promise<{
        data: AdminEmployee[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    }>;
    searchEmployees(query: string, otherFilters?: Record<string, any>): Promise<{
        data: AdminEmployee[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    }>;
    createEmployee(data: {
        name: string;
        username: string;
        email: string;
        phone: string;
        age: number;
        password: string;
        permissions: string[];
    }): Promise<AdminEmployee>;
    updateEmployee(id: number, data: Partial<{
        name: string;
        username: string;
        email: string;
        phone: string;
        age: number;
        password?: string;
        permissions: string[];
    }>): Promise<AdminEmployee>;
    deleteEmployee(id: number): Promise<boolean>;
    nextPage(): Promise<{
        data: AdminEmployee[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    } | undefined>;
    prevPage(): Promise<{
        data: AdminEmployee[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    } | undefined>;
}>;
