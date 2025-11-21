import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAdminSettingsStore } from '@/stores/adminSettings';
import { useToast } from 'vue-toastification';
const authStore = useAuthStore();
const settingsStore = useAdminSettingsStore();
const toast = useToast();
const passwordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
});
const apiKeysForm = ref([]);
const seoForm = ref({
    google_search_console_id: '',
    google_analytics_id: '',
    google_tag_manager_id: '',
    facebook_pixel_id: '',
    sitemap_options: { pages: true, posts: true, categories: true, images: false },
});
const robotsForm = ref({ content: '' });
// Page title based on role
const pageTitle = computed(() => {
    return authStore.isEmployee ? 'Employee Settings' : 'Admin Settings';
});
const resetPasswordForm = () => {
    passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
    settingsStore.errors = [];
};
const resetApiKeysForm = () => {
    apiKeysForm.value = Object.entries(settingsStore.apiKeys || {}).map(([key_name, key_value]) => ({
        key_name,
        key_value: String(key_value),
    }));
    settingsStore.errors = [];
};
const handlePasswordUpdate = async () => {
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        settingsStore.errors = ['New password and confirmation do not match'];
        toast.error('New password and confirmation do not match');
        return;
    }
    try {
        await settingsStore.updatePassword(passwordForm.value.currentPassword, passwordForm.value.newPassword);
        resetPasswordForm();
        toast.success('Password updated successfully');
    }
    catch (error) {
        toast.error('Failed to update password');
    }
};
const handleApiKeysUpdate = async () => {
    try {
        await settingsStore.updateApiKeys(apiKeysForm.value);
        toast.success('API keys updated successfully');
    }
    catch (error) {
        toast.error('Failed to update API keys');
    }
};
const resetSeoForm = () => {
    seoForm.value = {
        google_search_console_id: settingsStore.seoSettings.google_search_console_id || '',
        google_analytics_id: settingsStore.seoSettings.google_analytics_id || '',
        google_tag_manager_id: settingsStore.seoSettings.google_tag_manager_id || '',
        facebook_pixel_id: settingsStore.seoSettings.facebook_pixel_id || '',
        sitemap_options: settingsStore.seoSettings.sitemap_options || { pages: true, posts: true, categories: true, images: false },
    };
    settingsStore.errors = [];
};
const resetRobotsForm = async () => {
    try {
        robotsForm.value.content = await settingsStore.fetchRobotsTxt();
    }
    catch { }
    settingsStore.errors = [];
};
const handleSeoUpdate = async () => {
    try {
        await settingsStore.updateSeoSettings(seoForm.value);
        resetSeoForm();
        toast.success('SEO settings updated successfully');
    }
    catch (error) {
        toast.error('Failed to update SEO settings');
    }
};
const handleRobotsUpdate = async () => {
    try {
        await settingsStore.updateRobotsTxt(robotsForm.value.content);
        resetRobotsForm();
        toast.success('Robots.txt updated successfully');
    }
    catch (error) {
        toast.error('Failed to update robots.txt');
    }
};
onMounted(async () => {
    try {
        await settingsStore.fetchApiKeys();
        resetApiKeysForm();
    }
    catch (error) { }
    try {
        await settingsStore.fetchSeoSettings();
        resetSeoForm();
        await settingsStore.fetchRobotsTxt();
        resetRobotsForm();
    }
    catch (error) { }
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
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-2xl font-semibold text-neutral-900 dark:text-white" },
});
(__VLS_ctx.pageTitle);
// @ts-ignore
[pageTitle,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card backdrop-blur" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-4" },
});
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.handlePasswordUpdate) },
    ...{ class: "space-y-4" },
});
// @ts-ignore
[handlePasswordUpdate,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "password",
    required: true,
    ...{ class: "input" },
    placeholder: "Enter current password",
});
(__VLS_ctx.passwordForm.currentPassword);
// @ts-ignore
[passwordForm,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "password",
    required: true,
    ...{ class: "input" },
    placeholder: "Enter new password",
});
(__VLS_ctx.passwordForm.newPassword);
// @ts-ignore
[passwordForm,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "password",
    required: true,
    ...{ class: "input" },
    placeholder: "Confirm new password",
});
(__VLS_ctx.passwordForm.confirmPassword);
// @ts-ignore
[passwordForm,];
if (__VLS_ctx.settingsStore.errors.length > 0) {
    // @ts-ignore
    [settingsStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "space-y-1" },
    });
    for (const [error] of __VLS_getVForSourceType((__VLS_ctx.settingsStore.errors))) {
        // @ts-ignore
        [settingsStore,];
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
    ...{ onClick: (__VLS_ctx.resetPasswordForm) },
    type: "button",
    ...{ class: "btn-secondary" },
});
// @ts-ignore
[resetPasswordForm,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: "submit",
    disabled: (__VLS_ctx.settingsStore.passwordLoading),
    ...{ class: "btn-3d" },
});
// @ts-ignore
[settingsStore,];
(__VLS_ctx.settingsStore.passwordLoading ? 'Saving...' : 'Update Password');
// @ts-ignore
[settingsStore,];
if (__VLS_ctx.authStore.isSuperAdmin) {
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card backdrop-blur" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-4" },
    });
    if (__VLS_ctx.settingsStore.loading) {
        // @ts-ignore
        [settingsStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-center items-center h-32" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-base text-neutral-600 dark:text-neutral-400" },
        });
    }
    else if (!__VLS_ctx.apiKeysForm.length) {
        // @ts-ignore
        [apiKeysForm,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-center items-center h-32" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-base text-neutral-600 dark:text-neutral-400" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
            ...{ onSubmit: (__VLS_ctx.handleApiKeysUpdate) },
            ...{ class: "space-y-4" },
        });
        // @ts-ignore
        [handleApiKeysUpdate,];
        for (const [key, index] of __VLS_getVForSourceType((__VLS_ctx.apiKeysForm))) {
            // @ts-ignore
            [apiKeysForm,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                key: (key.key_name),
            });
            __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
                ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
            });
            (key.key_name);
            __VLS_asFunctionalElement(__VLS_elements.input)({
                value: (__VLS_ctx.apiKeysForm[index].key_value),
                type: "text",
                required: true,
                ...{ class: "input" },
                placeholder: "Enter API key value",
            });
            // @ts-ignore
            [apiKeysForm,];
            __VLS_asFunctionalElement(__VLS_elements.input)({
                type: "hidden",
            });
            (__VLS_ctx.apiKeysForm[index].key_name);
            // @ts-ignore
            [apiKeysForm,];
        }
        if (__VLS_ctx.settingsStore.errors.length > 0) {
            // @ts-ignore
            [settingsStore,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "space-y-1" },
            });
            for (const [error] of __VLS_getVForSourceType((__VLS_ctx.settingsStore.errors))) {
                // @ts-ignore
                [settingsStore,];
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
            ...{ onClick: (__VLS_ctx.resetApiKeysForm) },
            type: "button",
            ...{ class: "btn-secondary" },
        });
        // @ts-ignore
        [resetApiKeysForm,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            type: "submit",
            disabled: (__VLS_ctx.settingsStore.apiKeysLoading),
            ...{ class: "btn-3d" },
        });
        // @ts-ignore
        [settingsStore,];
        (__VLS_ctx.settingsStore.apiKeysLoading ? 'Saving...' : 'Update API Keys');
        // @ts-ignore
        [settingsStore,];
    }
}
if (__VLS_ctx.authStore.isSuperAdmin) {
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card backdrop-blur" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSeoUpdate) },
        ...{ class: "space-y-4" },
    });
    // @ts-ignore
    [handleSeoUpdate,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        ...{ class: "input" },
        placeholder: "G-XXXXXXX",
    });
    (__VLS_ctx.seoForm.google_search_console_id);
    // @ts-ignore
    [seoForm,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        ...{ class: "input" },
        placeholder: "G-XXXXXXX",
    });
    (__VLS_ctx.seoForm.google_analytics_id);
    // @ts-ignore
    [seoForm,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        ...{ class: "input" },
        placeholder: "GTM-XXXXXX",
    });
    (__VLS_ctx.seoForm.google_tag_manager_id);
    // @ts-ignore
    [seoForm,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        ...{ class: "input" },
        placeholder: "XXXXXXXXXX",
    });
    (__VLS_ctx.seoForm.facebook_pixel_id);
    // @ts-ignore
    [seoForm,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-2 md:grid-cols-4 gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "flex items-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "checkbox",
        ...{ class: "mr-2" },
    });
    (__VLS_ctx.seoForm.sitemap_options.pages);
    // @ts-ignore
    [seoForm,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-neutral-900 dark:text-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "flex items-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "checkbox",
        ...{ class: "mr-2" },
    });
    (__VLS_ctx.seoForm.sitemap_options.posts);
    // @ts-ignore
    [seoForm,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-neutral-900 dark:text-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "flex items-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "checkbox",
        ...{ class: "mr-2" },
    });
    (__VLS_ctx.seoForm.sitemap_options.categories);
    // @ts-ignore
    [seoForm,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-neutral-900 dark:text-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "flex items-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "checkbox",
        ...{ class: "mr-2" },
    });
    (__VLS_ctx.seoForm.sitemap_options.images);
    // @ts-ignore
    [seoForm,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-neutral-900 dark:text-white" },
    });
    if (__VLS_ctx.settingsStore.errors.length > 0) {
        // @ts-ignore
        [settingsStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-1" },
        });
        for (const [error] of __VLS_getVForSourceType((__VLS_ctx.settingsStore.errors))) {
            // @ts-ignore
            [settingsStore,];
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
        ...{ onClick: (__VLS_ctx.resetSeoForm) },
        type: "button",
        ...{ class: "btn-secondary" },
    });
    // @ts-ignore
    [resetSeoForm,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        type: "submit",
        disabled: (__VLS_ctx.settingsStore.seoLoading),
        ...{ class: "btn-3d" },
    });
    // @ts-ignore
    [settingsStore,];
    (__VLS_ctx.settingsStore.seoLoading ? 'Saving...' : 'Update SEO Settings');
    // @ts-ignore
    [settingsStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
        ...{ class: "text-md font-medium text-neutral-900 dark:text-white mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
        value: (__VLS_ctx.robotsForm.content),
        disabled: (__VLS_ctx.settingsStore.robotsLoading),
        rows: "6",
        ...{ class: "input w-full" },
        placeholder: "\u0055\u0073\u0065\u0072\u002d\u0061\u0067\u0065\u006e\u0074\u003a\u0020\u002a\u005c\u006e\u0041\u006c\u006c\u006f\u0077\u003a\u0020\u002f",
    });
    // @ts-ignore
    [settingsStore, robotsForm,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-end space-x-3 pt-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.resetRobotsForm) },
        type: "button",
        ...{ class: "btn-secondary" },
    });
    // @ts-ignore
    [resetRobotsForm,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.handleRobotsUpdate) },
        disabled: (__VLS_ctx.settingsStore.robotsLoading),
        ...{ class: "btn-3d" },
    });
    // @ts-ignore
    [settingsStore, handleRobotsUpdate,];
    (__VLS_ctx.settingsStore.robotsLoading ? 'Saving...' : 'Update Robots.txt');
    // @ts-ignore
    [settingsStore,];
}
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
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
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
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
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-32']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-32']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
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
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
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
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
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
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-md']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
