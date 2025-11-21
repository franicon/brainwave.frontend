import { ref, watch, onMounted, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
const form = ref({
    name: '',
    username: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    password_confirmation: ''
});
const otp = ref('');
const step = ref(1);
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const pendingUserId = ref(localStorage.getItem('pending_user_id'));
// Eye-toggle component (typed)
const EyeToggle = defineComponent({
    props: { modelValue: { type: Boolean, required: true } },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const toggle = () => emit('update:modelValue', !props.modelValue);
        return { toggle };
    }
});
watch(() => form.value.email, () => (otp.value = ''));
onMounted(() => {
    if (pendingUserId.value)
        step.value = 2;
});
const submitSignup = async () => {
    if (form.value.password !== form.value.password_confirmation) {
        toast.error('Passwords do not match');
        return;
    }
    loading.value = true;
    try {
        await authStore.signup({ ...form.value, age: Number(form.value.age) });
        pendingUserId.value = localStorage.getItem('pending_user_id');
        if (!pendingUserId.value)
            throw new Error('No pending user ID');
        step.value = 2;
        toast.success('OTP sent!');
    }
    catch (e) {
        toast.error(e.response?.data?.message || 'Signup failed');
    }
    finally {
        loading.value = false;
    }
};
const verifyOtp = async () => {
    if (otp.value.length !== 6) {
        toast.error('Enter a 6-digit OTP');
        return;
    }
    loading.value = true;
    try {
        await authStore.verifyOtp(pendingUserId.value, otp.value);
        localStorage.removeItem('pending_user_id');
        toast.success('Verified! Please login.');
        router.push('/login');
    }
    catch (e) {
        toast.error(e.response?.data?.message || 'Verification failed');
    }
    finally {
        loading.value = false;
    }
};
const resendOtp = async () => {
    loading.value = true;
    try {
        await authStore.resendOtp(pendingUserId.value);
        toast.success('OTP resent');
    }
    catch (e) {
        toast.error(e.response?.data?.message || 'Resend failed');
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
    ...{ class: "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "w-full max-w-2xl" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "bg-white/95 dark:bg-navy-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in" },
});
if (__VLS_ctx.step === 1) {
    // @ts-ignore
    [step,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center mb-8" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
        ...{ class: "text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-heading" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "mt-2 text-sm text-neutral-600 dark:text-neutral-400" },
    });
    __VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
        ...{ onSubmit: (__VLS_ctx.submitSignup) },
        ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-4" },
    });
    // @ts-ignore
    [submitSignup,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "md:col-span-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        value: (__VLS_ctx.form.name),
        type: "text",
        placeholder: "Full Name",
        required: true,
        ...{ class: "w-full px-5 py-4 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" },
    });
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.input)({
        value: (__VLS_ctx.form.username),
        type: "text",
        placeholder: "Username",
        required: true,
        ...{ class: "w-full px-5 py-4 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" },
    });
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "email",
        placeholder: "Email Address",
        required: true,
        ...{ class: "w-full px-5 py-4 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" },
    });
    (__VLS_ctx.form.email);
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "tel",
        placeholder: "Phone Number",
        required: true,
        ...{ class: "w-full px-5 py-4 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" },
    });
    (__VLS_ctx.form.phone);
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "number",
        placeholder: "Age (min 18)",
        min: "18",
        required: true,
        ...{ class: "w-full px-5 py-4 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" },
    });
    (__VLS_ctx.form.age);
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "md:col-span-2 relative" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: (__VLS_ctx.showPassword ? 'text' : 'password'),
        placeholder: "Password (min 8)",
        minlength: "8",
        required: true,
        ...{ class: "w-full px-5 py-4 pr-14 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" },
    });
    (__VLS_ctx.form.password);
    // @ts-ignore
    [form, showPassword,];
    const __VLS_0 = {}.EyeToggle;
    /** @type {[typeof __VLS_components.EyeToggle, ]} */ ;
    // @ts-ignore
    EyeToggle;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        modelValue: (__VLS_ctx.showPassword),
    }));
    const __VLS_2 = __VLS_1({
        modelValue: (__VLS_ctx.showPassword),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    // @ts-ignore
    [showPassword,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "md:col-span-2 relative" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: (__VLS_ctx.showConfirmPassword ? 'text' : 'password'),
        placeholder: "Confirm Password",
        required: true,
        ...{ class: "w-full px-5 py-4 pr-14 text-lg rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 outline-none transition-all duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400" },
    });
    (__VLS_ctx.form.password_confirmation);
    // @ts-ignore
    [form, showConfirmPassword,];
    const __VLS_5 = {}.EyeToggle;
    /** @type {[typeof __VLS_components.EyeToggle, ]} */ ;
    // @ts-ignore
    EyeToggle;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        modelValue: (__VLS_ctx.showConfirmPassword),
    }));
    const __VLS_7 = __VLS_6({
        modelValue: (__VLS_ctx.showConfirmPassword),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    // @ts-ignore
    [showConfirmPassword,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "md:col-span-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        type: "submit",
        disabled: (__VLS_ctx.loading),
        ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0070\u0079\u002d\u0034\u0020\u0074\u0065\u0078\u0074\u002d\u006c\u0067\u0020\u0066\u006f\u006e\u0074\u002d\u0073\u0065\u006d\u0069\u0062\u006f\u006c\u0064\u0020\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0066\u0075\u006c\u006c\u0020\u0062\u0067\u002d\u0067\u0072\u0061\u0064\u0069\u0065\u006e\u0074\u002d\u0074\u006f\u002d\u0072\u0020\u0066\u0072\u006f\u006d\u002d\u0070\u0069\u006e\u006b\u002d\u0036\u0030\u0030\u0020\u0074\u006f\u002d\u0070\u0069\u006e\u006b\u002d\u0035\u0030\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0066\u0072\u006f\u006d\u002d\u0070\u0069\u006e\u006b\u002d\u0037\u0030\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0074\u006f\u002d\u0070\u0069\u006e\u006b\u002d\u0036\u0030\u0030\u0020\u0061\u0063\u0074\u0069\u0076\u0065\u003a\u0073\u0063\u0061\u006c\u0065\u002d\u0039\u0035\u0020\u0064\u0069\u0073\u0061\u0062\u006c\u0065\u0064\u003a\u006f\u0070\u0061\u0063\u0069\u0074\u0079\u002d\u0037\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u006c\u0067\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u0078\u006c\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0032\u0030\u0030\u0020\u0066\u006c\u0065\u0078\u0020\u0069\u0074\u0065\u006d\u0073\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u006a\u0075\u0073\u0074\u0069\u0066\u0079\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u0067\u0061\u0070\u002d\u0033" },
    });
    // @ts-ignore
    [loading,];
    if (__VLS_ctx.loading) {
        // @ts-ignore
        [loading,];
        const __VLS_10 = {}.FontAwesomeIcon;
        /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
        // @ts-ignore
        FontAwesomeIcon;
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
            icon: "spinner",
            spin: true,
            ...{ class: "w-5 h-5" },
        }));
        const __VLS_12 = __VLS_11({
            icon: "spinner",
            spin: true,
            ...{ class: "w-5 h-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    }
    (__VLS_ctx.loading ? 'Creating...' : 'Create Account');
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400" },
    });
    const __VLS_15 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        to: "/login",
        ...{ class: "font-medium text-primary-500 hover:text-primary-600 underline underline-offset-2 transition" },
    }));
    const __VLS_17 = __VLS_16({
        to: "/login",
        ...{ class: "font-medium text-primary-500 hover:text-primary-600 underline underline-offset-2 transition" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_19 } = __VLS_18.slots;
    var __VLS_18;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center mb-8" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
        ...{ class: "text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-heading" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "mt-2 text-sm text-neutral-600 dark:text-neutral-400" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "font-medium" },
    });
    (__VLS_ctx.form.email);
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
        ...{ onSubmit: (__VLS_ctx.verifyOtp) },
        ...{ class: "space-y-6" },
    });
    // @ts-ignore
    [verifyOtp,];
    __VLS_asFunctionalElement(__VLS_elements.input)({
        value: (__VLS_ctx.otp),
        type: "text",
        inputmode: "numeric",
        pattern: "[0-9]*",
        maxlength: "6",
        placeholder: "000000",
        required: true,
        ...{ class: "\u006d\u0078\u002d\u0061\u0075\u0074\u006f\u0020\u0062\u006c\u006f\u0063\u006b\u0020\u0077\u002d\u0036\u0034\u0020\u0068\u002d\u0031\u0036\u0020\u0074\u0065\u0078\u0074\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u0074\u0065\u0078\u0074\u002d\u0033\u0078\u006c\u0020\u0066\u006f\u006e\u0074\u002d\u0073\u0065\u006d\u0069\u0062\u006f\u006c\u0064\u0020\u0074\u0072\u0061\u0063\u006b\u0069\u006e\u0067\u002d\u0077\u0069\u0064\u0065\u0073\u0074\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0078\u006c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0032\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u006e\u0065\u0075\u0074\u0072\u0061\u006c\u002d\u0033\u0030\u0030\u0020\u0064\u0061\u0072\u006b\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u006e\u0065\u0075\u0074\u0072\u0061\u006c\u002d\u0037\u0030\u0030\u0020\u0062\u0067\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0064\u0061\u0072\u006b\u003a\u0062\u0067\u002d\u006e\u0065\u0075\u0074\u0072\u0061\u006c\u002d\u0039\u0030\u0030\u002f\u0035\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0070\u0069\u006e\u006b\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0034\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0070\u0069\u006e\u006b\u002d\u0035\u0030\u0030\u002f\u0033\u0030\u0020\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0032\u0030\u0030\u0020\u0070\u006c\u0061\u0063\u0065\u0068\u006f\u006c\u0064\u0065\u0072\u003a\u0074\u0065\u0078\u0074\u002d\u006e\u0065\u0075\u0074\u0072\u0061\u006c\u002d\u0034\u0030\u0030" },
    });
    // @ts-ignore
    [otp,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        type: "submit",
        disabled: (__VLS_ctx.loading),
        ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0070\u0079\u002d\u0034\u0020\u0074\u0065\u0078\u0074\u002d\u006c\u0067\u0020\u0066\u006f\u006e\u0074\u002d\u0073\u0065\u006d\u0069\u0062\u006f\u006c\u0064\u0020\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0066\u0075\u006c\u006c\u0020\u0062\u0067\u002d\u0067\u0072\u0061\u0064\u0069\u0065\u006e\u0074\u002d\u0074\u006f\u002d\u0072\u0020\u0066\u0072\u006f\u006d\u002d\u0070\u0069\u006e\u006b\u002d\u0036\u0030\u0030\u0020\u0074\u006f\u002d\u0070\u0069\u006e\u006b\u002d\u0035\u0030\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0066\u0072\u006f\u006d\u002d\u0070\u0069\u006e\u006b\u002d\u0037\u0030\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0074\u006f\u002d\u0070\u0069\u006e\u006b\u002d\u0036\u0030\u0030\u0020\u0061\u0063\u0074\u0069\u0076\u0065\u003a\u0073\u0063\u0061\u006c\u0065\u002d\u0039\u0035\u0020\u0064\u0069\u0073\u0061\u0062\u006c\u0065\u0064\u003a\u006f\u0070\u0061\u0063\u0069\u0074\u0079\u002d\u0037\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u006c\u0067\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u0078\u006c\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0032\u0030\u0030\u0020\u0066\u006c\u0065\u0078\u0020\u0069\u0074\u0065\u006d\u0073\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u006a\u0075\u0073\u0074\u0069\u0066\u0079\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u0067\u0061\u0070\u002d\u0033" },
    });
    // @ts-ignore
    [loading,];
    if (__VLS_ctx.loading) {
        // @ts-ignore
        [loading,];
        const __VLS_20 = {}.FontAwesomeIcon;
        /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
        // @ts-ignore
        FontAwesomeIcon;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            icon: "spinner",
            spin: true,
            ...{ class: "w-5 h-5" },
        }));
        const __VLS_22 = __VLS_21({
            icon: "spinner",
            spin: true,
            ...{ class: "w-5 h-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    }
    (__VLS_ctx.loading ? 'Verifying...' : 'Verify OTP');
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.resendOtp) },
        type: "button",
        disabled: (__VLS_ctx.loading),
        ...{ class: "w-full py-3 text-primary-500 hover:text-primary-600 font-medium transition" },
    });
    // @ts-ignore
    [loading, resendOtp,];
    (__VLS_ctx.loading ? 'Sending...' : 'Resend OTP');
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400" },
    });
    const __VLS_25 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        to: "/login",
        ...{ class: "font-medium text-primary-500 hover:text-primary-600 underline underline-offset-2 transition" },
    }));
    const __VLS_27 = __VLS_26({
        to: "/login",
        ...{ class: "font-medium text-primary-500 hover:text-primary-600 underline underline-offset-2 transition" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_29 } = __VLS_28.slots;
    var __VLS_28;
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['from-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['via-primary-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-secondary-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:from-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:via-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:to-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/95']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-navy-800/95']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['md:p-10']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-fade-in']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900/50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-pink-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:placeholder:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900/50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-pink-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:placeholder:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900/50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-pink-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:placeholder:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900/50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-pink-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:placeholder:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900/50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-pink-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:placeholder:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-14']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900/50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-pink-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:placeholder:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-14']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900/50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-pink-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:placeholder:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-pink-600']} */ ;
/** @type {__VLS_StyleScopedClasses['to-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:from-pink-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:to-pink-600']} */ ;
/** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['underline']} */ ;
/** @type {__VLS_StyleScopedClasses['underline-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900/50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-pink-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-pink-600']} */ ;
/** @type {__VLS_StyleScopedClasses['to-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:from-pink-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:to-pink-600']} */ ;
/** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['underline']} */ ;
/** @type {__VLS_StyleScopedClasses['underline-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
