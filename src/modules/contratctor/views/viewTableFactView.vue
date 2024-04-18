<template>
    <div class="table-header"
        ><h4 style="padding-right: 5px"> Mes : </h4>
        <a-date-picker
            v-model:value="filter"
            picker="month"
            format="MM/YYYY"
            valueFormat="YYYY-MM-DD"
        />
        <a-divider type="vertical" />
        <a-checkbox v-model:checked="seeChart">visualizar Graficas</a-checkbox>
    </div>
    <!-- <ChartInvoicing v-if="seeChart" :data="data" :loading="loading" /> -->
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

    import { ContractorsAndTotals } from '../types/contractor.types';
    import useHttpMethods from '@/service/useHttpMethods';
    //import ChartInvoicing from '../components/chartInvoiving/chartInvoicing.vue';
    const { get } = useHttpMethods();

    const dateInvoicing = ref<string>();
    const filter = ref<string>();
    const seeChart = ref<boolean>(false);
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
    const getData = async (dateInvoicing?: string) => {
        try {
            loading.value = true;
            data.value = (await get('/contractor/invoicing', { dateInvoicing })).data;
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
