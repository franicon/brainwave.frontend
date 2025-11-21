export interface AdminCourse {
    id: number;
    title: string;
    description: string;
    video_url?: string;
    video_path?: string;
    thumbnail?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
export type AdminCourseForm = Omit<Partial<AdminCourse>, 'thumbnail' | 'video_path'> & {
    thumbnail?: File | string | null;
    video_path?: File | string | null;
    thumbnailPreview?: string;
};
export interface CoursesResponse {
    success: boolean;
    message: string;
    data: {
        data: AdminCourse[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    };
}
export interface CreateCourseResponse {
    success: boolean;
    message: string;
    data: {
        course: AdminCourse;
    };
}
export interface UpdateCourseResponse {
    success: boolean;
    message: string;
    data: {
        course: AdminCourse;
    };
}
export declare const useAdminCoursesStore: import("pinia").StoreDefinition<"adminCourses", {
    courses: AdminCourse[];
    currentPage: number;
    total: number;
    perPage: number;
    lastPage: number;
    loading: boolean;
}, {
    totalCourses: (state: {
        courses: {
            id: number;
            title: string;
            description: string;
            video_url?: string | undefined;
            video_path?: string | undefined;
            thumbnail?: string | undefined;
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
        courses: AdminCourse[];
        currentPage: number;
        total: number;
        perPage: number;
        lastPage: number;
        loading: boolean;
    }>) => number;
    adminTotalCourses: () => number;
}, {
    fetchCourses(page?: number, filters?: Record<string, any>): Promise<{
        data: AdminCourse[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    }>;
    searchCourses(query: string, otherFilters?: Record<string, any>): Promise<{
        data: AdminCourse[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    }>;
    createCourse(data: AdminCourseForm): Promise<AdminCourse>;
    updateCourse(id: number, data: AdminCourseForm): Promise<AdminCourse>;
    deleteCourse(id: number): Promise<boolean>;
    nextPage(): Promise<{
        data: AdminCourse[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    } | undefined>;
    prevPage(): Promise<{
        data: AdminCourse[];
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    } | undefined>;
}>;
