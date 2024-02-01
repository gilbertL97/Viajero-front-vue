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
    const { logout } = useAuthStore();
    const { postRfresh, logout2 } = useRefreshTokenService();

    onMounted(async () => {
        const token = await postRfresh().catch(async () => await logout());
        if (!token) await logoutHome();
    });
    const logoutHome = async () => {
        await logout2().catch((err) => {
            if (err.status == 403) console.log(err);
            logout();
        });
        //cancelInterceptor();
        router.push({ name: 'login' });
    };
</script>
<style scoped>
    .imagen {
        background: url(../images/icon-cart.png) no-repeat;
    }
    .imagen {
        width: 96%;
        margin: 0 auto;
    }
    img {
        width: 100%;
        height: 50%;
    }
</style>
