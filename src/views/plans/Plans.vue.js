import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loading';
const loadingStore = useLoadingStore();
const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();
const plans = ref([]);
const loading = ref(false);
const showAllPlans = ref(false);
// Object to track expanded features per plan
const expandedFeatures = ref({});
onMounted(async () => {
    try {
        loadingStore.start();
        await userStore.fetchDashboard();
        plans.value = await userStore.fetchPlans();
        // Initialize all plans with collapsed features
        plans.value.forEach(plan => expandedFeatures.value[plan.id] = false);
    }
    catch (err) {
        console.error('Failed to fetch plans:', err);
    }
    finally {
        loadingStore.stop();
    }
});
const activePlan = computed(() => userStore.activePlan);
const displayPlans = computed(() => showAllPlans.value ? plans.value : plans.value.slice(0, 4));
const purchasePlan = async (planId) => {
    if (planId === activePlan.value?.id)
        return;
    try {
        loading.value = true;
        await userStore.purchasePlan(planId);
        await userStore.fetchDashboard();
        router.push('/dashboard');
    }
    catch (error) {
        console.error('Purchase failed:', error);
    }
    finally {
        loading.value = false;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "space-y-8" },
});
if (!__VLS_ctx.authStore.isAuthenticated) {
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card text-center max-w-md mx-auto" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-neutral-600 dark:text-neutral-400 mb-6 text-base" },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: "/login",
        ...{ class: "btn-3d btn-3d-border w-full" },
    }));
    const __VLS_2 = __VLS_1({
        to: "/login",
        ...{ class: "btn-3d btn-3d-border w-full" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_4 } = __VLS_3.slots;
    const __VLS_5 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        icon: (['fas', 'right-from-bracket']),
        ...{ class: "mr-2 w-4 h-4" },
    }));
    const __VLS_7 = __VLS_6({
        icon: (['fas', 'right-from-bracket']),
        ...{ class: "mr-2 w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" },
    });
    for (const [plan] of __VLS_getVForSourceType((__VLS_ctx.displayPlans))) {
        // @ts-ignore
        [displayPlans,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            key: (plan.id),
            ...{ class: "card backdrop-blur relative" },
        });
        if (plan.id === __VLS_ctx.activePlan?.id) {
            // @ts-ignore
            [activePlan,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "absolute top-3 right-3 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full text-xs font-medium text-green-700 dark:text-green-300" },
            });
        }
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-xl font-semibold mb-3 text-neutral-900 dark:text-white" },
        });
        (plan.name);
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-3xl font-bold text-primary-600 mb-2" },
        });
        (plan.discounted_price ? `PKR ${plan.discounted_price}` : `PKR ${plan.price}`);
        if (plan.discounted_price) {
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "text-sm text-neutral-500 line-through mb-6" },
            });
            (plan.price);
        }
        __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
            ...{ class: "space-y-3 mb-6 text-neutral-600 dark:text-neutral-400 text-base" },
        });
        for (const [feature, index] of __VLS_getVForSourceType((plan.features))) {
            __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
                key: (feature),
                ...{ class: "flex items-center" },
            });
            __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (index < 4 || __VLS_ctx.expandedFeatures[plan.id]) }, null, null);
            // @ts-ignore
            [expandedFeatures,];
            const __VLS_10 = {}.FontAwesomeIcon;
            /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
            // @ts-ignore
            FontAwesomeIcon;
            // @ts-ignore
            const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
                icon: (['fas', 'check']),
                ...{ class: "text-green-500 mr-3 w-4 h-4" },
            }));
            const __VLS_12 = __VLS_11({
                icon: (['fas', 'check']),
                ...{ class: "text-green-500 mr-3 w-4 h-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_11));
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                ...{ class: "font-medium" },
            });
            (feature);
        }
        if (plan.features.length > 4 && !__VLS_ctx.expandedFeatures[plan.id]) {
            // @ts-ignore
            [expandedFeatures,];
            __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
                ...{ onClick: (...[$event]) => {
                        if (!!(!__VLS_ctx.authStore.isAuthenticated))
                            return;
                        if (!(plan.features.length > 4 && !__VLS_ctx.expandedFeatures[plan.id]))
                            return;
                        __VLS_ctx.expandedFeatures[plan.id] = true;
                        // @ts-ignore
                        [expandedFeatures,];
                    } },
                ...{ class: "text-sm text-primary-600 cursor-pointer hover:text-primary-700" },
            });
        }
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.authStore.isAuthenticated))
                        return;
                    __VLS_ctx.purchasePlan(plan.id);
                    // @ts-ignore
                    [purchasePlan,];
                } },
            disabled: (plan.id === __VLS_ctx.activePlan?.id || __VLS_ctx.loading),
            ...{ class: "btn-3d btn-3d-border w-full transition-all duration-300" },
            ...{ class: (plan.id === __VLS_ctx.activePlan?.id ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed' : '') },
        });
        // @ts-ignore
        [activePlan, activePlan, loading,];
        (plan.id === __VLS_ctx.activePlan?.id
            ? 'Active'
            : (__VLS_ctx.activePlan && __VLS_ctx.activePlan.price < plan.price ? 'Upgrade' : (__VLS_ctx.loading ? 'Processing...' : 'Purchase Plan')));
        // @ts-ignore
        [activePlan, activePlan, activePlan, loading,];
    }
}
if (__VLS_ctx.plans.length > 4 && !__VLS_ctx.showAllPlans) {
    // @ts-ignore
    [plans, showAllPlans,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center mt-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.plans.length > 4 && !__VLS_ctx.showAllPlans))
                    return;
                __VLS_ctx.showAllPlans = true;
                // @ts-ignore
                [showAllPlans,];
            } },
        ...{ class: "text-primary-600 font-medium hover:text-primary-700 text-base" },
    });
}
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d-border']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-3']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-green-900/20']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-green-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['line-through']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-700']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d-border']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
