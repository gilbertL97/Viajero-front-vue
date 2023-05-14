<template>
    <div class="table-header"
        ><h4 style="padding-right: 5px"> Fecha Inicio </h4>
        <a-date-picker v-model:value="filter" picker="month" />
    </div>
    <TableContractorFact ref="table">
        <DropdownExport
            urlExcel="/contractor/invoicing/excel"
            urlPdf="/contractor/invoicing/pdf"
            :filter="{ dateInvoicing }"
            title="Cliente"
        />
    </TableContractorFact>
</template>

<script setup lang="ts">
    import TableContractorFact from '../components/table/tableContractorFact.vue';
    import DropdownExport from '@/components/shared/export/dropdownExport.vue';

    const dateInvoicing = ref<string>();
    const filter = ref<Date>();
    const table = ref(TableContractorFact);
    watch([filter], () => {
        table.value.getData(filter.value);
        dateInvoicing.value = filter.value?.toISOString();
    });
</script>

<style scoped>
    .table-header {
        display: inline-flex;
        gap: 1;
    }
</style>
