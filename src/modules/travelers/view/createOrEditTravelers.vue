<template>
    <h1>{{ props.id ? 'Editar Viajero' : 'Agregar Viajero' }}</h1>
    <form-travelers :id="props.id" />
</template>

<script setup lang="ts">
    import { getPlans } from '@/modules/plains/services/plan.service';
    import { usePlainStore } from '@/modules/plains/store/plans.store';
    import { onBeforeMount } from 'vue';
    import formTravelers from '../components/form/formTravelers.vue';
    const props = defineProps<{ id?: string }>();
    const store = usePlainStore();
    onBeforeMount(async () => {
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
