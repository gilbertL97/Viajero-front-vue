<template>
    <TableHeaderTraveler :current="false" @filter="filter" />
    <TableTraveler
        :loading="loading"
        :data="data"
        @deleted="onDelete"
        @print="printPdf"
        @update="editTraveler"
    >
        <DropdownExport urlExcel="/traveler/excel" title="Viajeros" :filter="searchTravel"
    /></TableTraveler>
</template>

<script setup lang="ts">
    import TableTraveler from '../components/table/tableTraveler.vue';
    import TableHeaderTraveler from '../components/tableHeader/tableHeaderTraveler.vue';
    import { FilterTravelers, TravelerResponse } from '../types/type.traveler';
    import {
        deleteTravelers,
        getCertTravelers,
        getFilterTravelers,
        getTravelers,
        getTravelersByFile,
    } from '../services/traveler.service';
    import { useRouter } from 'vue-router';
    import { getPlans } from '@/modules/plains/services/plan.service';
    import { Plans } from '@/modules/plains/types/plains.types';

    import { usePlainStore } from '@/modules/plains/store/plans.store';
    import DropdownExport from '@/components/shared/export/dropdownExport.vue';
    import useTravelersFilters from '../composable/useFilterTravelers';

    const store = usePlainStore();
    const plains = ref<Plans[]>([]);
    const props = defineProps<{
        idFile?: string;
    }>();
    const router = useRouter();
    const loading = ref(false);
    const data = ref<TravelerResponse[]>([]);
    provide('current', false);
    const { searchTravel } = useTravelersFilters();
    onMounted(async () => {
        if (props.idFile) {
            getfile(+props.idFile);
        } else await refresh();
    });
    const refresh = async () => {
        loading.value = true;
        try {
            data.value = (await getTravelers()).data;
            plains.value = (await getPlans()).data;
            store.setPlans(plains.value);
        } catch (error) {}
        loading.value = false;
    };
    const filter = async (filter: FilterTravelers) => {
        console.log(filter);
        try {
            data.value = (await getFilterTravelers(filter)).data;
        } catch (error) {}
    };

    const onDelete = async (key: string) => {
        console.log(key);
        await deleteTravelers(key).finally(refresh);
    };

    const editTraveler = (record?: string) => {
        console.log(record);
        router.push('/travelers/edit-travelers/' + record);
    };

    const printPdf = async (record: string) => {
        console.log(record);
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
            console.log(data.value);
        } catch (error) {}
    };
</script>

<style lang="scss" scoped>
    .table-header {
        display: inline-flex;
    }
</style>
