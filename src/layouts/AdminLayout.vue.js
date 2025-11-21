import { computed, ref } from 'vue';
import { useDarkMode } from '@/composables/useDarkMode';
import { useCollapse } from '@/composables/useCollapse';
import { useAuthStore } from '@/stores/auth';
import { ChartBarIcon, UsersIcon, BookOpenIcon, PlusIcon, Cog6ToothIcon, CogIcon, ArrowRightOnRectangleIcon, BellIcon, Bars3Icon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon, MoonIcon, SunIcon, } from '@/plugins/heroicons';
const { isDark, toggleDark } = useDarkMode();
const { isCollapsed, isMobile, toggleCollapse } = useCollapse();
const authStore = useAuthStore();
const isOpen = ref(false);
const modalOpen = ref(false);
// Base menu items (relative paths without prefix)
const baseAdminMenu = [
    { path: '/dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { path: '/users', label: 'Users', icon: UsersIcon },
    { path: '/employees', label: 'Employees', icon: UsersIcon },
    { path: '/courses', label: 'Courses', icon: BookOpenIcon },
    { path: '/courses/create', label: 'Create Course', icon: PlusIcon },
    { path: '/plans', label: 'Plans', icon: Cog6ToothIcon },
    { path: '/blogs', label: 'Blogs', icon: BookOpenIcon },
    { path: '/settings', label: 'Settings', icon: CogIcon },
];
const getPermissionKey = (path) => {
    if (path === '/dashboard')
        return true;
    if (path.startsWith('/users'))
        return 'users';
    if (path.startsWith('/employees'))
        return 'employees';
    if (path.startsWith('/courses'))
        return 'courses';
    if (path.startsWith('/plans'))
        return 'plans';
    if (path.startsWith('/blogs'))
        return 'blogs';
    if (path.startsWith('/settings'))
        return 'settings';
    return false;
};
// Compute prefix based on role
const prefix = computed(() => {
    return authStore.isSuperAdmin ? '/admin' : '/employee';
});
// Compute full path for menu items
const getFullPath = (relativePath) => computed(() => prefix.value + relativePath).value;
// Filter menu based on permissions
const filteredAdminMenu = computed(() => {
    if (authStore.isSuperAdmin) {
        return baseAdminMenu;
    }
    const permissions = authStore.user?.permissions || [];
    return baseAdminMenu.filter((item) => {
        const key = getPermissionKey(item.path);
        return key === true || permissions.includes(key);
    });
});
// Settings path
const settingsPath = computed(() => prefix.value + '/settings');
// Header title based on role
const headerTitle = computed(() => {
    if (authStore.isEmployee)
        return 'Employee Panel';
    return 'Admin Panel';
});
const openLogoutConfirm = () => {
    modalOpen.value = true;
};
const confirmLogout = () => {
    authStore.logout();
    modalOpen.value = false;
};
const handleMenuClick = () => {
    if (isMobile.value) {
        isOpen.value = false;
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
    ...{ class: "flex min-h-screen bg-neutral-50 dark:bg-neutral-900 relative" },
});
if (__VLS_ctx.isMobile && __VLS_ctx.isOpen) {
    // @ts-ignore
    [isMobile, isOpen,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isMobile && __VLS_ctx.isOpen))
                    return;
                __VLS_ctx.isOpen = false;
                // @ts-ignore
                [isOpen,];
            } },
        ...{ class: "fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden" },
    });
}
__VLS_asFunctionalElement(__VLS_elements.aside, __VLS_elements.aside)({
    ...{ class: "bg-neutral-800 dark:bg-neutral-900 text-white h-screen fixed top-0 left-0 overflow-y-auto z-50 flex flex-col justify-between transition-all duration-300 ease-in-out border-r border-neutral-200 dark:border-neutral-700" },
    ...{ class: ([
            __VLS_ctx.isMobile
                ? (__VLS_ctx.isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64')
                : (__VLS_ctx.isCollapsed ? 'w-16' : 'w-64'),
            'lg:translate-x-0'
        ]) },
});
// @ts-ignore
[isMobile, isOpen, isCollapsed,];
if (__VLS_ctx.isMobile && __VLS_ctx.isOpen) {
    // @ts-ignore
    [isMobile, isOpen,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isMobile && __VLS_ctx.isOpen))
                    return;
                __VLS_ctx.isOpen = false;
                // @ts-ignore
                [isOpen,];
            } },
        ...{ class: "absolute top-4 right-4 p-2 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white z-50" },
    });
    const __VLS_0 = {}.XMarkIcon;
    /** @type {[typeof __VLS_components.XMarkIcon, ]} */ ;
    // @ts-ignore
    XMarkIcon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "w-5 h-5" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "w-5 h-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "relative p-6 border-b border-neutral-700" },
});
if (!__VLS_ctx.isCollapsed || __VLS_ctx.isMobile) {
    // @ts-ignore
    [isMobile, isCollapsed,];
    __VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
        ...{ class: "text-2xl font-semibold text-white text-center" },
    });
}
if (!__VLS_ctx.isMobile) {
    // @ts-ignore
    [isMobile,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.toggleCollapse) },
        ...{ class: "absolute top-1/2 right-4 transform -translate-y-1/2 p-2 hover:bg-neutral-700 rounded transition-colors" },
    });
    // @ts-ignore
    [toggleCollapse,];
    if (__VLS_ctx.isCollapsed) {
        // @ts-ignore
        [isCollapsed,];
        const __VLS_5 = {}.ChevronRightIcon;
        /** @type {[typeof __VLS_components.ChevronRightIcon, ]} */ ;
        // @ts-ignore
        ChevronRightIcon;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
            ...{ class: "w-5 h-5 text-white" },
        }));
        const __VLS_7 = __VLS_6({
            ...{ class: "w-5 h-5 text-white" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    }
    else {
        const __VLS_10 = {}.ChevronLeftIcon;
        /** @type {[typeof __VLS_components.ChevronLeftIcon, ]} */ ;
        // @ts-ignore
        ChevronLeftIcon;
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
            ...{ class: "w-5 h-5 text-white" },
        }));
        const __VLS_12 = __VLS_11({
            ...{ class: "w-5 h-5 text-white" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    }
}
__VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
    ...{ class: ([__VLS_ctx.isCollapsed && !__VLS_ctx.isMobile ? 'p-3 space-y-2' : 'p-6 space-y-2']) },
});
// @ts-ignore
[isMobile, isCollapsed,];
__VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
    key: (`menu-${__VLS_ctx.isCollapsed ? 'collapsed' : 'expanded'}`),
});
// @ts-ignore
[isCollapsed,];
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.filteredAdminMenu))) {
    // @ts-ignore
    [filteredAdminMenu,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        key: (item.path),
        ...{ class: "rounded-md hover:bg-neutral-700 transition-colors duration-200" },
    });
    const __VLS_15 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        ...{ 'onClick': {} },
        to: (__VLS_ctx.getFullPath(item.path)),
        ...{ class: "flex items-center py-2.5 px-4 text-white font-medium text-base transition-colors duration-200" },
        ...{ class: ([__VLS_ctx.isCollapsed && !__VLS_ctx.isMobile ? 'justify-center px-0' : '']) },
    }));
    const __VLS_17 = __VLS_16({
        ...{ 'onClick': {} },
        to: (__VLS_ctx.getFullPath(item.path)),
        ...{ class: "flex items-center py-2.5 px-4 text-white font-medium text-base transition-colors duration-200" },
        ...{ class: ([__VLS_ctx.isCollapsed && !__VLS_ctx.isMobile ? 'justify-center px-0' : '']) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    let __VLS_19;
    let __VLS_20;
    const __VLS_21 = ({ click: {} },
        { onClick: (__VLS_ctx.handleMenuClick) });
    const { default: __VLS_22 } = __VLS_18.slots;
    // @ts-ignore
    [isMobile, isCollapsed, getFullPath, handleMenuClick,];
    const __VLS_23 = ((item.icon));
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
        ...{ class: "w-5 h-5 text-white mr-3 transition-colors flex-shrink-0" },
        ...{ class: ([{ 'mr-0': __VLS_ctx.isCollapsed && !__VLS_ctx.isMobile }]) },
    }));
    const __VLS_25 = __VLS_24({
        ...{ class: "w-5 h-5 text-white mr-3 transition-colors flex-shrink-0" },
        ...{ class: ([{ 'mr-0': __VLS_ctx.isCollapsed && !__VLS_ctx.isMobile }]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    // @ts-ignore
    [isMobile, isCollapsed,];
    if (!__VLS_ctx.isCollapsed || __VLS_ctx.isMobile) {
        // @ts-ignore
        [isMobile, isCollapsed,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (item.label);
    }
    var __VLS_18;
    if (!__VLS_ctx.isCollapsed || __VLS_ctx.isMobile) {
        // @ts-ignore
        [isMobile, isCollapsed,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "border-b border-neutral-700 mx-4" },
        });
    }
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: ([__VLS_ctx.isCollapsed && !__VLS_ctx.isMobile ? 'p-3' : 'p-6', 'border-t border-neutral-700']) },
});
// @ts-ignore
[isMobile, isCollapsed,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.openLogoutConfirm) },
    ...{ class: "flex items-center py-2.5 w-full text-white font-medium text-base hover:bg-neutral-700 rounded-md transition-all duration-200" },
    ...{ class: ([__VLS_ctx.isCollapsed && !__VLS_ctx.isMobile ? 'justify-center' : '']) },
});
// @ts-ignore
[isMobile, isCollapsed, openLogoutConfirm,];
const __VLS_28 = {}.ArrowRightOnRectangleIcon;
/** @type {[typeof __VLS_components.ArrowRightOnRectangleIcon, ]} */ ;
// @ts-ignore
ArrowRightOnRectangleIcon;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ class: "w-5 h-5 text-white transition-colors flex-shrink-0" },
    ...{ class: ([{ 'mr-3': !__VLS_ctx.isCollapsed || __VLS_ctx.isMobile }]) },
}));
const __VLS_30 = __VLS_29({
    ...{ class: "w-5 h-5 text-white transition-colors flex-shrink-0" },
    ...{ class: ([{ 'mr-3': !__VLS_ctx.isCollapsed || __VLS_ctx.isMobile }]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
// @ts-ignore
[isMobile, isCollapsed,];
if (!__VLS_ctx.isCollapsed || __VLS_ctx.isMobile) {
    // @ts-ignore
    [isMobile, isCollapsed,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex-1 transition-all duration-300" },
    ...{ class: ([!__VLS_ctx.isMobile ? (__VLS_ctx.isCollapsed ? 'ml-16' : 'ml-64') : 'ml-0']) },
});
// @ts-ignore
[isMobile, isCollapsed,];
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "flex items-center justify-between px-6 py-4 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 shadow-sm" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center space-x-4" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.isOpen = !__VLS_ctx.isOpen;
            // @ts-ignore
            [isOpen, isOpen,];
        } },
    ...{ class: "lg:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 rounded-md transition-colors" },
});
const __VLS_33 = {}.Bars3Icon;
/** @type {[typeof __VLS_components.Bars3Icon, ]} */ ;
// @ts-ignore
Bars3Icon;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    ...{ class: "w-6 h-6" },
}));
const __VLS_35 = __VLS_34({
    ...{ class: "w-6 h-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
var __VLS_38 = {};
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-xl font-semibold text-neutral-900 dark:text-white" },
});
(__VLS_ctx.headerTitle);
// @ts-ignore
[headerTitle,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center space-x-4" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ class: "p-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 rounded-md transition-colors" },
});
const __VLS_40 = {}.BellIcon;
/** @type {[typeof __VLS_components.BellIcon, ]} */ ;
// @ts-ignore
BellIcon;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    ...{ class: "w-5 h-5" },
}));
const __VLS_42 = __VLS_41({
    ...{ class: "w-5 h-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.toggleDark) },
    ...{ class: "p-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 rounded-md transition-colors" },
});
// @ts-ignore
[toggleDark,];
if (__VLS_ctx.isDark) {
    // @ts-ignore
    [isDark,];
    const __VLS_45 = {}.SunIcon;
    /** @type {[typeof __VLS_components.SunIcon, ]} */ ;
    // @ts-ignore
    SunIcon;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        ...{ class: "w-5 h-5" },
    }));
    const __VLS_47 = __VLS_46({
        ...{ class: "w-5 h-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
}
else {
    const __VLS_50 = {}.MoonIcon;
    /** @type {[typeof __VLS_components.MoonIcon, ]} */ ;
    // @ts-ignore
    MoonIcon;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
        ...{ class: "w-5 h-5" },
    }));
    const __VLS_52 = __VLS_51({
        ...{ class: "w-5 h-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_51));
}
const __VLS_55 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    to: (__VLS_ctx.settingsPath),
    ...{ class: "p-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 rounded-md transition-colors" },
}));
const __VLS_57 = __VLS_56({
    to: (__VLS_ctx.settingsPath),
    ...{ class: "p-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 rounded-md transition-colors" },
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
const { default: __VLS_59 } = __VLS_58.slots;
// @ts-ignore
[settingsPath,];
const __VLS_60 = {}.CogIcon;
/** @type {[typeof __VLS_components.CogIcon, ]} */ ;
// @ts-ignore
CogIcon;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    ...{ class: "w-5 h-5" },
}));
const __VLS_62 = __VLS_61({
    ...{ class: "w-5 h-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
var __VLS_58;
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({
    ...{ class: "p-6" },
});
var __VLS_65 = {};
if (__VLS_ctx.modalOpen) {
    // @ts-ignore
    [modalOpen,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "fixed inset-0 bg-black/50 flex items-center justify-center z-50" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 max-w-sm w-full" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "text-xl font-semibold text-neutral-900 dark:text-white mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-neutral-600 dark:text-neutral-400 mb-6 text-base" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-end space-x-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.modalOpen))
                    return;
                __VLS_ctx.modalOpen = false;
                // @ts-ignore
                [modalOpen,];
            } },
        ...{ class: "btn-secondary" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.confirmLogout) },
        ...{ class: "btn-primary" },
    });
    // @ts-ignore
    [confirmLogout,];
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-50']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/30']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['z-30']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:translate-x-0']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-4']} */ ;
/** @type {__VLS_StyleScopedClasses['right-4']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['right-4']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-0']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
// @ts-ignore
var __VLS_39 = __VLS_38, __VLS_66 = __VLS_65;
const __VLS_base = (await import('vue')).defineComponent({});
const __VLS_export = {};
export default {};
