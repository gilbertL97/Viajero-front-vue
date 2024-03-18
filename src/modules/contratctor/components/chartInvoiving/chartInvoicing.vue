<template>
    <div class="chart">
        <canvas id="mixed-chart1" ref=""></canvas>
        <canvas id="mixed-chart2" ref=""></canvas>
    </div>
</template>

<script setup lang="ts">
    import { onUnmounted } from 'vue';
    import { Chart, ChartData, registerables } from 'chart.js';
    import {
        BarController,
        CategoryScale,
        LinearScale,
        BarElement,
        LineController,
        LineElement,
    } from 'chart.js';
    import { ContractorInv, ContractorsAndTotals } from '../../types/contractor.types';
    Chart.register(
        ...registerables,
        BarController,
        CategoryScale,
        LinearScale,
        BarElement,
        LineController,
        LineElement,
    );
    const props = defineProps<{
        data: ContractorsAndTotals;
        loading: boolean;
    }>();
    const clientsArray = ref<string[]>([]);
    const totalTravelersArray = ref<number[]>([]);
    const totalImportArray = ref<number[]>([]);
    const spreadData = (contractors: ContractorInv[]) => {
        return contractors.reduce(
            (acc, contractor) => {
                acc.clients.push(contractor.client);
                acc.totalTravelers.push(contractor.total_travelers);
                acc.totalImport.push(contractor.total_import);
                return acc;
            },
            {
                clients: [] as string[],
                totalTravelers: [] as number[],
                totalImport: [] as number[],
            },
        );
    };
    const asignData = () => {
        const { clients, totalTravelers, totalImport } = spreadData(
            props.data.contractors,
        );

        // Asignamos las propiedades desestructuradas a las refs correspondientes
        clientsArray.value = clients;
        totalTravelersArray.value = totalTravelers;
        totalImportArray.value = totalImport;
    };
    const chartData = reactive<ChartData>({
        labels: [],
        datasets: [
            {
                label: 'Importe Total',
                data: [],
                type: 'bar',
                backgroundColor: 'rgb(8, 143, 143)',
            },
        ],
    });
    const chartData2 = reactive<ChartData>({
        labels: [],
        datasets: [
            {
                label: 'Cantidad de Viajeros',
                data: [],
                type: 'bar',
                backgroundColor: 'rgb(255,  99,  132)',
            },
        ],
    });
    const chartOptions = reactive({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Cliente',
                },
            },
        },
    });

    let chartInstance: Chart;
    let chartInstance2: Chart;
    onMounted(() => {
        printChart();
    });
    const printChart = () => {
        const ctx = document.getElementById('mixed-chart1') as HTMLCanvasElement;
        const ctx2 = document.getElementById('mixed-chart2') as HTMLCanvasElement;
        chartInstance = new Chart(ctx, {
            type: 'bar', // This is the default type
            data: chartData,
            options: chartOptions,
        });

        chartInstance2 = new Chart(ctx2, {
            type: 'bar', // This is the default type
            data: chartData2,
            options: chartOptions,
        });
    };
    onUnmounted(() => {
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance2.destroy();
        }
    });
    watch(
        () => props.data,
        () => {
            asignData();
            console.log(
                ...clientsArray.value,
                ...totalImportArray.value,
                ...totalTravelersArray.value,
            );
            chartInstance.destroy();
            chartInstance2.destroy();
            chartData.labels = clientsArray.value;
            chartData2.labels = clientsArray.value;
            chartData.datasets[0].data = totalImportArray.value;
            chartData2.datasets[0].data = totalTravelersArray.value;
            printChart();
        },
    );
</script>
<style>
    .chart {
        display: flex;
    }
    .chart canvas {
        max-width: 50%; /* Ajusta este valor según sea necesario */
        height: auto;
        border-color: black;
    }
</style>
