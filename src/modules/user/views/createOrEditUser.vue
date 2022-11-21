<template>
    <h1>{{ props.id ? 'Editar Usuario' : 'Crear Usuario' }}</h1>
    <FormUser :id="props.id" />
</template>

<script setup lang="ts">
    import FormUser from '../components/form/formUser2.vue';

    const props = defineProps<{ id?: string }>();
</script>

<style lang="scss" scoped></style>
