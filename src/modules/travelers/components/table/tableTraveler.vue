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
                        :title="`Desea eliminar al Usuario ${record.name} ?`"
                        @confirm="onDelete(record.id)"
                    >
                        <a-button type="danger">
                            <template #icon><DeleteOutlined /></template>
                        </a-button>
                    </a-popconfirm>
                    <a-button type="primary" @click="handleTraveler(record)">
                        <template #icon>
                            <EditOutlined />
                        </template>
                    </a-button>
                    <a-button id="button" @click="handleTravelerCreate(record)"
                        ><template #icon><EyeOutlined /></template>
                    </a-button>
                </template>
                <template v-if="column.dataIndex === 'state'">
                    <span>
                        <a-tag :color="record.state == false ? 'red' : 'green'">
                            {{ record.state == false ? 'vencida' : 'vigente' }}
                        </a-tag>
                    </span>
                </template>
                <template v-if="column.dataIndex === 'coverage'"
                    >{{ record.coverage.name }}
                </template>
                <template v-if="column.dataIndex === 'contractor'"
                    >{{ record.contractor.client }}
                </template>
            </template>
        </a-table>
    </div>
    <div style="margin-bottom: 16px">
        <a-button
            type="danger"
            :disabled="!hasSelected"
            :loading="state.loading"
            @click="deleteusers"
        >
            Eliminar
        </a-button>
        <span style="margin-left: 8px">
            <template v-if="hasSelected">
                {{ `Selected ${state.selectedRowKeys.length} items` }}
            </template>
        </span>
    </div>
    <a-button @click="handleTraveler">Añadir</a-button>
</template>
<script lang="ts" setup>
    import { computed, ref, onMounted, reactive } from 'vue';
    import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons-vue';
    import { TravelerResponse } from '../../types/type.traveler';
    import { getTravelers } from '../../services/traveler.service';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const selectedRowKeys = ref<TravelerResponse['id'][]>([]);

    let data = ref<TravelerResponse[]>([]);
    //const traveler = reactive<Traveler>({});
    // let editable: Traveler = reactive({
    //     name: '',
    //     email: '',
    //     role: '',
    // });

    const state = reactive<{
        selectedRowKeys: TravelerResponse[];
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
            title: 'Pasaporte',
            dataIndex: 'passport',
        },
        {
            title: 'Agencia',
            dataIndex: 'contractor',
        },

        {
            title: 'Cobertura',
            dataIndex: 'coverage',
        },
        {
            title: 'Estado',
            dataIndex: 'state',
        },

        { title: 'Operaciones', dataIndex: 'action' },
    ];

    //const selectedRowKeys = ref<Traveler['id'][]>([]); // Check here to configure the default column

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const deleteusers = () => {
        state.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
            state.loading = false;
            state.selectedRowKeys = [];
        }, 1000);
    };

    const onSelectChange = (selectedRowKeys: TravelerResponse[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        state.selectedRowKeys = selectedRowKeys;
    };

    const onDelete = async (key: number) => {
        console.log(key);
        //  await deleteTravelers(key);
        data.value = data.value.filter((item) => item.id !== key);
    };
    const handleTraveler = (record?: any) => {
        console.log(record);
        router.push('/travelers/edit-travelers/' + record.id);
    };
    const handleTravelerCreate = (record?: any) => {
        console.log(record);
        router.push('/travelers/create-travelers');
    };
    const refresh = async () => {
        state.loading = true;
        try {
            data.value = (await getTravelers()).data;
        } catch (error) {}
        state.loading = false;
    };
</script>
<style lscoped>
    #button {
        background-color: #2dc13dcf;
        color: whites !important;
    }
</style>
