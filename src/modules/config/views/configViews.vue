<template>
    <ConfigTable :data="data" :loading="loading" @update="update" />
    <a-modal
        v-model:visible="edit"
        title="Editar Configuracion"
        :destroyOnClose="true"
        :footer="null"
    >
        <ConfigForm
            :config="editableConfig"
            @accept="editConfig"
            @cancel="handleCancel" /></a-modal
></template>

<script setup lang="ts">
    import ConfigTable from '../component/table/configTable.vue';
    import { Config } from '../types/config.types';
    import ConfigForm from '../component/form/configForm.vue';
    import useHttpMethods from '@/service/useHttpMethods';
    const { patch, get } = useHttpMethods();
    const data = ref<Config[]>([]);
    const loading = ref(false);
    const editableConfig = ref<Config>();
    const edit = ref(false);
    onMounted(async () => {
        await refresh();
    });
    const update = (config: Config) => {
        editableConfig.value = config;
        edit.value = true;
    };
    const editConfig = async (config: Config) => {
        edit.value = false;
        try {
            await patch(`/config/${config.id}`, config);
        } catch (error) {}
        await refresh();
    };
    const handleCancel = () => {
        edit.value = false;
    };
    const refresh = async () => {
        loading.value = true;
        try {
            data.value = (await get('/config')).data;
        } catch (error) {}

        loading.value = false;
    };
</script>

<style scoped></style>
