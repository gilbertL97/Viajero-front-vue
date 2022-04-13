<template>
     <a-layout-sider >
    <a-menu  
    mode="vertical">
      <a-sub-menu key="sub1">
        <template #icon>
          <SettingOutlined />
        </template>

        <template #title>Administracion</template>
        <a-menu-item key="7">Gestion de Usuarios</a-menu-item>
      </a-sub-menu>
      
      <a-sub-menu key="sub2">
        <template #icon>
          <NotificationOutlined />
        </template>
        <template #title>Mercadotecnia</template>
        <a-menu-item key="7">Gestion de Clientes</a-menu-item>
      </a-sub-menu>
           <a-sub-menu key="sub3">
        <template #icon>
          <LineChartOutlined/>
        </template>

        <template #title>Consultas</template>
        <a-menu-item key="7">Clientes</a-menu-item>
        <a-menu-item key="8">Usuarios</a-menu-item>
      </a-sub-menu>
         <a-sub-menu key="sub4">
        <template #icon>
          <UsergroupAddOutlined/>
        </template>
        <template #title>Ventas</template>
        <a-menu-item key="7">Gestion de Viajeros</a-menu-item>
      </a-sub-menu>
    </a-menu>
    </a-layout-sider>
</template>
<script lang="ts" setup>
import {
  SettingOutlined,
  LineChartOutlined,
  NotificationOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons-vue';


 


</script>
<style>
.ant-layout-sider {
  min-width: 0;
  background: #FFFFFF;
  transition: all 0.2s;
}</style>

