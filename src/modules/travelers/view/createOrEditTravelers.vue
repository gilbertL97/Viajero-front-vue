<template>
    <div>
        <h1>{{ props.id ? 'Editar Viajero' : 'Agregar Viajero' }}</h1>
        <form-travelers :traveler="traveler"
    /></div>
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import formTravelers from '../components/form/formTravelers.vue';
    import { Traveler } from '../types/type.traveler';

    const loading = ref(true);
    const props = defineProps<{ id?: string }>();
    const traveler: Traveler = reactive({
        name: null,
        sex: undefined,
        born_date: undefined,
        email: undefined,
        passport: null,
        sale_date: undefined,
        start_date: null,
        end_date_policy: null,
        number_high_risk_days: undefined,
        contractor: null,
        origin_country: undefined,
        nationality: undefined,
        coverage: null,
    });

    onMounted(async () => {
        if (props.id) {
            loading.value = true;
        }
    });
</script>

<style scoped></style>
