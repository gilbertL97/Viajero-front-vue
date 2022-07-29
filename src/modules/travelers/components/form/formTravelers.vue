<template>
    <a-form
        :model="formState"
        v-bind="layout"
        :validate-messages="validateMessages"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
        <a-form-item
            has-feedback
            :name="['traveler', 'name']"
            label="Nombre y Apellidos"
            :rules="[{ required: true }]"
        >
            <a-input v-model:value="formState.traveler.name" />
        </a-form-item>
        <a-form-item
            :name="['traveler', 'email']"
            label="Email"
            :rules="[{ type: 'email' }]"
        >
            <a-input v-model:value="formState.traveler.email" />
        </a-form-item>
        <a-form-item label="Sexo">
            <a-radio-group v-model:value="formState.traveler.sex">
                <a-radio value="F">Masculino</a-radio>
                <a-radio value="M">Femenino</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item
            has-feedback
            :name="['traveler', 'passport']"
            label="Pasaporte"
            :rules="[{ required: true }]"
        >
            <a-input v-model:value="formState.traveler.passport" />
        </a-form-item>
        <a-form-item :name="['traveler', 'sale_date']" label="Fecha de Venta">
            <a-date-picker
                v-model:value="formState.traveler.sale_date"
                value-format="YYYY-MM-DD"
            />
        </a-form-item>
        <a-form-item
            :name="['traveler', 'contractor']"
            label="Agencia"
            :rules="[{ required: true }]"
        >
            <DropdownContrac
                :contractorId="formState.traveler.contractor"
                v-model="formState.traveler.contractor"
                @selected="asignContract"
            />
        </a-form-item>

        <a-form-item
            :name="['traveler', 'start_date']"
            label="Fecha de Inicio de Viaje"
            :rules="[{ required: true }]"
        >
            <a-date-picker
                v-model:value="formState.traveler.start_date"
                value-format="YYYY-MM-DD"
            />
        </a-form-item>
        <a-form-item
            :name="['traveler', 'end_date_policy']"
            label="Fecha de Fin de Poliza"
            :rules="[{ required: true }]"
        >
            <a-date-picker
                v-model:value="formState.traveler.end_date_policy"
                value-format="YYYY-MM-DD"
                :rules="[{ required: true }]"
            />
        </a-form-item>
        <a-form-item
            :name="['traveler', 'coverage']"
            label="Tipo de Cobertura"
            :rules="[{ required: true }]"
        >
            <DropdownPlans
                :plainId="formState.traveler.coverage"
                v-model="formState.traveler.coverage"
            />
        </a-form-item>
        <a-form-item :name="['traveler', 'nationality']" label="Nacionalidad">
            <DropCountries
                :iso="formState.traveler.nationality"
                v-model="formState.traveler.nationality"
            />
        </a-form-item>
        <a-form-item :name="['traveler', 'origin_country']" label="Pais Origen">
            <DropCountries
                :iso="formState.traveler.origin_country"
                v-model="formState.traveler.origin_country"
            />
        </a-form-item>

        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
    import { onBeforeMount, reactive } from 'vue';
    import { Traveler } from '../../types/type.traveler';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import DropCountries from '@/modules/country/components/dropdown/dropCountries.vue';
    import DropdownPlans from '@/modules/plains/components/dropdowns/dropdownPlans.vue';
    import { validateMessages } from '@/common/utils/validationMessages';

    const props = defineProps<{
        id?: string;
        traveler: Traveler;
    }>();

    const formState = reactive({
        traveler: props.traveler,
    });

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 },
    };
    onBeforeMount(async () => {
        if (props.id) {
        }
    });

    const onFinish = (values: any) => {
        console.log('Succes', values);
    };
    const onFinishFailed = (values: any) => {
        console.log('tiht', formState.traveler.contractor, values);
    };
    const asignContract = (value: any) => {
        formState.traveler.contractor = value;
        console.log(
            'este es el value :' + value,
            'este es el user.contractor:' + formState.traveler.contractor,
        );
    };
</script>
