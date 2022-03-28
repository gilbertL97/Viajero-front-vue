<template>

    <div>
<h1>Bienvenido {{store.getUserInfo?.name}} </h1>
    </div>
    <sidenavbar-vue/>
</template>

<script setup lang="ts">
import { useAuthStore} from '../../store/auth.store'
import sidenavbarVue from '../sidenavbar.vue';
const store= useAuthStore();


</script>

<style scoped>

</style>