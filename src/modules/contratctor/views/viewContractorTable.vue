<template>
    <div>
        <a-button @click="createContractor">Añadir</a-button>
    </div>
    <TableContractor
        :data="data"
        :loading="loading"
        @delete="onDelete"
        @update="editContractor"
    >
        <DropdownExport
            urlPdf="/contractor/pdf"
            urlExcel="/contractor/excel"
            title="Cliente"
        /> </TableContractor
></template>

<script setup lang="ts">
    import TableContractor from '../components/table/tableContractor.vue';
    import DropdownExport from '@/common/components/export/dropdownExport.vue';
    import { useRouter } from 'vue-router';
    import manageError from '@/common/composable/manageError';

    import { deleteContractors, getContractors } from '../services/contractor.service';
    import { Contractor } from '../types/contractor.types';
    const { alertUndelete, alertForbidden } = manageError();
    const router = useRouter();

    const loading = ref(false);
    const data = ref<Contractor[]>([]);
    onMounted(async () => {
        await refresh();
    });
    const createContractor = () => {
        router.push({ name: 'create-clients' });
    };
    const editContractor = (id: number) => {
        router.push('/clients/edit-clients/' + id);
    };
    const onDelete = async (key: number) => {
        try {
            await deleteContractors(key);
        } catch (error: any) {
            if (error.response.status == 403) {
                alertForbidden();
                router.push({ path: '/' });
            } else alertUndelete('Cliente', 'Viajero');
        }
        await refresh();
    };
    const refresh = async () => {
        loading.value = true;
        try {
            data.value = (await getContractors()).data;
            data.value.sort((a, b) =>
                a.client.toLocaleLowerCase() < b.client.toLocaleLowerCase()
                    ? -1
                    : a.client.toLocaleLowerCase() > b.client.toLocaleLowerCase()
                    ? 1
                    : 0,
            );
        } catch (error) {}
        loading.value = false;
    };
</script>

<style scoped></style>
