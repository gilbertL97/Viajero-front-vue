<template>
    <div class="table-header"
        ><h4 style="padding-right: 5px"> Rango de Fechas : </h4>
        <a-range-picker
            size="middle"
            v-model:value="filter"
            value-format="YYYY-MM-DD"
            format="DD/MM/YYYY"
        />
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
    import DropdownExport from '@/common/components/export/dropdownExport.vue';
    import { ContractorPolicyTotal} from '../types/contractor.types';
    import useHttpMethods from '@/service/useHttpMethods';
    import TableContractorPolicyResume from '../components/table/tableContractorPolicyResume.vue';
    import dayjs, { Dayjs } from 'dayjs';
    //import ChartInvoicing from '../components/chartInvoiving/chartInvoicing.vue';
    const { get } = useHttpMethods();

    const dateInvoicing = ref<string>();
    const filter = ref<string[]>([
        dayjs(new Date()).set('D', 1).set('month',0).format('YYYY-MM-DD'),
        dayjs(new Date()).set('D', 31).set('month',11).format('YYYY-MM-DD')]);
    const seeChart = ref<boolean>(false);
    const data = ref<ContractorPolicyTotal>({
        contractors: [],
        totalAmount: 0,
        totalTravelers: 0,
    });
    const loading = ref(false);
    watch([filter], () => {

        // dateInvoicing.value = filter?.value;
        getData(filter.value);
    });
    onMounted(() => {
        //filter.value = new Date().toISOString();
        getData();
    });
    const getData = async (dateInvoicing?: string[]) => {
        try {
            loading.value = true;
            console.log(...filter.value)
            data.value = (await get('/contractor/policy_overview',{dateInitFactRange:dateInvoicing?.[0], dateEndFactRange:dateInvoicing?.[1]})).data;
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
