<template>
    <div>
        <a-button @click="createPlans">Añadir</a-button>
        <a-table
            :columns="columns"
            :data-source="data"
            size="small"
            :loading="state.loading"
        >
            <template #customFilterIcon>
                <DropdownExport
                    urlExcel="/coverage/excel"
                    title="Coberturas"
                    urlPdf="/coverage/pdf"
                />
            </template>
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-popconfirm
                        :title="`Desea eliminar el plan ${record.name} ?`"
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
                        <a-button type="primary" @click="editPlans(record.id)">
                            <template #icon>
                                <EditOutlined />
                            </template>
                        </a-button>
                    </a-tooltip>
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
        <!-- <a-button
            type="danger"
            :disabled="!hasSelected"
            :loading="state.loading"
            @click="deleteplainor"
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
    import DropdownExport from '@/components/shared/export/dropdownExport.vue';
    import { getPlans, deletePlans } from '../../services/plan.service';
    import { Plans } from '../../types/plains.types';
    import { useRouter } from 'vue-router';
    import manageError from '@/common/composable/manageError';
    const { alertUndelete, alertForbidden } = manageError();
    const router = useRouter();

    //const selectedRowKeys = ref<Plans['id'][]>([]);

    let data = ref<Plans[]>([]);
    const plain = reactive<Plans>({
        id: -1,
        name: '',
        price: 0,
        high_risk: 0,
        daily: false,
        isActive: false,
        config_string: '',
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

        { title: 'Operaciones', dataIndex: 'action', customFilterDropdown: true },
    ];

    //const selectedRowKeys = ref<Plans['id'][]>([]); // Check here to configure the default column

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    // const deleteplainor = () => {
    //     state.loading = true;
    //     // ajax request after empty completing
    //     setTimeout(() => {
    //         state.loading = false;
    //         state.selectedRowKeys = [];
    //     }, 1000);
    // };

    // const onSelectChange = (selectedRowKeys: Plans[]) => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     state.selectedRowKeys = selectedRowKeys;
    // };

    const onDelete = async (key: number) => {
        console.log(key);
        try {
            await deletePlans(key);
            //data.value = data.value.filter((item) => item.id !== key);
        } catch (error: any) {
            if (error.response.status == 403) {
                alertForbidden();
                router.push({ path: '/' });
            } else alertUndelete('Plan', 'Viajero');
        }

        await refresh();
    };
    const createPlans = () => {
        router.push({ name: 'create-plains' });
    };
    const editPlans = (record: number) => {
        router.push('/plains/edit-plains/' + record);
    };

    const refresh = async () => {
        state.loading = true;
        try {
            data.value = (await getPlans()).data;
            data.value.sort((a, b) =>
                a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()
                    ? -1
                    : a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()
                    ? 1
                    : 0,
            );
        } catch (error) {}
        state.loading = false;
        plain.id = -1;
        plain.name = '';
        plain.high_risk = 2;
        plain.daily = false;
        plain.isActive = false;
        plain.config_string = '';
    };
</script>

<style lscoped></style>
