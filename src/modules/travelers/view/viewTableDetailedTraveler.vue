<template>
    <div class="table-header">
        <h4>Agencia:</h4>
        <DropdownContrac
            :data="contractor"
            @selected="getSelected"
            mode="multiple"
            :max-tag-count="1"
            :activeSelect="true"
            :contractor-id="filter.idContractors"
        /><h4 style="padding-right: 5px"> Mes :</h4>
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
    <TableTraveler :data="data" :loading="loading" :is-only-read="true">
        <DropdownExport
            urlExcel="/traveler/excel"
            urlPdf="/traveler/pdf"
            title="Cliente"
            :filter="filter"
        />
    </TableTraveler>
    <PaginationTable :total="totalDetail" @page="paginate" />
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
    import TableTraveler from '../components/table/tableTraveler.vue';
    import { PaginationDto } from '@/common/types/pagination.type';
    import { DateHelper } from '@/common/helper/dateHelper';
    import useHttpMethods from '@/service/useHttpMethods';
    import { Contractor } from '@/modules/contratctor/types/contractor.types';

    

    const { get } = useHttpMethods()
    const loading = ref(false);
    const totalDetail = ref(0);
    const date = ref<string>('');
    const data = ref<TravelerResponse[]>([]);
    const contractor = ref<Contractor[]>([]);
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
        await refresh();
        contractor.value = (await get('/contractor')).data;
    });
    const refresh = async () => {
        date.value = new Date().toISOString();
        const { end, init } = DateHelper.convertToRange(date.value);
        filter.start_date_end = end;
        filter.start_date_init = init;
        await getDetailedData(filter);
    };
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
            totalDetail.value = totalT;
        } catch (error) {}
        loading.value = false;
    };
    const paginate = async (page: PaginationDto) => {
        await getDetailedData(filter, page);
    };
    const deleteFilter = async () => {
        filter.idContractors = undefined;
        date.value = '';
        await refresh();
    };
</script>

<style scoped>
    .table-header {
        display: inline-flex;
    }
    h4{
        padding: 0.4rem  1rem ;
    }
    
</style>
