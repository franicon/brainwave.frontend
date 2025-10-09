import { type Ref, ref, watch } from 'vue';

interface ModalConfirmOptions {
  title: string;
  message: string;
  onConfirm: () => void;
}

export function useModalConfirm(): {
  isOpen: Ref<boolean>;
  title: Ref<string>;
  message: Ref<string>;
  onConfirm: Ref<(() => void) | null>;
  open: (options: ModalConfirmOptions) => void;
  close: () => void;
  confirm: () => void;
} {
  const isOpen = ref<boolean>(false);
  const title = ref<string>('');
  const message = ref<string>('');
  const onConfirm = ref<(() => void) | null>(null);

  // Debug when isOpen changes
  watch(isOpen, (newValue) => {
    console.log('Modal isOpen changed:', newValue);
  });

  const open = (options: ModalConfirmOptions) => {
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