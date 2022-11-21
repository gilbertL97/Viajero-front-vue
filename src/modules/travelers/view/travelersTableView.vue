<template>
    <div class="table-header">
        <h4> Agencias</h4>
        <dropdownContrac
            @selected="getSelected"
            :activeSelect="true"
            :contractorId="filterContractor"
        />
        <a-divider type="vertical" />
        <h4> Fecha Inicio del Viaje </h4>
        <a-range-picker
            :placeholder="['entre', 'y entre']"
            size="small"
            v-model:value="dateFilter"
            value-format="YYYY-MM-DD"
        />
        <a-divider type="vertical" />
        <a-button type="primary" @click="deleteFilter"
            >Borrar Filtros <DeleteOutlined
        /></a-button>
        <a-divider type="vertical" />
        <a-button @click="createTraveler" type="primary">Añadir</a-button>
        <a-divider type="vertical" />
        <a-button @click="gotoUpload" type="primary"
            ><upload-outlined /> Subir Ficheros</a-button
        >
        <a-divider type="vertical" />
        <a-button type="primary" @click="visible = true"
            >Busqueda avanzada <search-outlined
        /></a-button>
    </div>
    <tableTraveler ref="table" />
    <a-modal
        v-model:visible="visible"
        title="Busqueda Avanzada"
        :destroyOnClose="true"
        :footer="null"
    >
        <SearchForm @visible="closemodal" @filter="advanceFilter"
    /></a-modal>
</template>

<script setup lang="ts">
    import {
        DeleteOutlined,
        UploadOutlined,
        SearchOutlined,
    } from '@ant-design/icons-vue';
    import dropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import SearchForm from '../components/form/searchFormTraveler.vue';
    import { useRouter } from 'vue-router';
    import { reactive, ref, onMounted, watch } from 'vue';
    import tableTraveler from '../components/table/tableTraveler.vue';
    import { FilterTravelers } from '../types/type.traveler';

    const router = useRouter();

    const filterContractor = ref<number | undefined>(undefined);
    const visible = ref(false);
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
        state: undefined,
    });
    const searchDateandContractor: FilterTravelers = reactive({
        start_date_init: undefined,
        start_date_end: undefined,
        contractor: undefined,
    });
    //const search = ref(false);
    const dateFilter = ref<Date[]>([]);
    const table = ref(null);
    onMounted(() => {
        console.log(table.value);
    });
    const gotoUpload = () => {
        router.push({ name: 'upload' });
    };
    const createTraveler = (record?: any) => {
        console.log(record);
        router.push('/travelers/create-travelers');
    };
    const getSelected = (value: any) => {
        filterContractor.value = value as number;
    };
    const closemodal = () => {
        visible.value = false;
    };
    const advanceFilter = (filter: FilterTravelers) => {
        eraseSearch();
        searchTravel.name = filter.name;
        searchTravel.passport = filter.passport;
        searchTravel.start_date_init = filter.start_date_init;
        searchTravel.start_date_end = filter.start_date_end;
        searchTravel.end_date_policy_init = filter.end_date_policy_init;
        searchTravel.end_date_policy_end = filter.end_date_policy_end;
        searchTravel.contractor = filter.contractor;
        searchTravel.origin_country = filter.origin_country;
        searchTravel.nationality = filter.nationality;
        searchTravel.coverage = filter.coverage;
        searchTravel.state = filter.state;
        console.log(searchTravel);
        table.value?.filter(searchTravel);
    };
    const deleteFilter = () => {
        eraseSearch();
        dateFilter.value = [];
        filterContractor.value = undefined;
        refresh();
    };
    const eraseSearch = () => {
        searchTravel.name = undefined;
        searchTravel.passport = undefined;
        searchTravel.start_date_init = undefined;
        searchTravel.start_date_end = undefined;
        searchTravel.end_date_policy_init = undefined;
        searchTravel.end_date_policy_end = undefined;
        searchTravel.contractor = undefined;
        searchTravel.origin_country = undefined;
        searchTravel.nationality = undefined;
        searchTravel.coverage = undefined;
        searchTravel.state = undefined;
        dateFilter.value = [];
        searchDateandContractor.start_date_init = undefined;
        searchDateandContractor.start_date_end = undefined;
        searchDateandContractor.contractor = undefined;
    };
    const refresh = () => {
        table.value?.refresh();
    };

    watch([dateFilter, filterContractor], () => {
        if (dateFilter.value.length > 1 || filterContractor.value) {
            if (dateFilter.value.length > 1) {
                searchDateandContractor.start_date_init = dateFilter.value[0];
                searchDateandContractor.start_date_end = dateFilter.value[1];
                console.log(dateFilter.value[0], dateFilter.value[1]);
            }
            searchDateandContractor.contractor = filterContractor.value;
            console.log(searchDateandContractor);
            table.value?.filter(searchDateandContractor);
        }
    });
    //const init = () => {};
</script>

<style lang="scss" scoped>
    .table-header {
        display: inline-flex;
    }
</style>
