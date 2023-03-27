<template>
    <div class="table-header">
        <h4> Agencias</h4>
        <dropdownContrac
            @selected="getSelected"
            :activeSelect="true"
            :contractorId="filterContractor"
        />
        <a-divider type="vertical" />
        <h4> Fecha Inicio </h4>
        <a-range-picker
            :locale="locale"
            :placeholder="['entre', 'entre']"
            size="small"
            v-model:value="dateFilter"
            value-format="YYYY-MM-DD"
        />
        <a-divider type="vertical" />
        <a-button type="primary" @click="deleteFilter"
            >Borrar Filtros <DeleteOutlined
        /></a-button>
    </div>
</template>

<script setup lang="ts">
    import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
    import 'dayjs/locale/es';
    import { ref } from 'vue';
    const filterContractor = ref<number | undefined>(undefined);
    const dateFilter = ref<Date[]>([]);
    const getSelected = (value: any) => {
        filterContractor.value = value as number;
    };
    const deleteFilter = () => {};
</script>

<style scoped></style>
