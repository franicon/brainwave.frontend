import { ref, type Ref } from 'vue';

interface Notification {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export function useNotification(): { notification: Ref<Notification>; showNotification: (message: string, type?: Notification['type']) => void } {
  const notification = ref<Notification>({ show: false, message: '', type: 'success' });

  const showNotification = (message: string, type: Notification['type'] = 'success') => {
    notification.value = { show: true, message, type };
    setTimeout(() => {
      notification.value.show = false;
    }, 3000);
  };

  return { notification, showNotification };
}