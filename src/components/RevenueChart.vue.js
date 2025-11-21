import { computed } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line } from 'vue-chartjs';
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
    labels: {
        type: Array,
        default: () => [],
    },
});
const chartData = computed(() => ({
    labels: props.labels,
    datasets: [
        {
            label: 'Revenue',
            data: props.data,
            backgroundColor: 'rgba(34,197,94,0.2)',
            borderColor: 'rgba(34,197,94,1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
        },
    ],
}));
const chartOptions = {
    responsive: true,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
    },
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
const __VLS_0 = {}.LineChart;
/** @type {[typeof __VLS_components.LineChart, ]} */ ;
// @ts-ignore
LineChart;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    chartData: (__VLS_ctx.chartData),
    chartOptions: (__VLS_ctx.chartOptions),
    ...{ class: "rounded-xl" },
}));
const __VLS_2 = __VLS_1({
    chartData: (__VLS_ctx.chartData),
    chartOptions: (__VLS_ctx.chartOptions),
    ...{ class: "rounded-xl" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
// @ts-ignore
[chartData, chartOptions,];
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => ({
        ...props,
        ...{},
    }),
});
export default {};
