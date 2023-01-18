<template>
    <h2>Subir Archivos Excel o CSV</h2>
    <div class="header-page">
        <h4> Seleccione la Agencia :</h4>
        <DropdownContrac @selected="asignContract" :active-select="true" />
    </div>
    <div>
        <UploadFiles :contractor="contractor" @response="ProcessResponse" />
    </div>
    <h1>{{ test }}</h1>
    <div class="table" v-if="showTable">
        <TableGenericErrorsTravelers :columns="columns" :data="data" />
    </div>
</template>

<script setup lang="ts">
    import type { TableColumnsType } from 'ant-design-vue';
    import UploadFiles from '@/modules/travelers/components/uploadFiles/uploadFiles.vue';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import { ref } from 'vue';
    import TableGenericErrorsTravelers from '../components/table/tableRepeatTravelers.vue';
    import { FileErrorsDto, FilterTravelers } from '../types/type.traveler';
    import manageError from '@/common/composable/manageError';
    const { warningRepeatTraveler, errorWrongTraveler } = manageError();
    const contractor = ref();
    const showTable = ref(false);
    const test = ref();
    const data = ref<FileErrorsDto[] | FilterTravelers[]>();
    const columns = ref<TableColumnsType>([]);
    const asignContract = (value: any) => {
        contractor.value = value;
        console.log('este es la agencia :' + value);
    };

    const error400 = (dataResp: FileErrorsDto[]) => {
        const row: TableColumnsType = [
            {
                title: 'Nombre',
                width: 100,
                dataIndex: 'name',
                fixed: 'left',
            },
            { title: 'Sexo', width: 100, dataIndex: ['property', 'sex'] },
            { title: 'Pasaporte', dataIndex: ['property', 'passport'] },
            { title: 'Fecha de Venta', dataIndex: ['property', 'sale_date'] },
            { title: 'Pais Origen', dataIndex: ['property', 'origin_country'] },
            { title: 'Nacionalidad', dataIndex: ['property', 'nationality'] },
            { title: 'Covertura', dataIndex: ['property', 'coverage'] },
            {
                title: 'Fecha de fin de Poliza',
                dataIndex: ['property', 'end_date_policy'],
            },
            {
                title: 'Cant dias Alto Riesgo',
                dataIndex: ['property', 'number_high_risk_days'],
            },
            { title: 'Cant dias Cubiertos', dataIndex: ['property', 'number_days'] },
            {
                title: 'Monto de dias Alto Riesgo',
                dataIndex: ['property', 'amount_days_high_risk'],
            },
            {
                title: 'Monto de dias Cubiertos',
                dataIndex: ['property', 'amount_days_covered'],
            },
            { title: 'Monto Total', dataIndex: ['property', 'total_amount'] },
        ];
        showTable.value = true;
        columns.value = row;
        data.value = dataResp;
        test.value = 'Se encontraron los siguientes errores';
    };
    const conflict409 = (dataResp: FilterTravelers[]) => {
        const row: TableColumnsType = [
            {
                title: 'Nombre',
                width: 100,
                dataIndex: 'name',
                fixed: 'left',
            },
            { title: 'Sexo', width: 100, dataIndex: 'sex' },
            { title: 'Pasaporte', dataIndex: 'passport' },
            { title: 'Pais Origen', dataIndex: 'origin_country' },
            { title: 'Nacionalidad', dataIndex: 'nationality' },
            { title: 'Covertura', dataIndex: 'coverage' },
            { title: 'Fecha de fin de Poliza', dataIndex: 'end_date_policy' },
            { title: 'Cant dias Alto Riesgo', dataIndex: 'number_high_risk_days' },
            { title: 'Cant dias Cubiertos', dataIndex: 'number_days' },
            { title: 'Monto de dias Alto Riesgo', dataIndex: 'amount_days_high_risk' },
            { title: 'Monto de dias Cubiertos', dataIndex: 'amount_days_covered' },
            { title: 'Monto Total', dataIndex: 'total_amount' },
        ];
        showTable.value = true;
        columns.value = row;
        data.value = dataResp;
        test.value = 'Se encontraron los siguientes viajeros repetidos';
    };
    const ProcessResponse = (response: {
        response: void | FilterTravelers[] | FileErrorsDto[];
        header: number;
    }) => {
        switch (response.header) {
            case 409:
                conflict409(response.response as FilterTravelers[]);
                warningRepeatTraveler();
                break;
            case 400:
                error400(response.response as FileErrorsDto[]);
                errorWrongTraveler();
                break;
            default:
                break;
        }
    };
</script>

<style scoped>
    .header-page {
        display: inline-flex;
        padding-bottom: 2rem;
    }
    .table {
        padding: 1%;
    }
</style>
