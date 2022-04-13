<template>
  <a-layout>
    <header-vue/>
    <a-layout>
         <sidebar-index/> 
      <a-layout-content>            <img src="../../assets/imagenes/PUBLICIDADVIAJES+INFO.jpg" alt="" width="400" height="500"></a-layout-content>
    </a-layout>
      <footer-index/>
</a-layout>
</template>
<script lang="ts" setup>

import sidebarIndex from '../shared/sidebar/sidebar.vue';
import headerVue from '../shared/header/header.vue';
import footerIndex from '../shared/footer/footer.vue'
/*import  table  from '../tableUser/dataTable.vue';*/

</script>
<style scoped>

</style>
