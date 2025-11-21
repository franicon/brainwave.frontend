import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toastification';
const router = useRouter();
const userStore = useUserStore();
const toast = useToast();
const profile = ref({
    name: '',
    username: '',
    email: '',
    phone: '',
    age: undefined,
});
const password = ref({
    current_password: '',
    password: '',
    password_confirmation: '',
});
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const profileLoading = ref(false);
const passwordLoading = ref(false);
onMounted(async () => {
    try {
        console.log('[Settings] Before fetching user, userStore.user:', JSON.stringify(userStore.user, null, 2));
        await userStore.fetchUser();
        console.log('[Settings] After fetching user, userStore.user:', JSON.stringify(userStore.user, null, 2));
        if (userStore.user) {
            profile.value = {
                name: userStore.user.name || '',
                username: userStore.user.username || '',
                email: userStore.user.email || '',
                phone: userStore.user.phone || '',
                age: userStore.user.age,
            };
            console.log('[Settings] Profile set to:', JSON.stringify(profile.value, null, 2));
        }
        else {
            console.error('[Settings] No user data available after fetch');
            toast.error('No user data available');
        }
    }
    catch (error) {
        console.error('[Settings] Failed to fetch user:', JSON.stringify(error, null, 2));
        toast.error('Failed to load profile data');
    }
});
const handleProfileUpdate = async () => {
    try {
        profileLoading.value = true;
        console.log('[Settings] Updating profile with:', JSON.stringify(profile.value, null, 2));
        await userStore.updateProfile({
            name: profile.value.name,
            username: profile.value.username,
            phone: profile.value.phone,
            age: profile.value.age,
        });
        toast.success('Profile updated successfully!');
    }
    catch (error) {
        console.error('[Settings] Profile update failed:', JSON.stringify(error, null, 2));
        const errorMessage = error.response?.data?.errors
            ? Object.values(error.response.data.errors).flat().join(', ')
            : 'Failed to update profile';
        toast.error(errorMessage);
    }
    finally {
        profileLoading.value = false;
    }
};
const handlePasswordUpdate = async () => {
    try {
        passwordLoading.value = true;
        console.log('[Settings] Updating password');
        await userStore.updatePassword(password.value);
        password.value = { current_password: '', password: '', password_confirmation: '' };
        toast.success('Password updated successfully!');
        router.push('/dashboard');
    }
    catch (error) {
        console.error('[Settings] Password update failed:', JSON.stringify(error, null, 2));
        const errorMessage = error.response?.data?.errors
            ? Object.values(error.response.data.errors).flat().join(', ')
            : 'Failed to update password';
        toast.error(errorMessage);
    }
    finally {
        passwordLoading.value = false;
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
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card backdrop-blur" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-between items-center" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-2xl font-semibold text-neutral-900 dark:text-white" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/dashboard",
    ...{ class: "btn-3d" },
}));
const __VLS_2 = __VLS_1({
    to: "/dashboard",
    ...{ class: "btn-3d" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card backdrop-blur" },
});
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.handleProfileUpdate) },
    ...{ class: "space-y-6" },
});
// @ts-ignore
[handleProfileUpdate,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    value: (__VLS_ctx.profile.name),
    type: "text",
    placeholder: "Enter your name",
    required: true,
    ...{ class: "input" },
});
// @ts-ignore
[profile,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    value: (__VLS_ctx.profile.username),
    type: "text",
    disabled: true,
    placeholder: "Enter your username",
    required: true,
    ...{ class: "input bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 cursor-not-allowed" },
});
// @ts-ignore
[profile,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "email",
    disabled: true,
    ...{ class: "input bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 cursor-not-allowed" },
});
(__VLS_ctx.profile.email);
// @ts-ignore
[profile,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    value: (__VLS_ctx.profile.phone),
    type: "text",
    placeholder: "Enter your phone number",
    ...{ class: "input" },
});
// @ts-ignore
[profile,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "number",
    min: "1",
    placeholder: "Enter your age",
    ...{ class: "input" },
});
(__VLS_ctx.profile.age);
// @ts-ignore
[profile,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-end space-x-3 pt-4" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: "submit",
    disabled: (__VLS_ctx.profileLoading),
    ...{ class: "btn-3d" },
});
// @ts-ignore
[profileLoading,];
(__VLS_ctx.profileLoading ? 'Updating...' : 'Update Profile');
// @ts-ignore
[profileLoading,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card backdrop-blur" },
});
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.handlePasswordUpdate) },
    ...{ class: "space-y-6" },
});
// @ts-ignore
[handlePasswordUpdate,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "relative" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: (__VLS_ctx.showCurrentPassword ? 'text' : 'password'),
    placeholder: "Enter current password",
    required: true,
    ...{ class: "input pr-12" },
});
(__VLS_ctx.password.current_password);
// @ts-ignore
[showCurrentPassword, password,];
const __VLS_5 = {}.FontAwesomeIcon;
/** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
// @ts-ignore
FontAwesomeIcon;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.showCurrentPassword ? 'eye-slash' : 'eye'),
    ...{ class: "absolute right-3 top-[2.6rem] transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 cursor-pointer" },
}));
const __VLS_7 = __VLS_6({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.showCurrentPassword ? 'eye-slash' : 'eye'),
    ...{ class: "absolute right-3 top-[2.6rem] transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 cursor-pointer" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
let __VLS_9;
let __VLS_10;
const __VLS_11 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.showCurrentPassword = !__VLS_ctx.showCurrentPassword;
            // @ts-ignore
            [showCurrentPassword, showCurrentPassword, showCurrentPassword,];
        } });
var __VLS_8;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "relative" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: (__VLS_ctx.showNewPassword ? 'text' : 'password'),
    placeholder: "Enter new password",
    required: true,
    ...{ class: "input pr-12" },
});
(__VLS_ctx.password.password);
// @ts-ignore
[password, showNewPassword,];
const __VLS_13 = {}.FontAwesomeIcon;
/** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
// @ts-ignore
FontAwesomeIcon;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.showNewPassword ? 'eye-slash' : 'eye'),
    ...{ class: "absolute right-3 top-[2.6rem] transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 cursor-pointer" },
}));
const __VLS_15 = __VLS_14({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.showNewPassword ? 'eye-slash' : 'eye'),
    ...{ class: "absolute right-3 top-[2.6rem] transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 cursor-pointer" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_17;
let __VLS_18;
const __VLS_19 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.showNewPassword = !__VLS_ctx.showNewPassword;
            // @ts-ignore
            [showNewPassword, showNewPassword, showNewPassword,];
        } });
var __VLS_16;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "relative" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: (__VLS_ctx.showConfirmPassword ? 'text' : 'password'),
    placeholder: "Confirm new password",
    required: true,
    ...{ class: "input pr-12" },
});
(__VLS_ctx.password.password_confirmation);
// @ts-ignore
[password, showConfirmPassword,];
const __VLS_21 = {}.FontAwesomeIcon;
/** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
// @ts-ignore
FontAwesomeIcon;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.showConfirmPassword ? 'eye-slash' : 'eye'),
    ...{ class: "absolute right-3 top-[2.6rem] transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 cursor-pointer" },
}));
const __VLS_23 = __VLS_22({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.showConfirmPassword ? 'eye-slash' : 'eye'),
    ...{ class: "absolute right-3 top-[2.6rem] transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 cursor-pointer" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
let __VLS_25;
let __VLS_26;
const __VLS_27 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.showConfirmPassword = !__VLS_ctx.showConfirmPassword;
            // @ts-ignore
            [showConfirmPassword, showConfirmPassword, showConfirmPassword,];
        } });
var __VLS_24;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-end space-x-3 pt-4" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: "submit",
    disabled: (__VLS_ctx.passwordLoading),
    ...{ class: "btn-3d" },
});
// @ts-ignore
[passwordLoading,];
(__VLS_ctx.passwordLoading ? 'Updating...' : 'Update Password');
// @ts-ignore
[passwordLoading,];
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
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
/** @type {__VLS_StyleScopedClasses['bg-neutral-100']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-100']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-not-allowed']} */ ;
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
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-12']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[2.6rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-12']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[2.6rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-12']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[2.6rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-3d']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
