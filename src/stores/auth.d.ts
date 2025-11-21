export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            id: number;
            name: string;
            username: string;
            email: string;
            phone?: string;
            age?: number;
            is_verified: boolean;
            email_verified_at?: string;
            status: string;
            is_admin: number;
            permissions?: string[];
            created_at: string;
            updated_at: string;
        };
        token?: string;
        needs_verification?: boolean;
    };
}
export interface UserProfile {
    id: number;
    name: string;
    username: string;
    email: string;
    phone?: string;
    age?: number;
    is_verified: boolean;
    email_verified_at?: string;
    status: string;
    is_admin: number;
    permissions?: string[];
    created_at: string;
    updated_at: string;
}
export declare const useAuthStore: import("pinia").StoreDefinition<"auth", {
    token: string | null;
    user: UserProfile | null;
}, {
    isAuthenticated: (state: {
        token: string | null;
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
            is_admin: number;
            permissions?: string[] | undefined;
            created_at: string;
            updated_at: string;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        token: string | null;
        user: UserProfile | null;
    }>) => boolean;
    isAdmin: (state: {
        token: string | null;
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
            is_admin: number;
            permissions?: string[] | undefined;
            created_at: string;
            updated_at: string;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        token: string | null;
        user: UserProfile | null;
    }>) => boolean | null;
    isSuperAdmin: (state: {
        token: string | null;
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
            is_admin: number;
            permissions?: string[] | undefined;
            created_at: string;
            updated_at: string;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        token: string | null;
        user: UserProfile | null;
    }>) => boolean | null;
    isEmployee: (state: {
        token: string | null;
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
            is_admin: number;
            permissions?: string[] | undefined;
            created_at: string;
            updated_at: string;
        } | null;
    } & import("pinia").PiniaCustomStateProperties<{
        token: string | null;
        user: UserProfile | null;
    }>) => boolean | null;
}, {
    login(credentials: {
        email: string;
        password: string;
    }): Promise<void>;
    adminLogin(credentials: {
        email: string;
        password: string;
    }): Promise<void>;
    signup(data: {
        name: string;
        username: string;
        email: string;
        phone: string;
        age: number;
        password: string;
        password_confirmation: string;
    }): Promise<AuthResponse>;
    verifyOtp(userId: string, otp: string): Promise<AuthResponse>;
    resendOtp(userId: string): Promise<unknown>;
    fetchUserProfile(): Promise<UserProfile>;
    checkAuthStatus(): Promise<void>;
    logout(): void;
}>;
