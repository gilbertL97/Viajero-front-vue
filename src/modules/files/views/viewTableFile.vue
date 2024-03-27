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
                :filter="filterFiler" /></template
    ></TableFiles>
    <PaginationTable :total="totalFiles" @page="paginate" />
    <a-modal
        v-model:open="visible"
        title="EL archivo contiene Viajeros. Desea Eliminar?"
        :destroyOnClose="true"
        width="50%"
        @ok="delet"
    >
        <TableTravelers :loading="loading" :data="travlers" :is-only-read="true"
    /></a-modal>
</template>

<script setup lang="ts">
    import DropdownExport from '@/common/components/export/dropdownExport.vue';
    import TableHeaderFiles from '../components/tableHeader/tableHeaderFiles.vue';
    import TableFiles from '../components/table/tableFiles.vue';
    import { FileD, FilterFileD } from '../type/file.type';
    import {
        deletFiles,
        filterFilesPagination,
    } from '@/modules/files/services/file.service';
    import manageError from '@/common/composable/manageError';
    import { useRouter } from 'vue-router';
    import { getTravelersByFile } from '@/modules/travelers/services/traveler.service';
    import { TravelerResponse } from '@/modules/travelers/types/type.traveler';
    import TableTravelers from '@/modules/travelers/components/table/tableTraveler.vue';
    import PaginationTable from '@/common/components/pagination/paginationTable.vue';
    import { PaginationDto } from '@/common/types/pagination.type';
    import useFileFilter from '../composable/useFileFilter';
    const route = useRouter();
    const { cantDelete } = manageError();
    const { filterFiler } = useFileFilter();
    const loading = ref(false);
    const idDelet = ref(0);
    const visible = ref(false);
    const travlers = ref<TravelerResponse[]>([]);
    const totalFiles = ref(0);
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
    const getData = async (pag?: PaginationDto, file?: FilterFileD) => {
        try {
            loading.value = true;
            const { data: files, total } = (await filterFilesPagination(file, pag)).data;
            data.value = files;
            totalFiles.value = total;
        } catch (error) {}
        loading.value = false;
    };
    const filter = async (file: FilterFileD) => {
        await getData(undefined, file);
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
        route.push('/travelers/' + id);
    };
    const viewTravelerModal = async (id: number) => {
        try {
            travlers.value = (await getTravelersByFile(id)).data;
        } catch (error) {}
    };
    const paginate = async (page: PaginationDto) => {
        await getData(page, filterFiler);
    };
</script>

<style scoped></style>
