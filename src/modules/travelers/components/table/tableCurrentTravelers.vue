<template>
    <a-table
        :data-source="data"
        :columns="columns"
        size="small"
        :loading="loading"
        :scroll="{ x: 1300, y: 400 }"
        :pagination="pagination"
    >
        <template #customFilterIcon>
            <slot></slot>
        </template>
        <template #bodyCell="{ column, record }">
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
            <template
                v-if="column.dataIndex === 'origin_country' && record.origin_country"
                >{{ record.origin_country.iso }}
            </template>
            <template v-if="column.dataIndex === 'nationality' && record.nationality"
                >{{ record.nationality.iso }}
            </template>
            <template v-if="column.dataIndex === 'start_date'">
                <h4>{{ dayjs(record.start_date).format('DD/MM/YYYY') }}</h4>
            </template>
            <template v-if="column.dataIndex === 'end_date_policy'">
                <h4>{{ dayjs(record.end_date_policy).format('DD/MM/YYYY') }}</h4>
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
    import { TravelerResponse } from '../../types/type.traveler';
    import dayjs from 'dayjs';

    defineProps<{
        data: TravelerResponse[];
        loading: boolean;
        pagination?: boolean;
    }>();
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: 'Pasaporte',
            dataIndex: 'passport',
            width: 100,
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
            title: 'Cobertura',
            dataIndex: 'coverage',
            width: 100,
        },
        {
            title: 'Importe',
            dataIndex: 'total_amount',
            width: 100,
        },
        {
            title: 'Agencia',
            dataIndex: 'contractor',
            width: 100,
            customFilterDropdown: true,
        },
    ];
</script>
