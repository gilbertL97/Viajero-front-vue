<template>
    <a-layout>
        <header-vue />
        <a-layout>
            <a-layout-sider>
                <a-menu mode="vertical">
                    <a-sub-menu key="sub1">
                        <template #icon>
                            <SettingOutlined />
                        </template>

                        <template #title>Administración</template>
                        <a-menu-item @click="changeToUser"
                            >Gestión de Usuarios</a-menu-item
                        >
                    </a-sub-menu>

                    <a-sub-menu key="sub2">
                        <template #icon>
                            <NotificationOutlined />
                        </template>
                        <template #title>Mercadotecnia</template>
                        <a-menu-item @click="changeToClient"
                            >Gestión de Clientes</a-menu-item
                        >
                        <a-menu-item @click="changeToPlans"
                            >Gestión de los Planes</a-menu-item
                        >
                    </a-sub-menu>
                    <a-sub-menu key="sub3">
                        <template #icon>
                            <LineChartOutlined />
                        </template>
                        <template #title>Consultas</template>
                        <a-menu-item key="consultCl">Clientes</a-menu-item>
                        <a-menu-item key="consultUs">Usuarios</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub4">
                        <template #icon>
                            <UsergroupAddOutlined />
                        </template>
                        <template #title>Tomadores de Seguros</template>
                        <a-menu-item key="gestTrav"
                            >Gestion de Viajeros</a-menu-item
                        >
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>

            <a-layout-content :loading="load">
                <component :is="currentComponent" />
            </a-layout-content>
        </a-layout>
        <footer-index />
    </a-layout>
</template>
<script lang="ts" setup>
    import tableUser from '@/components/entities/user/table/tableUser.vue';
    import tableClient from '@/components/entities/contratctor/table/tableContractor.vue';
    import backTemp from '../default/backTemp.vue';
    import headerVue from '@/components/layouts/header/headerLay.vue';
    import footerIndex from '@/components/layouts/footer/footerLay.vue';
    import tablePlansVue from '@/components/entities/plains/table/tablePlans.vue';
    import { onMounted, ref, shallowRef } from 'vue';
    import {
        SettingOutlined,
        LineChartOutlined,
        NotificationOutlined,
        UsergroupAddOutlined,
    } from '@ant-design/icons-vue';
    let currentComponent = shallowRef(backTemp);

    const load = ref(false);

    onMounted(async () => {
        // currentComponent.value = backTemp;
    });
    const changeToUser = () => {
        currentComponent.value = tableUser;
    };
    const changeToClient = () => {
        currentComponent.value = tableClient;
    };
    const changeToPlans = () => {
        currentComponent.value = tablePlansVue;
    };
</script>
<style scoped>
    .ant-layout-sider {
        min-width: 0;
        background: #ffffff !important;
        border-right: 1px solid #f0f0f0 !important;
        transition: all 0.2s;
    }
</style>
