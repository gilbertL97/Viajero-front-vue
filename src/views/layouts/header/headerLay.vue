<template>
    <a-layout-header class="header" :style="{ zIndex: 1, width: '100%' }">
        <div class="sello">
            <img
                src="../../../assets/imagenes/sello/blanco.png"
                alt=""
                width="95"
                height="95"
            />
        </div>
        <div class="logo">
            <img
                src="../../../assets/imagenes/logogenericosinletras.png"
                alt="logoEsicuba"
                width="120"
                height="50"
            />
        </div>
        <div class="profile">
            <a-dropdown placement="topLeft">
                <a class="ant-dropdown-link" @click.prevent>
                    <span>
                        <img
                            src="../../../assets/imagenes/user4.png"
                            alt=""
                            width="50"
                            height="50"
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
    import { useAuthStore } from '@/modules/auth/store/auth.store';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const store = useAuthStore();
    const visible = ref(false);
    const setVisible = (set: boolean) => {
        visible.value = set;
    };
    const logout = () => {
        store.logout;
        router.push({ name: 'login' });
    };
</script>

<style scoped>
    .ant-layout-header {
        margin-bottom: 15px;
        padding-bottom: 6px;
        background: #1b1462;
        height: 90px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .sello {
        margin-top: 0%;
    }
    .logo {
    }
    .profile {
        border-radius: 50%;
    }
</style>
