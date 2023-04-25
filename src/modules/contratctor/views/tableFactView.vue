<template>
    <div class="table-header"
        ><h4 style="padding-right: 5px"> Fecha Inicio </h4>
        <a-date-picker v-model:value="filter" picker="month" :locale="locale" />
    </div>
    <TableContractorDetailed v-if="prop.detailed" :data="data" :loading="loading" />
    <TableContractorFact ref="table" v-else>
        <DropdownExport
            url="/contractor/invoicing/excel"
            :filter="{ dateInvoicing }"
            title="Cliente"
        />
    </TableContractorFact>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import TableContractorFact from '../components/table/tableContractorFact.vue';
    import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
    import 'dayjs/locale/es';
    import TableContractorDetailed from '../components/table/tableContractorDetailed.vue';
    import DropdownExport from '@/components/shared/export/dropdownExport.vue';
    import { Contractor } from '../types/contractor.types';
    import { getDetailed } from '../services/contractor.service';

    const prop = defineProps<{
        detailed: boolean;
    }>();
    const dateInvoicing = ref<string>();
    const loading = ref(false);
    const data = ref<Contractor[]>([]);
    const filter = ref<Date>();
    const table = ref(TableContractorFact);
    watch([filter], () => {
        table.value.getData(filter.value);
        dateInvoicing.value = filter.value?.toISOString();
    });
    onMounted(async () => {
        if (prop.detailed) {
            getDetailedData(new Date().toISOString());
        }
    });
    const getDetailedData = async (date: string) => {
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
