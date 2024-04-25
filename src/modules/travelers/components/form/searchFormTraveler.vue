<template>
    <a-form-item has-feedback :name="['name']" label="Nombre y Apellidos">
        <a-input v-model:value="search.name" />
    </a-form-item>
    <a-form-item has-feedback :name="['passport']" label="Pasaporte">
        <a-input v-model:value="search.passport" />
    </a-form-item>
    <a-form-item :name="['origin_country']" label="Pais Origen">
        <DropCountries :data="countries" @selected="asignOriginCountry" />
    </a-form-item>

    <a-form-item :name="['nationality']" label="Nacionalidad">
        <DropCountries :data="countries" @selected="asignNationality" />
    </a-form-item>
    <a-form-item :name="['coverage']" label="Tipo de Cobertura">
        <DropdownPlans :data="planss" @selected="asignPlans" :active-select="true" />
    </a-form-item>
    <a-form-item :name="['start_date']" label="Fecha de Inicio de Viaje">
        <a-range-picker
            v-model:value="range_start"
            format="DD/MM/YYYY"
            valueFormat="YYYY-MM-DD"
        />
        <!-- <a-date-picker
            
            v-model:value="search.start_date"
            value-format="YYYY-MM-DD"

        />!-->
    </a-form-item>
    <a-form-item :name="['end_date_policy']" label="Fecha de Fin de Poliza">
        <a-range-picker
            v-model:value="range_end"
            format="DD/MM/YYYY"
            valueFormat="YYYY-MM-DD"
        />
    </a-form-item>
    <a-form-item :name="['effective_date']" label="Vigente">
        <a-date-picker
            v-model:value="search.effective_date"
            format="DD/MM/YYYY"
            valueFormat="YYYY-MM-DD"
                    />
    </a-form-item>
    <a-form-item :name="['contractor']" label="Agencia">
        <DropdownContrac :data="contractors" @selected="asignContract" :active-select="true" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 13 }">
        <a-button type="primary" @click="searchTraveler">Aceptar</a-button>
        <a-divider type="vertical" />
        <a-button @click="handleCancel"> Cancelar </a-button>
    </a-form-item>
</template>
<script lang="ts" setup>
    import { inject } from 'vue';
    //import dayjs, { Dayjs } from 'dayjs';
    import { FilterTravelers } from '../../types/type.traveler';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import DropCountries from '@/modules/country/components/dropdown/dropCountries.vue';
    import DropdownPlans from '@/modules/plains/components/dropdowns/selectPlans.vue';
    import { Contractor } from '@/modules/contratctor/types/contractor.types';
    import { Country } from '@/modules/country/types/country.type';
    import { Plans } from '@/modules/plains/types/plains.types';
    const range_start = ref<Date[]>([]);
    const range_end = ref<Date[]>([]);
    const current: boolean | undefined = inject('current');
    const search: FilterTravelers = reactive({
        name: undefined,
        sex: undefined,
        passport: undefined,
        start_date_init: undefined,
        start_date_end: undefined,
        end_date_policy_init: undefined,
        end_date_policy_end: undefined,
        number_high_risk_days: undefined,
        contractor: undefined,
        origin_country: undefined,
        nationality: undefined,
        coverage: undefined,
        effective_date: undefined,
    });
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 22 },
    };
    const props = defineProps<{
        contractors: Contractor[];
        countries: Country[];
        planss: Plans[];
    }>();
    onMounted(() => { 
       current && (search.effective_date = new Date().toISOString());
    });

    /* const disabledDateInit = (current: Dayjs) => {
        // Debe seleccionar un dia mayor q la fecah fin
        return current > dayjs(search.end_date_policy).endOf('day');
    };*/
    /* const disabledDateEnd = (current: Dayjs) => {
        // Debe seleccionar mayor q la fecha inicio

        return current < dayjs(search.start_date).endOf('day');
    };*/

    const handleCancel = () => {
        emit('visible', false);
    };
    const asignContract = (value: number | number[] | undefined) => {
        search.contractor = value !== undefined ? (value as number) : undefined;
    };
    const asignPlans = (value: number) => {
        search.coverage = value !== undefined ? (value as number) : undefined;
    };
    const asignOriginCountry = (value: string) => {
        search.origin_country = value;
    };
    const asignNationality = (value: string) => {
        search.nationality = value;
    };
    const emit = defineEmits<{
        (e: 'filter', travelers: FilterTravelers): void;
        (e: 'visible', isopen: boolean): void;
    }>();
    const searchTraveler = () => {
        emit('filter', search);
        emit('visible', false);
    };
    watch([range_end, range_start], () => {
        if (range_start.value) {
            search.start_date_init = range_start.value[0];
            search.start_date_end = range_start.value[1];
        }
        if (range_end.value) {
            search.end_date_policy_init = range_end.value[0];
            search.end_date_policy_end = range_end.value[1];
        }
        //console.log(range_start.value[0], range_start.value[1]);
    });
</script>
<style scoped></style>
