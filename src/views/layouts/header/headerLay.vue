<template>
    <a-layout-header class="header" :style="{ zIndex: 1, width: '100%' }">
        <div class="sello">
            <router-link :to="{ path: '/home' }">
                <img
                    src="../../../assets/imagenes/sello/blanco.png"
                    alt=""
                    width="80"
                    height="80"
                />
            </router-link>
        </div>
        <div class="logo">
            <router-link :to="{ path: '/home' }">
                <img
                    src="../../../assets/imagenes/logogenericosinletras.png"
                    alt="logoEsicuba"
                    width="120"
                    height="50"
                />
            </router-link>
        </div>
        <div class="profile">
            <a-dropdown placement="topLeft">
                <a class="ant-dropdown-link" @click.prevent>
                    <span>
                        <img
                            src="../../../assets/imagenes/user4.png"
                            alt=""
                            width="45"
                            height="45"
                        />
                    </span>
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item @click="visible = true"
                            >Cambiar contraseña</a-menu-item
                        >
                        <a-menu-item @click="logout">Cerrar Sesión</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </a-layout-header>
    <a-modal
        v-model:visible="visible"
        title="Cambio de Contraseña"
        :destroyOnClose="true"
        :footer="null"
    >
        <FormChangePass @visible="setVisible"
    /></a-modal>
</template>

<script setup lang="ts">
    import FormChangePass from '@/modules/auth/components/form/formChangePass.vue';
    import { ref } from 'vue';
    import useRefreshTokenService from '@/modules/auth/composable/useRefreshTokenService';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const { logout2 } = useRefreshTokenService();
    const visible = ref(false);
    const setVisible = (set: boolean) => {
        visible.value = set;
    };
    const logout = async () => {
        await logout2();
        //cancelInterceptor();
        router.push({ name: 'login' });
    };
</script>

<style scoped>
    .ant-layout-header {
        margin-bottom: 15px;
        padding-bottom: 6px;
        background: #1b1462;
        height: 5rem;
        display: flex;

        align-items: center;
    }
    .sello {
        margin-top: 0%;
    }
    .logo {
    }
    .profile {
        margin-left: auto;
        border-radius: 50%;
    }
</style>
