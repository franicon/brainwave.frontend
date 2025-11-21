import { ref, watch } from 'vue';
export function useModalConfirm() {
    const isOpen = ref(false);
    const title = ref('');
    const message = ref('');
    const onConfirm = ref(null);
    // Debug when isOpen changes
    watch(isOpen, (newValue) => {
        console.log('Modal isOpen changed:', newValue);
    });
    const open = (options) => {
        console.log('Opening modal with options:', options);
        title.value = options.title;
        message.value = options.message;
        onConfirm.value = options.onConfirm;
        isOpen.value = true;
    };
    const close = () => {
        console.log('Closing modal');
        isOpen.value = false;
        title.value = '';
        message.value = '';
        onConfirm.value = null;
    };
    const confirm = () => {
        console.log('Confirming modal action');
        onConfirm.value?.();
        close();
    };
    return { isOpen, title, message, onConfirm, open, close, confirm };
}
