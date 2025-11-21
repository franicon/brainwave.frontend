export interface AdminPlan {
    id: number;
    name: string;
    price: number;
    discounted_price?: number | null;
    features: string[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
export interface PlansResponse {
    success: boolean;
    message: string;
    data: {
        data: AdminPlan[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    };
}
export interface CreatePlanResponse {
    success: boolean;
    message: string;
    data: {
        plan: AdminPlan;
    };
}
export interface UpdatePlanResponse {
    success: boolean;
    message: string;
    data: {
        plan: AdminPlan;
    };
}
export declare const useAdminPlansStore: import("pinia").StoreDefinition<"adminPlans", {
    plans: AdminPlan[];
    currentPage: number;
    total: number;
    perPage: number;
    lastPage: number;
    loading: boolean;
}, {
    totalPlans: (state: {
        plans: {
            id: number;
            name: string;
            price: number;
            discounted_price?: number | null | undefined;
            features: string[];
            is_active: boolean;
            created_at: string;
            updated_at: string;
        }[];
        currentPage: number;
        total: number;
        perPage: number;
        lastPage: number;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        plans: AdminPlan[];
        currentPage: number;
        total: number;
        perPage: number;
        lastPage: number;
        loading: boolean;
    }>) => number;
    adminTotalPlans: () => number;
}, {
    fetchPlans(page?: number, filters?: Record<string, any>): Promise<{
        data: AdminPlan[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    }>;
    searchPlans(query: string, otherFilters?: Record<string, any>): Promise<{
        data: AdminPlan[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    }>;
    createPlan(data: Partial<AdminPlan>): Promise<AdminPlan>;
    updatePlan(id: number, data: Partial<AdminPlan>): Promise<AdminPlan>;
    deletePlan(id: number): Promise<boolean>;
    nextPage(): Promise<{
        data: AdminPlan[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    } | undefined>;
    prevPage(): Promise<{
        data: AdminPlan[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    } | undefined>;
}>;
