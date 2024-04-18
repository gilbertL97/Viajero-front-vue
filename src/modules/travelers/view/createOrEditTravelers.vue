<template>
    <h1>{{ props.id ? 'Editar Viajero' : 'Agregar Viajero' }}</h1>
    <form-travelers 
    :id="props.id"
    :contractors="contractors"
    :countries="countries"
    :plans =plans />
</template>

<script setup lang="ts">
    import { getPlans } from '@/modules/plains/services/plan.service';
    import { usePlainStore } from '@/modules/plains/store/plans.store';
    import { onBeforeMount } from 'vue';
    import formTravelers from '../components/form/formTravelers.vue';
    import useHttpMethods from '@/service/useHttpMethods';
    import { Contractor } from '@/modules/contratctor/types/contractor.types';
    import { Country } from '@/modules/country/types/country.type';
import { Plans } from '@/modules/plains/types/plains.types';
    const { get }= useHttpMethods();
    const props = defineProps<{ id?: string }>();
    const store = usePlainStore();
    const contractors = ref<Contractor[]>([]);
    const countries= ref<Country[]>([]);
    const plans = ref<Plans[]>([]);
    
    onBeforeMount(async () => {
        contractors.value  = (await get('/contractor')).data;
        countries.value  = (await get('/country')).data;
        plans.value  = (await get('/coverage')).data;
        store.setPlans((await getPlans()).data);
    });
</script>

<style scoped>
    h1 {
        font-size: x-large;
    }
    #upload {
        float: right;
    }
</style>
