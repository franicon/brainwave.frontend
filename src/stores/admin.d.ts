export interface AdminDashboardData {
    total_users: number;
    active_users: number;
    total_revenue: number;
    active_subscriptions: number;
    total_courses: number;
    active_courses: number;
    total_blogs: number;
    active_blogs: number;
    total_enrollments: number;
    pending_enrollments: number;
    total_wallet_balance: number;
    total_plans: number;
    total_transactions: number;
    revenue: number[];
    transactions: number[];
    plans_active: number;
    transaction_types: {
        [key: string]: number;
    };
    top_wallets: {
        name: string;
        balance: number;
    }[];
    total_employees: number;
    active_employees: number;
}
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export declare const useAdminStore: import("pinia").StoreDefinition<"admin", {
    dashboard: AdminDashboardData | null;
    loading: boolean;
}, {
    totalUsers: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    activeUsers: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    totalRevenue: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    activeSubscriptions: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    totalCourses: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    activeCourses: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    totalBlogs: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    activeBlogs: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    totalEnrollments: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    pendingEnrollments: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    totalWalletBalance: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    totalPlans: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    totalTransactions: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    revenue: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number[];
    transactions: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number[];
    plansActive: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    transactionTypes: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => {
        [key: string]: number;
    };
    topWallets: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => {
        name: string;
        balance: number;
    }[];
    totalEmployees: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
    activeEmployees: (state: {
        dashboard: {
            total_users: number;
            active_users: number;
            total_revenue: number;
            active_subscriptions: number;
            total_courses: number;
            active_courses: number;
            total_blogs: number;
            active_blogs: number;
            total_enrollments: number;
            pending_enrollments: number;
            total_wallet_balance: number;
            total_plans: number;
            total_transactions: number;
            revenue: number[];
            transactions: number[];
            plans_active: number;
            transaction_types: {
                [key: string]: number;
            };
            top_wallets: {
                name: string;
                balance: number;
            }[];
            total_employees: number;
            active_employees: number;
        } | null;
        loading: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        dashboard: AdminDashboardData | null;
        loading: boolean;
    }>) => number;
}, {
    fetchDashboard(params?: {
        from_date?: string;
        to_date?: string;
    }): Promise<AdminDashboardData>;
}>;
