import { type Ref } from 'vue';
interface ModalConfirmOptions {
    title: string;
    message: string;
    onConfirm: () => void;
}
export declare function useModalConfirm(): {
    isOpen: Ref<boolean>;
    title: Ref<string>;
    message: Ref<string>;
    onConfirm: Ref<(() => void) | null>;
    open: (options: ModalConfirmOptions) => void;
    close: () => void;
    confirm: () => void;
};
export {};
