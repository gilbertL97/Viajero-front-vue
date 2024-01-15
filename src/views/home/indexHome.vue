<template>
    <a-layout>
        <header-vue />

        <a-layout>
            <sider-lay />
            <a-layout-content :loading="load">
                <router-view />
            </a-layout-content>
        </a-layout>
        <footer-index />
    </a-layout>
</template>
<script lang="ts" setup>
    import headerVue from '@/views/layouts/header/headerLay.vue';
    import footerIndex from '@/views/layouts/footer/footerLay.vue';
    import siderLay from '@/views/layouts/sidebar/sidebarLay.vue';
    import { onMounted, ref } from 'vue';
    import useRefreshTokenService from '@/modules/auth/composable/useRefreshTokenService';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const { postRfresh, logout2 } = useRefreshTokenService();
    const load = ref(false);

    onMounted(async () => {
        const token = await postRfresh().catch(async () => await logout());
        if (!token) await logout();
    });
    const logout = async () => {
        await logout2();
        //cancelInterceptor();
        router.push({ name: 'login' });
    };
</script>
<style scoped>
    .ant-layout-sider {
        min-width: 0;
        background: #ffffff !important;
        border-right: 1px solid #f0f0f0 !important;
        transition: all 0.2s;
    }
    .ant-layout-content {
        min-height: 80vh;
        flex: auto;
        padding-inline: 1rem;
    }
</style>
