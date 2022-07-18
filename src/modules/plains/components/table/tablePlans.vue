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
                        :title="`Desea eliminar el plan ${record.name} ?`"
                        @confirm="onDelete(record.id)"
                    >
                        <a-button type="danger"
                            ><template #icon> <DeleteOutlined /></template
                        ></a-button>
                    </a-popconfirm>
                    <a-button type="primary" @click="handlePlans(record)">
                        <template #icon>
                            <EditOutlined />
                        </template>
                    </a-button>
                </template>
                <template v-if="column.dataIndex === 'daily'">
                    <h4 v-if="record.daily">Si</h4>
                    <h4 v-else>No</h4>
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
            @click="deleteplainor"
        >
            Eliminar
        </a-button>
        <span style="margin-left: 8px">
            <template v-if="hasSelected">
                {{ `Selected ${state.selectedRowKeys.length} items` }}
            </template>
        </span>
    </div>
    <a-button @click="handlePlans">Añadir</a-button>
    <a-modal
        v-model:visible="showModal"
        title="Plans"
        :footer="null"
        :destroy-on-close="true"
    >
        <PlansForm :plain="plain" @finish="handleFinishModal" />
    </a-modal>
</template>
<script lang="ts" setup>
    import { computed, ref, onMounted, reactive } from 'vue';
    import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
    import { getPlans, deletePlans } from '../../services/plan.service';
    import Swal from 'sweetalert2';
    import { Plans } from '../../types/plains.types';
    import PlansForm from '../form/formPlans.vue';
    import { deleteMessage } from '@/common/utils/validationMessages';

    const selectedRowKeys = ref<Plans['id'][]>([]);

    let data = ref<Plans[]>([]);
    let showModal = ref(false);
    const plain = reactive<Plans>({
        id: -1,
        name: '',
        price: '',
        daily: false,
        isActive: false,
    });
    // let editable: Plans= reactive({
    //     name: '',
    //     email: '',
    //     role: '',
    // });

    const state = reactive<{
        selectedRowKeys: Plans[];
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
            dataIndex: 'name',
        },
        {
            title: 'Precio',
            dataIndex: 'price',
        },
        {
            title: 'diario',
            dataIndex: 'daily',
        },
        {
            title: 'Estado',
            dataIndex: 'state',
        },

        { title: 'Operaciones', dataIndex: 'action' },
    ];

    //const selectedRowKeys = ref<Plans['id'][]>([]); // Check here to configure the default column

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const deleteplainor = () => {
        state.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
            state.loading = false;
            state.selectedRowKeys = [];
        }, 1000);
    };

    const onSelectChange = (selectedRowKeys: Plans[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        state.selectedRowKeys = selectedRowKeys;
    };

    const onDelete = async (key: number) => {
        console.log(key);
        try {
            await deletePlans(key);
            data.value = data.value.filter((item) => item.id !== key);
        } catch (error) {
            await refresh();
            Swal.fire({
                title: 'Inactivo',
                text: deleteMessage('Plan', 'Viajero'),
                timer: 10000,
            });
        }
    };

    const handlePlans = (record?: any) => {
        showModal.value = true;
        if (record.id) {
            console.log(record);
            plain.id = record.id;
            plain.name = record.name;
            plain.price = record.price;
            plain.daily = record.daily;
            plain.isActive = record.isActive;
        }
    };
    const handleFinishModal = async (visible: boolean) => {
        showModal.value = visible;
        await refresh();
    };

    const refresh = async () => {
        state.loading = true;
        try {
            data.value = (await getPlans()).data;
        } catch (error) {}
        state.loading = false;
    };
</script>

<style lscoped></style>
