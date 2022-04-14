<template>
  <div>
  
    <a-table
      :row-selection="{ selectedRowKeys: state.selectedRowKeys ,onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
      
    >
        <template #bodyCell="{ column,record }">
      <template v-if="column.dataIndex === 'action'">
        <a-popconfirm title="Esta seguro que desea eliminar el usuario" @confirm="onDelete(record.id)">
         <a-button type="danger" > <DeleteOutlined /></a-button>
            </a-popconfirm>
            <a-button type="primary" ><EditOutlined /> </a-button>
  
      </template>
    </template>
    
  </a-table>
  </div>
    <div style="margin-bottom: 16px">
      <a-button type="danger" :disabled="!hasSelected" :loading="state.loading" @click="deleteusers">
       Eliminar
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${state.selectedRowKeys.length} items` }}
        </template>
      </span>
    </div>
</template>
<script lang="ts" setup>
import { defineComponent, computed, ref, onMounted, reactive } from 'vue';
import  {DeleteOutlined} from '@ant-design/icons-vue';
import  {EditOutlined} from '@ant-design/icons-vue';
import {getUsers} from '../../../service/user.service';
import { User } from '@/types/modelTypes';


 let data=ref<User[]>([]);

const state = reactive<{
      selectedRowKeys:User['id'][];
      loading: boolean;
    }>({
      selectedRowKeys:[1], // Aqui configurar a columna por default
      loading: false,
    });
   
    onMounted(
     async () => {
          try {
   data.value =  (await getUsers()).data;
} catch (error) {
}
    })
 
 
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Correo',
    dataIndex: 'email',
  },
  {
    title: 'rol',
    dataIndex: 'role',
  },
 { title: 'Operaciones',
    dataIndex: 'action',
  },
];




 
   


    //const selectedRowKeys = ref<User['id'][]>([]); // Check here to configure the default column

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const deleteusers = () => {
      state.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        state.loading = false;
        state.selectedRowKeys = [];
      }, 1000);
    };
    
    const onSelectChange = (selectedRowKeys:number[]) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      
      state.selectedRowKeys = selectedRowKeys;
    };

        const onDelete = (key: number) => {
          
          console.log(data.value);
      data.value = data.value.filter(item => item.id !== key);
          console.log(data.value);
    };

</script>

<style lscoped>

</style>
