<template>
    <h1>{{ props.id ? 'Editar Clientes' : 'Crear Clientes' }}</h1>
    <formContract :id="props.id" />
</template>

<script setup lang="ts">
    import formContract from '@/modules/contratctor/components/form/formContract.vue';
    const props = defineProps<{ id?: string }>();
</script>

<style scoped></style>
