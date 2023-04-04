<template>
    <a-table
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :scroll="{ x: 400, y: 500 }"
    >
        <template #bodyCell="{ column, record }">
            <template v-if="column == 'total_travelers'">
                {{ record.travelers.length }}
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
        },
        {
            title: 'Poliza',
            dataIndex: 'poliza',
        },
        {
            title: 'Cantidad de Viajeros',
            dataIndex: 'total_travelers',
        },
    ];
</script>
