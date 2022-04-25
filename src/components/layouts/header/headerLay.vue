<template>
    <a-layout-header class="header" :style="{ zIndex: 1, width: '100%' }">
        <div class="sello">
            <img
                src="../../../assets/imagenes/sello/blanco.png"
                alt=""
                width="70"
                height="70"
            />
        </div>
        <div class="profile">
            <span>
                <img
                    src="../../../assets/imagenes/user4.png"
                    alt=""
                    width="40"
                    height="40"
                />
            </span>
        </div>
    </a-layout-header>
</template>

<script setup lang="ts"></script>

<style scoped>
    .ant-layout-header {
        margin-bottom: 15px;
        padding-bottom: 6px;
        background: #1b1462;
    }
    .sello {
        float: left;
        margin-top: 0%;
    }
    .profile {
        float: right;
        border-radius: 50%;
    }
</style>
