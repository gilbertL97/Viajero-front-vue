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
    <TableFiles />
</template>

<script setup lang="ts">
    import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
    import { DeleteOutlined } from '@ant-design/icons-vue';
    import 'dayjs/locale/es';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import { ref } from 'vue';
    import TableFiles from '../components/table/tableFiles.vue';
    const filterContractor = ref<number | undefined>(undefined);
    const dateFilter = ref<Date[]>([]);
    const getSelected = (value: any) => {
        filterContractor.value = value as number;
    };
    const deleteFilter = () => {};
</script>

<style scoped>
    .table-header {
        display: inline-flex;
    }
</style>
