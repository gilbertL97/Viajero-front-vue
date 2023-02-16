<template>
    <a-row type="flex">
        <a-col :flex="5">
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
                    :rules="[{ required: true, min: 10 }]"
                >
                    <a-input v-model:value="traveler.name" :disabled="props.isOnlyView" />
                </a-form-item>
                <a-form-item label="Sexo">
                    <a-radio-group
                        v-model:value="traveler.sex"
                        :disabled="props.isOnlyView"
                    >
                        <a-radio :value="traveler.sex">Masculino</a-radio>
                        <a-radio :value="traveler.sex">Femenino</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item :name="['born_date']" label="Fecha de Nacimiento">
                    <a-date-picker
                        :locale="locale"
                        v-model:value="traveler.born_date"
                        value-format="YYYY-MM-DD"
                        :disabled="props.isOnlyView"
                    />
                </a-form-item>
                <a-form-item :name="['email']" label="Email" :rules="[{ type: 'email' }]">
                    <a-input
                        v-model:value="traveler.email"
                        :disabled="props.isOnlyView"
                    />
                </a-form-item>

                <a-form-item
                    has-feedback
                    :name="['passport']"
                    label="Pasaporte"
                    :rules="[{ required: true, min: 8 }]"
                >
                    <a-input
                        v-model:value="traveler.passport"
                        :disabled="props.isOnlyView"
                    />
                </a-form-item>
                <a-form-item
                    :name="['origin_country']"
                    label="Pais Origen"
                    v-if="(props.id && contract.id) || !props.id"
                >
                    <DropCountries
                        :country-id="origin.iso"
                        :country="origin.name"
                        :disabled="props.isOnlyView"
                        @selected="asignOriginCountry"
                    />
                </a-form-item>

                <a-form-item :name="['nationality']" label="Nacionalidad">
                    <DropCountries
                        :country-id="nationality.iso"
                        :country="nationality.name"
                        :disabled="props.isOnlyView"
                        @selected="asignNationality"
                    />
                </a-form-item>
                <a-form-item
                    :name="['coverage']"
                    label="Tipo de Cobertura"
                    :rules="[{ required: true }]"
                >
                    <DropdownPlans
                        :plain="plans.name"
                        :plainId="plans.id"
                        :disabled="props.isOnlyView"
                        :activeSelect="false"
                        @selected="asignPlans"
                    />
                </a-form-item>

                <a-form-item :name="['sale_date']" label="Fecha de Venta">
                    <a-date-picker
                        :locale="locale"
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
                        :locale="locale"
                        v-model:value="traveler.start_date"
                        value-format="YYYY-MM-DD"
                        :disabled="props.isOnlyView"
                        :disabled-date="disabledDateInit"
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
                        :locale="locale"
                        :rules="[{ required: true }]"
                        :disabled="props.isOnlyView"
                        :disabled-date="disabledDateEnd"
                    />
                </a-form-item>
                <a-form-item
                    :name="['number_high_risk_days']"
                    label="Dias de alto Riesgo"
                    :rules="[{ required: true }]"
                >
                    <a-input-number
                        v-model:value="traveler.number_high_risk_days"
                        :max="traveler.number_days"
                        :min="0"
                        :step="1"
                        :disabled="props.isOnlyView"
                    />
                </a-form-item>
                <a-form-item
                    :name="['contractor']"
                    label="Agencia"
                    :rules="[{ required: true }]"
                >
                    <DropdownContrac
                        :contractor="contract.client"
                        :contractor-id="contract.id"
                        @selected="asignContract"
                        :disabled="props.isOnlyView"
                        :active-select="false"
                        @click="tets"
                    />
                </a-form-item>
                <a-form-item
                    v-if="!props.isOnlyView"
                    :wrapper-col="{ ...layout.wrapperCol, offset: 13 }"
                >
                    <a-button type="primary" html-type="submit">Aceptar</a-button>
                    <a-divider type="vertical" />
                    <a-button @click="handleCancel"> Cancelar </a-button>
                </a-form-item>
            </a-form>
        </a-col>
        <a-col :flex="2">
            <a-statistic
                title="Cantidad de Dias Cubiertos"
                :value="traveler.number_days"
            />
            <a-statistic
                title="Monto Dias Cubiertos"
                :precision="2"
                :value="traveler.amount_days_covered"
            />
            <a-statistic
                title="Monto Actividad Alto Riesgo"
                :precision="2"
                :value="traveler.amount_days_high_risk"
            />

            <a-statistic
                title="Monto Total"
                :precision="2"
                :value="traveler.total_amount"
            />
        </a-col>
    </a-row>
