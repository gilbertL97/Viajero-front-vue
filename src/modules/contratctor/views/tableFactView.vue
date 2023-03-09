<template>
    <div class="table-header"
        ><h4 style="padding-right: 5px"> Fecha Inicio </h4>
        <a-date-picker v-model:value="filter" picker="month" :locale="locale" />
    </div>
    <TableContractorFact ref="table" />
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import TableContractorFact from '../components/table/tableContractorFact.vue';
    import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
    import 'dayjs/locale/es';

    const filter = ref<Date>();
    const table = ref(TableContractorFact);
    watch([filter], () => {
        console.log('vio el valor+');
        console.log(filter.value);
        table.value.getData(filter.value);
    });
</script>

<style scoped>
    .table-header {
        display: inline-flex;
        gap: 1;
    }
</style>
