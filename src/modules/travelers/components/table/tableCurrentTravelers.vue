<template>
    <a-table
        :data-source="data"
        :columns="columns"
        size="small"
        :loading="loading"
        :scroll="{ y: 500, x: 500 }"
    >
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'state'">
                <span>
                    <a-tag :color="record.state == false ? 'red' : 'green'">
                        {{ record.state == false ? 'vencida' : 'vigente' }}
                    </a-tag>
                </span>
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
    import { TravelerResponse } from '../../types/type.traveler';

    defineProps<{
        data: TravelerResponse;
        loading: boolean;
    }>();
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Sex',
            dataIndex: 'sex',
        },
        {
            title: 'Fecha de Nacimiento',
            dataIndex: 'born_date',
        },
        {
            title: 'Correo',
            dataIndex: 'email',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Fecha de Venta',
            dataIndex: 'sale_date',
        },

        {
            title: 'Cantidad de dias Alto Riesgo',
            dataIndex: ' number_high_risk_days',
        },
        {
            title: 'Pais Origen',
            dataIndex: 'origin_country',
        },
        {
            title: 'Nacionalidad',
            dataIndex: 'nationality',
        },

        {
            title: 'Cantidad de Dias',
            dataIndex: ' number_days',
        },

        {
            title: 'Monto Dias Alto Riesgo',
            dataIndex: ' amount_days_high_risk',
        },
        {
            title: 'Monto Dias Cubiertos',
            dataIndex: 'amount_days_covered',
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
        {
            title: 'Importe',
            dataIndex: 'total_amount',
        },

        { title: 'Operaciones', dataIndex: 'action', width: 150 },
    ];
</script>
