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
            :locale="locale"
            size="small"
            v-model:value="dateFilter"
            value-format="YYYY-MM-DD"
        />
        <a-divider type="vertical" />
        <a-button type="primary" @click="deleteFilter"
            >Borrar Filtros <DeleteOutlined
        /></a-button>
    </div>
    <TableFiles ref="table" />
</template>

<script setup lang="ts">
    import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
    import { DeleteOutlined } from '@ant-design/icons-vue';
    import 'dayjs/locale/es';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import { reactive, ref, watch } from 'vue';
    import TableFiles from '../components/table/tableFiles.vue';
    import { FileD } from '../type/file.type';
    const filterContractor = ref<number | undefined>(undefined);
    const dateFilter = ref<Date[]>([]);
    const searchFileByDateandContractor = reactive<FileD>({
        start_date_create: undefined,
        end_date_create: undefined,
        contractor: undefined,
    });
    const table = ref(TableFiles);
    const getSelected = (value: any) => {
        filterContractor.value = value as number;
    };
    const deleteFilter = () => {
        dateFilter.value = [];
        filterContractor.value = undefined;
        table.value?.refresh();
    };

    watch([dateFilter, filterContractor], () => {
        if (dateFilter.value?.length > 1 || filterContractor.value) {
            console.log(dateFilter.value?.length, filterContractor.value);
            if (dateFilter.value?.length > 1) {
                searchFileByDateandContractor.start_date_create = dateFilter.value[0];
                searchFileByDateandContractor.end_date_create = dateFilter.value[1];
            }
            searchFileByDateandContractor.contractor = filterContractor.value;

            table.value?.filter(searchFileByDateandContractor);
        }
    });
</script>

<style scoped>
    .table-header {
        display: inline-flex;
    }
</style>
