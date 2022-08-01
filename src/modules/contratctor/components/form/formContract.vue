<template>
    <div>
        <a-form
            :model="contract"
            :validate-messages="validateMessages"
            @finish="handleOk"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                has-feedback
                :name="['client']"
                label="Nombre"
                :rules="[{ required: true }]"
            >
                <a-input placeholder="Nombre " v-model:value="contract.client" />
            </a-form-item>

            <a-form-item
                has-feedback
                :name="['file']"
                label="Alias"
                :rules="[{ required: true }]"
            >
                <a-input placeholder="Nombre " v-model.trim:value="contract.file" />
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
                :rules="[{ required: true }]"
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
                :rules="[{ required: true, type: 'number' }]"
            >
                <a-input placeholder="Telefono" v-model:value="contract.telf" />
            </a-form-item>
            <a-form-item :name="['poliza']" label="Poliza" :rules="[{ required: true }]">
                <a-input placeholder="Poliza" v-model:value="contract.poliza" />
            </a-form-item>
            <a-form-item :name="['isActive']" label="Activo">
                <a-checkbox v-model:checked="contract.isActive" />
            </a-form-item>
            <div class="btns">
                <a-form-item :wrapper-col="{ wraper: 2, offset: 20 }">
                    <a-button type="primary" html-type="submit">Aceptar</a-button>
                    <a-divider type="vertical" />
                    <a-button @click="handleCancel"> Cancelar </a-button>
                </a-form-item>
            </div>
        </a-form></div
    >
</template>

<script setup lang="ts">
    import { PropType, reactive, ref } from 'vue';
    import { editContractors, addContractors } from '../../services/contractor.service';
    import { Contractor } from '../../types/contractor.types';
    import { validateMessages } from '@/common/utils/validationMessages';
    const props = defineProps({
        contractor: {
            type: Object as PropType<Contractor>,
            required: true,
        },
    });
    const contract = reactive<Contractor>(props.contractor);
    const loading = ref(false);

    const emit = defineEmits<{
        (e: 'finish', visible: boolean): void;
    }>();

    const handleOk = async () => {
        loading.value = true;
        if (props.contractor.id != -1) await editContractor();
        else await addContractor();
        loading.value = false;
        emit('finish', false);
    };
    const handleCancel = () => {
        emit('finish', false);
        console.log(contract);
    };
    const editContractor = async () => {
        try {
            await editContractors(contract);
        } catch (error) {}
    };
    const addContractor = async () => {
        try {
            await addContractors(contract);
        } catch (error) {}
    };
    const onFinishFailed = (values: any) => {
        console.log('tiht', values);
    };
</script>

<style scoped>
    .btns {
        padding-top: 15px;
    }
</style>
