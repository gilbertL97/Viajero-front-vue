<template>
    <a-table
        :data-source="data"
        :columns="columns"
        size="small"
        :loading="state.loading"
        :scroll="{ y: 400, x: 800 }"
    >
        <template #customFilterDropdown>
            <DropdownExport url="/travler/excel" title="Archivos" :filter="undefined" />
        </template>
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
            <template v-if="column.dataIndex === 'start_date'">
                <h4>{{ dayjs(record.start_date).format('DD/MM/YYYY') }}</h4>
            </template>
            <template v-if="column.dataIndex === 'end_date_policy'">
                <h4>{{ dayjs(record.end_date_policy).format('DD/MM/YYYY') }}</h4>
            </template>
            <template
                v-if="column.dataIndex === 'origin_country' && record.origin_country"
                >{{ record.origin_country.iso }}
            </template>
            <template v-if="column.dataIndex === 'nationality' && record.nationality"
                >{{ record.nationality.iso }}
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
    import dayjs from 'dayjs';
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
    import DropdownExport from '@/components/shared/export/dropdownExport.vue';

    //import dayjs from 'dayjs';
    const props = defineProps<{
        data?: TravelerResponse[];
        loading?: boolean;
    }>();

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
            width: 150,
            fixed: 'left',
        },
        {
            title: 'Pasaporte',
            dataIndex: 'passport',
            width: 150,
            fixed: 'left',
        },
        {
            title: 'Sexo',
            dataIndex: 'sex',
            width: 50,
        },
        {
            title: 'Fecha de Nacimiento',
            dataIndex: 'born_date',
            width: 100,
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            width: 100,
        },
        {
            title: 'Fecha de Venta',
            dataIndex: 'sale_date',
            width: 100,
        },

        {
            title: 'Cantidad de dias Alto Riesgo',
            dataIndex: 'number_high_risk_days',
            width: 100,
        },
        {
            title: 'Pais Origen',
            dataIndex: 'origin_country',
            width: 100,
        },
        {
            title: 'Nacionalidad',
            dataIndex: 'nationality',
            width: 100,
        },

        {
            title: 'Cantidad de Dias',
            dataIndex: 'number_days',
            width: 100,
        },

        {
            title: 'Monto Dias Alto Riesgo',
            dataIndex: 'amount_days_high_risk',
            width: 100,
        },
        {
            title: 'Monto Dias Cubiertos',
            dataIndex: 'amount_days_covered',
            width: 100,
        },
        {
            title: 'Fecha Inicio',
            dataIndex: 'start_date',
            width: 100,
        },
        {
            title: 'Fecha Fin',
            dataIndex: 'end_date_policy',
            width: 100,
        },

        {
            title: 'Estado',
            dataIndex: 'state',
            width: 100,
        },
        {
            title: 'Agencia',
            dataIndex: 'contractor',
            width: 100,
        },
        {
            title: 'Cobertura',
            dataIndex: 'coverage',
            width: 100,
            fixed: 'right',
        },
        {
            title: 'Importe',
            dataIndex: 'total_amount',
            width: 100,
            fixed: 'right',
        },

        {
            title: 'Operaciones',
            dataIndex: 'action',
            width: 150,
            fixed: 'right',
            customFilterDropdown: true,
        },
    ]; /*.filter((col) => {
        if (props.isRepeat) return col.isRepeat != false;
    });*/

    //const selectedRowKeys = ref<Traveler['id'][]>([]); // Check here to configure the default column

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    onMounted(async () => {
        if (props.data?.length) data.value = props.data;
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
    defineExpose({ filter, refresh });
</script>
<style lscoped>
    #button {
        background-color: #2dc13dcf;
        color: whites !important;
    }
</style>
