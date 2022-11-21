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
        <div class="profile">
            <a-dropdown placement="topLeft">
                <a class="ant-dropdown-link" @click.prevent>
                    <span>
                        <img
                            src="../../../assets/imagenes/user4.png"
                            alt=""
                            width="40"
                            height="40"
                        />
                    </span>
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item @click="visible = true"
                            >Cambiar contraseña</a-menu-item
                        >
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
    import FormChangePass from '@/modules/user/components/form/formChangePass.vue';
    import { ref } from 'vue';
    const visible = ref(false);
    const setVisible = (set: boolean) => {
        visible.value = set;
    };
</script>

<style scoped>
    .ant-layout-header {
        margin-bottom: 15px;
        padding-bottom: 6px;
        background: #1b1462;
        height: 90px;
    }
    .sello {
        float: left;
        margin-top: 0%;
    }
    .profile {
        float: right;
        border-radius: 50%;
        padding-top: 1%;
    }
</style>
