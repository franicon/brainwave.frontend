import { ref, computed } from 'vue';
export function usePagination(items, itemsPerPage = 10) {
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage));
    const paginatedItems = computed(() => {
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
    const goTo = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
        }
    };
    return { currentPage, totalPages, paginatedItems, next, prev, goTo };
}
