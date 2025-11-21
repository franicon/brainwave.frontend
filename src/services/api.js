import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
const apiClient = axios.create({
    baseURL: apiBaseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});
apiClient.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
apiClient.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        const authStore = useAuthStore();
        authStore.logout();
    }
    return Promise.reject(error);
});
export default apiClient;
