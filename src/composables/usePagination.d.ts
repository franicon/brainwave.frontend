import { type Ref } from 'vue';
import type { Ref as RefType } from 'vue';
export declare function usePagination<T>(items: RefType<T[]>, itemsPerPage?: number): {
    currentPage: Ref<number>;
    totalPages: Ref<number>;
    paginatedItems: RefType<T[]>;
    next: () => void;
    prev: () => void;
    goTo: (page: number) => void;
};
