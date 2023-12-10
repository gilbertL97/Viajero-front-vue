<template>
    <div class="form">
        <a-form
            :model="plain"
            v-bind="layout"
            :validate-messages="defaultValidateMessages"
            @finish="handleOk"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                has-feedback
                :name="['name']"
                label="Nombre"
                :rules="[{ required: true, min: 4 }]"
            >
                <a-input placeholder="Nombre " v-model:value="plain.name" />
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['price']"
                label="Precio"
                :rules="[{ required: true }]"
            >
                <a-input-number
                    v-model:value="plain.price"
                    :max="100"
                    :min="0.1"
                    :step="0.1"
                    string-mode
                />
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['high_risk']"
                label="Tarifa alto Riesgo"
                :rules="[{ min: 0.1 }]"
            >
                <a-input-number
                    v-model:value="plain.high_risk"
                    :max="100"
                    :min="0"
                    :step="0.1"
                    string-mode
                />
            </a-form-item>
            <a-form-item :name="['daily']" label="Diario" :rules="[{ required: true }]">
                <a-checkbox v-model:checked="plain.daily" />
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['number_of_days']"
                label="Cantidad de Dias"
                :rules="[{ required: true }]"
                v-if="!plain.daily"
            >
                <a-input-number
                    v-model:value="plain.number_of_days"
                    :max="100"
                    :min="1"
                    :step="1"
                />
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['config_string']"
                label="Cadena de Configuracion"
                :rules="[{ min: 4 }]"
            >
                <a-input
                    placeholder="Cadena de Configuracion "
                    v-model:value="plain.config_string"
                    @keydown.space.prevent
                />
            </a-form-item>
            <a-form-item has-feedback :name="['benefitTable']" label="Tabla de Beneficio">
                <!-- <a-input v-model:value="plain.benefitTable" :disabled="true" />
            </a-form-item>
            <a-form-item has-feedback :name="['benefitTabl']"> -->
                <a-upload :before-upload="beforeUpload" :max-count="1">
                    <a-button>
                        <upload-outlined />
                        Subir Archivo
                    </a-button>
                </a-upload>
            </a-form-item>
            <a-form-item :name="['isActive']" label="Activo" v-if="props.id">
                <a-checkbox v-model:checked="plain.isActive" />
            </a-form-item>

            <div class="btns">
                <a-form-item :wrapper-col="{ wraper: 2, offset: 13 }">
                    <a-button type="primary" html-type="submit">Aceptar</a-button>
                    <a-divider type="vertical" />
                    <a-button @click="handleCancel"> Cancelar </a-button>
                </a-form-item>
            </div>
        </a-form>
    </div>
</template>

<script setup lang="ts">
    import { Plans } from '../../types/plains.types';
    import { UploadOutlined } from '@ant-design/icons-vue';
    import { reactive, ref, onBeforeMount } from 'vue';
    import { editPlans, addPlans, getPlain } from '../../services/plan.service';
    import { defaultValidateMessages } from '@/common/utils/validationMessages';
    import { useRouter } from 'vue-router';
    import manageError from '@/common/composable/manageError';
    import type { UploadProps } from 'ant-design-vue';
    import { message } from 'ant-design-vue';
    //const fileList = ref<UploadProps['fileList']>([]);
    //const file = ref<UploadFile>();
    const { alertForbidden, alertInactive } = manageError();
    const router = useRouter();
    const props = defineProps<{
        id?: string;
    }>();
    const id = ref(0);
    const loading = ref(false);
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    };
    const plain: Plans = reactive({
        name: '',
        price: 0,
        high_risk: 2,
        daily: true,
        number_of_days: 1,
        config_string: '',
        isActive: true,
        benefitTable: '',
    });
    onBeforeMount(async () => {
        if (props.id) {
            id.value = +props.id;
            await getPlan();
        }
    });

    const handleOk = async () => {
        loading.value = true;
        if (props.id) await editPlain();
        else await addPlain();

        loading.value = false;
        router.push('/plains');
    };
    const handleCancel = () => {

        router.push('/plains');
    };
    const getPlan = async () => {
        try {
            const plainR = (await getPlain(id.value)).data;
            setPlain(plainR);
        } catch (error: any) {
            handleError(error);
        }
    };
    const editPlain = async () => {
        try {
            await editPlans(plain);
        } catch (error: any) {
            handleError(error);
        }
    };
    const addPlain = async () => {
        try {
            await addPlans(plain);
        } catch (error: any) {
            handleError(error);
        }
    };
    const onFinishFailed = (values: any) => {
        console.log('tiht', values);
    };
    const handleError = (error: any) => {
        if (error.response.status == 403) {
            alertForbidden();
            router.push({ path: '/' });
        } else alertInactive('nombre de plan');
    };
    const setPlain = (plainR: Plans) => {
        plain.id = plainR.id;
        plain.name = plainR.name;
        plain.high_risk = plainR.high_risk;
        plain.isActive = plainR.isActive;
        plain.price = plainR.price;
        plain.daily = plainR.daily;
        plain.number_of_days = plainR.number_of_days ?? 0;
        plain.config_string = plainR.config_string;
        7;
    };
    const beforeUpload: UploadProps['beforeUpload'] = (file1) => {
        const isPDF = file1.type === 'application/pdf';
        if (isPDF) {
            plain.tablePdf = file1;
            return false;
        }
        message.error(`${file1.name} no es un archivo pdf`);
    };
</script>

<style lang="scss" scoped>
    .form {
        display: block;
        padding-top: 2px;
        padding-bottom: 3px;
    }
    .btns {
        padding-top: 15px;
    }
</style>
