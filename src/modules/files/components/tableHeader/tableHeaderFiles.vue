<template>
    <div class="table-header">
        <h4> Agencias</h4>
        <DropdownContrac
            :data="contractors"
            @selected="getSelected"
            :activeSelect="true"
            :contractorId="filterContractor"
        />
        <a-divider type="vertical" />
        <h4> Fecha Importación:</h4>
        <a-range-picker
            size="small"
            v-model:value="dateFilter"
            value-format="YYYY-MM-DD"
            format="DD/MM/YYYY"
        />
        <a-divider type="vertical" />
        <a-button type="primary" @click="deleteFilter"
            >Borrar Filtros <DeleteOutlined
        /></a-button>
        <a-divider type="vertical" /> </div
></template>

<script setup lang="ts">
    import { DeleteOutlined } from '@ant-design/icons-vue';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import { FileD, FilterFileD } from '../../type/file.type';
    import useFileFilter from '../../composable/useFileFilter';
    import { Contractor } from '@/modules/contratctor/types/contractor.types';
    import useHttpMethods from '@/service/useHttpMethods';
    const { get }= useHttpMethods();

    const { eraseSearch, assignFilter, filterFiler } = useFileFilter();
    defineProps<{ 
        title: string;
        columns: any[];
        contractors:Contractor[]
     }>();

    const filterContractor = ref<number | undefined>(undefined);
    const dateFilter = ref<Date[]>([]);

    const getSelected = (value: any) => {
        filterContractor.value = value as number;
    };
    const deleteFilter = () => {
        dateFilter.value = [];
        filterContractor.value = undefined;
        eraseSearch();
        emit('filter', filterFiler);
    };
    watch([dateFilter, filterContractor], () => {
        if (dateFilter.value?.length > 1 || filterContractor.value) {
            if (dateFilter.value?.length > 1) {
                filterFiler.start_date_create = dateFilter.value[0];
                filterFiler.end_date_create = dateFilter.value[1];
            }
            filterFiler.contractor = filterContractor.value;
            assignFilter(filterFiler);
            emit('filter', filterFiler);
        }
    });
    const emit = defineEmits<{
        (e: 'filter', searchTravler: FilterFileD): void;
    }>();
</script>

<style scoped>
    .table-header {
        display: inline-flex;
    }
</style>
