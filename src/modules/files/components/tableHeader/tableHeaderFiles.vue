<template>
    <div class="table-header">
        <h4> Agencias</h4>
        <DropdownContrac
            @selected="getSelected"
            :activeSelect="true"
            :contractorId="filterContractor"
        />
        <a-divider type="vertical" />
        <h4> Fecha Inicio :</h4>
        <a-range-picker
            size="small"
            v-model:value="dateFilter"
            value-format="YYYY-MM-DD"
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
    import { FileD } from '../../type/file.type';
    defineProps<{ data: FileD[]; title: string; columns: any[] }>();

    const filterContractor = ref<number | undefined>(undefined);
    const dateFilter = ref<Date[]>([]);
    const searchFileByDateandContractor = reactive<FileD>({
        start_date_create: undefined,
        end_date_create: undefined,
        contractor: undefined,
    });
    const getSelected = (value: any) => {
        filterContractor.value = value as number;
    };
    const deleteFilter = () => {
        dateFilter.value = [];
        filterContractor.value = undefined;
        searchFileByDateandContractor.start_date_create = undefined;
        searchFileByDateandContractor.end_date_create = undefined;
        searchFileByDateandContractor.contractor = undefined;
        emit('filter', searchFileByDateandContractor);
    };
    watch([dateFilter, filterContractor], () => {
        if (dateFilter.value?.length > 1 || filterContractor.value) {
            console.log(dateFilter.value?.length, filterContractor.value);
            if (dateFilter.value?.length > 1) {
                searchFileByDateandContractor.start_date_create = dateFilter.value[0];
                searchFileByDateandContractor.end_date_create = dateFilter.value[1];
            }
            searchFileByDateandContractor.contractor = filterContractor.value;

            emit('filter', searchFileByDateandContractor);
        }
    });
    const emit = defineEmits<{
        (e: 'filter', searchTravler: FileD): void;
    }>();
</script>

<style scoped>
    .table-header {
        display: inline-flex;
    }
</style>
