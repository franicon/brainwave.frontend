const __VLS_props = defineProps(['notification']);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.notification.show) {
    // @ts-ignore
    [notification,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: (['fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all', __VLS_ctx.notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white']) },
    });
    // @ts-ignore
    [notification,];
    (__VLS_ctx.notification.message);
    // @ts-ignore
    [notification,];
}
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['top-4']} */ ;
/** @type {__VLS_StyleScopedClasses['right-4']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => ({
        ...__VLS_props,
        ...{},
    }),
});
export default {};
