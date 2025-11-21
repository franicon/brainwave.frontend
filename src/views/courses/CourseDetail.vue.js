import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCourseStore } from '@/stores/course';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toastification';
import api from '@/services/api';
const route = useRoute();
const courseStore = useCourseStore();
const userStore = useUserStore();
const toast = useToast();
const course = ref(null);
const loading = ref(true);
const enrollLoading = ref(false);
const previewVideo = ref(null);
const showPreviewOverlay = ref(false);
let timeupdateHandler = null;
let endedHandler = null;
let seekingHandler = null;
const previewDuration = ref(5);
const setupPreview = () => {
    if (!previewVideo.value)
        return;
    const video = previewVideo.value;
    const totalDuration = video.duration || 0;
    previewDuration.value = Math.min(5, totalDuration);
    // Timeupdate handler to pause at preview duration
    timeupdateHandler = () => {
        if (video.currentTime >= previewDuration.value) {
            video.pause();
            showPreviewOverlay.value = true;
        }
    };
    video.addEventListener('timeupdate', timeupdateHandler);
    // Play handler to hide overlay
    const playHandler = () => {
        showPreviewOverlay.value = false;
    };
    video.addEventListener('play', playHandler);
    // Ended handler to show overlay for short videos
    endedHandler = () => {
        showPreviewOverlay.value = true;
    };
    video.addEventListener('ended', endedHandler);
    // Seeking handler to prevent seeking beyond preview
    seekingHandler = () => {
        if (video.currentTime > previewDuration.value) {
            video.currentTime = 0;
            showPreviewOverlay.value = true;
        }
    };
    video.addEventListener('seeking', seekingHandler);
    // Clean up handlers on unmount or when mode changes
    const cleanup = () => {
        if (timeupdateHandler) {
            video.removeEventListener('timeupdate', timeupdateHandler);
            timeupdateHandler = null;
        }
        video.removeEventListener('play', playHandler);
        if (endedHandler) {
            video.removeEventListener('ended', endedHandler);
            endedHandler = null;
        }
        if (seekingHandler) {
            video.removeEventListener('seeking', seekingHandler);
            seekingHandler = null;
        }
    };
    // If component unmounts or preview mode changes
    onUnmounted(cleanup);
};
onMounted(async () => {
    try {
        await userStore.fetchDashboard();
        await courseStore.fetchCourse(Number(route.params.id));
        course.value = courseStore.currentCourse;
    }
    catch (error) {
        console.error('Failed to load course:', error);
    }
    finally {
        loading.value = false;
    }
});
// Use enrollment directly from store
const enrollment = computed(() => courseStore.currentEnrollment);
const isEnrolled = computed(() => enrollment.value?.status === 'active');
const isCompleted = computed(() => enrollment.value?.status === 'completed');
const isPreviewMode = computed(() => !isEnrolled.value && !isCompleted.value);
// Watch for changes in preview mode and course to setup preview
watch([isPreviewMode, () => course.value?.video_path], async ([preview, path]) => {
    await nextTick();
    if (preview && path && previewVideo.value) {
        const video = previewVideo.value;
        if (video.readyState >= 1) { // HAVE_METADATA or higher
            setupPreview();
        }
        else {
            const metadataHandler = () => {
                setupPreview();
                video.removeEventListener('loadedmetadata', metadataHandler);
            };
            video.addEventListener('loadedmetadata', metadataHandler);
        }
    }
}, { immediate: true });
// Label for continue button with progress
const continueLabel = computed(() => {
    if (enrollment.value && enrollment.value.progress > 0) {
        return `Continue Learning (${enrollment.value.progress}%)`;
    }
    return 'Continue Learning';
});
const enrollCourse = async () => {
    if (!course.value)
        return;
    try {
        enrollLoading.value = true;
        await courseStore.enrollCourse(course.value.id, isCompleted.value);
        toast.success(isCompleted.value ? 'Re-enrolled successfully!' : 'Enrolled successfully!');
        await userStore.fetchDashboard();
    }
    catch (error) {
        toast.error(error.response?.data?.message || 'Action failed');
    }
    finally {
        enrollLoading.value = false;
    }
};
const isEmbeddable = (url) => url ? ['youtube.com', 'youtu.be', 'vimeo.com'].some(s => url.includes(s)) : false;
const getEmbedUrl = (url) => {
    if (!url)
        return '';
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    if (url.includes('vimeo.com')) {
        const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
        return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    return url;
};
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
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/courses",
    ...{ class: "text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center text-base font-medium" },
}));
const __VLS_2 = __VLS_1({
    to: "/courses",
    ...{ class: "text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center text-base font-medium" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
const __VLS_5 = {}.FontAwesomeIcon;
/** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
// @ts-ignore
FontAwesomeIcon;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    icon: (['fas', 'chevron-left']),
    ...{ class: "mr-2 w-4 h-4" },
}));
const __VLS_7 = __VLS_6({
    icon: (['fas', 'chevron-left']),
    ...{ class: "mr-2 w-4 h-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-3xl font-bold text-neutral-900 dark:text-white mt-2" },
});
(__VLS_ctx.course?.title);
// @ts-ignore
[course,];
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center py-12" },
    });
    const __VLS_10 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        icon: (['fas', 'spinner']),
        spin: true,
        ...{ class: "text-4xl text-primary-600 mb-4" },
    }));
    const __VLS_12 = __VLS_11({
        icon: (['fas', 'spinner']),
        spin: true,
        ...{ class: "text-4xl text-primary-600 mb-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-neutral-600 dark:text-neutral-400 text-base" },
    });
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
    const __VLS_15 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        to: "/plans",
        ...{ class: "btn-3d btn-3d-border w-full" },
    }));
    const __VLS_17 = __VLS_16({
        to: "/plans",
        ...{ class: "btn-3d btn-3d-border w-full" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_19 } = __VLS_18.slots;
    const __VLS_20 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        icon: (['fas', 'credit-card']),
        ...{ class: "mr-2 w-4 h-4" },
    }));
    const __VLS_22 = __VLS_21({
        icon: (['fas', 'credit-card']),
        ...{ class: "mr-2 w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    var __VLS_18;
}
else if (__VLS_ctx.course) {
    // @ts-ignore
    [course,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-8" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    if (__VLS_ctx.course.thumbnail) {
        // @ts-ignore
        [course,];
        __VLS_asFunctionalElement(__VLS_elements.img)({
            src: (__VLS_ctx.getAssetUrl(__VLS_ctx.course.thumbnail)),
            alt: "Thumbnail",
            ...{ class: "w-full h-64 object-cover rounded-lg mb-6" },
        });
        // @ts-ignore
        [course, getAssetUrl,];
    }
    if (__VLS_ctx.course.video_url || __VLS_ctx.course.video_path) {
        // @ts-ignore
        [course, course,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "mb-8 relative" },
        });
        if (__VLS_ctx.isPreviewMode && __VLS_ctx.course.video_path) {
            // @ts-ignore
            [course, isPreviewMode,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "relative" },
            });
            __VLS_asFunctionalElement(__VLS_elements.video, __VLS_elements.video)({
                ref: "previewVideo",
                controls: true,
                preload: "metadata",
                ...{ class: "video-container" },
                poster: (__VLS_ctx.course.thumbnail ? __VLS_ctx.getAssetUrl(__VLS_ctx.course.thumbnail) : undefined),
            });
            /** @type {typeof __VLS_ctx.previewVideo} */ ;
            // @ts-ignore
            [course, course, getAssetUrl, previewVideo,];
            __VLS_asFunctionalElement(__VLS_elements.source)({
                src: (__VLS_ctx.getAssetUrl(__VLS_ctx.course.video_path)),
                type: "video/mp4",
            });
            // @ts-ignore
            [course, getAssetUrl,];
            if (__VLS_ctx.showPreviewOverlay) {
                // @ts-ignore
                [showPreviewOverlay,];
                __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                    ...{ class: "absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-10" },
                });
                __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                    ...{ class: "text-center text-white px-4" },
                });
                __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                    ...{ class: "text-lg font-semibold mb-2" },
                });
                __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                    ...{ class: "text-sm mb-4" },
                });
                __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                    ...{ onClick: (__VLS_ctx.enrollCourse) },
                    disabled: (__VLS_ctx.enrollLoading),
                    ...{ class: "btn-3d btn-3d-border px-6 py-2" },
                });
                // @ts-ignore
                [enrollCourse, enrollLoading,];
                (__VLS_ctx.enrollLoading ? 'Enrolling...' : 'Enroll Now');
                // @ts-ignore
                [enrollLoading,];
            }
        }
        else if (__VLS_ctx.course.video_path) {
            // @ts-ignore
            [course,];
            __VLS_asFunctionalElement(__VLS_elements.video, __VLS_elements.video)({
                controls: true,
                ...{ class: "video-container" },
                poster: (__VLS_ctx.course.thumbnail ? __VLS_ctx.getAssetUrl(__VLS_ctx.course.thumbnail) : undefined),
            });
            // @ts-ignore
            [course, course, getAssetUrl,];
            __VLS_asFunctionalElement(__VLS_elements.source)({
                src: (__VLS_ctx.getAssetUrl(__VLS_ctx.course.video_path)),
                type: "video/mp4",
            });
            // @ts-ignore
            [course, getAssetUrl,];
        }
        else if (__VLS_ctx.isPreviewMode && __VLS_ctx.course.video_url) {
            // @ts-ignore
            [course, isPreviewMode,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "relative bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden" },
            });
            __VLS_asFunctionalElement(__VLS_elements.img)({
                src: (__VLS_ctx.course.thumbnail ? __VLS_ctx.getAssetUrl(__VLS_ctx.course.thumbnail) : undefined),
                alt: "Video Preview",
                ...{ class: "w-full h-64 md:h-96 object-cover" },
            });
            // @ts-ignore
            [course, course, getAssetUrl,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "absolute inset-0 bg-black/50 flex items-center justify-center" },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-center text-white px-4" },
            });
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "text-lg font-semibold mb-2" },
            });
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "text-sm mb-4" },
            });
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ onClick: (__VLS_ctx.enrollCourse) },
                disabled: (__VLS_ctx.enrollLoading),
                ...{ class: "btn-3d btn-3d-border px-6 py-2" },
            });
            // @ts-ignore
            [enrollCourse, enrollLoading,];
            (__VLS_ctx.enrollLoading ? 'Enrolling...' : 'Enroll Now');
            // @ts-ignore
            [enrollLoading,];
        }
        else if (__VLS_ctx.course.video_url && __VLS_ctx.isEmbeddable(__VLS_ctx.course.video_url)) {
            // @ts-ignore
            [course, course, isEmbeddable,];
            __VLS_asFunctionalElement(__VLS_elements.iframe, __VLS_elements.iframe)({
                src: (__VLS_ctx.getEmbedUrl(__VLS_ctx.course.video_url)),
                ...{ class: "video-container h-64 md:h-96" },
                frameborder: "0",
                allowfullscreen: true,
            });
            // @ts-ignore
            [course, getEmbedUrl,];
        }
    }
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-neutral-600 dark:text-neutral-400 leading-relaxed text-base" },
    });
    (__VLS_ctx.course.description);
    // @ts-ignore
    [course,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card backdrop-blur" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "space-y-6" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "text-xl font-semibold text-neutral-900 dark:text-white mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "space-y-3 text-neutral-700 dark:text-neutral-300 text-base" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "flex items-center" },
    });
    const __VLS_25 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        icon: (['fas', 'book']),
        ...{ class: "mr-2 text-neutral-500 dark:text-neutral-400 w-4 h-4" },
    }));
    const __VLS_27 = __VLS_26({
        icon: (['fas', 'book']),
        ...{ class: "mr-2 text-neutral-500 dark:text-neutral-400 w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "ml-2" },
    });
    (__VLS_ctx.course.title);
    // @ts-ignore
    [course,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "flex items-center" },
    });
    const __VLS_30 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        icon: (['fas', 'pen']),
        ...{ class: "mr-2 text-neutral-500 dark:text-neutral-400 w-4 h-4" },
    }));
    const __VLS_32 = __VLS_31({
        icon: (['fas', 'pen']),
        ...{ class: "mr-2 text-neutral-500 dark:text-neutral-400 w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "ml-2" },
    });
    (__VLS_ctx.course.description);
    // @ts-ignore
    [course,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "flex items-center" },
    });
    const __VLS_35 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        icon: (['fas', __VLS_ctx.course.is_active ? 'check' : 'times']),
        ...{ class: ({
                'text-green-500': __VLS_ctx.course.is_active,
                'text-red-500': !__VLS_ctx.course.is_active,
            }) },
        ...{ class: "mr-2 w-4 h-4" },
    }));
    const __VLS_37 = __VLS_36({
        icon: (['fas', __VLS_ctx.course.is_active ? 'check' : 'times']),
        ...{ class: ({
                'text-green-500': __VLS_ctx.course.is_active,
                'text-red-500': !__VLS_ctx.course.is_active,
            }) },
        ...{ class: "mr-2 w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    // @ts-ignore
    [course, course, course,];
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "ml-2" },
    });
    (__VLS_ctx.course.is_active ? 'Active' : 'Inactive');
    // @ts-ignore
    [course,];
    if (__VLS_ctx.course.thumbnail) {
        // @ts-ignore
        [course,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "flex items-center" },
        });
        const __VLS_40 = {}.FontAwesomeIcon;
        /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
        // @ts-ignore
        FontAwesomeIcon;
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
            icon: (['fas', 'video']),
            ...{ class: "mr-2 text-neutral-500 dark:text-neutral-400 w-4 h-4" },
        }));
        const __VLS_42 = __VLS_41({
            icon: (['fas', 'video']),
            ...{ class: "mr-2 text-neutral-500 dark:text-neutral-400 w-4 h-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_41));
        __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "ml-2 text-neutral-500 dark:text-neutral-400" },
        });
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-6" },
    });
    if (!__VLS_ctx.isEnrolled && !__VLS_ctx.isCompleted) {
        // @ts-ignore
        [isEnrolled, isCompleted,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-600 dark:text-neutral-400 mb-4 text-base" },
        });
    }
    if (!__VLS_ctx.isEnrolled && !__VLS_ctx.isCompleted) {
        // @ts-ignore
        [isEnrolled, isCompleted,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.enrollCourse) },
            disabled: (__VLS_ctx.enrollLoading),
            ...{ class: "btn-3d btn-3d-border w-full" },
        });
        // @ts-ignore
        [enrollCourse, enrollLoading,];
        (__VLS_ctx.enrollLoading ? 'Enrolling...' : 'Enroll Now');
        // @ts-ignore
        [enrollLoading,];
    }
    else if (__VLS_ctx.isEnrolled && !__VLS_ctx.isCompleted) {
        // @ts-ignore
        [isEnrolled, isCompleted,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(!__VLS_ctx.userStore.activePlan))
                        return;
                    if (!(__VLS_ctx.course))
                        return;
                    if (!!(!__VLS_ctx.isEnrolled && !__VLS_ctx.isCompleted))
                        return;
                    if (!(__VLS_ctx.isEnrolled && !__VLS_ctx.isCompleted))
                        return;
                    __VLS_ctx.$router.push(`/courses/${__VLS_ctx.course.id}/play`);
                    // @ts-ignore
                    [course, $router,];
                } },
            ...{ class: "btn-3d btn-3d-border w-full" },
        });
        (__VLS_ctx.enrollLoading ? 'Loading...' : __VLS_ctx.continueLabel);
        // @ts-ignore
        [enrollLoading, continueLabel,];
    }
    else if (__VLS_ctx.isCompleted) {
        // @ts-ignore
        [isCompleted,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.enrollCourse) },
            disabled: (__VLS_ctx.enrollLoading),
            ...{ class: "btn-3d btn-3d-border w-full" },
        });
        // @ts-ignore
        [enrollCourse, enrollLoading,];
        (__VLS_ctx.enrollLoading ? 'Re-enrolling...' : 'Re-enroll');
        // @ts-ignore
        [enrollLoading,];
    }
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center py-12" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-neutral-600 dark:text-neutral-400 text-base" },
    });
}
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
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
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['video-container']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d-border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['video-container']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-100']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['md:h-96']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d-border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['video-container']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['md:h-96']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d-border']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d-border']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d-border']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
