import { type Ref } from 'vue';
export interface Course {
    id: number;
    title: string;
    description: string;
    video_url?: string;
    thumbnail?: string;
    video_path?: string;
    is_active: boolean;
}
export interface Enrollment {
    id: number;
    user_id: number;
    course_id: number;
    purchase_id?: number;
    started_at: string;
    completed_at?: string;
    status: 'active' | 'completed' | 'expired';
    progress: number;
    last_position: number;
}
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export declare const useCourseStore: import("pinia").StoreDefinition<"course", Pick<{
    courses: Ref<Course[], Course[]>;
    currentCourse: Ref<Course | null, Course | null>;
    currentEnrollment: Ref<Enrollment | null, Enrollment | null>;
    fetchCourses: () => Promise<Course[]>;
    fetchCourse: (courseId: number) => Promise<{
        course: Course;
        enrollment: Enrollment | null;
    }>;
    enrollCourse: (courseId: number, force?: boolean) => Promise<Enrollment>;
    updateCourseProgress: (courseId: number, currentTime: number, duration: number) => Promise<Enrollment>;
    updateCourseProgressThrottled: (courseId: number, currentTime: number, duration: number) => Promise<void>;
}, "courses" | "currentCourse" | "currentEnrollment">, Pick<{
    courses: Ref<Course[], Course[]>;
    currentCourse: Ref<Course | null, Course | null>;
    currentEnrollment: Ref<Enrollment | null, Enrollment | null>;
    fetchCourses: () => Promise<Course[]>;
    fetchCourse: (courseId: number) => Promise<{
        course: Course;
        enrollment: Enrollment | null;
    }>;
    enrollCourse: (courseId: number, force?: boolean) => Promise<Enrollment>;
    updateCourseProgress: (courseId: number, currentTime: number, duration: number) => Promise<Enrollment>;
    updateCourseProgressThrottled: (courseId: number, currentTime: number, duration: number) => Promise<void>;
}, never>, Pick<{
    courses: Ref<Course[], Course[]>;
    currentCourse: Ref<Course | null, Course | null>;
    currentEnrollment: Ref<Enrollment | null, Enrollment | null>;
    fetchCourses: () => Promise<Course[]>;
    fetchCourse: (courseId: number) => Promise<{
        course: Course;
        enrollment: Enrollment | null;
    }>;
    enrollCourse: (courseId: number, force?: boolean) => Promise<Enrollment>;
    updateCourseProgress: (courseId: number, currentTime: number, duration: number) => Promise<Enrollment>;
    updateCourseProgressThrottled: (courseId: number, currentTime: number, duration: number) => Promise<void>;
}, "fetchCourses" | "fetchCourse" | "enrollCourse" | "updateCourseProgress" | "updateCourseProgressThrottled">>;
