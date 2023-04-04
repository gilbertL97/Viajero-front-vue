<template>
    <div class="table-header"
        ><h4 style="padding-right: 5px"> Fecha Inicio </h4>
        <a-date-picker v-model:value="filter" picker="month" :locale="locale" />
    </div>
    <TableContractorDetailed :data="data" :loading="loading" />
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
    import 'dayjs/locale/es';
    import TableContractorDetailed from '../components/table/tableContractorDetailed.vue';
    import { Contractor } from '../types/contractor.types';
    import { getDetailed } from '../services/contractor.service';

    const loading = ref(false);
    const data = ref<Contractor[]>([]);
    const filter = ref<Date>();
    watch([filter], () => {
        getDetailedData(filter.value?.toISOString());
    });
    onMounted(async () => {
        getDetailedData(new Date().toISOString());
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
