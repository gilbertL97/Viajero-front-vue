<template>
    <h1>Tabla Ficheros</h1>
    <TableHeaderFiles
        @filter="filter"
        :data="data"
        :columns="columns"
        title="Tabla Ficheros"
    />
    <TableFiles
        :loading="loading"
        :data="data"
        @delete="manageDelet"
        :columns="columns"
        @get-travelers="viewTraveler"
    >
        <template #export
            ><DropdownExport
                urlExcel="/file/excel"
                urlPdf="/file/pdf"
                title="Archivos"
                :filter="file" /></template
    ></TableFiles>
    <a-modal
        v-model:visible="visible"
        title="EL archivo contiene Viajeros. Desea Eliminar?"
        :destroyOnClose="true"
        width="50%"
        @ok="delet"
    >
        <TableCurrentTravelers :loading="loading" :data="travlers"
    /></a-modal>
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import DropdownExport from '@/common/components/export/dropdownExport.vue';
    import TableHeaderFiles from '../components/tableHeader/tableHeaderFiles.vue';
    import TableFiles from '../components/table/tableFiles.vue';
    import { FileD } from '../type/file.type';
    import {
        deletFiles,
        filterFiles,
        getFiles,
    } from '@/modules/files/services/file.service';
    import manageError from '@/common/composable/manageError';
    import { useRouter } from 'vue-router';
    import { getTravelersByFile } from '@/modules/travelers/services/traveler.service';
    import { TravelerResponse } from '@/modules/travelers/types/type.traveler';
    import TableCurrentTravelers from '@/modules/travelers/components/table/tableCurrentTravelers.vue';
    const route = useRouter();
    const { cantDelete } = manageError();
    const loading = ref(false);
    const idDelet = ref(0);
    const visible = ref(false);
    const travlers = ref<TravelerResponse[]>([]);
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
        },
        {
            title: 'Usuario',
            dataIndex: 'user',
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
    const delet = async () => {
        try {
            await deletFiles(idDelet.value);
            refresh();
        } catch (error) {
            cantDelete();
        }
        visible.value = false;
    };
    const manageDelet = async (id: number) => {
        idDelet.value = id;
        await viewTravelerModal(id);
        if (data.value.length > 0) visible.value = true;
    };
    const viewTraveler = (id: number) => {
        console.log(id);
        route.push('/travelers/' + id);
    };
    const viewTravelerModal = async (id: number) => {
        try {
            travlers.value = (await getTravelersByFile(id)).data;
            console.log(data.value);
        } catch (error) {}
    };
    const asig = (file2: FileD) => {
        file.contractor = file2.contractor;
        file.end_date_create = file2.end_date_create;
        file.start_date_create = file2.start_date_create;
    };
</script>

<style scoped></style>
