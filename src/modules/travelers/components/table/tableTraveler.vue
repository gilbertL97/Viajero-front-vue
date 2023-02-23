<template>
    <a-table
        :data-source="data"
        :columns="columns"
        size="small"
        :loading="state.loading"
        :scroll="{ y: 300 }"
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
                <a-button type="primary" @click="editTraveler(record)">
                    <template #icon>
                        <EditOutlined />
                    </template>
                </a-button>
                <a-button id="button" @click="printPdf(record)"
                    ><template #icon><PrinterOutlined /></template>
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
    <div style="margin-bottom: 16px">
        <span style="margin-left: 8px">
            <template v-if="hasSelected">
                {{ `Selected ${state.selectedRowKeys.length} items` }}
            </template>
        </span>
    </div>
</template>
<script lang="ts" setup>
    import { computed, ref, onMounted, reactive } from 'vue';
    import { DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons-vue';
    import { TravelerResponse, FilterTravelers } from '../../types/type.traveler';
    import {
        deleteTravelers,
        getCertTravelers,
        getFilterTravelers,
        getTravelers,
    } from '../../services/traveler.service';
    import { useRouter } from 'vue-router';
    import { Plans } from '@/modules/plains/types/plains.types';
    import { getPlans } from '@/modules/plains/services/plan.service';
    import { usePlainStore } from '@/modules/plains/store/plans.store';
    //import dayjs from 'dayjs';
    const store = usePlainStore();

    const router = useRouter();
    const data = ref<TravelerResponse[]>([]);
    const plains = ref<Plans[]>([]);

    const state = reactive<{
        selectedRowKeys: TravelerResponse[];
        loading: boolean;
    }>({
        selectedRowKeys: [], // Aqui configurar a columna por default
        loading: false,
    });

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            sorter: (a: string, b: string) => {
                (a.name.toLowerCase() > b.nametoLowerCase()) -
                    (a.nametoLowerCase() < b.nametoLowerCase());
            },
        },

        {
            title: 'Pasaporte',
            dataIndex: 'passport',
        },
        {
            title: 'Fecha Inicio',
            dataIndex: 'start_date',
        },
        {
            title: 'Fecha Fin',
            dataIndex: 'end_date_policy',
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

        { title: 'Operaciones', dataIndex: 'action', width: 150 },
    ]; /*.filter((col) => {
        if (props.isRepeat) return col.isRepeat != false;
    });*/

    //const selectedRowKeys = ref<Traveler['id'][]>([]); // Check here to configure the default column

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    onMounted(async () => {
        await refresh();
    });

    const onDelete = async (key: string) => {
        console.log(key);
        await deleteTravelers(key).finally(refresh);
    };

    const editTraveler = (record?: any) => {
        console.log(record);
        router.push('/travelers/edit-travelers/' + record.id);
    };

    const printPdf = async (record: any) => {
        console.log(record.id);
        await getCertTravelers(record.id).then((response) => {
            if (response.status == 200) {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                window.open(URL.createObjectURL(blob), '_blank')?.print();
            }
        });
    };
    const refresh = async () => {
        state.loading = true;
        try {
            data.value = (await getTravelers()).data;
            plains.value = (await getPlans()).data;
            store.setPlans(plains.value);
        } catch (error) {}
        state.loading = false;
    };

    const filter = async (search: FilterTravelers) => {
        try {
            data.value = (await getFilterTravelers(search)).data;
        } catch (error) {}
    };
    /*const customRow = (record: TravelerResponse) => {
        return {
            onClick: () => {
                router.push('/travelers/view-travelers/' + record.id);
            },
        };
    };*/
    defineExpose({ filter, refresh });
</script>
<style lscoped>
    #button {
        background-color: #2dc13dcf;
        color: whites !important;
    }
</style>
