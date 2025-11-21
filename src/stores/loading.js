// src/stores/loading.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useLoadingStore = defineStore('loading', () => {
    const isLoading = ref(false);
    const start = () => { isLoading.value = true; };
    const stop = () => { isLoading.value = false; };
    const wrap = async (asyncFn) => {
        start();
        try {
            return await asyncFn();
        }
        catch (error) {
            console.error('Loading wrapper error:', error);
            return undefined;
        }
        finally {
            stop();
        }
    };
    return { isLoading, start, stop, wrap };
});
