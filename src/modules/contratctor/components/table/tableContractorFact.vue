<template>
    <a-table :columns="columns" :data-source="data" size="small" :loading="loading" />
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { ContractorInv } from '../../types/contractor.types';

    const loading = ref(false);
    let data = ref<ContractorInv[]>([]);
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
            title: 'Importe_total',
            dataIndex: 'total_import',
        },
    ];
</script>

<style lang="scss" scoped></style>
