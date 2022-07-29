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
            message="Error"
            description="This is an error message about copywriting."
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
            if (token) {
                store.setUserInfo(token.data.user);
                store.setToken(token.data.access_token);
                store.setLogged();
                router.push('/');
            }
        } catch (error) {
            console.log(error);
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
