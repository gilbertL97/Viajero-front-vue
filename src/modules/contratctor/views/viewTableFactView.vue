<template>
    <div class="table-header"
        ><h4 style="padding-right: 5px"> Mes : </h4>
        <a-date-picker v-model:value="filter" picker="month" />
    </div>
    <TableContractorFact :data="data" :loading="loading">
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
    import { getInvoicing } from '../services/contractor.service';
    import { ContractorsAndTotals } from '../types/contractor.types';

    const dateInvoicing = ref<string>();
    const filter = ref<Date>();
    const data = ref<ContractorsAndTotals>({
        contractors: [],
        total_amount: 0,
        total_travelers: 0,
    });
    const loading = ref(false);
    watch([filter], () => {
        dateInvoicing.value = filter.value?.toISOString();
        getData(filter.value?.toISOString());
    });
    onMounted(() => {
        getData();
    });
    const getData = async (date?: string) => {
        try {
            loading.value = true;
            data.value = (await getInvoicing(date)).data;
        } catch (error) {}
        loading.value = false;
    };
</script>

<style scoped>
    .table-header {
        display: inline-flex;
        gap: 1;
    }
</style>
