<template>
    <div class="table-header"
        ><h4 style="padding-right: 5px"> Fecha Inicio </h4>
        <a-date-picker v-model:value="filter" picker="month" :locale="locale" />
    </div>
    <TableContractorDetailed :data="data" :loading="loading">
        <DropdownExport
            url="/contractor/detailed/excel"
            title="Cliente"
            :filter="excelFilter"
        />
    </TableContractorDetailed>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
    import 'dayjs/locale/es';
    import TableContractorDetailed from '../components/table/tableContractorDetailed.vue';
    import { Contractor } from '../types/contractor.types';
    import { getDetailed } from '../services/contractor.service';
    import DropdownExport from '@/components/shared/export/dropdownExport.vue';

    const loading = ref(false);
    const data = ref<Contractor[]>([]);
    const excelFilter = reactive({
        dateInvoicing: '',
    });
    const filter = ref<Date>();
    watch([filter], () => {
        getDetailedData(filter.value?.toISOString());
        excelFilter.dateInvoicing = filter.value
            ? filter.value.toISOString()
            : new Date().toISOString();
    });
    onMounted(async () => {
        getDetailedData(new Date().toISOString());
        excelFilter.dateInvoicing = new Date().toISOString();
    });
    const getDetailedData = async (date?: string) => {
        try {
            loading.value = true;
            data.value = (await getDetailed(date)).data;
        } catch (error) {}
        loading.value = false;
    };
</script>

<style scoped>
    .table-header {
        display: inline-flex;
        gap: 1;
    }
</style>
