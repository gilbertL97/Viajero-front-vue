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
    import { ColumnType } from 'ant-design-vue/lib/table';
    const { warningRepeatTraveler, errorWrongTraveler } = manageError();
    const contractor = ref();
    const showTable = ref(false);
    const test = ref();
    const data = ref<FileErrorsDto[] | FilterTravelers[]>();
    const columns = ref<TableColumnsType>([
        {
            title: 'Nombre',
            width: 100,
            dataIndex: 'name',
            fixed: 'left',
        },
        { title: 'Sexo', dataIndex: 'sex' },
        { title: 'Pasaporte', dataIndex: 'passport' },
        { title: 'Pais Origen', dataIndex: 'origin_country' },
        { title: 'Nacionalidad', dataIndex: 'nationality' },
        { title: 'Cobertura', width: 140, dataIndex: 'coverage' },
        { title: 'Fecha de fin de Poliza', dataIndex: 'end_date_policy' },
        { title: 'Cant dias Alto Riesgo', dataIndex: 'number_high_risk_days' },
        { title: 'Cant dias Cubiertos', dataIndex: 'number_days' },
        { title: 'Monto de dias Alto Riesgo', dataIndex: 'amount_days_high_risk' },
        { title: 'Monto de dias Cubiertos', dataIndex: 'amount_days_covered' },
        { title: 'Monto Total', dataIndex: 'total_amount' },
    ]);
    const asignContract = (value: any) => {
        contractor.value = value;
        console.log('este es la agencia :' + value);
    };

    const error400 = (dataResp: FileErrorsDto[]) => {
        if (!findRow()) {
            const row: ColumnType<any> = {
                title: 'Fila',
                width: 50,
                dataIndex: 'row',
                fixed: 'right',
                key: 'row',
            };
            columns.value.push(row);
        }

        showTable.value = true;

        data.value = dataResp;
        test.value = 'Se encontraron los siguientes errores';
    };
    const conflict409 = (dataResp: FilterTravelers[]) => {
        showTable.value = true;
        data.value = dataResp;
        test.value = 'Se encontraron ' + dataResp.length + ' viajeros repetidos';
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
    const findRow = () => {
        return columns.value[columns.value.length - 1].key == 'row';
    };
</script>

<style scoped>
    .header-page {
        display: inline-flex;
        padding-bottom: 2rem;
    }
    .table {
        max-height: 10vh;
        padding: 1%;
    }
</style>
