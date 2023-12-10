<template>
    <div class="table-header"
        ><h4 style="padding-right: 5px"> Mes : </h4>
        <a-date-picker
            v-model:value="filter"
            picker="month"
            format="MM/YYYY"
            valueFormat="YYYY-MM-DD"
        />
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
    import DropdownExport from '@/common/components/export/dropdownExport.vue';
    import { getInvoicing } from '../services/contractor.service';
    import { ContractorsAndTotals } from '../types/contractor.types';

    const dateInvoicing = ref<string>();
    const filter = ref<string>();
    const data = ref<ContractorsAndTotals>({
        contractors: [],
        total_amount: 0,
        total_travelers: 0,
    });
    const loading = ref(false);
    watch([filter], () => {
        dateInvoicing.value = filter?.value;
        getData(filter?.value);
    });
    onMounted(() => {
        filter.value = new Date().toISOString();
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
