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
    import 'dayjs/locale/es';
    import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import DropCountries from '@/modules/country/components/dropdown/dropCountries.vue';
    import DropdownPlans from '@/modules/plains/components/dropdowns/selectPlans.vue';
    import { defaultValidateMessages } from '@/common/utils/validationMessages';
    import useFormTraveler from '../../composable/useFormTraveler';
    const props = defineProps<{
        id?: string;
        isOnlyView?: boolean;
    }>();
    const {
        traveler,
        contract,
        nationality,
        origin,
        plans,
        loading,
        disabledDateEnd,
        disabledDateInit,
        asignContract,
        asignNationality,
        asignOriginCountry,
        asignPlans,
        handleCancel,
        onFinish,
        onFinishFailed,
    } = useFormTraveler(props.id);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 22 },
    };
</script>
<style scoped></style>
