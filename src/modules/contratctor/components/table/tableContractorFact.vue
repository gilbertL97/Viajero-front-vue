<template>
    <a-table :columns="columns" size="small" :loading="loading" :data-source="data">
        <template  #customFilterIcon> <slot></slot></template>
        <template #summary>
            <a-table-summary-row>
                <a-table-summary-cell>Total</a-table-summary-cell>
                <a-table-summary-cell>-</a-table-summary-cell>
                <a-table-summary-cell>
                    <a-typography-text type="danger">{{
                        totalTravelers
                    }}</a-typography-text>
                </a-table-summary-cell>
                <a-table-summary-cell>
                    <a-typography-text type="danger">{{ totalAmount }}</a-typography-text>
                </a-table-summary-cell>
            </a-table-summary-row>
        </template>
    </a-table>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { Contractor } from '../../types/contractor.types';
    import { getInvoicing } from '../../services/contractor.service';

    const loading = ref(false);
    const data = ref<Contractor[]>([]);
    const totalAmount = ref(0);
    const totalTravelers = ref(0);
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'client',
        },
        {
            title: 'Poliza',
            dataIndex: 'poliza',
        },
        {
            title: 'Cantidad de Viajeros',
            dataIndex: 'total_travelers',
        },
        {
            title: 'Importe Total',
            dataIndex: 'total_import',
            customFilterDropdown: true,
        },
    ];
    onMounted(async () => {
        loading.value = true;
        await refresh();
    });

    const refresh = async () => {
        const date = new Date();
        getData(date);
    };
    const getData = async (date: Date) => {
        try {
            loading.value = true;
            console.log(date);
            const { contractors, total_travelers, total_amount } = (
                await getInvoicing(date.toISOString())
            ).data;
            totalAmount.value = total_amount;
            totalTravelers.value = total_travelers;
            data.value = contractors;
        } catch (error) {}
        loading.value = false;
    };
    defineExpose({ getData });
</script>

<style lang="scss" scoped></style>
