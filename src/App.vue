<script setup lang="ts">
    // This starter template is using Vue 3 <script setup> SFCs

    import { ConfigProvider } from 'ant-design-vue';
    import 'dayjs/locale/es';
    import locale from 'ant-design-vue/es/locale/es_ES';

    // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
    <ConfigProvider :locale="locale">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" :key="$route.path" />
            </transition>
        </router-view>
    </ConfigProvider>
</template>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>
