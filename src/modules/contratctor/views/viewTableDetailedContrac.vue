<template>
    <div class="table-header">
        <DropdownContrac
            @selected="getSelected"
            :activeSelect="true"
            :contractorId="filter.id"
        /><h4 style="padding-right: 5px"> MES </h4>
        <a-date-picker v-model:value="date" picker="month" />
        <a-button type="primary" @click="deleteFilter"
            >Borrar Filtros <DeleteOutlined
        /></a-button>
    </div>
    <TableContractorDetailed :data="data" :loading="loading">
        <DropdownExport
            urlExcel="/contractor/detailed/excel"
            urlPdf="/contractor/detailed/pdf"
            title="Cliente"
            :filter="filter"
        />
    </TableContractorDetailed>
</template>

<script setup lang="ts">
    import { onMounted, watch } from 'vue';
    import TableContractorDetailed from '../components/table/tableContractorDetailed.vue';
    import { DeleteOutlined } from '@ant-design/icons-vue';
    import { Contractor, FilterDateAndContract } from '../types/contractor.types';
    import { getDetailed } from '../services/contractor.service';
    import DropdownExport from '@/common/components/export/dropdownExport.vue';
    import DropdownContrac from '../components/dropdown/dropdownContrac.vue';

    const loading = ref(false);
    const data = ref<Contractor[]>([]);
    const date = ref<Date>();
    const filter = reactive<FilterDateAndContract>({
        dateInvoicing: undefined,
        id: undefined,
    }); //ref<Date>();
    watch([() => filter.id, date], () => {
        filter.dateInvoicing = date.value?.toISOString();
        console.log(filter);
        getDetailedData(filter);
        /* excelFilter.dateInvoicing = filter.value
            ? filter.value.toISOString()
            : new Date().toISOString();/*/
    });
    onMounted(async () => {
        getDetailedData(filter);
    });
    const getSelected = (id: any) => {
        filter.id = id as number;
    };
    const getDetailedData = async (filterr: FilterDateAndContract) => {
        try {
            loading.value = true;
            data.value = (await getDetailed(filterr)).data;
        } catch (error) {}
        loading.value = false;
    };
    const deleteFilter = () => {
        filter.dateInvoicing = undefined;
        filter.id = undefined;
        date.value = undefined;
    };
</script>

<style scoped>
    .table-header {
        display: inline-flex;
        gap: 1;
    }
</style>
