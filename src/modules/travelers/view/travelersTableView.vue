<template>
    <TableHeaderTraveler @filter="filter" />
    <TableTraveler
        :loading="loading"
        :isOnlyRead="false"
        :data="data"
        @deleted="onDelete"
        @print="printPdf"
        @update="editTraveler"
    >
        <DropdownExport
            urlExcel="/traveler/excel"
            urlPdf="/traveler/pdf"
            title="Viajeros"
            :filter="searchTravel"
    /></TableTraveler>
    <PaginationTable :total="totalTravelers" @page="paginate" />
</template>

<script setup lang="ts">
    import TableTraveler from '../components/table/tableTraveler.vue';
    import TableHeaderTraveler from '../components/tableHeader/tableHeaderTraveler.vue';
    import { FilterTravelers, TravelerResponse } from '../types/type.traveler';
    import {
        deleteTravelers,
        getCertTravelers,
        getFilterTravelersPag,
        getTravelersByFile,
        getTravelersPag,
    } from '../services/traveler.service';
    import { useRouter } from 'vue-router';
    import DropdownExport from '@/common/components/export/dropdownExport.vue';
    import useTravelersFilters from '../composable/useFilterTravelers';
    import PaginationTable from '@/common/components/pagination/paginationTable.vue';
    import { PaginationDto } from '@/common/types/pagination.type';

    const props = defineProps<{
        idFile?: string;
        current?: string;
    }>();
    const router = useRouter();
    const loading = ref(false);
    const totalTravelers = ref(0);
    const data = ref<TravelerResponse[]>([]);
    props.current ? provide('current', true) : provide('current', false);
    const { searchTravel, eraseSearch } = useTravelersFilters(Boolean(props.current));
    onMounted(async () => {
        eraseSearch();
        if (!props.current && !props.idFile) await refresh();
        props.current && (await getDataFiltered(searchTravel));
        if (props.idFile) {
            getfile(+props.idFile);
        }
    });
    const refresh = async (pagination?: PaginationDto) => {
        loading.value = true;
        try {
            //aqui cambie esto para la paginacion
            const { data: travelers, total } = (await getTravelersPag(pagination)).data;
            data.value = travelers;
            totalTravelers.value = total;
        } catch (error) {}
        loading.value = false;
    };
    const getDataFiltered = async (
        filter: FilterTravelers,
        pagination?: PaginationDto,
    ) => {
        loading.value = true;

        try {
            const { data: travelers, total } = (
                await getFilterTravelersPag(pagination, filter)
            ).data;
            data.value = travelers;
            totalTravelers.value = total;
        } catch (error) {}
        loading.value = false;
    };
    const filter = async (filterTravelers: FilterTravelers) => {
        await getDataFiltered(filterTravelers);
    };

    const paginate = async (page: PaginationDto) => {
        await getDataFiltered(searchTravel, page);
    };
    const onDelete = async (key: string) => {
        await deleteTravelers(key).finally(refresh);
    };

    const editTraveler = (record?: string) => {
        router.push('/travelers/edit-travelers/' + record);
    };

    const printPdf = async (record: string) => {
        await getCertTravelers(record).then((response) => {
            if (response.status == 200) {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                window.open(URL.createObjectURL(blob), '_blank')?.print();
            }
        });
    };
    const getfile = async (file: number) => {
        try {
            data.value = (await getTravelersByFile(file)).data;
        } catch (error) {}
    };
</script>

<style lang="scss" scoped>
    .table-header {
        display: inline-flex;
    }
</style>
