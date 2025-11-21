import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { useAdminCoursesStore } from '@/stores/adminCourses';
import { useAdminStore } from '@/stores/admin';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
const adminCoursesStore = useAdminCoursesStore();
const adminStore = useAdminStore();
const authStore = useAuthStore();
const toast = useToast();
const searchQuery = ref('');
const debouncedSearch = (() => {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => applyFilters(), 300);
    };
})();
const filters = ref({
    status: 'all',
    dateFrom: '',
    dateTo: '',
});
const showModal = ref(false);
const isEdit = ref(false);
const form = ref({
    id: 0,
    title: '',
    description: '',
    video_url: '',
    video_path: null,
    thumbnail: null,
    thumbnailPreview: '',
    is_active: true,
});
const loading = ref(false);
const errors = ref([]);
const thumbnailInput = ref(null);
const showDeleteModal = ref(false);
const courseToDelete = ref(null);
let previewUrl = ref(null);
const videoSource = ref('url');
const currentVideoPath = ref(null);
const getParams = () => {
    const params = {};
    if (searchQuery.value)
        params.search = searchQuery.value;
    if (filters.value.status !== 'all')
        params.status = filters.value.status;
    if (filters.value.dateFrom)
        params.date_from = filters.value.dateFrom;
    if (filters.value.dateTo)
        params.date_to = filters.value.dateTo;
    if (authStore.isEmployee && authStore.user) {
        params.creator_id = authStore.user.id;
    }
    return params;
};
const applyFilters = async () => {
    const params = getParams();
    await adminCoursesStore.fetchCourses(1, params);
};
const resetFilters = async () => {
    searchQuery.value = '';
    filters.value = { status: 'all', dateFrom: '', dateTo: '' };
    const params = getParams();
    await adminCoursesStore.fetchCourses(1, params);
};
const refreshCourses = async () => {
    const params = getParams();
    await adminCoursesStore.fetchCourses(adminCoursesStore.currentPage, params);
};
const resetForm = () => {
    form.value = {
        id: 0,
        title: '',
        description: '',
        video_url: '',
        video_path: null,
        thumbnail: null,
        thumbnailPreview: '',
        is_active: true,
    };
    videoSource.value = 'url';
    currentVideoPath.value = null;
    if (thumbnailInput.value)
        thumbnailInput.value.value = '';
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
        previewUrl.value = null;
    }
};
const setVideoSource = (source) => {
    videoSource.value = source;
    if (source === 'url')
        form.value.video_path = null;
    else
        form.value.video_url = '';
};
const editCourse = (course) => {
    form.value = {
        id: course.id,
        title: course.title,
        description: course.description,
        video_url: course.video_url || '',
        video_path: null,
        thumbnail: null,
        thumbnailPreview: course.thumbnail || '',
        is_active: course.is_active,
    };
    currentVideoPath.value = course.video_path || null;
    videoSource.value = course.video_url ? 'url' : 'upload';
    errors.value = [];
    isEdit.value = true;
    showModal.value = true;
    nextTick(() => {
        const titleInput = document.querySelector('input[type="text"]');
        if (titleInput)
            titleInput.focus();
    });
};
const handleThumbnailChange = (event) => {
    const target = event.target;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        if (previewUrl.value)
            URL.revokeObjectURL(previewUrl.value);
        previewUrl.value = URL.createObjectURL(file);
        form.value.thumbnail = file;
        form.value.thumbnailPreview = previewUrl.value;
    }
};
const handleVideoChange = (event) => {
    const target = event.target;
    if (target.files && target.files[0])
        form.value.video_path = target.files[0];
};
const handleSubmit = async () => {
    if (!form.value.title || !form.value.description) {
        errors.value = ['Title and description are required'];
        return;
    }
    try {
        loading.value = true;
        errors.value = [];
        const submitData = {
            title: form.value.title,
            description: form.value.description,
            is_active: form.value.is_active,
        };
        if (videoSource.value === 'url') {
            submitData.video_url = form.value.video_url || '';
            submitData.video_path = '';
        }
        else {
            if (form.value.video_path instanceof File) {
                submitData.video_path = form.value.video_path;
            }
            submitData.video_url = '';
        }
        if (form.value.thumbnail instanceof File)
            submitData.thumbnail = form.value.thumbnail;
        if (isEdit.value) {
            await adminCoursesStore.updateCourse(form.value.id, submitData);
            toast.success('Course updated successfully');
        }
        else {
            await adminCoursesStore.createCourse(submitData);
            toast.success('Course created successfully');
        }
        showModal.value = false;
        resetForm();
        await refreshCourses();
    }
    catch (error) {
        const message = error.response?.data?.message || 'Operation failed';
        errors.value = Array.isArray(message) ? message : [message];
        toast.error(`Failed to ${isEdit.value ? 'update' : 'create'} course`);
    }
    finally {
        loading.value = false;
    }
};
const confirmDelete = (id) => {
    courseToDelete.value = id;
    showDeleteModal.value = true;
};
const handleDelete = async () => {
    if (!courseToDelete.value)
        return;
    try {
        await adminCoursesStore.deleteCourse(courseToDelete.value);
        toast.success('Course deleted successfully');
        showDeleteModal.value = false;
    }
    catch {
        toast.error('Failed to delete course');
    }
    await refreshCourses();
};
onUnmounted(() => {
    if (previewUrl.value)
        URL.revokeObjectURL(previewUrl.value);
});
onMounted(async () => {
    await adminStore.fetchDashboard();
    const initialParams = authStore.isEmployee && authStore.user ? { creator_id: authStore.user.id } : {};
    await adminCoursesStore.fetchCourses(1, initialParams);
});
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
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card backdrop-blur" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-between items-center mb-6" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-2xl font-semibold text-neutral-900 dark:text-white" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-sm text-neutral-600 dark:text-neutral-400" },
});
(__VLS_ctx.adminCoursesStore.totalCourses);
(__VLS_ctx.adminStore.totalCourses);
// @ts-ignore
[adminCoursesStore, adminStore,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-end" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showModal = true;
            __VLS_ctx.isEdit = false;
            __VLS_ctx.resetForm();
            // @ts-ignore
            [showModal, isEdit, resetForm,];
        } },
    ...{ class: "btn-3d" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card backdrop-blur" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-4" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid grid-cols-1 md:grid-cols-4 gap-4 items-end" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ onInput: (__VLS_ctx.debouncedSearch) },
    value: (__VLS_ctx.searchQuery),
    type: "text",
    placeholder: "Search by title or description...",
    ...{ class: "input" },
});
// @ts-ignore
[debouncedSearch, searchQuery,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    ...{ onChange: (__VLS_ctx.applyFilters) },
    value: (__VLS_ctx.filters.status),
    ...{ class: "input" },
});
// @ts-ignore
[applyFilters, filters,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "all",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "active",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "inactive",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid grid-cols-2 gap-2 md:col-span-2" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ onChange: (__VLS_ctx.applyFilters) },
    type: "date",
    ...{ class: "input" },
});
(__VLS_ctx.filters.dateFrom);
// @ts-ignore
[applyFilters, filters,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ onChange: (__VLS_ctx.applyFilters) },
    type: "date",
    ...{ class: "input" },
});
(__VLS_ctx.filters.dateTo);
// @ts-ignore
[applyFilters, filters,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-end mt-4 space-x-3" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.resetFilters) },
    ...{ class: "btn-secondary" },
});
// @ts-ignore
[resetFilters,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.applyFilters) },
    disabled: (__VLS_ctx.adminCoursesStore.loading),
    ...{ class: "btn-3d" },
});
// @ts-ignore
[adminCoursesStore, applyFilters,];
(__VLS_ctx.adminCoursesStore.loading ? 'Searching...' : 'Apply Filters');
// @ts-ignore
[adminCoursesStore,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.refreshCourses) },
    ...{ class: "btn-3d" },
});
// @ts-ignore
[refreshCourses,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card backdrop-blur" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "text-2xl font-semibold text-neutral-900 dark:text-white mb-4" },
});
if (__VLS_ctx.adminCoursesStore.loading) {
    // @ts-ignore
    [adminCoursesStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-center items-center h-64" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-base text-neutral-600 dark:text-neutral-400" },
    });
}
else if (__VLS_ctx.adminCoursesStore.courses.length > 0) {
    // @ts-ignore
    [adminCoursesStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "overflow-x-auto" },
    });
    __VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
        ...{ class: "w-full table-auto" },
    });
    __VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({});
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
        ...{ class: "bg-neutral-50 dark:bg-neutral-800" },
    });
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
        ...{ class: "px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
        ...{ class: "px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
        ...{ class: "px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
        ...{ class: "px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({
        ...{ class: "px-4 py-3 text-right text-sm font-semibold text-neutral-900 dark:text-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({
        ...{ class: "divide-y divide-neutral-200 dark:divide-neutral-700" },
    });
    for (const [course] of __VLS_getVForSourceType((__VLS_ctx.adminCoursesStore.courses))) {
        // @ts-ignore
        [adminCoursesStore,];
        __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
            key: (course.id),
            ...{ class: "hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors" },
        });
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-4 whitespace-nowrap" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "font-medium text-neutral-900 dark:text-white" },
        });
        (course.title);
        if (course.thumbnail) {
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "mt-1" },
            });
            __VLS_asFunctionalElement(__VLS_elements.img)({
                src: (course.thumbnail),
                alt: "Thumbnail",
                ...{ class: "w-12 h-8 object-cover rounded-md" },
            });
        }
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-4 text-sm text-neutral-900 dark:text-white max-w-xs truncate" },
        });
        (course.description);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-4 whitespace-nowrap" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "inline-flex px-2 py-1 text-xs font-semibold rounded-full" },
            ...{ class: (course.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200') },
        });
        (course.is_active ? 'Active' : 'Inactive');
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400" },
        });
        (new Date(course.created_at).toLocaleDateString());
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
            ...{ class: "px-4 py-4 whitespace-nowrap text-right text-sm font-medium" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-end space-x-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.adminCoursesStore.loading))
                        return;
                    if (!(__VLS_ctx.adminCoursesStore.courses.length > 0))
                        return;
                    __VLS_ctx.editCourse(course);
                    // @ts-ignore
                    [editCourse,];
                } },
            ...{ class: "text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 px-3 py-1 rounded-md transition" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.adminCoursesStore.loading))
                        return;
                    if (!(__VLS_ctx.adminCoursesStore.courses.length > 0))
                        return;
                    __VLS_ctx.confirmDelete(course.id);
                    // @ts-ignore
                    [confirmDelete,];
                } },
            ...{ class: "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded-md transition" },
        });
    }
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center py-6 text-neutral-600 dark:text-neutral-400" },
    });
    (Object.values(__VLS_ctx.filters).some(v => v && v !== 'all') ? ' matching filters' : '');
    // @ts-ignore
    [filters,];
}
if (__VLS_ctx.adminCoursesStore.lastPage > 1) {
    // @ts-ignore
    [adminCoursesStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-center items-center mt-6 space-x-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.adminCoursesStore.prevPage) },
        disabled: (__VLS_ctx.adminCoursesStore.currentPage === 1 || __VLS_ctx.adminCoursesStore.loading),
        ...{ class: "btn-secondary px-4 py-2" },
    });
    // @ts-ignore
    [adminCoursesStore, adminCoursesStore, adminCoursesStore,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "px-3 py-1 text-sm font-medium text-neutral-900 dark:text-white" },
    });
    (__VLS_ctx.adminCoursesStore.currentPage);
    (__VLS_ctx.adminCoursesStore.lastPage);
    // @ts-ignore
    [adminCoursesStore, adminCoursesStore,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.adminCoursesStore.nextPage) },
        disabled: (__VLS_ctx.adminCoursesStore.currentPage === __VLS_ctx.adminCoursesStore.lastPage || __VLS_ctx.adminCoursesStore.loading),
        ...{ class: "btn-secondary px-4 py-2" },
    });
    // @ts-ignore
    [adminCoursesStore, adminCoursesStore, adminCoursesStore, adminCoursesStore,];
}
if (__VLS_ctx.showModal) {
    // @ts-ignore
    [showModal,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showModal))
                    return;
                __VLS_ctx.showModal = false;
                // @ts-ignore
                [showModal,];
            } },
        ...{ class: "fixed inset-0 bg-black/50 flex items-center justify-center z-50" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ onClick: () => { } },
        ...{ class: "card backdrop-blur max-w-md w-full max-h-[90vh] overflow-y-auto" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-xl font-semibold text-neutral-900 dark:text-white mb-4" },
    });
    (__VLS_ctx.isEdit ? 'Edit Course' : 'Create Course');
    // @ts-ignore
    [isEdit,];
    __VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
        ...{ class: "space-y-4" },
    });
    // @ts-ignore
    [handleSubmit,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        value: (__VLS_ctx.form.title),
        type: "text",
        required: true,
        ...{ class: "input" },
    });
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
        value: (__VLS_ctx.form.description),
        required: true,
        rows: "3",
        ...{ class: "input" },
    });
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex space-x-2 mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showModal))
                    return;
                __VLS_ctx.setVideoSource('url');
                // @ts-ignore
                [setVideoSource,];
            } },
        type: "button",
        ...{ class: (__VLS_ctx.videoSource === 'url' ? 'btn-primary' : 'btn-secondary') },
        ...{ class: "px-4 py-2 text-sm" },
    });
    // @ts-ignore
    [videoSource,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showModal))
                    return;
                __VLS_ctx.setVideoSource('upload');
                // @ts-ignore
                [setVideoSource,];
            } },
        type: "button",
        ...{ class: (__VLS_ctx.videoSource === 'upload' ? 'btn-primary' : 'btn-secondary') },
        ...{ class: "px-4 py-2 text-sm" },
    });
    // @ts-ignore
    [videoSource,];
    if (__VLS_ctx.videoSource === 'url') {
        // @ts-ignore
        [videoSource,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "url",
            placeholder: "Enter video URL",
            ...{ class: "input" },
        });
        (__VLS_ctx.form.video_url);
        // @ts-ignore
        [form,];
    }
    if (__VLS_ctx.videoSource === 'upload') {
        // @ts-ignore
        [videoSource,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        if (__VLS_ctx.currentVideoPath && !__VLS_ctx.form.video_path) {
            // @ts-ignore
            [form, currentVideoPath,];
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "text-sm text-neutral-500 dark:text-neutral-400 mt-2 truncate" },
            });
            (__VLS_ctx.currentVideoPath);
            // @ts-ignore
            [currentVideoPath,];
        }
        __VLS_asFunctionalElement(__VLS_elements.input)({
            ...{ onChange: (__VLS_ctx.handleVideoChange) },
            type: "file",
            accept: "video/*",
            ...{ class: "input file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" },
        });
        // @ts-ignore
        [handleVideoChange,];
        if (__VLS_ctx.form.video_path) {
            // @ts-ignore
            [form,];
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "text-sm text-neutral-500 dark:text-neutral-400 mt-2 truncate" },
            });
            (__VLS_ctx.form.video_path.name);
            // @ts-ignore
            [form,];
        }
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-red-600" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        ...{ onChange: (__VLS_ctx.handleThumbnailChange) },
        ref: "thumbnailInput",
        type: "file",
        accept: "image/*",
        ...{ class: "input file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" },
    });
    /** @type {typeof __VLS_ctx.thumbnailInput} */ ;
    // @ts-ignore
    [handleThumbnailChange, thumbnailInput,];
    if (__VLS_ctx.form.thumbnailPreview) {
        // @ts-ignore
        [form,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "mt-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.img)({
            src: (__VLS_ctx.form.thumbnailPreview),
            alt: "Preview",
            ...{ class: "w-32 h-20 object-cover rounded-md" },
        });
        // @ts-ignore
        [form,];
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex items-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        id: "is_active",
        type: "checkbox",
        ...{ class: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-600 rounded" },
    });
    (__VLS_ctx.form.is_active);
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        for: "is_active",
        ...{ class: "ml-2 block text-sm text-neutral-900 dark:text-white" },
    });
    if (__VLS_ctx.errors.length > 0) {
        // @ts-ignore
        [errors,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-1" },
        });
        for (const [error] of __VLS_getVForSourceType((__VLS_ctx.errors))) {
            // @ts-ignore
            [errors,];
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                key: (error),
                ...{ class: "text-red-600 dark:text-red-400 text-sm" },
            });
            (error);
        }
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-end space-x-3 pt-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showModal))
                    return;
                __VLS_ctx.showModal = false;
                __VLS_ctx.resetForm();
                // @ts-ignore
                [showModal, resetForm,];
            } },
        type: "button",
        ...{ class: "btn-secondary" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        type: "submit",
        disabled: (__VLS_ctx.loading),
        ...{ class: "btn-3d" },
    });
    // @ts-ignore
    [loading,];
    (__VLS_ctx.loading ? (__VLS_ctx.isEdit ? 'Updating...' : 'Creating...') : (__VLS_ctx.isEdit ? 'Update Course' : 'Create Course'));
    // @ts-ignore
    [isEdit, isEdit, loading,];
}
if (__VLS_ctx.showDeleteModal) {
    // @ts-ignore
    [showDeleteModal,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "fixed inset-0 bg-black/50 flex items-center justify-center z-50" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card backdrop-blur max-w-sm w-full" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-neutral-600 dark:text-neutral-400 mb-6 text-sm" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-end space-x-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showDeleteModal))
                    return;
                __VLS_ctx.showDeleteModal = false;
                // @ts-ignore
                [showDeleteModal,];
            } },
        ...{ class: "btn-secondary" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.handleDelete) },
        ...{ class: "btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500" },
    });
    // @ts-ignore
    [handleDelete,];
}
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['items-end']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-3']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['table-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-50']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['divide-y']} */ ;
/** @type {__VLS_StyleScopedClasses['divide-neutral-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:divide-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-neutral-50']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:hover:bg-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:hover:text-primary-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-red-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-red-400']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:hover:text-red-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[90vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['file:mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['file:py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['file:px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['file:rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['file:border-0']} */ ;
/** @type {__VLS_StyleScopedClasses['file:text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['file:font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['file:bg-primary-50']} */ ;
/** @type {__VLS_StyleScopedClasses['file:text-primary-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:file:bg-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['file:mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['file:py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['file:px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['file:rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['file:border-0']} */ ;
/** @type {__VLS_StyleScopedClasses['file:text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['file:font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['file:bg-primary-50']} */ ;
/** @type {__VLS_StyleScopedClasses['file:text-primary-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:file:bg-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary-500']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-red-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-red-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-red-500']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
