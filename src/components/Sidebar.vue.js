import { useAuthStore } from '@/stores/auth';
import { useCollapse } from '@/composables/useCollapse';
import { useModalConfirm } from '@/composables/useModalConfirm';
const props = defineProps({
    menuItems: Array,
    isOpen: Boolean
});
const { isCollapsed, isMobile, toggleCollapse, showLabels } = useCollapse();
const authStore = useAuthStore();
const { isOpen, title, message, onConfirm, open, close, confirm } = useModalConfirm();
const openLogoutConfirm = () => {
    open({
        title: 'Confirm Logout',
        message: 'Are you sure you want to log out?',
        onConfirm: () => authStore.logout()
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.aside, __VLS_elements.aside)({
    ...{ class: "w-64 bg-gradient-to-b from-navy-900 to-navy-700 text-white shadow-2xl h-screen fixed left-0 top-0 overflow-y-auto z-50 flex flex-col justify-between transition-all duration-300 ease-in-out lg:translate-x-0" },
    ...{ class: ([
            __VLS_ctx.isOpen ? 'translate-x-0' : '-translate-x-full',
            { 'w-16': !__VLS_ctx.isMobile && __VLS_ctx.isCollapsed }
        ]) },
});
// @ts-ignore
[isOpen, isMobile, isCollapsed,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "relative p-6 border-b border-navy-600" },
});
if (__VLS_ctx.showLabels) {
    // @ts-ignore
    [showLabels,];
    __VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
        ...{ class: "text-2xl font-bold text-white text-center" },
    });
}
if (!__VLS_ctx.isMobile) {
    // @ts-ignore
    [isMobile,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.toggleCollapse) },
        ...{ class: "absolute top-1/2 right-4 transform -translate-y-1/2 p-1.5 hover:bg-navy-600 rounded transition-colors" },
    });
    // @ts-ignore
    [toggleCollapse,];
    const __VLS_0 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        icon: (__VLS_ctx.isCollapsed ? ['fas', 'chevron-right'] : ['fas', 'chevron-left']),
        ...{ class: "w-4 h-4 text-white" },
    }));
    const __VLS_2 = __VLS_1({
        icon: (__VLS_ctx.isCollapsed ? ['fas', 'chevron-right'] : ['fas', 'chevron-left']),
        ...{ class: "w-4 h-4 text-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    // @ts-ignore
    [isCollapsed,];
}
__VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
    ...{ class: (['p-6 space-y-3', { 'p-3': !__VLS_ctx.isMobile && __VLS_ctx.isCollapsed }]) },
});
// @ts-ignore
[isMobile, isCollapsed,];
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.menuItems))) {
    // @ts-ignore
    [menuItems,];
    const __VLS_5 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        key: (item.path),
        to: (item.path),
        ...{ class: "flex items-center py-3 text-white font-semibold text-lg hover:bg-navy-600 rounded-lg transition-all duration-200 hover:shadow-md group" },
        ...{ class: ([
                { 'px-5': __VLS_ctx.showLabels },
                { 'px-3 justify-center': !__VLS_ctx.showLabels }
            ]) },
    }));
    const __VLS_7 = __VLS_6({
        key: (item.path),
        to: (item.path),
        ...{ class: "flex items-center py-3 text-white font-semibold text-lg hover:bg-navy-600 rounded-lg transition-all duration-200 hover:shadow-md group" },
        ...{ class: ([
                { 'px-5': __VLS_ctx.showLabels },
                { 'px-3 justify-center': !__VLS_ctx.showLabels }
            ]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const { default: __VLS_9 } = __VLS_8.slots;
    // @ts-ignore
    [showLabels, showLabels,];
    const __VLS_10 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        icon: (item.icon),
        ...{ class: ([
                'w-5 h-5 group-hover:text-primary-300 transition-colors',
                { 'mr-4': __VLS_ctx.showLabels }
            ]) },
    }));
    const __VLS_12 = __VLS_11({
        icon: (item.icon),
        ...{ class: ([
                'w-5 h-5 group-hover:text-primary-300 transition-colors',
                { 'mr-4': __VLS_ctx.showLabels }
            ]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    // @ts-ignore
    [showLabels,];
    if (__VLS_ctx.showLabels) {
        // @ts-ignore
        [showLabels,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (item.label);
    }
    var __VLS_8;
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: (['border-t border-navy-600', { 'p-3': !__VLS_ctx.isMobile && __VLS_ctx.isCollapsed }, { 'p-6': __VLS_ctx.showLabels }]) },
});
// @ts-ignore
[isMobile, isCollapsed, showLabels,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.openLogoutConfirm) },
    ...{ class: "flex items-center py-3 w-full text-white font-semibold text-lg hover:bg-navy-600 rounded-lg transition-all duration-200 hover:shadow-md group" },
    ...{ class: ([
            { 'px-5': __VLS_ctx.showLabels },
            { 'px-3 justify-center': !__VLS_ctx.showLabels }
        ]) },
});
// @ts-ignore
[showLabels, showLabels, openLogoutConfirm,];
const __VLS_15 = {}.FontAwesomeIcon;
/** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
// @ts-ignore
FontAwesomeIcon;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    icon: (['fas', 'right-from-bracket']),
    ...{ class: ([
            'w-5 h-5 group-hover:text-primary-300 transition-colors',
            { 'mr-4': __VLS_ctx.showLabels }
        ]) },
}));
const __VLS_17 = __VLS_16({
    icon: (['fas', 'right-from-bracket']),
    ...{ class: ([
            'w-5 h-5 group-hover:text-primary-300 transition-colors',
            { 'mr-4': __VLS_ctx.showLabels }
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
// @ts-ignore
[showLabels,];
if (__VLS_ctx.showLabels) {
    // @ts-ignore
    [showLabels,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
}
if (__VLS_ctx.isOpen) {
    // @ts-ignore
    [isOpen,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bg-white rounded-lg shadow-xl p-6 max-w-sm w-full" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "text-xl font-semibold text-gray-800 mb-4" },
    });
    (__VLS_ctx.title);
    // @ts-ignore
    [title,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600 mb-6" },
    });
    (__VLS_ctx.message);
    // @ts-ignore
    [message,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-end space-x-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.close) },
        ...{ class: "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition" },
    });
    // @ts-ignore
    [close,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.confirm) },
        ...{ class: "px-4 py-2 bg-navy-600 text-white hover:bg-navy-700 rounded transition" },
    });
    // @ts-ignore
    [confirm,];
}
/** @type {__VLS_StyleScopedClasses['w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-b']} */ ;
/** @type {__VLS_StyleScopedClasses['from-navy-900']} */ ;
/** @type {__VLS_StyleScopedClasses['to-navy-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:translate-x-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-navy-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['right-4']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-navy-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-navy-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:text-primary-300']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-navy-600']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-navy-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:text-primary-300']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-navy-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-navy-700']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => ({
        ...props,
        ...{},
    }),
});
export default {};
