<template>
    <a-layout>
        <header-vue />

        <a-layout>
            <sider-lay />
            <a-layout-content>
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
