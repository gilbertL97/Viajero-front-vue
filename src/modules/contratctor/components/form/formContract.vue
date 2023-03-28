<template>
    <div>
        <a-form
            :model="contract"
            v-bind="layout"
            :validate-messages="defaultValidateMessages"
            @finish="handleOk"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                has-feedback
                :name="['client']"
                label="Nombre"
                :rules="[{ required: true, min: 5 }]"
            >
                <a-input placeholder="Nombre " v-model:value="contract.client" />
            </a-form-item>

            <a-form-item
                has-feedback
                :name="['file']"
                label="Alias"
                :rules="[{ required: true, min: 4 }]"
            >
                <a-input
                    placeholder="Alias "
                    v-model:value="contract.file"
                    @keydown.space.prevent
                />
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['email']"
                label="Correo"
                :rules="[{ type: 'email', required: true }]"
            >
                <a-input placeholder="Correo" v-model:value="contract.email" />
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['addres']"
                label="Direccion"
                :rules="[{ min: 8 }]"
            >
                <a-textarea
                    placeholder="Direccion"
                    v-model:value="contract.addres"
                    auto-size
                />
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['telf']"
                label="Telefono"
                :rules="[{ min: 8, pattern: /^[0-9]*$/ }]"
            >
                <a-input
                    placeholder="Telefono"
                    v-model:value="contract.telf"
                    @keydown.space.prevent
                />
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['analysis_number']"
                label="Número de Anàlisis"
                :rules="[
                    {
                        required: true,
                        min: 4,
                        pattern: /^[0-9]*$/,
                    },
                ]"
            >
                <a-input
                    placeholder="Número de Análisis"
                    v-model:value="contract.analysis_number"
                    @keydown.space.prevent
                />
            </a-form-item>
            <a-form-item
                :name="['poliza']"
                label="Poliza"
                :rules="[{ required: true, min: 6 }]"
            >
                <a-input placeholder="Poliza" v-model:value="contract.poliza" />
            </a-form-item>
            <a-form-item :name="['isActive']" label="Activo">
                <a-checkbox v-model:checked="contract.isActive" />
            </a-form-item>
            <div class="btns">
                <a-form-item
                    class="display flex"
                    :wrapper-col="{ wraper: 2, offset: 12 }"
                >
                    <a-button type="primary" html-type="submit">Aceptar</a-button>
                    <a-divider type="vertical" />
                    <a-button @click="handleCancel"> Cancelar </a-button>
                </a-form-item>
            </div>
        </a-form>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, onMounted } from 'vue';
    import {
        editContractors,
        addContractors,
        getContractor,
    } from '../../services/contractor.service';
    import { Contractor } from '../../types/contractor.types';
    import { defaultValidateMessages } from '@/common/utils/validationMessages';
    import { useRouter } from 'vue-router';
    import manageError from '@/common/composable/manageError';
    const router = useRouter();
    const { alertInactive, alertForbidden } = manageError();

    const props = defineProps<{ id?: string }>();
    const id = ref(0);
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    };
    const contract = reactive<Contractor>({
        email: '',
        client: '',
        telf: undefined,
        addres: undefined,
        file: '',
        poliza: '',
        isActive: true,
        analysis_number: '',
    });
    const loading = ref(false);

    onMounted(async () => {
        if (props.id) {
            id.value = +props.id;
            await getContract();
        }
    });
    const handleOk = async () => {
        loading.value = true;
        if (props.id) await editContractor();
        else await addContractor();
        loading.value = false;
        router.push({ name: 'clients' });
    };
    const handleCancel = () => {
        console.log(contract);
        router.push({ name: 'clients' });
    };
    const getContract = async () => {
        try {
            const contractR = (await getContractor(id.value)).data;
            setContract(contractR);
        } catch (error: any) {
            handleError(error);
        }
    };
    const editContractor = async () => {
        try {
            await editContractors(contract);
            router.push({ name: 'clients' });
        } catch (error: any) {
            handleError(error);
        }
    };
    const addContractor = async () => {
        try {
            await addContractors(contract);
        } catch (error: any) {
            handleError(error);
        }
    };
    const onFinishFailed = (values: any) => {
        console.log('tiht', values);
    };
    const setContract = (contractR: Contractor) => {
        contract.id = contractR.id;
        contract.client = contractR.client;
        contract.email = contractR.email;
        contract.telf = contractR.telf;
        contract.poliza = contractR.poliza;
        contract.addres = contractR.addres;
        contract.file = contractR.file;
        contract.isActive = contractR.isActive;
        contract.analysis_number = contractR.analysis_number;
    };
    const handleError = (error: any) => {
        if (error.response.status == 403) {
            alertForbidden();
            router.push({ path: '/' });
        } else alertInactive('nombre de cliente', 'o alias');
    };
</script>

<style scoped>
    .btns {
        padding-top: 15px;
    }
</style>
