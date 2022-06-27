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
    import { getPlans, deletePlans } from '../../services/planService';
    import { Plans } from '../../types/typePlains';
    import PlansForm from '../../form/formPlans.vue';

    const selectedRowKeys = ref<Plans['id'][]>([]);

    let data = ref<Plans[]>([]);
    let showModal = ref(false);
    const plain = reactive<Plans>({
        id: -1,
        name: '',
        price: '',
        daily: false,
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
        await deletePlans(key);
        data.value = data.value.filter((item) => item.id !== key);
    };

    const handlePlans = (record?: any) => {
        showModal.value = true;
        plain.id = record.id;
        plain.name = record.name;
        plain.price = record.price;
        plain.daily = record.daily;
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
