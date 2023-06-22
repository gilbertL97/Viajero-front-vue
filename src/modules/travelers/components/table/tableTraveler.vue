<template>
    <a-table
        :data-source="props.data"
        :columns="columns"
        size="small"
        :loading="props.loading"
        :scroll="{ y: 400, x: 1200 }"
    >
        <template #customFilterIcon>
            <slot></slot>
        </template>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'action' && acces('edit-travelers')">
                <a-popconfirm
                    :title="`Desea eliminar al Usuario ${record.name} ?`"
                    @confirm="onDelete(record.id)"
                >
                    <a-tooltip>
                        <template #title>Eliminar</template>
                        <a-button type="danger">
                            <template #icon><DeleteOutlined /></template>
                        </a-button>
                    </a-tooltip>
                </a-popconfirm>
                <a-tooltip>
                    <template #title>Editar</template>
                    <a-button type="primary" @click="editTraveler(record)">
                        <template #icon>
                            <EditOutlined />
                        </template>
                    </a-button>
                </a-tooltip>
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
            <template v-if="column.dataIndex === 'sale_date' && record.sale_date">
                <h4>{{ dayjs(record.sale_date).format('DD/MM/YYYY') }}</h4>
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
    //import { computed, ref, onMounted, reactive } from 'vue';
    import { useAuthStore } from '@/modules/auth/store/auth.store';
    import { DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons-vue';
    import dayjs from 'dayjs';
    import { TravelerResponse } from '../../types/type.traveler';
    const store = useAuthStore();
    const props = defineProps<{
        data: TravelerResponse[];
        loading: boolean;
    }>();

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
            title: 'Cantidad Alto Riesgo',
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
            title: 'Monto Alto Riesgo',
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
            width: 75,
        },
        {
            title: 'Agencia',
            dataIndex: 'contractor',
            width: 200,
        },
        {
            title: 'Cobertura',
            dataIndex: 'coverage',
            width: 150,
        },
        {
            title: 'Importe',
            dataIndex: 'total_amount',
            width: 75,
        },

        {
            title: 'Operaciones',
            dataIndex: 'action',
            width: 150,
            fixed: 'right',
            customFilterDropdown: true,
        },
    ];

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const onDelete = (key: string) => {
        emit('deleted', key);
    };

    const editTraveler = (record?: any) => {
        emit('update', record.id);
    };

    const printPdf = (record: any) => {
        emit('print', record.id);
    };
    const emit = defineEmits<{
        (e: 'deleted', deleted: string): void;
        (e: 'update', updated: string): void;
        (e: 'print', printed: string): void;
    }>();
    const acces = (view: string) => {
        return store.canAccess(view);
    };
</script>
<style lscoped>
    #button {
        background-color: #2dc13dcf;
        color: whites !important;
    }
</style>
