<template>
    <a-form layout="vertical" :model="form" @finish="login">
        <a-form-item>
            <a-input v-model:value="form.username" placeholder="Usuario">
                <template #prefix>
                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-input-password v-model:value="form.password" :visibilityToggle="true" placeholder="Contraseña">
                <template #prefix>
                    <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
            </a-input-password>
        </a-form-item>
        <a-alert v-if="errors" :message="message" :description="description" type="error" show-icon />
        <br />
        <a-form-item>
            <a-button type="primary" html-type="submit" :disabled="form.username === '' || form.password === ''"
                :loading="loading">
                Login
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import useAuth from '@/modules/auth/composable/useAuth';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
const { form, loading, errors, message, description, login } = useAuth();
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
