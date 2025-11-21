import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useLoadingStore } from '@/stores/loading';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
const route = useRoute();
const loadingStore = useLoadingStore();
const currentLayout = computed(() => {
    // Admin routes: Use AdminLayout
    if (route.meta.adminOnly) {
        return AdminLayout;
    }
    // User auth routes: Use DefaultLayout
    if (route.meta.requiresAuth && !route.meta.adminOnly) {
        return DefaultLayout;
    }
    // Public/auth routes (e.g., /login, /signup): No layout
    return null;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.currentLayout) {
    // @ts-ignore
    [currentLayout,];
    const __VLS_0 = ((__VLS_ctx.currentLayout));
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_4 } = __VLS_3.slots;
    // @ts-ignore
    [currentLayout,];
    const __VLS_5 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, ]} */ ;
    // @ts-ignore
    RouterView;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
    var __VLS_3;
}
else {
    const __VLS_10 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, ]} */ ;
    // @ts-ignore
    RouterView;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({}));
    const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
if (__VLS_ctx.loadingStore.isLoading) {
    // @ts-ignore
    [loadingStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "loader" },
    });
}
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/30']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['loader']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
