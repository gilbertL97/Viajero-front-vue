<template>
    <div>
        <a-button @click="createContractor">Añadir</a-button>
        <a-table
            :columns="columns"
            :data-source="data"
            size="small"
            :loading="state.loading"
        >
            <template #customFilterIcon>
                <DropdownExport urlExcel="/contractor/excel" title="Cliente" />
            </template>
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-popconfirm
                        :title="`Desea eliminar al Cliente ${record.client} ?`"
                        @confirm="onDelete(record.id)"
                    >
                        <a-tooltip>
                            <template #title>Eliminar</template>

                            <a-button type="danger"
                                ><template #icon> <DeleteOutlined /></template
                            ></a-button>
                        </a-tooltip>
                    </a-popconfirm>
                    <a-tooltip>
                        <template #title>Editar</template>
                        <a-button type="primary" @click="editContractor(record.id)">
                            <template #icon>
                                <EditOutlined />
                            </template>
                        </a-button>
                    </a-tooltip>
                </template>
                <template v-if="column.dataIndex === 'state'">
                    <span>
                        <a-tag :color="record.isActive == false ? 'red' : 'green'">
                            {{ record.isActive == false ? 'Inactivo' : 'Activo' }}
                        </a-tag>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
    <div style="margin-bottom: 16px">
        <!-- <a-button
            type="danger"
            :disabled="!hasSelected"
            :loading="state.loading"
            @click="deletecontractor"
        >
            Eliminar
        </a-button> -->
        <span style="margin-left: 8px">
            <template v-if="hasSelected">
                {{ `Selected ${state.selectedRowKeys.length} items` }}
            </template>
        </span>
    </div>
</template>
<script lang="ts" setup>
    import { computed, ref, onMounted, reactive } from 'vue';
    import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
    import { getContractors, deleteContractors } from '../../services/contractor.service';
    import { Contractor } from '../../types/contractor.types';
    import { useRouter } from 'vue-router';
    import DropdownExport from '@/components/shared/export/dropdownExport.vue';
    import manageError from '@/common/composable/manageError';
    const router = useRouter();
    const { alertUndelete, alertForbidden } = manageError();
    // const selectedRowKeys = ref<Contractor['id'][]>([]);

    let data = ref<Contractor[]>([]);

    // let editable: Contractor = reactive({
    //     name: '',
    //     email: '',
    //     role: '',
    // });

    const state = reactive<{
        selectedRowKeys: Contractor[];
        loading: boolean;
    }>({
        selectedRowKeys: [], // Aqui configurar a columna por default
        loading: false,
    });

    onMounted(async () => {
        await refresh();
    });

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'client',
        },
        {
            title: 'Correo',
            dataIndex: 'email',
        },
        {
            title: 'Poliza',
            dataIndex: 'poliza',
        },
        {
            title: 'No de Analisis',
            dataIndex: 'analysis_number',
        },

        {
            title: 'Estado',
            dataIndex: 'state',
        },
        { title: 'Operaciones', dataIndex: 'action', customFilterDropdown: true },
    ];

    //const selectedRowKeys = ref<Contractor['id'][]>([]); // Check here to configure the default column

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const onDelete = async (key: number) => {
        console.log(key);
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

    const editContractor = (id: number) => {
        router.push('/clients/edit-clients/' + id);
    };
    const createContractor = () => {
        router.push({ name: 'create-clients' });
    };

    const refresh = async () => {
        state.loading = true;
        try {
            data.value = (await getContractors()).data;
            console.log(data.value);

            data.value.sort((a, b) =>
                a.client.toLocaleLowerCase() < b.client.toLocaleLowerCase()
                    ? -1
                    : a.client.toLocaleLowerCase() > b.client.toLocaleLowerCase()
                    ? 1
                    : 0,
            );
        } catch (error) {}
        state.loading = false;
    };
</script>

<style lscoped></style>
