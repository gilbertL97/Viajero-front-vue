<template>
    <h1>Tabla Ficheros</h1>
    <TableHeaderFiles
        @filter="filter"
        :data="data"
        :columns="columns"
        title="Tabla Ficheros"
    />
    <TableFiles :loading="loading" :data="data" @delete="delet" :columns="columns">
        <template #export
            ><DropdownExport
                url="/file/excel"
                title="Archivos"
                :filter="file" /></template
    ></TableFiles>
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import DropdownExport from '@/components/shared/export/dropdownExport.vue';
    import TableHeaderFiles from '../components/tableHeader/tableHeaderFiles.vue';
    import TableFiles from '../components/table/tableFiles.vue';
    import { FileD } from '../type/file.type';
    import { deletFiles, filterFiles, getFiles } from '../services/file.service';
    import manageError from '@/common/composable/manageError';

    const { cantDelete } = manageError();
    const loading = ref(false);
    const file = reactive<FileD>({
        start_date_create: undefined,
        end_date_create: undefined,
        contractor: undefined,
    });
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
            title: 'Cliente',
            dataIndex: 'contractor',
            ellipsis: true,
        },
        {
            title: 'Operaciones',
            dataIndex: 'actions',
            customFilterDropdown: true,
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
        asig(file);
        try {
            loading.value = true;
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
    const asig = (file2: FileD) => {
        file.contractor = file2.contractor;
        file.end_date_create = file2.end_date_create;
        file.start_date_create = file2.start_date_create;
    };
</script>

<style scoped></style>
