<template>
    <div>
<a-table
            :columns="columns"
            :data-source="props.data"
            size="small"
            :loading="props.loading"
            :row-class-name="(_record:any, index:any) => (index % 2 === 1 ? 'table-striped' : null)"
            :scroll="{ y: 400, x: 2200 }"
            :pagination="false"
            >
            <template #customFilterIcon><slot></slot></template>
            <template #bodyCell="{ column, record }">
            </template>
        </a-table>
    </div>
</template>

<script setup lang="ts">
import { Log } from '../../types/type.Log';


   const props = defineProps<{
        data: Log[]
        loading?: boolean ;
    }>();
const columns = [
  {
    title: 'Mensaje',
    dataIndex: 'message', 
    width: 300,
  },
  {
    title: 'Contexto',
    dataIndex: 'context',
  },
  {
    title: 'Nivel',
    dataIndex: 'level',
  },
  {
    title: 'Fecha',
    dataIndex: 'createdAt',
  },
  {
    title: 'Origen',
    dataIndex: 'userAgent',
    width: 300,
  },
  {
    title: 'IP',
    dataIndex: 'ip',
  },
  {
    title: 'Método',
    dataIndex: 'method',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    width: 250,
  },
  {
    title: 'Usuario',
    dataIndex: 'userId',
  },
  {
      title: 'Pila de Error', 
      dataIndex: 'errorStack',
    },
];
</script>

<style scoped>

</style>