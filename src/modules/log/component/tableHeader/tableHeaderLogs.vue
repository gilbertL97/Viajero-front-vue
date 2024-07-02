<template>
    <div>
        <DropdownGeneric
        :data="dataUser"
        :property-search="{value:'id', label:'name'}" 
        v-model:model-value="filterUser" 
        :show-search="true"
         placeholder="Nombre de Usuario"/>
        <a-divider type="vertical" />
        <DropdownGeneric
        :data="filterData"
        :property-search="{value:'value', label:'label'}" 
        placeholder="Tipo de Log"
        v-model:model-value="filterLevel" 
        />
        <a-divider type="vertical" />
        <a-range-picker
            size="medium"
            v-model:value="filterDate"
            value-format="YYYY-MM-DD"
            format="DD/MM/YYYY"
        />
        <a-divider type="vertical" />
        <a-button type="primary" @click="deleteFilter"
            >Borrar Filtros <DeleteOutlined
        /></a-button>
        <a-divider type="vertical" />
    </div>
</template>

<script setup lang="ts">
import DropdownGeneric from '@/common/components/dropdown/dropdownGeneric.vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { User } from '@/modules/user/types/user.types';
import { HeaderFilterLog } from '../../types/type.Log';

const filter = reactive<HeaderFilterLog>({
    level:undefined,
    userId:undefined,
    createdAtInit:undefined,
    createdAtEnd:undefined,

})
const props = defineProps<{
    dataUser:User[];
}>()
    const filterUser = ref<User>();
    const filterData = ref<any[]>( [ 
        { value: 'info', label: 'Informacion' },
        { value: 'error', label: 'Error' },
        { value: 'warning', label: 'Advertencia' }
    ]);
    const filterLevel = ref<any>();
    const filterDate = ref<string[]>([]);

    const deleteFilter = () => {
        filter.userId = undefined;
        filter.createdAtInit= undefined;
        filter.level=undefined;
        filter.createdAtEnd =undefined;
        filterDate.value = [];
        filterUser.value = undefined;
        filterLevel.value=undefined;
        emit('filter',filter);
    };
    const emit = defineEmits<{
        (e: 'filter', filterLogs:HeaderFilterLog): void;
    }>()
    watch([filterUser,filterDate,filterLevel],()=>{
        if(filterDate.value?.length>1){
            filter.createdAtInit=filterDate.value[0];
            filter.createdAtEnd =filterDate.value[1];
        }
        if(filterUser.value)filter.userId=filterUser.value?.id
        if(filterLevel.value)filter.level=filterLevel.value.value
        emit('filter',filter);

    })
</script>

<style scoped>

</style>