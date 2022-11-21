<template>
    <h1>{{ props.id ? 'Editar Viajero' : 'Agregar Viajero' }}</h1>
    <form-travelers :id="props.id" />
</template>

<script setup lang="ts">
    import formTravelers from '../components/form/formTravelers.vue';
    const props = defineProps<{ id?: string }>();
</script>

<style scoped>
    #upload {
        float: right;
    }
</style>
