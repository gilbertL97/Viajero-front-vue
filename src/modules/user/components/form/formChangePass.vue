<template>
    <a-form
        :model="userPass"
        :validate-messages="defaultValidateMessages"
        v-bind="layout"
        @finish="handleOk"
    >
        <a-form-item
            has-feedback
            :name="['passwordBefore']"
            label="Contraseña Anterior"
            :rules="[{ required: true, min: 6 }]"
        >
            <a-input-password
                v-model:value="userPass.passwordBefore"
                :visibilityToggle="true"
                placeholder="Contraseña Anterior"
            >
                <template #prefix
                    ><LockOutlined style="color: rgba(255, 255, 255)"
                /></template>
            </a-input-password>
        </a-form-item>
        <a-form-item
            has-feedback
            :name="['passwordNew1']"
            label="Nueva Contraseña"
            :rules="[{ required: true, min: 6 }]"
        >
            <a-input-password
                v-model:value="userPass.passwordNew1"
                :visibilityToggle="true"
                placeholder="Nueva Contraseña"
            >
                <template #prefix
                    ><LockOutlined style="color: rgba(255, 255, 255)"
                /></template>
            </a-input-password>
        </a-form-item>
        <a-form-item
            has-feedback
            :name="['passwordNew2']"
            label="Repita la Nueva Contraseña"
            :rules="[{ required: true, min: 6 }]"
        >
            <a-input-password
                v-model:value="userPass.passwordNew2"
                :visibilityToggle="true"
                placeholder="Repita la Nueva Contraseña"
            >
                <template #prefix
                    ><LockOutlined style="color: rgba(255, 255, 255)"
                /></template>
            </a-input-password>
        </a-form-item>
        <div class="btns">
            <a-form-item :wrapper-col="{ wraper: 2, offset: 13 }">
                <a-button type="primary" html-type="submit">Aceptar</a-button>
                <a-divider type="vertical" />
                <a-button @click="handleCancel"> Cancelar </a-button>
            </a-form-item>
        </div>
    </a-form>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';
    import Swal from 'sweetalert2';
    import { LockOutlined } from '@ant-design/icons-vue';
    import { ChangePass } from '../../types/user.types';
    import {
        defaultValidateMessages,
        //repeatMessage,
    } from '@/common/utils/validationMessages';
    import { editPassword } from '../../services/user.service';

    const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 12 },
    };
    const userPass = reactive<ChangePass>({
        passwordBefore: '',
        passwordNew1: '',
        passwordNew2: '',
    });
    const handleOk = async () => {
        await editPassword(userPass)
            .then((response) => {
                if (response.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Su contraseña ha cambiado',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    emit('visible', false);
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido un error',
                    text: error.response.data.message,
                    showConfirmButton: false,
                    timer: 2000,
                });
            });
    };
    const handleCancel = () => {
        emit('visible', false);
    };
    const emit = defineEmits<{
        (e: 'visible', isopen: boolean): boolean;
    }>();
</script>

<style scoped></style>
