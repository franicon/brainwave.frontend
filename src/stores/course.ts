import { defineStore } from 'pinia';
import api from '@/services/api';
import { ref, type Ref } from 'vue';

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

export const useCourseStore = defineStore('course', () => {
  const currentCourse: Ref<Course | null> = ref(null);
  const currentEnrollment: Ref<Enrollment | null> = ref(null);
  const courses: Ref<Course[]> = ref([]);

  const fetchCourses = async (): Promise<Course[]> => {
    const { data } = await api.get<ApiResponse<Course[]>>('/courses');
    courses.value = data.data;
    return data.data;
  };

  const fetchCourse = async (courseId: number) => {
    const { data } = await api.get<ApiResponse<{ course: Course; enrollment: Enrollment | null }>>(
      `/courses/${courseId}`
    );
    currentCourse.value = data.data.course;
    currentEnrollment.value = data.data.enrollment;
    return data.data;
  };

  const enrollCourse = async (courseId: number, force: boolean = false) => {
    const { data } = await api.post<ApiResponse<Enrollment>>(
      `/courses/${courseId}/enroll`,
      force ? { force: true } : {}
    );
    if (currentCourse.value && currentCourse.value.id === courseId) {
      currentEnrollment.value = data.data;
    }
    return data.data;
  };

  const updateCourseProgress = async (courseId: number, currentTime: number, duration: number) => {
    const { data } = await api.post<ApiResponse<Enrollment>>(
      `/courses/${courseId}/progress`,
      { currentTime, duration }
    );
    if (currentEnrollment.value && currentEnrollment.value.course_id === courseId) {
      currentEnrollment.value = data.data;
    }
    return data.data;
  };

  /** Throttled progress update (every 5s max) */
  let lastProgressUpdate = 0;
  const updateCourseProgressThrottled = async (courseId: number, currentTime: number, duration: number) => {
    const now = Date.now();
    if (now - lastProgressUpdate < 5000) return;
    lastProgressUpdate = now;
    if (!currentEnrollment.value) return;
    try {
      const updated = await updateCourseProgress(courseId, currentTime, duration);
      currentEnrollment.value = updated;
    } catch (error) {
      console.error('[Course Store] Throttled progress update failed', error);
    }
  };

  return {
    courses,
    currentCourse,
    currentEnrollment,
    fetchCourses,
    fetchCourse,
    enrollCourse,
    updateCourseProgress,
    updateCourseProgressThrottled
  };
});
