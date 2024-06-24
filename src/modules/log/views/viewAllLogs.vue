<template>
  <TableHeaderLogs :data-user ="user"/>
  <TableLogs :data ="dataLogs"/>
  <PaginationTable :total="totalLogs" @page="paginateLog"/>
</template>

<script setup lang="ts">
import useHttpMethods from '@/service/useHttpMethods';
import TableLogs from '../component/table/tableLogs.vue';
import { HeaderFilterLog, Log, LogData } from '../types/type.Log';
import TableHeaderLogs from '../component/tableHeader/tableHeaderLogs.vue';
import { User } from '@/modules/user/types/user.types';
import PaginationTable from '@/common/components/pagination/paginationTable.vue';
import { PaginationDto } from '@/common/types/pagination.type';
 const { get }= useHttpMethods()
 const dataLogs = ref<Log[]>([])
 const totalLogs = ref(0)
 const user = ref<User[]>([])
 const filter = reactive<HeaderFilterLog>({
    user:undefined,
    level:undefined,
    date:undefined,
})
onMounted(async ()=>{
  await getData();
  user.value = (await get('/user')).data
})
const paginateLog = async (pge:PaginationDto)=>{
    await getData(pge);
}
const getData = async (pge?:PaginationDto) =>{
  const { data, total} = (await get('/loggin')).data;
  dataLogs.value = data;
  totalLogs.value = total;
}
</script>

<style scoped>

</style>