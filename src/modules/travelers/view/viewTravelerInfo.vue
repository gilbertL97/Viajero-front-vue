<template>
    <h1> Ver Viajero</h1>
    <FormTravelers :id="props.id" :is-only-view="isView" />
</template>

<script setup lang="ts">
    import FormTravelers from '../components/form/formTravelers.vue';
    import { ref } from 'vue';
    const props = defineProps<{ id: string }>();
    const isView = ref(true);
</script>

<style scoped></style>
