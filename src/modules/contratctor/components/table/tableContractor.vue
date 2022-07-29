<template>
    <div>
        <a-table
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
            }"
            :columns="columns"
            :data-source="data"
            size="small"
            :loading="state.loading"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-popconfirm
                        :title="`Desea eliminar al Cliente ${record.client} ?`"
                        @confirm="onDelete(record.id)"
                    >
                        <a-button type="danger"
                            ><template #icon> <DeleteOutlined /></template
                        ></a-button>
                    </a-popconfirm>
                    <a-button type="primary" @click="handleContractor(record)">
                        <template #icon>
                            <EditOutlined />
                        </template>
                    </a-button>
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
        <a-button
            type="danger"
            :disabled="!hasSelected"
            :loading="state.loading"
            @click="deletecontractor"
        >
            Eliminar
        </a-button>
        <span style="margin-left: 8px">
            <template v-if="hasSelected">
                {{ `Selected ${state.selectedRowKeys.length} items` }}
            </template>
        </span>
    </div>
    <a-button @click="handleContractor">Añadir</a-button>
    <a-modal
        v-model:visible="showModal"
        title="Contractor"
        :footer="null"
        :destroy-on-close="true"
        width="100%"
    >
        <ContractorForm :contractor="contract" @finish="handleFinishModal" />
    </a-modal>
</template>
<script lang="ts" setup>
    import { computed, ref, onMounted, reactive } from 'vue';
    import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
    import Swal from 'sweetalert2';
    import { getContractors, deleteContractors } from '../../services/contractor.service';
    import { Contractor } from '../../types/contractor.types';
    import ContractorForm from '../form/formContract.vue';
    import { deleteMessage } from '@/common/utils/validationMessages';
    // import { useAuthStore } from '@/components/auth/store/auth.store';

    //const store = useAuthStore();

    const selectedRowKeys = ref<Contractor['id'][]>([]);

    let data = ref<Contractor[]>([]);
    let showModal = ref(false);
    const contract = reactive<Contractor>({
        id: -1,
        email: '',
        client: '',
        telf: '',
        addres: '',
        file: '',
        poliza: '',
        isActive: true,
    });
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
            title: 'Telefono',
            dataIndex: 'telf',
        },
        {
            title: 'Direccion',
            dataIndex: 'addres',
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
            title: 'Estado',
            dataIndex: 'state',
        },
        { title: 'Operaciones', dataIndex: 'action' },
    ];

    //const selectedRowKeys = ref<Contractor['id'][]>([]); // Check here to configure the default column

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const deletecontractor = () => {
        state.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
            state.loading = false;
            state.selectedRowKeys = [];
        }, 1000);
    };

    const onSelectChange = (selectedRowKeys: Contractor[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        state.selectedRowKeys = selectedRowKeys;
    };

    const onDelete = async (key: number) => {
        console.log(key);
        try {
            await deleteContractors(key);
        } catch (error) {
            Swal.fire({
                title: 'Inactivo',
                text: deleteMessage('Cliente', 'Viajero'),
                timer: 10000,
            });
        }
        await refresh();
    };

    const handleContractor = (record?: any) => {
        showModal.value = true;
        if (record.id) {
            contract.id = record.id;
            contract.client = record.client;
            contract.email = record.email;
            contract.telf = record.telf;
            contract.poliza = record.poliza;
            contract.addres = record.addres;
            contract.file = record.file;
        }
    };
    const handleFinishModal = async (visible: boolean) => {
        showModal.value = visible;
        await refresh();
    };

    const refresh = async () => {
        state.loading = true;
        try {
            data.value = (await getContractors()).data;
        } catch (error) {}
        state.loading = false;
        contract.id = -1;
        contract.client = '';
        contract.email = '';
        contract.telf = '';
        contract.poliza = '';
        contract.addres = '';
        contract.file = '';
    };
</script>

<style lscoped></style>
