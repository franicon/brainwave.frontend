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

  /** Fetch all courses */
  const fetchCourses = async (): Promise<Course[]> => {
    try {
      console.log('[Course Store] Fetching courses...');
      const { data } = await api.get<ApiResponse<Course[]>>('/courses');
      console.log('[Course Store] Courses fetched successfully:', JSON.stringify(data, null, 2));
      courses.value = data.data;
      return data.data;
    } catch (error) {
      console.error("[Course Store] Fetch courses failed:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

  /** Fetch single course + enrollment */
  const fetchCourse = async (courseId: number): Promise<{ course: Course; enrollment: Enrollment | null }> => {
    try {
      console.log('[Course Store] Fetching course with enrollment:', courseId);
      const { data } = await api.get<ApiResponse<{ course: Course; enrollment: Enrollment | null }>>(
        `/courses/${courseId}`
      );
      console.log('[Course Store] Course fetched successfully:', data);

      currentCourse.value = data.data.course;
      currentEnrollment.value = data.data.enrollment;

      return data.data;
    } catch (error) {
      console.error('[Course Store] Fetch course failed:', error);
      throw error;
    }
  };

  /** Enroll or re-enroll in a course */
  const enrollCourse = async (courseId: number, force: boolean = false): Promise<Enrollment> => {
    try {
      console.log('[Course Store] Enrolling in course:', courseId, 'force:', force);
      const { data } = await api.post<ApiResponse<Enrollment>>(
        `/courses/${courseId}/enroll`,
        force ? { force: true } : {}
      );
      console.log('[Course Store] Course enrollment successful:', data);

      // Update current enrollment if it’s the same course
      if (currentCourse.value && currentCourse.value.id === courseId) {
        currentEnrollment.value = data.data;
      }

      return data.data;
    } catch (error) {
      console.error('[Course Store] Course enrollment failed:', error);
      throw error;
    }
  };

  /** Update user's course progress */
  const updateCourseProgress = async (
    courseId: number,
    currentTime: number,
    duration: number
  ): Promise<Enrollment> => {
    try {
      console.log(
        '[Course Store] Updating progress for course:',
        courseId,
        `at ${currentTime}/${duration}`
      );
      const { data } = await api.post<ApiResponse<Enrollment>>(
        `/courses/${courseId}/progress`,
        {
          currentTime,
          duration,
        }
      );
      console.log('[Course Store] Progress updated:', data.data.progress + '%');

      // Update current enrollment in the store if it matches
      if (currentEnrollment.value && currentEnrollment.value.course_id === courseId) {
        currentEnrollment.value = data.data;
      }

      return data.data;
    } catch (error) {
      console.error('[Course Store] Course progress update failed:', error);
      // Don't rethrow, just log and return current enrollment to allow playback to continue
      return currentEnrollment.value!;
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
  };
});