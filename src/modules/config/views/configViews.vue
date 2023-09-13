<template> <ConfigTable :data="data" :loading="loading" @update="update" /></template>

<script setup lang="ts">
    import ConfigTable from '../component/table/configTable.vue';
    import { getConfigurations } from '../services/config.services';
    import { Config } from '../types/config.types';
    const data = ref<Config[]>([]);
    const loading = ref(false);
    const edit = ref(false);
    onMounted(async () => {
        loading.value = true;
        try {
            data.value = (await getConfigurations()).data;
        } catch (error) {}

        loading.value = false;
    });
    const update = () => {
        edit.value = true;
    };
</script>

<style scoped></style>
