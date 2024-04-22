<template>
    <a-select
        v-model:value="plain.value"
        v-model:label="plain.label"
        show-search
        placeholder="Seleccione el Plan"
        style="width: 200px"
        :options="options"
        :filter-option="filterOption"
        @change="handleChange"
        :loading="isLoading"
    />
</template>
<script lang="ts" setup>
    import { onBeforeMount } from 'vue';
    import type { SelectProps } from 'ant-design-vue';
    import { Plans } from '../../types/plains.types';
    import { getPlans } from '../../services/plan.service';
    type select = {
        label: string;
        value: number;
    };
    const options = ref<SelectProps['options']>([]);
    const props = defineProps<{
        data:Plans[]
        plainId?: number;
        plain?: string;
        activeSelect: boolean; // esto es para seleccionar los activos
    }>();

    const plain = reactive<select>({
        label: '',
        value: 0,
    });
    const isLoading = ref(false);
    onMounted(() => {
        asignData()
    });

    
    const asignData=()=>{  
        options.value = props.data;
        isLoading.value = true;
        options.value = props.data.map((plain: Plans) => ({
            label: plain.name,
            value: plain.id,
            disabled: !plain.isActive,
        }));
        props.activeSelect ??
            (options.value = options.value.filter((pla: { disabled: any; }) => delete pla.disabled));

        isLoading.value = false;
        plain.label = props.plain!;
        plain.value = props.plainId!;
    }
    const filterOption = (input: string, options: any) => {
        return options.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange: SelectProps['onChange'] = () => {
        emit('selected', plain.value);
    };
    const emit = defineEmits<{
        (e: 'selected', contractor: number): void;
    }>();
    watch(props, (newProps) => {
        plain.label = newProps.plain!;
        plain.value = newProps.plainId!;
    });
    watch(()=>props.data,()=>{
        console.log(props.data)
        asignData();
    })
</script>
<style scoped></style>
