import { type Ref, ref, computed } from 'vue';
import type { Ref as RefType } from 'vue';


export function usePagination<T>(items: RefType<T[]>, itemsPerPage: number = 10): {
  currentPage: Ref<number>;
  totalPages: Ref<number>;
  paginatedItems: RefType<T[]>;
  next: () => void;
  prev: () => void;
  goTo: (page: number) => void;
} {
  const currentPage = ref<number>(1);

  const totalPages = computed<number>(() => Math.ceil(items.value.length / itemsPerPage));
  
  const paginatedItems = computed<T[]>(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return items.value.slice(start, start + itemsPerPage);
  });

  const next = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const prev = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  const goTo = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  return { currentPage, totalPages, paginatedItems, next, prev, goTo };
}