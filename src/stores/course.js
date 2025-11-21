import { defineStore } from 'pinia';
import api from '@/services/api';
import { ref } from 'vue';
export const useCourseStore = defineStore('course', () => {
    const currentCourse = ref(null);
    const currentEnrollment = ref(null);
    const courses = ref([]);
    const fetchCourses = async () => {
        const { data } = await api.get('/courses');
        courses.value = data.data;
        return data.data;
    };
    const fetchCourse = async (courseId) => {
        const { data } = await api.get(`/courses/${courseId}`);
        currentCourse.value = data.data.course;
        currentEnrollment.value = data.data.enrollment;
        return data.data;
    };
    const enrollCourse = async (courseId, force = false) => {
        const { data } = await api.post(`/courses/${courseId}/enroll`, force ? { force: true } : {});
        if (currentCourse.value && currentCourse.value.id === courseId) {
            currentEnrollment.value = data.data;
        }
        return data.data;
    };
    const updateCourseProgress = async (courseId, currentTime, duration) => {
        const { data } = await api.post(`/courses/${courseId}/progress`, { currentTime, duration });
        if (currentEnrollment.value && currentEnrollment.value.course_id === courseId) {
            currentEnrollment.value = data.data;
        }
        return data.data;
    };
    /** Throttled progress update (every 5s max) */
    let lastProgressUpdate = 0;
    const updateCourseProgressThrottled = async (courseId, currentTime, duration) => {
        const now = Date.now();
        if (now - lastProgressUpdate < 5000)
            return;
        lastProgressUpdate = now;
        if (!currentEnrollment.value)
            return;
        try {
            const updated = await updateCourseProgress(courseId, currentTime, duration);
            currentEnrollment.value = updated;
        }
        catch (error) {
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
