<template>
    <div class="imagen">
        <img src="../../assets/imagenes/PUBLICIDINFO.jpg" alt="Publicidad info" />
    </div>
</template>
<script lang="ts" setup>
import useRefreshTokenService from '@/modules/auth/composable/useRefreshTokenService';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/modules/auth/store/auth.store.c';
const router = useRouter();
const { clearAll } = useAuthStore();
const { postRfresh, logout } = useRefreshTokenService();

onMounted(async () => {
    const token = await postRfresh().catch(async () => await clearAll());
    if (!token) await logoutHome();
});
const logoutHome = async () => {
    await clearAll().catch(() => {
        clearAll();
    });
    //cancelInterceptor();
    router.push({ name: 'login' });
};
</script>
<style scoped>
.imagen {
    width: 96%;
    margin: 0 auto;
}

img {
    width: 100%;
    height: 50%;
}
</style>
