<template>
    <div class="table-header">
        <DropdownContrac
            @selected="getSelected"
            mode="multiple"
            :max-tag-count="1"
            :activeSelect="true"
            :contractor-id="filter.idContractors"
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
    <TableCurrentTravelers :data="data" :loading="loading">
        <DropdownExport
            urlExcel="/traveler/excel"
            urlPdf="/traveler/pdf"
            title="Cliente"
            :filter="filter"
        />
    </TableCurrentTravelers>
    <PaginationTable :total="total" @page="paginate" />
</template>

<script setup lang="ts">
    import { onMounted, watch } from 'vue';
    import { DeleteOutlined } from '@ant-design/icons-vue';
    import DropdownExport from '@/common/components/export/dropdownExport.vue';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import {
        FilterTravelerDetailedReport,
        TravelerResponse,
    } from '../types/type.traveler';
    import { getFilterTravelersPag } from '../services/traveler.service';
    import PaginationTable from '@/common/components/pagination/paginationTable.vue';
    import TableCurrentTravelers from '../components/table/tableCurrentTravelers.vue';
    import { PaginationDto } from '@/common/types/pagination.type';
    import { DateHelper } from '@/common/helper/dateHelper';
    const loading = ref(false);
    const total = ref(0);
    const date = ref<string>('');
    const data = ref<TravelerResponse[]>([]);
    const filter = reactive<FilterTravelerDetailedReport>({
        start_date_init: undefined,
        start_date_end: undefined,
        idContractors: undefined,
    }); //ref<Date>();
    watch([() => filter.idContractors, date], () => {
        const { end, init } = DateHelper.convertToRange(date.value);
        filter.start_date_end = end;
        filter.start_date_init = init;
        getDetailedData(filter);
        /* excelFilter.dateInvoicing = filter.value
            ? filter.value.toISOString()
            : new Date().toISOString();/*/
    });
    onMounted(async () => {
        date.value = new Date().toISOString();
        const { end, init } = DateHelper.convertToRange(date.value);
        filter.start_date_end = end;
        filter.start_date_init = init;
        getDetailedData(filter);
    });
    const getSelected = (id: number | number[] | undefined) => {
        filter.idContractors = id as number[];
    };
    const getDetailedData = async (
        filterr: FilterTravelerDetailedReport,
        pag?: PaginationDto,
    ) => {
        try {
            loading.value = true;
            const { data: travelers, total: totalT } = (
                await getFilterTravelersPag(pag, filterr)
            ).data;
            data.value = travelers;
            total.value = totalT;
        } catch (error) {}
        loading.value = false;
    };
    const paginate = async (page: PaginationDto) => {
        await getDetailedData(filter, page);
    };
    const deleteFilter = () => {
        filter.idContractors = undefined;
        date.value = '';
    };
</script>

<style scoped>
    .table-header {
        display: inline-flex;
        gap: 1;
    }
</style>
