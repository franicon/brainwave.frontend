export interface Plan {
    id: number;
    name: string;
    price: number;
    discounted_price?: number;
    features: string[];
    is_active: boolean;
    end_date?: string;
}
export interface Purchase {
    id: number;
    user_id: number;
    plan_id?: number;
    amount_paid: number;
    start_date: string;
    end_date: string;
    status: 'active' | 'expired' | 'cancelled';
}
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone?: string;
    age?: number;
    is_verified: boolean;
    email_verified_at?: string;
    status: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}
export interface DashboardData {
    balance: number;
    active_plan?: Plan;
    purchased_courses: any[];
    available_courses: any[];
    completed_courses_count: number;
    in_progress_count: number;
    features?: string[];
    user: User;
}
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export declare const useUserStore: import("pinia").StoreDefinition<"user", {
    dashboard: DashboardData | null;
    user: User | null;
}, {
    balance: (state: {
        dashboard: {
            balance: number;
            active_plan?: {
                id: number;
                name: string;
                price: number;
                discounted_price?: number | undefined;
                features: string[];
                is_active: boolean;
                end_date?: string | undefined;
            } | undefined;
            purchased_courses: any[];
            available_courses: any[];
            completed_courses_count: number;
            in_progress_count: number;
            features?: string[] | undefined;
            user: {
                id: number;
                name: string;
                username: string;
                email: string;
                phone?: string | undefined;
                age?: number | undefined;
                is_verified: boolean;
                email_verified_at?: string | undefined;
                status: string;
                is_admin: boolean;
                created_at: string;
                updated_at: string;
            };
        } | null;
        user: {
            id: number;
            name: string;
            username: string;
            email: string;
            phone?: string | undefined;
            age?: number | undefined;
            is_verified: boolean;
            email_verified_at?: string | undefined;
            status: string;
            is_admin: boolean;
            created_at: string;
            updated_at: string;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: DashboardData | null;
        user: User | null;
    }>) => number;
    activePlan: (state: {
        dashboard: {
            balance: number;
            active_plan?: {
                id: number;
                name: string;
                price: number;
                discounted_price?: number | undefined;
                features: string[];
                is_active: boolean;
                end_date?: string | undefined;
            } | undefined;
            purchased_courses: any[];
            available_courses: any[];
            completed_courses_count: number;
            in_progress_count: number;
            features?: string[] | undefined;
            user: {
                id: number;
                name: string;
                username: string;
                email: string;
                phone?: string | undefined;
                age?: number | undefined;
                is_verified: boolean;
                email_verified_at?: string | undefined;
                status: string;
                is_admin: boolean;
                created_at: string;
                updated_at: string;
            };
        } | null;
        user: {
            id: number;
            name: string;
            username: string;
            email: string;
            phone?: string | undefined;
            age?: number | undefined;
            is_verified: boolean;
            email_verified_at?: string | undefined;
            status: string;
            is_admin: boolean;
            created_at: string;
            updated_at: string;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: DashboardData | null;
        user: User | null;
    }>) => {
        id: number;
        name: string;
        price: number;
        discounted_price?: number | undefined;
        features: string[];
        is_active: boolean;
        end_date?: string | undefined;
    } | undefined;
    purchasedCourses: (state: {
        dashboard: {
            balance: number;
            active_plan?: {
                id: number;
                name: string;
                price: number;
                discounted_price?: number | undefined;
                features: string[];
                is_active: boolean;
                end_date?: string | undefined;
            } | undefined;
            purchased_courses: any[];
            available_courses: any[];
            completed_courses_count: number;
            in_progress_count: number;
            features?: string[] | undefined;
            user: {
                id: number;
                name: string;
                username: string;
                email: string;
                phone?: string | undefined;
                age?: number | undefined;
                is_verified: boolean;
                email_verified_at?: string | undefined;
                status: string;
                is_admin: boolean;
                created_at: string;
                updated_at: string;
            };
        } | null;
        user: {
            id: number;
            name: string;
            username: string;
            email: string;
            phone?: string | undefined;
            age?: number | undefined;
            is_verified: boolean;
            email_verified_at?: string | undefined;
            status: string;
            is_admin: boolean;
            created_at: string;
            updated_at: string;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: DashboardData | null;
        user: User | null;
    }>) => any[];
    availableCourses: (state: {
        dashboard: {
            balance: number;
            active_plan?: {
                id: number;
                name: string;
                price: number;
                discounted_price?: number | undefined;
                features: string[];
                is_active: boolean;
                end_date?: string | undefined;
            } | undefined;
            purchased_courses: any[];
            available_courses: any[];
            completed_courses_count: number;
            in_progress_count: number;
            features?: string[] | undefined;
            user: {
                id: number;
                name: string;
                username: string;
                email: string;
                phone?: string | undefined;
                age?: number | undefined;
                is_verified: boolean;
                email_verified_at?: string | undefined;
                status: string;
                is_admin: boolean;
                created_at: string;
                updated_at: string;
            };
        } | null;
        user: {
            id: number;
            name: string;
            username: string;
            email: string;
            phone?: string | undefined;
            age?: number | undefined;
            is_verified: boolean;
            email_verified_at?: string | undefined;
            status: string;
            is_admin: boolean;
            created_at: string;
            updated_at: string;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: DashboardData | null;
        user: User | null;
    }>) => any[];
    completedCount: (state: {
        dashboard: {
            balance: number;
            active_plan?: {
                id: number;
                name: string;
                price: number;
                discounted_price?: number | undefined;
                features: string[];
                is_active: boolean;
                end_date?: string | undefined;
            } | undefined;
            purchased_courses: any[];
            available_courses: any[];
            completed_courses_count: number;
            in_progress_count: number;
            features?: string[] | undefined;
            user: {
                id: number;
                name: string;
                username: string;
                email: string;
                phone?: string | undefined;
                age?: number | undefined;
                is_verified: boolean;
                email_verified_at?: string | undefined;
                status: string;
                is_admin: boolean;
                created_at: string;
                updated_at: string;
            };
        } | null;
        user: {
            id: number;
            name: string;
            username: string;
            email: string;
            phone?: string | undefined;
            age?: number | undefined;
            is_verified: boolean;
            email_verified_at?: string | undefined;
            status: string;
            is_admin: boolean;
            created_at: string;
            updated_at: string;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: DashboardData | null;
        user: User | null;
    }>) => number;
    inProgressCount: (state: {
        dashboard: {
            balance: number;
            active_plan?: {
                id: number;
                name: string;
                price: number;
                discounted_price?: number | undefined;
                features: string[];
                is_active: boolean;
                end_date?: string | undefined;
            } | undefined;
            purchased_courses: any[];
            available_courses: any[];
            completed_courses_count: number;
            in_progress_count: number;
            features?: string[] | undefined;
            user: {
                id: number;
                name: string;
                username: string;
                email: string;
                phone?: string | undefined;
                age?: number | undefined;
                is_verified: boolean;
                email_verified_at?: string | undefined;
                status: string;
                is_admin: boolean;
                created_at: string;
                updated_at: string;
            };
        } | null;
        user: {
            id: number;
            name: string;
            username: string;
            email: string;
            phone?: string | undefined;
            age?: number | undefined;
            is_verified: boolean;
            email_verified_at?: string | undefined;
            status: string;
            is_admin: boolean;
            created_at: string;
            updated_at: string;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: DashboardData | null;
        user: User | null;
    }>) => number;
    features: (state: {
        dashboard: {
            balance: number;
            active_plan?: {
                id: number;
                name: string;
                price: number;
                discounted_price?: number | undefined;
                features: string[];
                is_active: boolean;
                end_date?: string | undefined;
            } | undefined;
            purchased_courses: any[];
            available_courses: any[];
            completed_courses_count: number;
            in_progress_count: number;
            features?: string[] | undefined;
            user: {
                id: number;
                name: string;
                username: string;
                email: string;
                phone?: string | undefined;
                age?: number | undefined;
                is_verified: boolean;
                email_verified_at?: string | undefined;
                status: string;
                is_admin: boolean;
                created_at: string;
                updated_at: string;
            };
        } | null;
        user: {
            id: number;
            name: string;
            username: string;
            email: string;
            phone?: string | undefined;
            age?: number | undefined;
            is_verified: boolean;
            email_verified_at?: string | undefined;
            status: string;
            is_admin: boolean;
            created_at: string;
            updated_at: string;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: DashboardData | null;
        user: User | null;
    }>) => string[];
}, {
    fetchUser(): Promise<User>;
    fetchDashboard(): Promise<ApiResponse<DashboardData>>;
    fetchBalance(): Promise<ApiResponse<{
        balance: number;
    }>>;
    purchasePlan(planId: number): Promise<ApiResponse<Purchase>>;
    fetchPlans(): Promise<Plan[]>;
    updateProfile(profile: Partial<User>): Promise<ApiResponse<User>>;
    updatePassword(passwordData: {
        current_password: string;
        password: string;
        password_confirmation: string;
    }): Promise<ApiResponse<null>>;
}>;
