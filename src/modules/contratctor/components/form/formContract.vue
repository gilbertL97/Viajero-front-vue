<template>
    <div>
        <h5>Nombre</h5>
        <a-input placeholder="Nombre " v-model:value="contract.client" />
        <h5>Correo</h5>
        <a-input placeholder="Email" v-model:value="contract.email" />
        <h5>Direccion</h5>
        <a-textarea placeholder="Direccion" v-model:value="contract.addres" auto-size />
        <h5>Telefono</h5>
        <a-input placeholder="Telefono" v-model:value="contract.telf" />
        <h5>Poliza</h5>
        <a-input placeholder="Poliza" v-model:value="contract.poliza" />
        <div class="btns">
            <a-button type="primary" :loading="loading" @click="handleOk"
                >Aceptar</a-button
            >
            <a-divider type="vertical" />
            <a-button @click="handleCancel"> Cancelar </a-button>
        </div></div
    >
</template>

<script setup lang="ts">
    import { PropType, reactive, ref } from 'vue';
    import { editContractors, addContractors } from '../../services/contractor.service';
    import { Contractor } from '../../types/contractor.types';
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
        console.log('test');
    };
    const editContractor = async () => {
        try {
            await editContractors(contract);
            console.log(contract);
        } catch (error) {}
    };
    const addContractor = async () => {
        try {
            await addContractors(contract);
        } catch (error) {}
    };
</script>

<style scoped>
    .btns {
        padding-top: 15px;
    }
</style>
