<template>
    <h1>Tabla Ficheros</h1>
    <TableHeaderFiles
        @filter="filter"
        :data="data"
        :columns="columns"
        title="Tabla Ficheros"
    />
    <TableFiles :loading="loading" :data="data" @delete="delet" :columns="columns" />
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import TableHeaderFiles from '../components/tableHeader/tableHeaderFiles.vue';
    import TableFiles from '../components/table/tableFiles.vue';
    import { FileD } from '../type/file.type';
    import { deletFiles, filterFiles, getFiles } from '../services/file.service';
    import manageError from '@/common/composable/manageError';

    const { cantDelete } = manageError();
    const loading = ref(false);
    const data = ref<FileD[]>([]);
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Fecha Importación',
            dataIndex: 'created_at',
        },
        {
            title: 'Operaciones',
            dataIndex: 'actions',
        },
    ];
    onMounted(() => {
        refresh();
    });
    const refresh = async () => {
        await getData();
    };
    const getData = async () => {
        try {
            loading.value = true;
            const files = (await getFiles()).data;

            data.value = files;
        } catch (error) {}
        loading.value = false;
    };
    const filter = async (file: FileD) => {
        try {
            loading.value = true;
            console.log(file);
            data.value = (await filterFiles(file)).data;
        } catch (error) {}
        loading.value = false;
    };
    const delet = async (id: number) => {
        try {
            await deletFiles(id);
            refresh();
        } catch (error) {
            cantDelete();
        }
    };
</script>

<style scoped></style>
