<template>
    <h1>{{ props.id ? 'Editar Usuario' : 'Crear Usuario' }}</h1>
    <FormUser :id="props.id" :edit-admin="true" />
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import FormUser from '../components/form/formUser.vue';

    const props = defineProps<{ id?: string }>();

    onMounted(() => {
        if (props.id) {
        }
    });
</script>

<style lang="scss" scoped></style>
