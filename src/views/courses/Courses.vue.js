import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useCourseStore } from '@/stores/course';
import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loading';
import api from '@/services/api';
const loadingStore = useLoadingStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const courseStore = useCourseStore();
const courses = ref([]);
onMounted(async () => {
    try {
        loadingStore.start();
        await userStore.fetchDashboard();
        courses.value = await courseStore.fetchCourses();
    }
    catch (error) {
        console.error('Failed to fetch courses:', error);
    }
    finally {
        loadingStore.stop();
    }
});
const getAssetUrl = (path) => {
    if (!path)
        return '';
    const base = api.defaults.baseURL
        ? api.defaults.baseURL.replace(/\/api\/?$/, '/storage')
        : '/storage';
    return `${base}${path.startsWith('/') ? path : '/' + path}`;
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
else if (!__VLS_ctx.userStore.activePlan) {
    // @ts-ignore
    [userStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card text-center max-w-md mx-auto" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-neutral-600 dark:text-neutral-400 mb-6 text-base" },
    });
    const __VLS_10 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        to: "/plans",
        ...{ class: "btn-3d btn-3d-border w-full" },
    }));
    const __VLS_12 = __VLS_11({
        to: "/plans",
        ...{ class: "btn-3d btn-3d-border w-full" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    const { default: __VLS_14 } = __VLS_13.slots;
    const __VLS_15 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        icon: (['fas', 'credit-card']),
        ...{ class: "mr-2 w-4 h-4" },
    }));
    const __VLS_17 = __VLS_16({
        icon: (['fas', 'credit-card']),
        ...{ class: "mr-2 w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    var __VLS_13;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
    });
    for (const [course] of __VLS_getVForSourceType((__VLS_ctx.courses))) {
        // @ts-ignore
        [courses,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            key: (course.id),
            ...{ class: "card backdrop-blur" },
        });
        if (course.thumbnail) {
            __VLS_asFunctionalElement(__VLS_elements.img)({
                src: (__VLS_ctx.getAssetUrl(course.thumbnail)),
                alt: "Thumbnail",
                ...{ class: "w-full h-48 object-cover rounded-lg mb-4" },
            });
            // @ts-ignore
            [getAssetUrl,];
        }
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-xl font-semibold mb-3 text-neutral-900 dark:text-white" },
        });
        (course.title);
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed text-base" },
        });
        (course.description);
        const __VLS_20 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
        // @ts-ignore
        RouterLink;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            to: (`/courses/${course.id}`),
            ...{ class: "btn-3d btn-3d-border w-full text-center" },
        }));
        const __VLS_22 = __VLS_21({
            to: (`/courses/${course.id}`),
            ...{ class: "btn-3d btn-3d-border w-full text-center" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        const { default: __VLS_24 } = __VLS_23.slots;
        const __VLS_25 = {}.FontAwesomeIcon;
        /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
        // @ts-ignore
        FontAwesomeIcon;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            icon: (['fas', 'book']),
            ...{ class: "mr-2 w-4 h-4" },
        }));
        const __VLS_27 = __VLS_26({
            icon: (['fas', 'book']),
            ...{ class: "mr-2 w-4 h-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        var __VLS_23;
    }
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
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-48']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d-border']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
