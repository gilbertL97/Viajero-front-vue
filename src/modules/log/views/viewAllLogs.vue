<template>
  <TableLogs :data ="data"/>
</template>

<script setup lang="ts">
import useHttpMethods from '@/service/useHttpMethods';
import TableLogs from '../component/table/tableLogs.vue';
import { Log } from '../types/type.Log';
 const { get }= useHttpMethods()
 const data = ref<Log[]>([])
onMounted(async ()=>{
 data.value = (await get('/loggin')).data.data;
})
</script>

<style scoped>

</style>