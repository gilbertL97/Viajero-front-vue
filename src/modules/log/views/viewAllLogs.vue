<template>
  <TableHeaderLogs :data-user="user"  @filter="filterLog"/>
  <TableLogs :data ="dataLogs" :loading="loading" @viewError="openErrorModal" :user-data="user" />
  <PaginationTable :total="totalLogs" @page="paginateLog"/>
  <a-modal
        v-model:open="viewError"
        title="Ver Error "
        :destroyOnClose="true"
        :footer="null"
        width="50rem"
    >
    >     <a-typography-text type="danger" code> {{dataLogs[indexError].errorStack}} </a-typography-text>
    </a-modal>
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
 const loading =ref(false);
 const totalLogs = ref(0)
 const user = ref<User[]>([])
 const indexError = ref(0)
 const viewError =ref(false);
  const filter = reactive<HeaderFilterLog>({
    level:undefined,
    userId:undefined,
    createdAtInit:undefined,
    createdAtEnd:undefined,

})
onMounted(async ()=>{
  await getData();
  user.value = (await get('/user')).data
})
const paginateLog = async (pge:PaginationDto)=>{
    await getData(pge,filter);
}
const getData = async (pge?:PaginationDto,filter?:HeaderFilterLog) =>{
  loading.value = true;
  const { data, total} = (await get('/loggin',{...pge, ...filter})).data;
  dataLogs.value = data;
  totalLogs.value = total;
  loading.value = false;
}
const filterLog = async (filters:HeaderFilterLog) =>{
  const {level,userId,createdAtEnd,createdAtInit} = filters;
  filter.level = level;
  filter.userId = userId;
  filter.createdAtEnd = createdAtEnd;
  filter.createdAtInit = createdAtInit;
 await getData(undefined,filter);
}
const openErrorModal = (viewIDError:number)=>{
  indexError.value = viewIDError;
  viewError.value = true
}
</script>

<style scoped>

</style>