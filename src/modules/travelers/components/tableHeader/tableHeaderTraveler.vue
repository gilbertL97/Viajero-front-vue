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
            size="small"
            v-model:value="dateFilter"
            value-format="YYYY-MM-DD"
        />
        <a-divider type="vertical" />
        <a-button type="primary" @click="deleteFilter"
            >Borrar Filtros <DeleteOutlined
        /></a-button>
        <a-divider type="vertical" />
        <a-button
            v-if="store.canAccess('create-travelers') && !current"
            @click="createTraveler"
            type="primary"
            >Añadir</a-button
        >
        <a-divider type="vertical" />
        <a-button
            @click="gotoUpload"
            v-if="store.canAccess('upload') && !current"
            type="primary"
            ><upload-outlined /> Subir Ficheros</a-button
        >
        <a-divider type="vertical" />
        <a-button type="primary" @click="visible = true"
            >Busqueda avanzada <SearchOutlined
        /></a-button>
        <a-modal
            v-model:visible="visible"
            title="Busqueda Avanzada"
            :destroyOnClose="true"
            :footer="null"
        >
            <SearchForm @visible="closemodal" @filter="advanceFilter"
        /></a-modal>
    </div>
</template>

<script setup lang="ts">
    import dropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import {
        SearchOutlined,
        DeleteOutlined,
        UploadOutlined,
    } from '@ant-design/icons-vue';
    import SearchForm from '../../components/form/searchFormTraveler.vue';
    import { inject } from 'vue';
    import { FilterTravelers } from '../../types/type.traveler';
    import useTravelersFilters from '../../composable/useFilterTravelers';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/modules/auth/store/auth.store';
    const router = useRouter();
    const store = useAuthStore();
    const current: boolean | undefined = inject('current');
    const { searchTravel, eraseSearch, assignFilter } = useTravelersFilters(current);
    const filterContractor = ref<number | undefined>(undefined);
    const visible = ref(false);
    const dateFilter = ref<Date[]>([]);
    defineProps<{
        current: boolean;
    }>();
    const getSelected = (value: any) => {
        filterContractor.value = value as number;
    };
    const closemodal = () => {
        visible.value = false;
    };
    const advanceFilter = (filter: FilterTravelers) => {
        eraseSearch();
        assignFilter(filter);
        emit('filter', searchTravel);
        //eraseSearch();
        dateFilter.value = [];
        filterContractor.value = undefined;
    };
    const deleteFilter = () => {
        eraseSearch();
        dateFilter.value = [];
        filterContractor.value = undefined;
        emit('filter', searchTravel);
    };

    watch([dateFilter, filterContractor], () => {
        if (dateFilter.value?.length > 1 || filterContractor.value) {
            eraseSearch();
            if (dateFilter.value?.length > 1) {
                searchTravel.start_date_init = dateFilter.value[0];
                searchTravel.start_date_end = dateFilter.value[1];
            }
            searchTravel.contractor = filterContractor.value;
            if (current) searchTravel.state = true;
            emit('filter', searchTravel);
        }
    });
    const emit = defineEmits<{
        (e: 'filter', searchTravler: FilterTravelers): void;
    }>();
    const gotoUpload = () => {
        router.push({ name: 'upload' });
    };
    const createTraveler = () => {
        router.push({ name: 'create-travelers' });
    };
</script>

<style lang="scss" scoped>
    .table-header {
        display: inline-flex;
    }
</style>