</template>
<script lang="ts" setup>
    import { onMounted, reactive, ref, watch } from 'vue';
    import dayjs, { Dayjs } from 'dayjs';
    import 'dayjs/locale/es';
    import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
    import { TravelerResponse, Traveler } from '../../types/type.traveler';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import DropCountries from '@/modules/country/components/dropdown/dropCountries.vue';
    import DropdownPlans from '@/modules/plains/components/dropdowns/selectPlans.vue';
    import { defaultValidateMessages } from '@/common/utils/validationMessages';
    import {
        getTraveler,
        insertTraveler,
        updateTraveler,
    } from '../../services/traveler.service';
    import { usePlainStore } from '@/modules/plains/store/plans.store';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const store = usePlainStore();
    const props = defineProps<{
        id?: string;
        isOnlyView?: boolean;
    }>();
    //const days = ref(0);
    const contract = reactive<{
        id?: number;
        client?: string;
    }>({
        id: undefined,
        client: undefined,
    });
    const nationality = reactive<{
        iso?: string;
        name?: string;
    }>({
        iso: undefined,
        name: undefined,
    });
    const origin = reactive<{
        iso?: string;
        name?: string;
    }>({
        iso: undefined,
        name: undefined,
    });
    const plans = reactive<{
        id?: number;
        name?: string;
    }>({
        id: undefined,
        name: undefined,
    });
    const hasChanged = ref(true);

    const traveler: Traveler = reactive({
        name: '',
        sex: undefined,
        born_date: null,
        email: undefined,
        passport: '',
        sale_date: null,
        start_date: null,
        end_date_policy: null,
        number_high_risk_days: 0,
        contractor: undefined,
        origin_country: undefined,
        nationality: undefined,
        coverage: undefined,
        number_days: 0,
        amount_days_high_risk: 0,
        amount_days_covered: 0,
        total_amount: 0,
    });

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 22 },
    };

    const loading = ref(false);
    onMounted(async () => {
        if (props.id) {
            loading.value = true;
            const travelerR = (await getTraveler(props.id)).data;
            hasChanged.value = false;

            intializateTraveler(travelerR);
            console.log(traveler.contractor);
            loading.value = false;
        }
    });
    const disabledDateInit = (current: Dayjs) => {
        // Debe seleccionar un dia mayor q la fecah fin
        return current > dayjs(traveler.end_date_policy).endOf('day');
    };
    const disabledDateEnd = (current: Dayjs) => {
        // Debe seleccionar mayor q la fecha inicio

        return current < dayjs(traveler.start_date).endOf('day');
    };

    const onFinish = (values: any) => {
        console.log('Succes', values);
        if (props.id) {
            try {
                updateTraveler(traveler);
            } catch (error) {}
        } else {
            try {
                insertTraveler(traveler);
            } catch (error) {}
        }
        router.push({ name: 'travelers' });
    };
    const handleCancel = () => {
        router.push({ name: 'travelers' });
    };
    const onFinishFailed = (values: any) => {
        console.log('tiht', traveler.contractor, values);
    };
    const asignContract = (value: any) => {
        traveler.contractor = value;
        console.log('este es la agencia :' + value);
    };
    const asignPlans = (value: number) => {
        traveler.coverage = value;
        console.log('este es el plan :' + value);
    };
    const asignOriginCountry = (value: string) => {
        traveler.origin_country = value;
        console.log('este es el pais :' + value);
    };
    const asignNationality = (value: string) => {
        traveler.nationality = value;
        console.log('este es el nacionalidad :' + value);
    };

    const intializateTraveler = (travelerR: TravelerResponse) => {
        traveler.id = travelerR.id;
        traveler.name = travelerR.name;
        traveler.sex = travelerR.sex;
        traveler.born_date = travelerR.born_date;
        traveler.email = travelerR.email;
        traveler.passport = travelerR.passport;
        traveler.sale_date = travelerR.sale_date;
        console.log(
            '🚀 ~ file: formTravelers.vue:324 ~ intializateTraveler ~ traveler.sale_date',
            traveler.sale_date,
        );
        traveler.start_date = travelerR.start_date;
        console.log(
            '🚀 ~ file: formTravelers.vue:325 ~ intializateTraveler ~ traveler.start_date ',
            traveler.start_date,
            typeof traveler.start_date,
        );
        traveler.end_date_policy = travelerR.end_date_policy;
        console.log(
            '🚀 ~ file: formTravelers.vue:327 ~ intializateTraveler ~ traveler.end_date_polic',
            traveler.end_date_policy,
        );

        traveler.number_high_risk_days = travelerR.number_high_risk_days;
        traveler.contractor = travelerR.contractor?.id;
        traveler.origin_country = travelerR.origin_country?.iso;

        traveler.nationality = travelerR.nationality?.iso;
        traveler.coverage = travelerR.coverage?.id;
        traveler.number_days = travelerR.number_days;
        traveler.amount_days_high_risk = travelerR.amount_days_high_risk;

        traveler.amount_days_covered = travelerR.amount_days_covered;
        traveler.total_amount = travelerR.total_amount;
        contract.id = travelerR.contractor!.id!;
        contract.client = travelerR.contractor!.client;
        nationality.iso = travelerR.nationality?.iso;
        nationality.name = travelerR.nationality?.comun_name;
        origin.iso = travelerR.origin_country?.iso;
        origin.name = travelerR.origin_country?.comun_name;
        plans.id = travelerR.coverage?.id;
        plans.name = travelerR.coverage?.name;
    };
    const calculate = () => {
        const plans = store.getPlans.find((e) => e.id == traveler.coverage);
        const start = dayjs(traveler.start_date);
        const end = dayjs(traveler.end_date_policy);
        traveler.number_days = end.diff(start, 'day') + 1;
        console.log('dias de diferencia ' + end.diff(start, 'day'));

        traveler.amount_days_high_risk =
            traveler.number_high_risk_days != 0
                ? plans!.daily
                    ? plans!.high_risk! * traveler.number_high_risk_days!
                    : 0
                : 0;

        traveler.amount_days_covered = plans?.daily
            ? traveler.number_days * plans!.price!
            : plans!.price!;

        traveler.total_amount =
            traveler.amount_days_high_risk != 0
                ? traveler.amount_days_covered + traveler.amount_days_high_risk
                : traveler.amount_days_covered;
    };
    watch(
        [
            () => traveler.start_date,
            () => traveler.end_date_policy,
            () => traveler.coverage,
            () => traveler.number_high_risk_days,
        ],
        () => {
            if (
                traveler.coverage &&
                traveler.end_date_policy &&
                traveler.start_date &&
                hasChanged.value
            ) {
                calculate();
            }
            hasChanged.value = true;
        },
    );
    watch([() => traveler.number_days], () => {
        const plans = store.getPlans.find((e) => e.id == traveler.coverage);
        if (!plans?.daily) {
            if (traveler.number_days > plans!.number_of_days!) {
                console.log('Entro a poner Null', plans);
                traveler.start_date = null;
                traveler.end_date_policy = null;
                console.log(traveler.coverage);
            }
        }
    });

    const tets = () => {
        console.log(hasChanged.value);
        hasChanged.value = true;
        console.log(hasChanged.value);
    };
</script>
<style scoped></style>
