import { onMounted, ref, watch, computed } from 'vue';
import ApexChart from 'vue3-apexcharts';
import { useAdminStore } from '@/stores/admin';
import { useAuthStore } from '@/stores/auth';
const adminStore = useAdminStore();
const authStore = useAuthStore();
const now = new Date();
const selectedDate = ref(now.toISOString().split('T')[0]);
const currentMonth = now.toLocaleString('default', { month: 'long' });
const currentTime = ref(now.toLocaleTimeString());
const isDark = ref(document.documentElement.classList.contains('dark'));
const updateDarkMode = () => {
    isDark.value = document.documentElement.classList.contains('dark');
};
watch(() => document.documentElement.classList.contains('dark'), updateDarkMode);
onMounted(updateDarkMode);
const themeMode = computed(() => isDark.value ? 'dark' : 'light');
// Update time every minute
setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString();
}, 60000);
// Doughnut Chart for Users (Super Admin)
const doughnutSeries = computed(() => [adminStore.activeUsers, Math.max(0, adminStore.totalUsers - adminStore.activeUsers)]);
const doughnutOptions = computed(() => ({
    chart: {
        type: 'donut',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150,
            },
        },
        background: 'transparent',
    },
    labels: ['Active Users', 'Inactive Users'],
    colors: ['#10B981', '#EF4444'],
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
                labels: {
                    show: false,
                },
            },
            startAngle: -90,
            endAngle: 90,
        },
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        labels: {
            colors: isDark.value ? '#E5E7EB' : '#374151',
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 0,
    },
    tooltip: {
        theme: themeMode.value,
        y: {
            formatter: (val) => `${val} users`,
        },
    },
    theme: {
        mode: themeMode.value,
        palette: 'palette1',
    },
    responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],
}));
// Donut Chart for Employees (Super Admin)
const employeesSeries = computed(() => [adminStore.activeEmployees, Math.max(0, adminStore.totalEmployees - adminStore.activeEmployees)]);
const employeesOptions = computed(() => ({
    chart: {
        type: 'donut',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
        background: 'transparent',
    },
    labels: ['Active Employees', 'Inactive Employees'],
    colors: ['#10B981', '#EF4444'],
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
                labels: {
                    show: false,
                },
            },
            startAngle: -90,
            endAngle: 90,
        },
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        labels: {
            colors: isDark.value ? '#E5E7EB' : '#374151',
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 0,
    },
    tooltip: {
        theme: themeMode.value,
        y: {
            formatter: (val) => `${val} employees`,
        },
    },
    theme: {
        mode: themeMode.value,
        palette: 'palette2',
    },
    responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],
}));
// Metrics Bar Chart (Super Admin)
const metricsCategories = ['Subscriptions', 'Courses', 'Pending'];
const metricsSeries = computed(() => [{ name: 'Count', data: [adminStore.activeSubscriptions, adminStore.activeCourses, adminStore.pendingEnrollments] }]);
const metricsOptions = computed(() => ({
    chart: {
        type: 'bar',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
        toolbar: {
            show: false,
        },
        background: 'transparent',
    },
    plotOptions: {
        bar: {
            borderRadius: 8,
            columnWidth: '60%',
            dataLabels: {
                position: 'top',
            },
        },
    },
    colors: ['#10B981', '#6366F1', '#F59E0B'],
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#fff'],
        },
        offsetY: -20,
    },
    xaxis: {
        categories: metricsCategories,
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            style: {
                colors: isDark.value ? '#E5E7EB' : '#374151',
                fontSize: '12px',
            },
        },
        crosshairs: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            formatter: (val) => val.toFixed(0),
            style: {
                colors: isDark.value ? '#E5E7EB' : '#374151',
            },
        },
    },
    grid: {
        borderColor: isDark.value ? '#334155' : '#E5E7EB',
        strokeDashArray: 3,
    },
    legend: {
        show: false,
    },
    tooltip: {
        theme: themeMode.value,
        y: {
            formatter: (val) => `${val} items`,
        },
    },
    theme: {
        mode: themeMode.value,
    },
}));
// Employee Metrics Bar Chart
const employeeMetricsCategories = ['Courses', 'Blogs', 'Pending'];
const employeeMetricsSeries = computed(() => [{ name: 'Count', data: [adminStore.totalCourses, adminStore.totalBlogs, adminStore.pendingEnrollments] }]);
const employeeMetricsOptions = computed(() => ({
    chart: {
        type: 'bar',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
        toolbar: {
            show: false,
        },
        background: 'transparent',
    },
    plotOptions: {
        bar: {
            borderRadius: 8,
            columnWidth: '60%',
            dataLabels: {
                position: 'top',
            },
        },
    },
    colors: ['#10B981', '#6366F1', '#F59E0B'],
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#fff'],
        },
        offsetY: -20,
    },
    xaxis: {
        categories: employeeMetricsCategories,
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            style: {
                colors: isDark.value ? '#E5E7EB' : '#374151',
                fontSize: '12px',
            },
        },
        crosshairs: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            formatter: (val) => val.toFixed(0),
            style: {
                colors: isDark.value ? '#E5E7EB' : '#374151',
            },
        },
    },
    grid: {
        borderColor: isDark.value ? '#334155' : '#E5E7EB',
        strokeDashArray: 3,
    },
    legend: {
        show: false,
    },
    tooltip: {
        theme: themeMode.value,
        y: {
            formatter: (val) => `${val} items`,
        },
    },
    theme: {
        mode: themeMode.value,
    },
}));
// Employee Courses Donut
const employeeCoursesSeries = computed(() => [adminStore.activeCourses, Math.max(0, adminStore.totalCourses - adminStore.activeCourses)]);
const employeeCoursesOptions = computed(() => ({
    chart: {
        type: 'donut',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
        background: 'transparent',
    },
    labels: ['Active Courses', 'Inactive Courses'],
    colors: ['#10B981', '#EF4444'],
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
                labels: {
                    show: false,
                },
            },
            startAngle: -90,
            endAngle: 90,
        },
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        labels: {
            colors: isDark.value ? '#E5E7EB' : '#374151',
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 0,
    },
    tooltip: {
        theme: themeMode.value,
        y: {
            formatter: (val) => `${val} courses`,
        },
    },
    theme: {
        mode: themeMode.value,
        palette: 'palette3',
    },
    responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],
}));
// Employee Blogs Donut
const employeeBlogsSeries = computed(() => [adminStore.activeBlogs, Math.max(0, adminStore.totalBlogs - adminStore.activeBlogs)]);
const employeeBlogsOptions = computed(() => ({
    chart: {
        type: 'donut',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
        background: 'transparent',
    },
    labels: ['Active Blogs', 'Inactive Blogs'],
    colors: ['#10B981', '#EF4444'],
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
                labels: {
                    show: false,
                },
            },
            startAngle: -90,
            endAngle: 90,
        },
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        labels: {
            colors: isDark.value ? '#E5E7EB' : '#374151',
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 0,
    },
    tooltip: {
        theme: themeMode.value,
        y: {
            formatter: (val) => `${val} blogs`,
        },
    },
    theme: {
        mode: themeMode.value,
        palette: 'palette4',
    },
    responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],
}));
// Revenue Bar Chart (Super Admin) - Switched to bar for prominence
const revenueLabel = computed(() => {
    const date = new Date(selectedDate.value);
    return [date.getDate().toString() + ' ' + date.toLocaleString('default', { month: 'short' })];
});
const revenueSeries = computed(() => {
    const data = adminStore.revenue.length > 0 ? adminStore.revenue : [adminStore.totalRevenue || 0];
    return [{ name: 'Revenue (PKR)', data }];
});
const revenueOptions = computed(() => ({
    chart: {
        type: 'bar',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
        toolbar: {
            show: false,
        },
        background: 'transparent',
    },
    plotOptions: {
        bar: {
            borderRadius: 8,
            columnWidth: '80%',
            dataLabels: {
                position: 'top',
            },
        },
    },
    colors: ['#10B981'],
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#fff'],
        },
        offsetY: -20,
    },
    xaxis: {
        categories: revenueLabel.value,
        labels: {
            style: {
                colors: isDark.value ? '#E5E7EB' : '#374151',
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        crosshairs: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            formatter: (val) => val.toLocaleString() + ' PKR',
            style: {
                colors: isDark.value ? '#E5E7EB' : '#374151',
            },
        },
    },
    grid: {
        borderColor: isDark.value ? '#334155' : '#E5E7EB',
        strokeDashArray: 3,
    },
    legend: {
        show: false,
    },
    tooltip: {
        theme: themeMode.value,
        y: {
            formatter: (val) => `${val.toLocaleString()} PKR`,
        },
    },
    theme: {
        mode: themeMode.value,
    },
}));
// Enrollments Bar Chart (Employee) - Switched to bar for prominence
const enrollmentsSeries = computed(() => {
    const data = adminStore.revenue.length > 0 ? adminStore.revenue : [adminStore.totalEnrollments || 0];
    return [{ name: 'Enrollments', data }];
});
const enrollmentsOptions = computed(() => ({
    chart: {
        type: 'bar',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
        toolbar: {
            show: false,
        },
        background: 'transparent',
    },
    plotOptions: {
        bar: {
            borderRadius: 8,
            columnWidth: '80%',
            dataLabels: {
                position: 'top',
            },
        },
    },
    colors: ['#6366F1'],
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#fff'],
        },
        offsetY: -20,
    },
    xaxis: {
        categories: revenueLabel.value,
        labels: {
            style: {
                colors: isDark.value ? '#E5E7EB' : '#374151',
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        crosshairs: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            formatter: (val) => val.toFixed(0),
            style: {
                colors: isDark.value ? '#E5E7EB' : '#374151',
            },
        },
    },
    grid: {
        borderColor: isDark.value ? '#334155' : '#E5E7EB',
        strokeDashArray: 3,
    },
    legend: {
        show: false,
    },
    tooltip: {
        theme: themeMode.value,
        y: {
            formatter: (val) => `${val} enrollments`,
        },
    },
    theme: {
        mode: themeMode.value,
    },
}));
// Wallet Horizontal Bar Chart (Super Admin)
const walletLabels = computed(() => adminStore.topWallets.map(w => w.name.length > 15 ? w.name.slice(0, 12) + '...' : w.name));
const walletSeries = computed(() => [{ name: 'Balance', data: adminStore.topWallets.map(w => w.balance) }]);
const walletOptions = computed(() => ({
    chart: {
        type: 'bar',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
        toolbar: {
            show: false,
        },
        background: 'transparent',
    },
    plotOptions: {
        bar: {
            horizontal: true,
            borderRadius: 8,
            dataLabels: {
                position: 'top',
            },
        },
    },
    colors: ['#3B82F6'],
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#fff'],
        },
        offsetX: 0,
        dropShadow: {
            enabled: true,
        },
    },
    xaxis: {
        categories: walletLabels.value,
        labels: {
            style: {
                colors: isDark.value ? '#E5E7EB' : '#374151',
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            formatter: (val) => val.toLocaleString() + ' PKR',
            style: {
                colors: isDark.value ? '#E5E7EB' : '#374151',
            },
        },
    },
    grid: {
        yaxis: {
            lines: {
                show: false,
            },
        },
        borderColor: isDark.value ? '#334155' : '#E5E7EB',
    },
    legend: {
        show: false,
    },
    tooltip: {
        theme: themeMode.value,
        y: {
            formatter: (val) => `${val.toLocaleString()} PKR`,
        },
    },
    theme: {
        mode: themeMode.value,
    },
}));
// Plans Donut Chart (Super Admin)
const plansSeries = computed(() => [adminStore.plansActive, Math.max(0, adminStore.totalPlans - adminStore.plansActive)]);
const plansOptions = computed(() => ({
    chart: {
        type: 'donut',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
        background: 'transparent',
    },
    labels: ['Active Plans', 'Inactive Plans'],
    colors: ['#10B981', '#EF4444'],
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
                labels: {
                    show: false,
                },
            },
            startAngle: -90,
            endAngle: 90,
        },
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        labels: {
            colors: isDark.value ? '#E5E7EB' : '#374151',
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 0,
    },
    tooltip: {
        theme: themeMode.value,
        y: {
            formatter: (val) => `${val} plans`,
        },
    },
    theme: {
        mode: themeMode.value,
        palette: 'palette5',
    },
    responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],
}));
// Transactions Pie Chart (Super Admin)
const transactionsSeries = computed(() => Object.values(adminStore.transactionTypes));
const transactionsOptions = computed(() => ({
    chart: {
        type: 'pie',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
        background: 'transparent',
    },
    labels: Object.keys(adminStore.transactionTypes),
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    plotOptions: {
        pie: {
            startAngle: -90,
            endAngle: 90,
            donut: {
                size: '0%',
            },
        },
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        labels: {
            colors: isDark.value ? '#E5E7EB' : '#374151',
        },
    },
    dataLabels: {
        enabled: true,
        formatter: (val) => {
            const total = transactionsSeries.value.reduce((a, b) => a + b, 0);
            return total > 0 ? `${Math.round(val / total * 100)}%` : '0%';
        },
        style: {
            fontSize: '14px',
            fontWeight: 'bold',
            colors: ['#fff'],
        },
    },
    stroke: {
        width: 2,
        colors: ['transparent'],
    },
    tooltip: {
        theme: themeMode.value,
        y: {
            formatter: (val) => `${val} transactions`,
        },
    },
    theme: {
        mode: themeMode.value,
    },
    responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],
}));
watch(selectedDate, async () => {
    await adminStore.fetchDashboard({ from_date: selectedDate.value, to_date: selectedDate.value });
});
onMounted(async () => {
    await adminStore.fetchDashboard({ from_date: selectedDate.value, to_date: selectedDate.value });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.adminStore.loading) {
    // @ts-ignore
    [adminStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-center items-center h-64" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-base text-neutral-600 dark:text-neutral-400" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "space-y-8" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card flex justify-between items-center p-6" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
        ...{ class: "text-3xl font-bold text-neutral-900 dark:text-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-neutral-600 dark:text-neutral-400 mt-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-right" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sm text-neutral-600 dark:text-neutral-400 block" },
    });
    (__VLS_ctx.currentMonth);
    // @ts-ignore
    [currentMonth,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-xs text-neutral-500 dark:text-neutral-500 mt-1 block" },
    });
    (__VLS_ctx.currentTime);
    // @ts-ignore
    [currentTime,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-center items-center w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4 mx-auto" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-xl font-bold text-primary-600 dark:text-primary-400" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-2xl font-bold text-neutral-900 dark:text-white mb-1" },
    });
    (__VLS_ctx.authStore.isSuperAdmin ? __VLS_ctx.adminStore.totalUsers.toLocaleString() : __VLS_ctx.adminStore.totalEnrollments.toLocaleString());
    // @ts-ignore
    [adminStore, adminStore, authStore,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-neutral-600 dark:text-neutral-400 capitalize" },
    });
    (__VLS_ctx.authStore.isSuperAdmin ? 'Total Users' : 'Total Enrollments');
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-center items-center w-12 h-12 bg-accent-100 dark:bg-accent-900/20 rounded-full mb-4 mx-auto" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-xl font-bold text-accent-600 dark:text-accent-400" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-2xl font-bold text-neutral-900 dark:text-white mb-1" },
    });
    (__VLS_ctx.authStore.isSuperAdmin ? __VLS_ctx.adminStore.totalEmployees.toLocaleString() : __VLS_ctx.adminStore.totalCourses.toLocaleString());
    // @ts-ignore
    [adminStore, adminStore, authStore,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-neutral-600 dark:text-neutral-400 capitalize" },
    });
    (__VLS_ctx.authStore.isSuperAdmin ? 'Total Employees' : 'Total Courses');
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-center items-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full mb-4 mx-auto" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-xl font-bold text-green-600 dark:text-green-400" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-2xl font-bold text-neutral-900 dark:text-white mb-1" },
    });
    (__VLS_ctx.authStore.isSuperAdmin ? __VLS_ctx.adminStore.totalRevenue.toLocaleString() + ' PKR' : __VLS_ctx.adminStore.totalBlogs.toLocaleString());
    // @ts-ignore
    [adminStore, adminStore, authStore,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-neutral-600 dark:text-neutral-400 capitalize" },
    });
    (__VLS_ctx.authStore.isSuperAdmin ? 'Total Revenue' : 'Total Blogs');
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-center items-center w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full mb-4 mx-auto" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-xl font-bold text-orange-600 dark:text-orange-400" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-2xl font-bold text-neutral-900 dark:text-white mb-1" },
    });
    (__VLS_ctx.adminStore.pendingEnrollments.toLocaleString());
    // @ts-ignore
    [adminStore,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-neutral-600 dark:text-neutral-400" },
    });
    if (__VLS_ctx.authStore.isSuperAdmin) {
        // @ts-ignore
        [authStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card p-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-primary-600 dark:text-primary-400 mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "relative h-72 mb-6" },
        });
        const __VLS_0 = {}.ApexChart;
        /** @type {[typeof __VLS_components.ApexChart, ]} */ ;
        // @ts-ignore
        ApexChart;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            type: "donut",
            options: (__VLS_ctx.doughnutOptions),
            series: (__VLS_ctx.doughnutSeries),
            height: "100%",
        }));
        const __VLS_2 = __VLS_1({
            type: "donut",
            options: (__VLS_ctx.doughnutOptions),
            series: (__VLS_ctx.doughnutSeries),
            height: "100%",
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        // @ts-ignore
        [doughnutOptions, doughnutSeries,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "absolute inset-0 flex items-center justify-center pointer-events-none" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-4xl font-bold text-primary-600 dark:text-primary-400" },
        });
        (__VLS_ctx.adminStore.totalUsers);
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm text-neutral-500 dark:text-neutral-400" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-2 gap-4 text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-3 h-3 bg-green-500 rounded-full mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "font-medium text-neutral-900 dark:text-white" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-500 dark:text-neutral-400" },
        });
        (__VLS_ctx.adminStore.activeUsers);
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-3 h-3 bg-red-500 rounded-full mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "font-medium text-neutral-900 dark:text-white" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-500 dark:text-neutral-400" },
        });
        (__VLS_ctx.adminStore.totalUsers - __VLS_ctx.adminStore.activeUsers);
        // @ts-ignore
        [adminStore, adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card p-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-accent-600 dark:text-accent-400 mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "relative h-72 mb-6" },
        });
        const __VLS_5 = {}.ApexChart;
        /** @type {[typeof __VLS_components.ApexChart, ]} */ ;
        // @ts-ignore
        ApexChart;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
            type: "donut",
            options: (__VLS_ctx.employeesOptions),
            series: (__VLS_ctx.employeesSeries),
            height: "100%",
        }));
        const __VLS_7 = __VLS_6({
            type: "donut",
            options: (__VLS_ctx.employeesOptions),
            series: (__VLS_ctx.employeesSeries),
            height: "100%",
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        // @ts-ignore
        [employeesOptions, employeesSeries,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "absolute inset-0 flex items-center justify-center pointer-events-none" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-4xl font-bold text-accent-600 dark:text-accent-400" },
        });
        (__VLS_ctx.adminStore.totalEmployees);
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm text-neutral-500 dark:text-neutral-400" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-2 gap-4 text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-3 h-3 bg-green-500 rounded-full mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "font-medium text-neutral-900 dark:text-white" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-500 dark:text-neutral-400" },
        });
        (__VLS_ctx.adminStore.activeEmployees);
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-3 h-3 bg-red-500 rounded-full mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "font-medium text-neutral-900 dark:text-white" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-500 dark:text-neutral-400" },
        });
        (__VLS_ctx.adminStore.totalEmployees - __VLS_ctx.adminStore.activeEmployees);
        // @ts-ignore
        [adminStore, adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card p-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-green-600 dark:text-green-400 mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-center mb-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-4xl font-bold text-green-600 dark:text-green-400" },
        });
        (__VLS_ctx.adminStore.totalRevenue.toLocaleString());
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm text-neutral-500 dark:text-neutral-400" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "h-64" },
        });
        const __VLS_10 = {}.ApexChart;
        /** @type {[typeof __VLS_components.ApexChart, ]} */ ;
        // @ts-ignore
        ApexChart;
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
            type: "bar",
            options: (__VLS_ctx.metricsOptions),
            series: (__VLS_ctx.metricsSeries),
            height: "100%",
        }));
        const __VLS_12 = __VLS_11({
            type: "bar",
            options: (__VLS_ctx.metricsOptions),
            series: (__VLS_ctx.metricsSeries),
            height: "100%",
        }, ...__VLS_functionalComponentArgsRest(__VLS_11));
        // @ts-ignore
        [metricsOptions, metricsSeries,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card p-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "mb-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-primary-600 dark:text-primary-400 mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "mt-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
            ...{ class: "block text-xs text-neutral-600 dark:text-neutral-400 mb-1" },
        });
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "date",
            ...{ class: "input w-full" },
        });
        (__VLS_ctx.selectedDate);
        // @ts-ignore
        [selectedDate,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "h-64" },
        });
        const __VLS_15 = {}.ApexChart;
        /** @type {[typeof __VLS_components.ApexChart, ]} */ ;
        // @ts-ignore
        ApexChart;
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
            type: "bar",
            options: (__VLS_ctx.revenueOptions),
            series: (__VLS_ctx.revenueSeries),
            height: "100%",
        }));
        const __VLS_17 = __VLS_16({
            type: "bar",
            options: (__VLS_ctx.revenueOptions),
            series: (__VLS_ctx.revenueSeries),
            height: "100%",
        }, ...__VLS_functionalComponentArgsRest(__VLS_16));
        // @ts-ignore
        [revenueOptions, revenueSeries,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-1 lg:grid-cols-3 gap-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card p-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-blue-600 dark:text-blue-400 mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "h-64" },
        });
        const __VLS_20 = {}.ApexChart;
        /** @type {[typeof __VLS_components.ApexChart, ]} */ ;
        // @ts-ignore
        ApexChart;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            type: "bar",
            options: (__VLS_ctx.walletOptions),
            series: (__VLS_ctx.walletSeries),
            height: "100%",
        }));
        const __VLS_22 = __VLS_21({
            type: "bar",
            options: (__VLS_ctx.walletOptions),
            series: (__VLS_ctx.walletSeries),
            height: "100%",
        }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        // @ts-ignore
        [walletOptions, walletSeries,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm text-neutral-500 dark:text-neutral-400 text-center mt-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card p-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-purple-600 dark:text-purple-400 mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "relative h-72 mb-6" },
        });
        const __VLS_25 = {}.ApexChart;
        /** @type {[typeof __VLS_components.ApexChart, ]} */ ;
        // @ts-ignore
        ApexChart;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            type: "donut",
            options: (__VLS_ctx.plansOptions),
            series: (__VLS_ctx.plansSeries),
            height: "100%",
        }));
        const __VLS_27 = __VLS_26({
            type: "donut",
            options: (__VLS_ctx.plansOptions),
            series: (__VLS_ctx.plansSeries),
            height: "100%",
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        // @ts-ignore
        [plansOptions, plansSeries,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "absolute inset-0 flex items-center justify-center pointer-events-none" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-4xl font-bold text-purple-600 dark:text-purple-400" },
        });
        (__VLS_ctx.adminStore.totalPlans);
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm text-neutral-500 dark:text-neutral-400" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-2 gap-4 text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-3 h-3 bg-green-500 rounded-full mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "font-medium text-neutral-900 dark:text-white" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-500 dark:text-neutral-400" },
        });
        (__VLS_ctx.adminStore.plansActive);
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-3 h-3 bg-red-500 rounded-full mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "font-medium text-neutral-900 dark:text-white" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-500 dark:text-neutral-400" },
        });
        (__VLS_ctx.adminStore.totalPlans - __VLS_ctx.adminStore.plansActive);
        // @ts-ignore
        [adminStore, adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card p-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-indigo-600 dark:text-indigo-400 mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "h-64" },
        });
        const __VLS_30 = {}.ApexChart;
        /** @type {[typeof __VLS_components.ApexChart, ]} */ ;
        // @ts-ignore
        ApexChart;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
            type: "pie",
            options: (__VLS_ctx.transactionsOptions),
            series: (__VLS_ctx.transactionsSeries),
            height: "100%",
        }));
        const __VLS_32 = __VLS_31({
            type: "pie",
            options: (__VLS_ctx.transactionsOptions),
            series: (__VLS_ctx.transactionsSeries),
            height: "100%",
        }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        // @ts-ignore
        [transactionsOptions, transactionsSeries,];
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card p-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-green-600 dark:text-green-400 mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-center mb-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-4xl font-bold text-green-600 dark:text-green-400" },
        });
        (__VLS_ctx.adminStore.totalEnrollments.toLocaleString());
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm text-neutral-500 dark:text-neutral-400" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "h-64" },
        });
        const __VLS_35 = {}.ApexChart;
        /** @type {[typeof __VLS_components.ApexChart, ]} */ ;
        // @ts-ignore
        ApexChart;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
            type: "bar",
            options: (__VLS_ctx.employeeMetricsOptions),
            series: (__VLS_ctx.employeeMetricsSeries),
            height: "100%",
        }));
        const __VLS_37 = __VLS_36({
            type: "bar",
            options: (__VLS_ctx.employeeMetricsOptions),
            series: (__VLS_ctx.employeeMetricsSeries),
            height: "100%",
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        // @ts-ignore
        [employeeMetricsOptions, employeeMetricsSeries,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card p-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "mb-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-primary-600 dark:text-primary-400 mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "mt-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
            ...{ class: "block text-xs text-neutral-600 dark:text-neutral-400 mb-1" },
        });
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "date",
            ...{ class: "input w-full" },
        });
        (__VLS_ctx.selectedDate);
        // @ts-ignore
        [selectedDate,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "h-64" },
        });
        const __VLS_40 = {}.ApexChart;
        /** @type {[typeof __VLS_components.ApexChart, ]} */ ;
        // @ts-ignore
        ApexChart;
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
            type: "bar",
            options: (__VLS_ctx.enrollmentsOptions),
            series: (__VLS_ctx.enrollmentsSeries),
            height: "100%",
        }));
        const __VLS_42 = __VLS_41({
            type: "bar",
            options: (__VLS_ctx.enrollmentsOptions),
            series: (__VLS_ctx.enrollmentsSeries),
            height: "100%",
        }, ...__VLS_functionalComponentArgsRest(__VLS_41));
        // @ts-ignore
        [enrollmentsOptions, enrollmentsSeries,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card p-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-accent-600 dark:text-accent-400 mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "relative h-72 mb-6" },
        });
        const __VLS_45 = {}.ApexChart;
        /** @type {[typeof __VLS_components.ApexChart, ]} */ ;
        // @ts-ignore
        ApexChart;
        // @ts-ignore
        const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
            type: "donut",
            options: (__VLS_ctx.employeeCoursesOptions),
            series: (__VLS_ctx.employeeCoursesSeries),
            height: "100%",
        }));
        const __VLS_47 = __VLS_46({
            type: "donut",
            options: (__VLS_ctx.employeeCoursesOptions),
            series: (__VLS_ctx.employeeCoursesSeries),
            height: "100%",
        }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        // @ts-ignore
        [employeeCoursesOptions, employeeCoursesSeries,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "absolute inset-0 flex items-center justify-center pointer-events-none" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-4xl font-bold text-accent-600 dark:text-accent-400" },
        });
        (__VLS_ctx.adminStore.totalCourses);
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm text-neutral-500 dark:text-neutral-400" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-2 gap-4 text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-3 h-3 bg-green-500 rounded-full mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "font-medium text-neutral-900 dark:text-white" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-500 dark:text-neutral-400" },
        });
        (__VLS_ctx.adminStore.activeCourses);
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-3 h-3 bg-red-500 rounded-full mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "font-medium text-neutral-900 dark:text-white" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-500 dark:text-neutral-400" },
        });
        (__VLS_ctx.adminStore.totalCourses - __VLS_ctx.adminStore.activeCourses);
        // @ts-ignore
        [adminStore, adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card p-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
            ...{ class: "text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-purple-600 dark:text-purple-400 mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "relative h-72 mb-6" },
        });
        const __VLS_50 = {}.ApexChart;
        /** @type {[typeof __VLS_components.ApexChart, ]} */ ;
        // @ts-ignore
        ApexChart;
        // @ts-ignore
        const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
            type: "donut",
            options: (__VLS_ctx.employeeBlogsOptions),
            series: (__VLS_ctx.employeeBlogsSeries),
            height: "100%",
        }));
        const __VLS_52 = __VLS_51({
            type: "donut",
            options: (__VLS_ctx.employeeBlogsOptions),
            series: (__VLS_ctx.employeeBlogsSeries),
            height: "100%",
        }, ...__VLS_functionalComponentArgsRest(__VLS_51));
        // @ts-ignore
        [employeeBlogsOptions, employeeBlogsSeries,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "absolute inset-0 flex items-center justify-center pointer-events-none" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-4xl font-bold text-purple-600 dark:text-purple-400" },
        });
        (__VLS_ctx.adminStore.totalBlogs);
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm text-neutral-500 dark:text-neutral-400" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-2 gap-4 text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-3 h-3 bg-green-500 rounded-full mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "font-medium text-neutral-900 dark:text-white" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-500 dark:text-neutral-400" },
        });
        (__VLS_ctx.adminStore.activeBlogs);
        // @ts-ignore
        [adminStore,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-3 h-3 bg-red-500 rounded-full mr-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "font-medium text-neutral-900 dark:text-white" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-neutral-500 dark:text-neutral-400" },
        });
        (__VLS_ctx.adminStore.totalBlogs - __VLS_ctx.adminStore.activeBlogs);
        // @ts-ignore
        [adminStore, adminStore,];
    }
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-100']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-primary-900/20']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['capitalize']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-accent-100']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-accent-900/20']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-accent-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-accent-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['capitalize']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-green-900/20']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['capitalize']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-orange-100']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-orange-900/20']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-orange-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-orange-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-72']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-accent-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-accent-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-72']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-accent-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-accent-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-blue-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-purple-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-72']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-purple-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-primary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-accent-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-accent-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-72']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-accent-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-accent-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-purple-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-72']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-purple-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
