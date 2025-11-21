import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import * as Plyr from 'plyr';
import { useCourseStore } from '@/stores/course';
import { useUserStore } from '@/stores/user';
import { useLoadingStore } from '@/stores/loading';
import { useToast } from 'vue-toastification';
import api from '@/services/api';
const windowOrigin = typeof window !== 'undefined' ? window.location.origin : '';
const route = useRoute();
const courseStore = useCourseStore();
const userStore = useUserStore();
const loadingStore = useLoadingStore();
const toast = useToast();
const videoEl = ref(null);
const playerInstance = ref(null);
const course = ref(null);
const otherCourses = ref([]);
const isSidebarCollapsed = ref(false);
const source = ref('');
const provider = ref(undefined);
const isHtml5 = computed(() => !provider.value);
const extractYouTubeId = (url) => {
    const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    return match && match[2].length === 11 ? match[2] : null;
};
const extractVimeoId = (url) => {
    const match = url.match(/^.*vimeo\.com\/(?:video\/)?(\d+)(?:\/[a-z0-9]+)?/);
    return match ? match[1] : null;
};
const getAssetUrl = (path) => {
    if (!path)
        return '';
    const base = api.defaults.baseURL ? api.defaults.baseURL.replace(/\/api\/?$/, '/storage') : '/storage';
    return `${base}${path.startsWith('/') ? path : '/' + path}`;
};
const initPlayer = async () => {
    if (!source.value || !course.value)
        return;
    const target = document.getElementById(`plyr-${course.value.id}`);
    if (!target)
        return;
    if (playerInstance.value)
        playerInstance.value.destroy();
    const options = {
        title: course.value.title,
        controls: ['play-large', 'restart', 'rewind', 'play', 'fast-forward', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'pip', 'airplay', 'fullscreen'],
        settings: ['quality', 'speed'],
        quality: { default: 1, options: [1] },
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
        ratio: '16:9'
    };
    if (isHtml5.value && videoEl.value) {
        videoEl.value.addEventListener('loadedmetadata', () => {
            playerInstance.value = new Plyr(videoEl.value, options);
            bindPlyrEvents();
        });
    }
    else {
        playerInstance.value = new Plyr(target, options);
        bindPlyrEvents();
    }
};
const bindPlyrEvents = () => {
    if (!playerInstance.value)
        return;
    playerInstance.value.on('play', () => console.log('[CoursePlay] Playing'));
    playerInstance.value.on('pause', () => console.log('[CoursePlay] Paused'));
    playerInstance.value.on('error', (event) => {
        console.error('[CoursePlay] Plyr error', event);
        toast.error('Failed to load video. Please check the source.');
    });
};
const destroyPlayer = () => {
    if (playerInstance.value) {
        playerInstance.value.destroy();
        playerInstance.value = null;
    }
};
const initializePlayer = async () => {
    if (!course.value)
        return;
    source.value = course.value.video_path ? getAssetUrl(course.value.video_path) : course.value.video_url || '';
    if (!source.value)
        return;
    if (source.value.includes('youtube.com') || source.value.includes('youtu.be')) {
        provider.value = 'youtube';
        if (!extractYouTubeId(source.value))
            toast.error('Invalid YouTube URL.');
    }
    else if (source.value.includes('vimeo.com')) {
        provider.value = 'vimeo';
        if (!extractVimeoId(source.value))
            toast.error('Invalid Vimeo URL.');
    }
    await nextTick();
    initPlayer();
};
onMounted(async () => {
    loadingStore.start();
    try {
        await userStore.fetchDashboard();
        await courseStore.fetchCourse(Number(route.params.id));
        course.value = courseStore.currentCourse;
        if (!course.value)
            throw new Error('Course not found');
        await initializePlayer();
        const allCourses = await courseStore.fetchCourses();
        otherCourses.value = allCourses.filter(c => c.id !== Number(route.params.id) && c.is_active).slice(0, 6);
    }
    catch (error) {
        console.error(error);
        toast.error('Failed to load course. Please try again.');
        course.value = null;
    }
    finally {
        loadingStore.stop();
    }
});
onUnmounted(() => destroyPlayer());
const toggleSidebar = () => { isSidebarCollapsed.value = !isSidebarCollapsed.value; };
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "space-y-8 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-between items-center" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-3xl font-bold text-neutral-900 dark:text-white" },
});
(__VLS_ctx.course?.title);
// @ts-ignore
[course,];
if (!__VLS_ctx.userStore.activePlan) {
    // @ts-ignore
    [userStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg shadow-sm p-6 max-w-lg mx-auto text-center border border-neutral-200 dark:border-neutral-700" },
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
        to: "/plans",
        ...{ class: "inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium text-sm rounded-md hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200 w-full" },
    }));
    const __VLS_2 = __VLS_1({
        to: "/plans",
        ...{ class: "inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium text-sm rounded-md hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200 w-full" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_4 } = __VLS_3.slots;
    const __VLS_5 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        icon: (['fas', 'credit-card']),
        ...{ class: "mr-2" },
    }));
    const __VLS_7 = __VLS_6({
        icon: (['fas', 'credit-card']),
        ...{ class: "mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    var __VLS_3;
}
else if (__VLS_ctx.course) {
    // @ts-ignore
    [course,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg shadow-sm relative p-6 border border-neutral-200 dark:border-neutral-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: (['grid gap-8 relative', __VLS_ctx.isSidebarCollapsed ? 'lg:grid-cols-1' : 'lg:grid-cols-[1fr_300px]']) },
    });
    // @ts-ignore
    [isSidebarCollapsed,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "relative aspect-video max-w-4xl mx-auto lg:mx-0 rounded-lg overflow-hidden bg-neutral-900/50" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-sm text-neutral-600 dark:text-neutral-400 mb-2" },
    });
    (__VLS_ctx.source);
    // @ts-ignore
    [source,];
    __VLS_asFunctionalElement(__VLS_elements.br)({});
    (__VLS_ctx.provider || 'html5');
    // @ts-ignore
    [provider,];
    if (!__VLS_ctx.source) {
        // @ts-ignore
        [source,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "h-[360px] flex items-center justify-center bg-neutral-800 rounded-lg" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-400" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            id: (`plyr-${__VLS_ctx.course.id}`),
            ...{ class: "rounded-lg overflow-hidden" },
        });
        // @ts-ignore
        [course,];
        if (__VLS_ctx.isHtml5) {
            // @ts-ignore
            [isHtml5,];
            __VLS_asFunctionalElement(__VLS_elements.video, __VLS_elements.video)({
                ref: "videoEl",
                ...{ class: "w-full h-full rounded-lg" },
                playsinline: true,
                controls: true,
                poster: (__VLS_ctx.course.thumbnail || undefined),
            });
            /** @type {typeof __VLS_ctx.videoEl} */ ;
            // @ts-ignore
            [course, videoEl,];
            __VLS_asFunctionalElement(__VLS_elements.source)({
                src: (__VLS_ctx.source),
                type: "video/mp4",
            });
            // @ts-ignore
            [source,];
        }
        else if (__VLS_ctx.provider === 'youtube') {
            // @ts-ignore
            [provider,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "w-full h-full" },
            });
            if (__VLS_ctx.extractYouTubeId(__VLS_ctx.source)) {
                // @ts-ignore
                [source, extractYouTubeId,];
                __VLS_asFunctionalElement(__VLS_elements.iframe, __VLS_elements.iframe)({
                    ...{ class: "w-full h-full rounded-lg" },
                    src: (`https://www.youtube.com/embed/${__VLS_ctx.extractYouTubeId(__VLS_ctx.source)}?origin=${__VLS_ctx.windowOrigin}&iv_load_policy=3`),
                    allowfullscreen: true,
                    allow: "autoplay; encrypted-media; picture-in-picture",
                    loading: "lazy",
                });
                // @ts-ignore
                [source, extractYouTubeId, windowOrigin,];
            }
        }
        else if (__VLS_ctx.provider === 'vimeo') {
            // @ts-ignore
            [provider,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "w-full h-full" },
            });
            if (__VLS_ctx.extractVimeoId(__VLS_ctx.source)) {
                // @ts-ignore
                [source, extractVimeoId,];
                __VLS_asFunctionalElement(__VLS_elements.iframe, __VLS_elements.iframe)({
                    ...{ class: "w-full h-full rounded-lg" },
                    src: (`https://player.vimeo.com/video/${__VLS_ctx.extractVimeoId(__VLS_ctx.source)}?dnt=1&portrait=0`),
                    allowfullscreen: true,
                    allow: "autoplay; fullscreen; picture-in-picture",
                    loading: "lazy",
                });
                // @ts-ignore
                [source, extractVimeoId,];
            }
        }
    }
    const __VLS_10 = {}.transition;
    /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
    // @ts-ignore
    Transition;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        name: "slide",
    }));
    const __VLS_12 = __VLS_11({
        name: "slide",
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    const { default: __VLS_14 } = __VLS_13.slots;
    if (!__VLS_ctx.isSidebarCollapsed) {
        // @ts-ignore
        [isSidebarCollapsed,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            key: "sidebar",
            ...{ class: "bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg shadow-sm p-6 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto relative border border-neutral-200 dark:border-neutral-700" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between items-center mb-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.toggleSidebar) },
            ...{ class: "text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition" },
            title: "Collapse Sidebar",
        });
        // @ts-ignore
        [toggleSidebar,];
        const __VLS_15 = {}.FontAwesomeIcon;
        /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
        // @ts-ignore
        FontAwesomeIcon;
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
            icon: "chevron-right",
        }));
        const __VLS_17 = __VLS_16({
            icon: "chevron-right",
        }, ...__VLS_functionalComponentArgsRest(__VLS_16));
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4 text-sm text-neutral-700 dark:text-neutral-300" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
        __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
        (__VLS_ctx.course.title);
        // @ts-ignore
        [course,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
        __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
        (__VLS_ctx.course.description);
        // @ts-ignore
        [course,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
        __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: (__VLS_ctx.course.is_active ? 'text-green-600' : 'text-red-600') },
        });
        // @ts-ignore
        [course,];
        (__VLS_ctx.course.is_active ? 'Active' : 'Inactive');
        // @ts-ignore
        [course,];
    }
    var __VLS_13;
    if (__VLS_ctx.isSidebarCollapsed) {
        // @ts-ignore
        [isSidebarCollapsed,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.toggleSidebar) },
            ...{ class: "absolute top-1/2 -right-6 transform -translate-y-1/2 bg-neutral-800 dark:bg-neutral-900 hover:bg-primary-600 text-white rounded-full p-3 shadow-md transition z-10" },
            title: "Open Course Summary",
        });
        // @ts-ignore
        [toggleSidebar,];
        const __VLS_20 = {}.FontAwesomeIcon;
        /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
        // @ts-ignore
        FontAwesomeIcon;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            icon: "chevron-left",
        }));
        const __VLS_22 = __VLS_21({
            icon: "chevron-left",
        }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mt-8 max-w-4xl mx-auto" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-neutral-600 dark:text-neutral-400 leading-relaxed text-base" },
    });
    (__VLS_ctx.course.description);
    // @ts-ignore
    [course,];
    const __VLS_25 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        to: (`/courses/${__VLS_ctx.course.id}`),
        ...{ class: "inline-flex items-center justify-center px-6 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white font-medium text-sm rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all duration-200 w-full max-w-xs text-center mx-auto block mt-6" },
    }));
    const __VLS_27 = __VLS_26({
        to: (`/courses/${__VLS_ctx.course.id}`),
        ...{ class: "inline-flex items-center justify-center px-6 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white font-medium text-sm rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all duration-200 w-full max-w-xs text-center mx-auto block mt-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_29 } = __VLS_28.slots;
    // @ts-ignore
    [course,];
    const __VLS_30 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        icon: (['fas', 'chevron-left']),
        ...{ class: "mr-2" },
    }));
    const __VLS_32 = __VLS_31({
        icon: (['fas', 'chevron-left']),
        ...{ class: "mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    var __VLS_28;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center py-12" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-neutral-600 dark:text-neutral-400 text-base" },
    });
}
if (__VLS_ctx.otherCourses.length > 0) {
    // @ts-ignore
    [otherCourses,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "space-y-6" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "text-2xl font-semibold text-neutral-900 dark:text-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" },
    });
    for (const [otherCourse] of __VLS_getVForSourceType((__VLS_ctx.otherCourses))) {
        // @ts-ignore
        [otherCourses,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            key: (otherCourse.id),
            ...{ class: "bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-neutral-200 dark:border-neutral-700" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-medium text-neutral-900 dark:text-white mb-2" },
        });
        (otherCourse.title);
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-4" },
        });
        (otherCourse.description);
        const __VLS_35 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
        // @ts-ignore
        RouterLink;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
            to: (`/courses/${otherCourse.id}`),
            ...{ class: "inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium text-sm rounded-md hover:from-pink-600 hover:to-blue-600 transition-all duration-200 w-full text-center" },
        }));
        const __VLS_37 = __VLS_36({
            to: (`/courses/${otherCourse.id}`),
            ...{ class: "inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium text-sm rounded-md hover:from-pink-600 hover:to-blue-600 transition-all duration-200 w-full text-center" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        const { default: __VLS_39 } = __VLS_38.slots;
        var __VLS_38;
    }
}
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/90']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-800/90']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:from-pink-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:to-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/90']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-800/90']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-video']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:mx-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-900/50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[360px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/90']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-800/90']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-fit']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[calc(100vh-8rem)]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:hover:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-right-6']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-100']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-neutral-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:hover:bg-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/90']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-800/90']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['line-clamp-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:from-pink-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:to-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
