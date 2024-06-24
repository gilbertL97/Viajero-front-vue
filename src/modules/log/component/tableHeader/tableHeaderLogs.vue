<template>
    <div>
        <DropdownGeneric
        :data="dataUser"
        :property-search="{value:'id', label:'name'}" 
        v-model:model-value="filterUser" 
        :show-search="true"/>
        <a-divider type="vertical" />
        <DropdownGeneric
        :data="filterLevel"
        :property-search="{value:'', label:''}" 
        v-model:model-value="filterLevel" 
        />
        <a-divider type="vertical" />
        <a-range-picker
            size="small"
            v-model:value="filterDate"
            value-format="YYYY-MM-DD"
            format="DD/MM/YYYY"
        />
        <a-button type="primary" @click="deleteFilter"
            >Borrar Filtros <DeleteOutlined
        /></a-button>
        <a-divider type="vertical" />
    </div>
</template>

<script setup lang="ts">
import DropdownGeneric from '@/common/components/dropdown/dropdownGeneric.vue';
import { User } from '@/modules/user/types/user.types';
import { HeaderFilterLog } from '../../types/type.Log';

const filter = reactive<HeaderFilterLog>({
    user:undefined,
    level:undefined,
    date:undefined,
})
const props = defineProps<{
    dataUser:User[];
}>()
    const filterUser = ref<User>();
    const filterLevel = ref<any[]>( [ 
        { value: 'info', label: 'Informacion' },
        { value: 'error', label: 'Error' },
        { value: 'warning', label: 'Advertencia' }
    ]);
    const filterDate = ref<string[]>();

    const deleteFilter = () => {
        filter.user =undefined;


    };
</script>

<style scoped>

</style>