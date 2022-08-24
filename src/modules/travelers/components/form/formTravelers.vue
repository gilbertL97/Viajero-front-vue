<template>
    <a-form
        :model="traveler"
        v-bind="layout"
        :validate-messages="defaultValidateMessages"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        :loading="loading"
    >
        <a-form-item
            has-feedback
            :name="['name']"
            label="Nombre y Apellidos"
            :rules="[{ required: true }]"
        >
            <a-input v-model:value="traveler.name" :disabled="props.isOnlyView" />
        </a-form-item>
        <a-form-item label="Sexo">
            <a-radio-group v-model:value="traveler.sex" :disabled="props.isOnlyView">
                <a-radio value="F">Masculino</a-radio>
                <a-radio value="M">Femenino</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item :name="['born_date']" label="Fecha de Nacimiento">
            <a-date-picker
                v-model:value="traveler.sale_date"
                value-format="YYYY-MM-DD"
                :disabled="props.isOnlyView"
            />
        </a-form-item>
        <a-form-item :name="['email']" label="Email" :rules="[{ type: 'email' }]">
            <a-input v-model:value="traveler.email" :disabled="props.isOnlyView" />
        </a-form-item>

        <a-form-item
            has-feedback
            :name="['passport']"
            label="Pasaporte"
            :rules="[{ required: true }]"
        >
            <a-input v-model:value="traveler.passport" :disabled="props.isOnlyView" />
        </a-form-item>
        <a-form-item :name="['origin_country']" label="Pais Origen">
            <DropCountries
                :iso="traveler.origin_country"
                v-model="traveler.origin_country"
                :disabled="props.isOnlyView"
            />
        </a-form-item>

        <a-form-item :name="['nationality']" label="Nacionalidad">
            <DropCountries
                :iso="traveler.nationality"
                v-model="traveler.nationality"
                :disabled="props.isOnlyView"
            />
        </a-form-item>
        <a-form-item
            :name="['coverage']"
            label="Tipo de Cobertura"
            :rules="[{ required: true }]"
        >
            <DropdownPlans
                :plainId="traveler.coverage"
                v-model="traveler.coverage"
                :disabled="props.isOnlyView"
            />
        </a-form-item>
        <a-form-item :name="['sale_date']" label="Fecha de Venta">
            <a-date-picker
                v-model:value="traveler.sale_date"
                value-format="YYYY-MM-DD"
                :disabled="props.isOnlyView"
            />
        </a-form-item>
        <a-form-item
            :name="['start_date']"
            label="Fecha de Inicio de Viaje"
            :rules="[{ required: true }]"
        >
            <a-date-picker
                v-model:value="traveler.start_date"
                value-format="YYYY-MM-DD"
                :disabled="props.isOnlyView"
            />
        </a-form-item>
        <a-form-item
            :name="['end_date_policy']"
            label="Fecha de Fin de Poliza"
            :rules="[{ required: true }]"
        >
            <a-date-picker
                v-model:value="traveler.end_date_policy"
                value-format="YYYY-MM-DD"
                :rules="[{ required: true }]"
                :disabled="props.isOnlyView"
            />
        </a-form-item>
        <a-form-item
            :name="['number_high_risk_days']"
            label="Numero de dias de alto Riesgo"
            :rules="[{ required: true }]"
        >
            <a-input-number
                v-model:value="traveler.number_high_risk_days"
                :max="100"
                :min="0"
                :step="1"
                :disabled="props.isOnlyView"
            />
        </a-form-item>
        <a-form-item :name="['contractor']" label="Agencia" :rules="[{ required: true }]">
            <DropdownContrac
                :contractorId="traveler.contractor"
                @selected="asignContract"
                :disabled="props.isOnlyView"
            />
        </a-form-item>

        <a-form-item
            v-if="!props.isOnlyView"
            :wrapper-col="{ ...layout.wrapperCol, offset: 8 }"
        >
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>
    <a-form v-bind="layout2">
        <a-col :span="12">
            <a-statistic
                title="Active Users"
                :value="112893"
                style="margin-right: 50px"
            />
        </a-col>
        <a-col :span="12">
            <a-statistic
                title="Account Balance (CNY)"
                :precision="2"
                :value="112893"
            /> </a-col
    ></a-form>
</template>
<script lang="ts" setup>
    import { onMounted, reactive, ref } from 'vue';
    import { Traveler, TravelerResponse } from '../../types/type.traveler';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/selectContract.vue';
    import DropCountries from '@/modules/country/components/dropdown/dropCountries.vue';
    import DropdownPlans from '@/modules/plains/components/dropdowns/dropdownPlans.vue';
    import { defaultValidateMessages } from '@/common/utils/validationMessages';
    import { getTraveler } from '../../services/traveler.service';

    const props = defineProps<{
        id?: string;
        isOnlyView?: boolean;
    }>();

    let traveler: Traveler = reactive({
        name: '',
        sex: undefined,
        born_date: undefined,
        email: undefined,
        passport: '',
        sale_date: undefined,
        start_date: null,
        end_date_policy: null,
        number_high_risk_days: undefined,
        contractor: undefined,
        origin_country: undefined,
        nationality: undefined,
        coverage: -1,
    });

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 6 },
    };
    const layout2 = {
        labelCol: { span: 9 },
        wrapperCol: { span: 12 },
    };
    const loading = ref(false);
    onMounted(async () => {
        if (props.id) {
            loading.value = true;
            const travelerR: TravelerResponse = (await getTraveler(props.id)).data;
            console.log(travelerR);
            intializateTraveler(travelerR);
            loading.value = false;
        }
    });

    const onFinish = (values: any) => {
        console.log('Succes', values);
    };
    const onFinishFailed = (values: any) => {
        console.log('tiht', traveler.contractor, values);
    };
    const asignContract = (value: any) => {
        traveler.contractor = value;
        console.log(
            'este es el value :' + value,
            'este es el user.contractor:' + traveler.contractor,
        );
    };
    const intializateTraveler = (travelerR: TravelerResponse) => {
        traveler.name = travelerR.name;
        traveler.sex = travelerR.sex;
        traveler.born_date = travelerR.born_date;
        traveler.email = travelerR.email;
        traveler.passport = travelerR.passport;
        traveler.sale_date = travelerR.sale_date;
        traveler.start_date = travelerR.start_date;
        traveler.end_date_policy = travelerR.end_date_policy;
        traveler.number_high_risk_days = travelerR.number_high_risk_days;
        traveler.contractor = travelerR.contractor.id;
        traveler.origin_country = travelerR.origin_country?.iso;
        traveler.nationality = travelerR.nationality?.iso;
        traveler.coverage = travelerR.coverage.id;
    };
</script>
