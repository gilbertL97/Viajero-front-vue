<template>
    <a-layout-sider>
        <a-menu mode="vertical">
            <a-sub-menu v-if="rankinPermisions == 5" key="sub1">
                <template #icon>
                    <SettingOutlined />
                </template>

                <template #title>Administración</template>
                <a-menu-item>
                    <router-link :to="{ name: 'users' }">
                        Gestión de Usuarios
                    </router-link></a-menu-item
                >
            </a-sub-menu>
            <a-sub-menu v-if="rankinPermisions > 3" key="sub2">
                <template #icon>
                    <NotificationOutlined />
                </template>
                <template #title>Mercadotecnia</template>
                <a-menu-item
                    ><router-link :to="{ name: 'clients' }">
                        Gestión de Clientes</router-link
                    ></a-menu-item
                >
                <a-menu-item
                    ><router-link :to="{ name: 'plains' }">
                        Gestión de los Planes
                    </router-link></a-menu-item
                >
            </a-sub-menu>
            <a-sub-menu v-if="rankinPermisions > 2" key="sub3">
                <template #icon>
                    <LineChartOutlined />
                </template>
                <template #title>Consultas</template>
                <a-menu-item key="consultCl">Clientes</a-menu-item>
                <a-menu-item key="consultUs">Usuarios</a-menu-item>
            </a-sub-menu>
            <a-sub-menu v-if="rankinPermisions >= 1" key="sub4">
                <template #icon>
                    <UsergroupAddOutlined />
                </template>
                <template #title>Tomadores de Seguros</template>
                <a-menu-item>
                    <router-link :to="{ name: 'travelers' }"
                        >Gestion de Viajeros</router-link
                    >
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>
<script lang="ts" setup>
    import {
        SettingOutlined,
        LineChartOutlined,
        NotificationOutlined,
        UsergroupAddOutlined,
    } from '@ant-design/icons-vue';
    import { RouterLink } from 'vue-router';
    import { useAuthStore } from '@/modules/auth/store/auth.store';
    import { rolRankingValue } from '@/modules/user/types/user.types';
    const store = useAuthStore();
    const rankinPermisions: number = rolRankingValue[store.getUserInfo!.role];
</script>
<style scoped>
    .ant-layout-sider {
        min-width: 0;
        background: #ffffff !important;
        border-right: 1px solid #f0f0f0 !important;
        transition: all 0.2s;
    }
</style>
