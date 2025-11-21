import { type Ref } from 'vue';
interface Notification {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}
export declare function useNotification(): {
    notification: Ref<Notification>;
    showNotification: (message: string, type?: Notification['type']) => void;
};
export {};
