<template>
    <a-layout-sider>
        <a-menu mode="vertical">
            <a-sub-menu key="sub1" v-if="acces('massive-import')">
                <template #icon>
                    <SettingOutlined />
                </template>

                <template #title>Administración</template>
                <a-menu-item v-if="acces('users')">
                    <router-link :to="{ name: 'users' }">
                        Gestión de Usuarios
                    </router-link></a-menu-item
                >
                <a-menu-item v-if="acces('users')">
                    <router-link :to="{ name: 'users' }">
                        Exportar fichero insertados manualmente
                    </router-link></a-menu-item
                >
                <a-menu-item v-if="acces('users')">
                    <router-link :to="{ name: 'view-logs' }">
                      Ver Registros del Sistema
                    </router-link></a-menu-item
                >
                <a-menu-item v-if="acces('users')">
                    <router-link :to="{ name: 'config' }">
                        Configuración
                    </router-link></a-menu-item
                >
                <a-menu-item v-if="acces('massive-import')" @click="downloadZipFile()"
                    >Ejecución de Importación Automática
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu>
                <template #icon>
                    <NotificationOutlined />
                </template>
                <template #title>Gestión</template>
                <a-menu-item v-if="acces('clients')"
                    ><router-link :to="{ name: 'clients' }">
                        Clientes</router-link
                    ></a-menu-item
                >
                <a-menu-item v-if="acces('plains')"
                    ><router-link :to="{ name: 'plains' }">
                        Planes
                    </router-link></a-menu-item
                >
                <a-menu-item v-if="acces('travelers')">
                    <router-link :to="{ name: 'travelers' }">Viajeros</router-link>
                </a-menu-item>
                <a-menu-item v-if="acces('travelers')">
                    <router-link :to="{ name: 'files' }">Archivos</router-link>
                </a-menu-item>
                <a-menu-item v-if="store.canAccess('upload')">
                    <router-link :to="{ name: 'upload' }">Subir Ficheros</router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
                <template #icon>
                    <LineChartOutlined />
                </template>
                <template #title>Reportes</template>
                <a-menu-item v-if="acces('fact')">
                    <router-link :to="{ name: 'invoicing' }"
                        >Facturación</router-link
                    ></a-menu-item
                >
                <a-menu-item v-if="acces('current')"
                    ><router-link :to="{ name: 'detailed' }"
                        >Detallado
                    </router-link></a-menu-item
                >
                <a-menu-item v-if="acces('current')"
                    ><router-link
                        :to="{
                            name: 'view-current-travelers',
                            params: { current: 'true' },
                        }"
                        >Viajeros Vigentes
                    </router-link></a-menu-item
                >
                <a-menu-item v-if="acces('current')"
                    ><router-link
                        :to="{ name: 'policies'}"
                        >Resumen de Pólizas
                    </router-link></a-menu-item
                >
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>
<script lang="ts" setup>
    import { useAuthStore } from '@/modules/auth/store/auth.store.c';
    import {
        SettingOutlined,
        LineChartOutlined,
        NotificationOutlined,
    } from '@ant-design/icons-vue';
    import { RouterLink } from 'vue-router';
    import useZipFile from '@/common/composable/exportZipFile';
    const store = useAuthStore();
    const acces = (view: string) => {
        return store.canAccess(view);
    };
    const { downloadZipFile } = useZipFile();
</script>
<style scoped>
    .ant-layout-sider {
        min-width: 0;
        background: #ffffff !important;
        border-right: 1px solid #f0f0f0 !important;
        transition: all 0.2s;
        text-align: left;
    }
    .ant-menu .ant-menu-item,
    .ant-menu .ant-menu-submenu-title {
        text-align: left;
    }
</style>
