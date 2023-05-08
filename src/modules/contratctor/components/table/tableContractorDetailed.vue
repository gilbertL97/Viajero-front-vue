<template>
    <a-table
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :scroll="{ x: 400, y: 500 }"
        :row-key="(record: any) => record.id"
    >
        <template #customFilterIcon> <slot></slot> </template>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'total_travelers'"
                ><h1>{{ record.travelers.length }}</h1>
            </template>
        </template>
        <template #expandedRowRender="{ record }">
            <TableCurrentTravelers :loading="false" :data="record.travelers" />
        </template>
    </a-table>
</template>
<script lang="ts" setup>
    import TableCurrentTravelers from '@/modules/travelers/components/table/tableCurrentTravelers.vue';
    import { Contractor } from '../../types/contractor.types';
    defineProps<{
        data: Contractor[];
        loading: boolean;
    }>();
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'client',
            key: 'name',
        },
        {
            title: 'Poliza',
            dataIndex: 'poliza',
        },
        {
            title: 'Cantidad de Viajeros',
            dataIndex: 'total_travelers',
            customFilterDropdown: true,
        },
    ];
</script>
