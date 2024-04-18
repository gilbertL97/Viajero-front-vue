<template>
    <a-table
        :columns="columns"
        size="middle"
        :loading="loading"
        :data-source="data.contractors"
    >
        <template #customFilterIcon> <slot></slot></template>
        <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'start_date'">
                <h3>{{ dayjs(record.start_date).format('DD/MM/YYYY') }}</h3>
            </template></template>
        <template #summary >
            <a-table-summary fixed>
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
            </a-table-summary>
        </template>
    </a-table>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
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
