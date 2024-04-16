<template>
    <a-table
        :columns="columns"
        size="small"
        :loading="loading"
        :data-source="data.policies"
    >
        <template #customFilterIcon> <slot></slot></template>
        <template #summary>
            <a-table-summary-row>
                <a-table-summary-cell>Total</a-table-summary-cell>
                <a-table-summary-cell>-</a-table-summary-cell>
                <a-table-summary-cell>
                    <a-typography-text type="danger">{{
                        data.totalTravelers
                    }}</a-typography-text>
                </a-table-summary-cell>
                <a-table-summary-cell>
                    <a-typography-text type="danger">{{
                        data.totalAmount
                    }}</a-typography-text>
                </a-table-summary-cell>
            </a-table-summary-row>
        </template>
    </a-table>
</template>

<script setup lang="ts">
import { ContractorPolicyTotal } from '../../types/contractor.types';


    defineProps<{
        data: ContractorPolicyTotal;
        loading: boolean;
    }>();
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'client',
        },
        {
            title: 'Fecha de Inicio',
            dataIndex: 'start_date',
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
