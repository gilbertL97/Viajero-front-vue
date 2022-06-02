<template>
    <div class="form">
        <h5>Nombre</h5>
        <a-input placeholder="Nombre " v-model:value="user.name" />
        <h5>Correo</h5>
        <a-input placeholder="Email" v-model:value="user.email" />
        <div v-if="props.editAdmin">
            <h5>Rol</h5>
            <a-select v-model:value="user.role" placeholder="Seleccione el rol">
                <a-select-option @select="client = false" :value="UserRole.MARKAGENT">{{
                    UserRoleEquivalen.MARKAGENT
                }}</a-select-option>
                <a-select-option :value="UserRole.CONSULT">
                    {{ UserRoleEquivalen.CONSULT }}</a-select-option
                >
                <a-select-option :value="UserRole.COMAGENT">{{
                    UserRoleEquivalen.COMAGENT
                }}</a-select-option>
                <a-select-option :value="UserRole.ADMIN">{{
                    UserRoleEquivalen.ADMIN
                }}</a-select-option>
                <a-select-option :value="UserRole.CLIENT">{{
                    UserRoleEquivalen.CLIENT
                }}</a-select-option>
            </a-select>
            <dropdownContrac v-if="user.role == UserRole.CLIENT" />
        </div>
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
    import { User } from '@/modules/user/types/modelTypes';
    import { PropType, reactive, ref } from 'vue';
    import { editUsers, addUsers } from '../services/user.service';
    import { UserRole, UserRoleEquivalen } from '@/modules/user/types/modelTypes';
    import dropdownContrac from '../../contratctor/dropdown/dropdownContrac.vue';

    import generator from 'generate-password-ts';

    const props = defineProps({
        user: {
            type: Object as PropType<User>,
            required: true,
        },
        editAdmin: {
            //para saber si un solo user se esta editando el perfil
            type: Boolean,
            required: true,
        },
        newUser: {
            //para saber si es un nuevo user
            type: Boolean,
            required: true,
        },
    });
    const client = ref(true);
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
        if (props.newUser == true) await addUser();
        else await editUser();
        loading.value = false;
        emit('finish', false);
    };
    const handleCancel = () => {
        emit('finish', false);
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
    //generar una contraseña aleatoria

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
        padding-top: 15px;
    }
</style>
