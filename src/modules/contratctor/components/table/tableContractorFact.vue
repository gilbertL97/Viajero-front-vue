<template>
    <a-table
        :columns="columns"
        size="small"
        :loading="loading"
        :data-source="data.contractors"
    >
        <template #customFilterIcon> <slot></slot></template>
        <template #summary>
            <a-table-summary-row>
                <a-table-summary-cell>Total</a-table-summary-cell>
                <a-table-summary-cell>-</a-table-summary-cell>
                <a-table-summary-cell>
                    <a-typography-text type="danger">{{
                        data.total_travelers
                    }}</a-typography-text>
                </a-table-summary-cell>
                <a-table-summary-cell>
                    <a-typography-text type="danger">{{
                        data.total_amount
                    }}</a-typography-text>
                </a-table-summary-cell>
            </a-table-summary-row>
        </template>
    </a-table>
</template>

<script setup lang="ts">
    import { ContractorsAndTotals } from '../../types/contractor.types';

    defineProps<{
        data: ContractorsAndTotals;
        loading: boolean;
    }>();
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
</script>

<style lang="scss" scoped></style>
