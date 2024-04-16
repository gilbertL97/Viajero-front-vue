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
    </div>
    <!-- <ChartInvoicing v-if="seeChart" :data="data" :loading="loading" /> -->
    <TableContractorPolicyResume :data="data" :loading="loading">
        <DropdownExport
            urlExcel="/contractor/policy_overview/excel"
            urlPdf="/contractor/policy_overview/pdf"
            title="Cliente"
        />
    </TableContractorPolicyResume>
</template>

<script setup lang="ts">
    import TableContractorFact from '../components/table/tableContractorFact.vue';
    import DropdownExport from '@/common/components/export/dropdownExport.vue';

    import { ContractorPolicyTotal} from '../types/contractor.types';
    import useHttpMethods from '@/service/useHttpMethods';
    import TableContractorPolicyResume from '../components/table/tableContractorPolicyResume.vue';
    //import ChartInvoicing from '../components/chartInvoiving/chartInvoicing.vue';
    const { get } = useHttpMethods();

    const dateInvoicing = ref<string>();
    const filter = ref<string>();
    const seeChart = ref<boolean>(false);
    const data = ref<ContractorPolicyTotal>({
        policies: [],
        totalAmount: 0,
        totalTravelers: 0,
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
            data.value = (await get('/contractor/policy_overview')).data;
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
