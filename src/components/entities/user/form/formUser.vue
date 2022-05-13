<template>
    <div class="form">
        <h5>Nombre</h5>
        <a-input placeholder="Nombre " v-model:value="user.name" />
        <h5>Correo</h5>
        <a-input placeholder="Email" v-model:value="user.email" />
        <h5>Rol</h5>
        <a-select v-model:value="user.role" placeholder="Seleccione el rol">
            <a-select-option :value="UserRole.MARKAGENT"
                >Agente de Marketing</a-select-option
            >
            <a-select-option :value="UserRole.CONSULT">
                Consultante</a-select-option
            >
            <a-select-option :value="UserRole.COMAGENT"
                >Agente Comercial</a-select-option
            >
            <a-select-option :value="UserRole.ADMIN"
                >Administrador</a-select-option
            >
        </a-select>
        <div class="btns">
            <a-button type="primary" :loading="loading" @click="handleOk"
                >Aceptar</a-button
            >
            <a-divider type="vertical" />
            <a-button @click="handleCancel"> Cancelar </a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { User } from '@/components/entities/user/types/modelTypes';
    import { PropType, reactive, ref } from 'vue';
    import { editUsers, addUsers } from '../services/user.service';
    import { UserRole } from '@/components/entities/user/types/modelTypes';
    import generator from 'generate-password-ts';

    const props = defineProps({
        user: {
            type: Object as PropType<User>,
            required: true,
        },
    });

    const loading = ref(false);
    const user: User = reactive({
        id: props.user.id,
        name: props.user.name,
        email: props.user.email,
        role: props.user.role,
        active: false,
    });

    const emit = defineEmits<{
        (e: 'finish', visible: boolean): void;
    }>();

    const handleOk = async () => {
        loading.value = true;
        if (props.user.active) await editUser();
        else await addUser();
        loading.value = false;
        emit('finish', false);
    };
    const handleCancel = () => {
        emit('finish', false);
        console.log('test');
    };
    const editUser = async () => {
        console.log(props.user);
        try {
            await editUsers(user);
        } catch (error) {}
    };
    const addUser = async () => {
        genPass();
        try {
            await addUsers(user);
        } catch (error) {}
    };

    const genPass = () => {
        const password = generator.generate({
            length: 10,
            numbers: true,
        });
        user.password = password;
        window.alert('la contraseña momentania sera esta ' + password);
    };
</script>

<style lang="scss" scoped>
    .form {
        display: block;
    }
    .btns {
        float: right;
    }
</style>
