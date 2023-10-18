<template>
    <div class="table-header">
        <DropdownContrac
            @selected="getSelected"
            mode="multiple"
            :max-tag-count="1"
            :activeSelect="true"
            :contractor-id="filter.ids"
        /><h4 style="padding-right: 5px"> MES </h4>
        <a-date-picker
            v-model:value="date"
            picker="month"
            format="MM/YYYY"
            valueFormat="YYYY-MM-DD"
        />
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
    import { Contractor, FilterContractor } from '../types/contractor.types';
    import { getDetailed } from '../services/contractor.service';
    import DropdownExport from '@/common/components/export/dropdownExport.vue';
    import DropdownContrac from '../components/dropdown/dropdownContrac.vue';

    const loading = ref(false);
    const data = ref<Contractor[]>([]);
    const date = ref<string>();
    const filter = reactive<FilterContractor>({
        dateInvoicing: undefined,
        ids: undefined,
    }); //ref<Date>();
    watch([() => filter.ids, date], () => {
        filter.dateInvoicing = date.value;
        getDetailedData(filter);
        /* excelFilter.dateInvoicing = filter.value
            ? filter.value.toISOString()
            : new Date().toISOString();/*/
    });
    onMounted(async () => {
        date.value = new Date().toISOString();
        getDetailedData(filter);
    });
    const getSelected = (id: any) => {
        filter.ids = id as number[];
        filter.id = filter.ids[0];
    };
    const getDetailedData = async (filterr: FilterContractor) => {
        try {
            loading.value = true;
            data.value = (await getDetailed(filterr)).data;
        } catch (error) {}
        loading.value = false;
    };
    const deleteFilter = () => {
        filter.dateInvoicing = undefined;
        filter.id = undefined;
        filter.ids = undefined;
        date.value = undefined;
    };
</script>

<style scoped>
    .table-header {
        display: inline-flex;
        gap: 1;
    }
</style>
