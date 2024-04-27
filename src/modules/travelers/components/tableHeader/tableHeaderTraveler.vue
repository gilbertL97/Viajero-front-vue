<template>
    <div class="table-header">
        <h4> Agencias :  </h4>
        <DropdownGeneric 
        :data="data" 
        :property-search="{value:'id', label:'client'}" 
        v-model:model-value="filterContractor" 
        :show-search="true"
        />

        <!-- <dropdownContracs
            @selected="getSelected"
            :activeSelect="true"
            :contractorId="filterContractor"
        /> -->
        <a-divider type="vertical" />
        <div v-if="!current">
            <h4>F. Inicio :</h4>
                <a-range-picker
                size="small"
                v-model:value="dateFilter"
                value-format="YYYY-MM-DD"
                format="DD/MM/YYYY"
                />
        </div>
        <div v-else >
            <h4> Fecha de Vigencia : </h4>
            <a-date-picker
            v-model:value="filterCurrent"
            format="DD/MM/YYYY"
            valueFormat="YYYY-MM-DD"
            /></div>
        <a-divider type="vertical" />
        <a-button type="primary" @click="deleteFilter"
            >Borrar Filtros <DeleteOutlined
        /></a-button>
        <div  v-if="store.canAccess('create-travelers') && !current" class="canCreate">
            <a-divider type="vertical" />
            <a-button
           
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
        </div>

        
        <a-divider type="vertical" />
        <a-button type="primary" @click="visible = true"
            >Busqueda avanzada <SearchOutlined
        /></a-button>
        <a-modal
            v-model:open="visible"
            title="Busqueda Avanzada"
            :destroyOnClose="true"
            :footer="null"
        >
            <SearchForm     
                :contractors="data"
                :countries="countries"
                :planss ="plans"  
                @visible="closemodal" 
                @filter="advanceFilter"
        /></a-modal>
    </div>
</template>

<script setup lang="ts">
    //import dropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
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
    import { useAuthStore } from '@/modules/auth/store/auth.store.c';
    import DropdownGeneric from '@/common/components/dropdown/dropdownGeneric.vue';
    import { Contractor } from '@/modules/contratctor/types/contractor.types';
    import { Country } from '@/modules/country/types/country.type';
    import { Plans } from '@/modules/plains/types/plains.types';
    const router = useRouter();
    const store = useAuthStore();

    //TODO refactorizar para llevar todo esto a un composable y ademas quitar el composable useTravelersFilters
    const current: boolean | undefined = inject('current');
    const { searchTravel, eraseSearch, assignFilter } = useTravelersFilters(current);
    const filterContractor = ref<Contractor|undefined>();
    const visible = ref(false);
    const filterCurrent = ref<string>(new Date().toISOString());
    const dateFilter = ref<Date[]>([]);
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
        filterCurrent.value = new Date().toISOString();
        emit('filter', searchTravel);
    };
    defineProps<{
        data:Contractor[];
        countries:Country[];
        plans:Plans[];
    }>()
    watch([dateFilter, filterContractor], () => {
        if(!current){
            if (dateFilter.value?.length > 1 || filterContractor.value) {
            eraseSearch();
            if (dateFilter.value?.length > 1) {
                    searchTravel.start_date_init = dateFilter.value[0];
                 searchTravel.start_date_end = dateFilter.value[1];
                }
                searchTravel.contractor = filterContractor.value?.id;
             emit('filter', searchTravel);
            }
        }
    });
    watch([filterCurrent,filterContractor], () => {
        if(current){
            eraseSearch();
            searchTravel.contractor = filterContractor.value?.id;
            searchTravel.effective_date = filterCurrent.value;
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
    .table-header, div {
        display: inline-flex;
    }
    h4{
        padding: 0.4rem  0.5rem ;
    }
</style>
