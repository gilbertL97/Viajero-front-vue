<template>
    <a-row type="flex">
        <a-col :flex="8">
            <div class="form-container">
                <a-form
                    :model="traveler"
                    v-bind="layout"
                    :noStyle="true"
                    layout="vertical"
                    :validate-messages="defaultValidateMessages"
                    @finish="onFinish"
                    @finish-failed="onFinishFailed"
                    :loading="loading"
                    ><a-row type="flex">
                        <a-col :span="12">
                            <a-form-item
                                has-feedback
                                :name="['name']"
                                label="Nombre y Apellidos"
                                :rules="[{ required: true, min: 10 }]"
                            >
                                <a-input
                                    v-model:value="traveler.name"
                                    :disabled="props.isOnlyView"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Sexo">
                                <a-radio-group v-model:value="traveler.sex">
                                    <a-radio value="M">Masculino</a-radio>
                                    <a-radio value="F">Femenino</a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row type="flex">
                        <a-col :span="12">
                            <a-form-item :name="['born_date']" label="F. Nacimiento">
                                <a-date-picker
                                    v-model:value="traveler.born_date"
                                    format="DD/MM/YYYY"
                                    valueFormat="DD/MM/YYYY"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item
                                :name="['email']"
                                label="Email"
                                :rules="[{ type: 'email' }]"
                            >
                                <a-input v-model:value="traveler.email" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row type="flex">
                        <a-col :span="12">
                            <a-form-item
                                has-feedback
                                :name="['passport']"
                                label="Pasaporte"
                                :rules="[{ required: true, min: 8 }]"
                            >
                                <a-input v-model:value="traveler.passport" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item
                                :name="['origin_country']"
                                label="Pais Origen"
                                v-if="(props.id && contract.id) || !props.id"
                            >
                                <DropCountries
                                    :country-id="origin.iso"
                                    :country="origin.name"
                                    @selected="asignOriginCountry"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row type="flex">
                        <a-col :span="12">
                            <a-form-item :name="['nationality']" label="Nacionalidad">
                                <DropCountries
                                    :country-id="nationality.iso"
                                    :country="nationality.name"
                                    @selected="asignNationality"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item
                                :name="['coverage']"
                                label="Tipo de Cobertura"
                                :rules="[{ required: true }]"
                            >
                                <DropdownPlans
                                    :plain="plans.name"
                                    :plainId="plans.id"
                                    :activeSelect="false"
                                    @selected="asignPlans"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row type="flex">
                        <a-col :span="12">
                            <a-form-item :name="['sale_date']" label="F. Venta">
                                <a-date-picker
                                    v-model:value="traveler.sale_date"
                                    format="DD/MM/YYYY"
                                    valueFormat="YYYY-MM-DD"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item
                                :name="['start_date']"
                                label="F. Inicio de Viaje"
                                :rules="[{ required: true }]"
                            >
                                <a-date-picker
                                    v-model:value="traveler.start_date"
                                    format="DD/MM/YYYY"
                                    valueFormat="YYYY-MM-DD"
                                    :disabled-date="disabledDateInit"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row type="flex">
                        <a-col :span="12">
                            <a-form-item
                                :name="['end_date_policy']"
                                label="F. Fin de Poliza"
                                :rules="[
                                    {
                                        required: true,
                                    },
                                    {
                                        validator: validateEndDateRangeDays,
                                        messsage: 'es un campo obligatorio',
                                    },
                                ]"
                            >
                                <a-date-picker
                                    v-model:value="traveler.end_date_policy"
                                    format="DD/MM/YYYY"
                                    valueFormat="YYYY-MM-DD"
                                    :disabled-date="disabledDateEnd"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item
                                :name="['number_high_risk_days']"
                                label="Dias de alto Riesgo"
                            >
                                <a-input-number
                                    v-model:value="traveler.number_high_risk_days"
                                    :max="traveler.number_days"
                                    :min="0"
                                    :step="1"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row type="flex">
                        <a-col :span="12">
                            <a-form-item
                                :name="['contractor']"
                                label="Agencia"
                                :rules="[{ required: true }]"
                            >
                                <DropdownContrac
                                    :data="contractors"
                                    :contractor="contract.client"
                                    :contractor-id="contract.id"
                                    @selected="asignContract"
                                    :active-select="false"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row type="flex">
                        <a-col :span="20">
                            <a-form-item
                                v-if="!props.isOnlyView"
                                :wrapper-col="{ ...layout.wrapperCol, offset: 14 }"
                            >
                                <div class="submit-buttons">
                                    <a-button type="primary" html-type="submit"
                                        >Aceptar</a-button
                                    >
                                    <a-divider type="vertical" />
                                    <a-button @click="handleCancel"> Cancelar </a-button>
                                </div>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </a-col>
        <a-col :flex="4">
            <div class="price-traveler">
                <h3 style="padding-top: 10px">Campos Calculados</h3>
                <a-statistic
                    title="Número de Dias Cubiertos :"
                    :value="traveler.number_days"
                />
                <a-statistic
                    title="Importe Dias Cubiertos :"
                    :precision="2"
                    :value="traveler.amount_days_covered"
                >
                    <template #prefix> $ </template></a-statistic
                >
                <a-statistic
                    title="Importe Actividad Alto Riesgo :"
                    :precision="2"
                    :value="traveler.amount_days_high_risk"
                >
                    <template #prefix> $ </template></a-statistic
                >
                <a-statistic
                    title="Importe Total :"
                    :precision="2"
                    :value="traveler.total_amount"
                >
                    <template #prefix> $ </template></a-statistic
                >
            </div>
        </a-col>
    </a-row>
</template>
<script lang="ts" setup>
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import DropCountries from '@/modules/country/components/dropdown/dropCountries.vue';
    import DropdownPlans from '@/modules/plains/components/dropdowns/selectPlans.vue';
    import { defaultValidateMessages } from '@/common/utils/validationMessages';
    import useFormTraveler from '../../composable/useFormTraveler';
import { Contractor } from '@/modules/contratctor/types/contractor.types';
import { Country } from '@/modules/country/types/country.type';
import { Plans } from '@/modules/plains/types/plains.types';
    const props = defineProps<{
        id?: string;
        isOnlyView?: boolean;
        contractors: Contractor[];
        countries: Country[];
        plans: Plans[];
    }>();
    const {
        traveler,
        contract,
        nationality,
        origin,
        plans,
        loading,
        disabledDateInit,
        disabledDateEnd,
        asignContract,
        asignNationality,
        asignOriginCountry,
        asignPlans,
        handleCancel,
        onFinish,
        onFinishFailed,
        validateEndDateRangeDays,
    } = useFormTraveler(props.id);

    const layout = {
        labelCol: { span: 13 },
        wrapperCol: { span: 22 },
    };
</script>
<style scoped>
    .form-container,
    .price-traveler {
        padding-left: 1rem;
        padding-bottom: 1.5rem;
        text-align: left;
        border-radius: 8px;
        background-color: white;
        box-shadow:
            rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    }
    .ant-input,
    .ant-picker-input,
    .ant-picker {
        border-radius: 5px !important;
    }
    .ant-form {
        padding-top: 2rem;
    }
    .price-traveler {
        margin-left: 2rem;
        margin-right: 3rem;
    }
    .submit-buttons {
        display: flex;
        gap: 3;
        align-items: bottom;
    }
    .ant-divider {
        margin: 0 30px;
    }
</style>
