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
    import TableGenericErrorsTravelers from '../components/table/tableErrorFilesTravelers.vue';
    import { FileErrorsDto, FilterTravelers } from '../types/type.traveler';
    import manageError from '@/common/composable/manageError';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const { warningTraveler, errorWrongTraveler, sucessTraveler, genericError } =
        manageError();
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
        { title: 'Duplicado', dataIndex: 'duplicate' },
        { title: 'Sexo', dataIndex: 'sex', width: 80 },
        { title: 'fecha de Nacimiento', dataIndex: 'born_date' },
        { title: 'Pasaporte', dataIndex: 'passport' },
        { title: 'Pais Origen', dataIndex: 'origin_country' },
        { title: 'Nacionalidad', dataIndex: 'nationality' },
        { title: 'Cobertura', dataIndex: 'coverage' },
        { title: 'fecha de Venta', dataIndex: 'sale_date' },
        { title: 'Fecha Inicio', dataIndex: 'start_date' },
        { title: 'Fecha de fin de Poliza', dataIndex: 'end_date_policy' },
        { title: 'Cant dias Alto Riesgo', dataIndex: 'number_high_risk_days' },
        { title: 'Cant dias Cubiertos', dataIndex: 'number_days' },
        { title: 'Importe de dias Alto Riesgo', dataIndex: 'amount_days_high_risk' },
        { title: 'Importe de dias Cubiertos', dataIndex: 'amount_days_covered' },
        { title: 'Importe Total', dataIndex: 'total_amount' },
        { title: 'Fila', width: 80, dataIndex: 'row', fixed: 'right', key: 'row' },
    ]);
    const asignContract = (value: any) => {
        contractor.value = value;
    };

    const error400 = (dataResp: FileErrorsDto[]) => {
        showTable.value = true;

        data.value = dataResp;
        test.value = 'Se encontraron los siguientes errores';
    };
    const warnings = (dataResp: FilterTravelers[]) => {
        showTable.value = true;
        data.value = dataResp;
        test.value = 'Se encontraron ' + dataResp.length + ' filas con errores';
    };
    const ProcessResponse = (response: {
        response: void | FilterTravelers[] | FileErrorsDto[];
        header: number;
    }) => {
        switch (response.header) {
            case 202:
                warnings(response.response as FileErrorsDto[]);
                warningTraveler();
                break;
            case 400:
                error400(response.response as FileErrorsDto[]);
                errorWrongTraveler();
                break;
            case 500:
                genericError();
                break;
            default:
                sucessTraveler();
                router.push({ name: 'travelers' });
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
        max-height: 10vh;
        padding: 1%;
    }
</style>
