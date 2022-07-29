<template>
    <a-layout :loading="loading">
        <h1>{{ props.id ? 'Editar Viajero' : 'Agregar Viajero' }}</h1>
        <form-travelers :traveler="traveler"
    /></a-layout>
</template>

<script setup lang="ts">
    import { onBeforeMount, reactive, ref } from 'vue';
    import formTravelers from '../components/form/formTravelers.vue';
    import { getTraveler } from '../services/traveler.service';
    import { Traveler, TravelerResponse } from '../types/type.traveler';

    const loading = ref(true);
    const props = defineProps<{ id?: string }>();
    let traveler: Traveler = reactive({
        name: '',
        sex: undefined,
        born_date: undefined,
        email: undefined,
        passport: '',
        sale_date: undefined,
        start_date: null,
        end_date_policy: null,
        number_high_risk_days: undefined,
        contractor: undefined,
        origin_country: undefined,
        nationality: undefined,
        coverage: -1,
    });

    onBeforeMount(async () => {
        if (props.id) {
            console.log(props.id);
            loading.value = true;
            await charge();
            loading.value = false;
        }
    });
    const intializateTraveler = (travelerR: TravelerResponse) => {
        console.log('tipo de cbertura ' + travelerR.coverage.id);
        traveler.name = travelerR.name;
        traveler.sex = travelerR.sex;
        traveler.born_date = travelerR.born_date;
        traveler.email = travelerR.email;
        traveler.passport = travelerR.passport;
        traveler.sale_date = travelerR.sale_date;
        traveler.start_date = travelerR.start_date;
        traveler.end_date_policy = travelerR.end_date_policy;
        traveler.number_high_risk_days = travelerR.number_high_risk_days;
        traveler.contractor = travelerR.contractor.id;
        traveler.origin_country = travelerR.origin_country?.iso;
        traveler.nationality = travelerR.nationality?.iso;
        traveler.coverage = travelerR.coverage.id;
    };
    const charge = async () => {
        if (props.id) {
            const travelerR: TravelerResponse = (await getTraveler(props.id)).data;
            intializateTraveler(travelerR);
        }
    };
</script>

<style scoped></style>
