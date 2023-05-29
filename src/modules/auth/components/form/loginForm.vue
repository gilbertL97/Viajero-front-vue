<template>
    <a-form
        layout="vertical"
        :model="form"
        @finish="login"
        @finishFailed="handleFinishFailed"
    >
        <a-form-item>
            <a-input v-model:value="form.username" placeholder="Usuario">
                <template #prefix
                    ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-input-password
                v-model:value="form.password"
                :visibilityToggle="true"
                placeholder="Contraseña"
            >
                <template #prefix
                    ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
            </a-input-password>
        </a-form-item>
        <a-alert
            v-if="errors"
            :message="message"
            :description="description"
            type="error"
            show-icon
        />
        <br />
        <a-form-item>
            <a-button
                type="primary"
                html-type="submit"
                :disabled="form.username === '' || form.password === ''"
                :loading="loading"
            >
                Login
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
    import { reactive, UnwrapRef, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import type { FormProps } from 'ant-design-vue';
    import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
    import { loginService } from '@/modules/auth/services/auth.service';
    import { useAuthStore } from '@/modules/auth/store/auth.store';
    import { UserLogin } from '../../types/authTypes';
    const store = useAuthStore();
    const router = useRouter();
    const errors = ref(false);
    const message = ref('');
    const description = ref('');

    const form: UnwrapRef<UserLogin> = reactive({
        username: '',
        password: '',
    });
    const loading = ref(false);

    const handleFinishFailed: FormProps['onFinishFailed'] = (errors) => {
        console.log(errors);
    };
    const login = async (): Promise<void> => {
        loading.value = true;
        try {
            const token = await loginService(form.username, form.password);
            console.log(token);
            if (token) {
                store.setToken(token.data.access_token);
                router.push('/hom');
            }
            loading.value = false;
        } catch (error: any) {
            console.log(error);
            errors.value = true;
            if (error.response) {
                message.value = 'ERROR USUARIO NO AUTORIZADO';
                description.value =
                    'Ha introducido incorrectamente el usuario y/o la contraseña';
            } else {
                message.value = 'HAY un problema con la API';
                description.value = 'No se encuentra disponible la API';
            }
            setTimeout(() => {
                errors.value = false;
            }, 5000);
        }
        loading.value = false;
    };
</script>

<style scoped>
    .ant-btn-primary {
        width: 100% !important;
        height: 45px !important;
    }
    .ant-input-affix-wrapper {
        padding: 12px;
    }
</style>
