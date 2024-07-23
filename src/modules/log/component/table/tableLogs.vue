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
            <template #bodyCell="{text, record, index, column}">
              <template v-if="column.dataIndex == 'userId'">
              {{ getUserName(record.userId) }}
              </template>
              <template v-if="column.dataIndex == 'errorStack' && (record.errorStack && record.errorStack!='-')">     
              <a-tooltip>
                <template #title>ver Pila de Error</template>
                    <a-button type="primary" danger @click="emits('viewError',index)">
                        <template #icon>
                          <EyeOutlined/>
                        </template>
                    </a-button>
              </a-tooltip>
           </template>
          </template>
        </a-table>
    </div>
</template>

<script setup lang="ts">
import { User } from '@/modules/user/types/user.types';
import { Log } from '../../types/type.Log';
import { EyeOutlined } from '@ant-design/icons-vue';

   const props = defineProps<{
        data: Log[]
        loading?: boolean ;
        userData:User[];
    }>();
const columns = [
{
    title: 'Usuario',
    dataIndex: 'userId',
  },
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
      title: 'Pila de Error', 
      dataIndex: 'errorStack',
    },
];
const emits = defineEmits<{
  (e: 'viewError', id:number): void;
}>()
 const getUserName=(id:number):string => {
  console.log(id);
  if(id){
    const user = props.userData.find(user=>{
    if(user.id==id)
    {
      console.log(user);
      return user
    }
    })
    return user ? user.name : '-'
  }
  return '-'
 }
</script>

<style scoped>

</style>