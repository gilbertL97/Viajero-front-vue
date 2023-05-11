<template>
    <TableHeaderTraveler :current="true" @filter="filter" />
    <TableCurrentTravelers :loading="loading" :data="data">
        <DropdownExport urlExcel="/traveler/excel" title="Viajeros" :filter="searchTravel"
    /></TableCurrentTravelers>
</template>

<script setup lang="ts">
    import { onMounted, provide, reactive, ref } from 'vue';
    import TableCurrentTravelers from '../components/table/tableCurrentTravelers.vue';
    import TableHeaderTraveler from '../components/tableHeader/tableHeaderTraveler.vue';
    import { getFilterTravelers } from '../services/traveler.service';
    import { FilterTravelers, TravelerResponse } from '../types/type.traveler';
    import DropdownExport from '@/components/shared/export/dropdownExport.vue';

    provide('current', true);
    const loading = ref(false);
    const searchTravel: FilterTravelers = reactive({
        name: undefined,
        sex: undefined,
        passport: undefined,
        start_date_init: undefined,
        start_date_end: undefined,
        end_date_policy_init: undefined,
        end_date_policy_end: undefined,
        number_high_risk_days: undefined,
        contractor: undefined,
        origin_country: undefined,
        nationality: undefined,
        coverage: undefined,
        state: true,
    });
    const data = ref<TravelerResponse[]>([]);
    onMounted(async () => {
        await refresh();
    });
    const refresh = async () => {
        loading.value = true;
        try {
            data.value = (await getFilterTravelers(searchTravel)).data;
        } catch (error) {}
        loading.value = false;
    };
    const filter = async (filter: FilterTravelers) => {
        try {
            data.value = (await getFilterTravelers(filter)).data;
        } catch (error) {}
    };
</script>

<style scoped></style>
