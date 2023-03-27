<template>
    <a-layout-sider>
        <a-menu mode="vertical">
            <a-sub-menu v-if="acces('users')" key="sub1">
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
            <a-sub-menu>
                <template #icon>
                    <NotificationOutlined />
                </template>
                <template #title>Mercadotecnia</template>
                <a-menu-item v-if="acces('clients')"
                    ><router-link :to="{ name: 'clients' }">
                        Gestión de Clientes</router-link
                    ></a-menu-item
                >
                <a-menu-item v-if="acces('plains')"
                    ><router-link :to="{ name: 'plains' }">
                        Gestión de los Planes
                    </router-link></a-menu-item
                >
            </a-sub-menu>
            <a-sub-menu v-if="acces('travelers')">
                <template #icon>
                    <UsergroupAddOutlined />
                </template>
                <template #title>Clientes</template>
                <a-menu-item>
                    <router-link :to="{ name: 'travelers' }"
                        >Gestion de Viajeros</router-link
                    >
                </a-menu-item>
                <a-menu-item>
                    <router-link :to="{ name: 'files' }">Archivos</router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
                <template #icon>
                    <LineChartOutlined />
                </template>
                <template #title>Consultas</template>
                <a-menu-item v-if="acces('fact')">
                    <router-link :to="{ name: 'invoicing' }"
                        >Facturacion</router-link
                    ></a-menu-item
                >
                <a-menu-item v-if="acces('current')"
                    ><router-link :to="{ name: 'view-current-travelers' }"
                        >Viajeros Vigentes
                    </router-link></a-menu-item
                >
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>
<script lang="ts" setup>
    import { useAuthStore } from '@/modules/auth/store/auth.store';
    import {
        SettingOutlined,
        LineChartOutlined,
        NotificationOutlined,
        UsergroupAddOutlined,
    } from '@ant-design/icons-vue';
    import { RouterLink } from 'vue-router';
    const store = useAuthStore();
    const acces = (view: string) => {
        return store.canAccess(view);
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
