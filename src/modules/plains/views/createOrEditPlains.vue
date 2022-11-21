<template>
    <h1>{{ props.id ? 'Editar Plan' : 'Agregar Plane' }}</h1>
    <FormPlans :id="props.id" />
</template>

<script setup lang="ts">
    import FormPlans from '@/modules/plains/components/form/formPlans.vue';
    const props = defineProps<{ id?: string }>();
</script>

<style scoped></style>
