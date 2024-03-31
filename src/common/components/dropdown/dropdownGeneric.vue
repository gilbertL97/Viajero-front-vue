<template>
    <a-select
        v-model:value="value.value"
        v-model:label="value.label"
        :show-search="showSearch"
        label-in-value
        :placeholder="placeholder"
        style="width: 200px"
        :options="data"
        :field-names="propertySearch"
        @change="handleChange"
        :filter-option="filterOption"
    />
</template>

<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue';
//terminar este coponente generico
    interface propToSearch { 
        label: string, value: string, options?: string,disabled?: string
    }
    type Select = {
        label: string | undefined|null;
        value: number | number[] | undefined;
    };
    const props = defineProps<{
        data?: any[]; //arreglo completo de datos
        showSearch?: boolean; //si se usa para buscar
        propertySearch: propToSearch; //la propiedad a buscar en los objetos
        placeholder?: string; //el placehoder
        modelValue?: any// | string | number; //el valor seleccionado
    }>();
    const value = reactive<Select>({
        label:undefined,
        value:undefined,
    });
//TODO terminarn el filter option
    const filterOption = (input: string, option: any) => {
        return (
            option[props.propertySearch.label].toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
    };
    const emit = defineEmits<{
        (e: 'update:modelValue', value: any): void;
    }>();
    // const handleUpdate = (newValue: DataInterface) => {
    //     emit('update:modelValue', newValue);
    // };

    watch(
       () => props.modelValue,
        (newVal) => {
            if(props.modelValue){
            value.label = newVal[props.propertySearch.label];
            value.value = newVal[props.propertySearch.value];}
            else {
                value.label = undefined;
                value.value =undefined;
            }
            console.log(value)
        },
    );
    const handleChange: SelectProps['onChange'] = (value2: any) => {
        value.label = value2.label;
        value.value = value2.value;// { key: "lucy", label: "Lucy (101)" }
        const selected = props.data?.find(v=>v[props.propertySearch.value]==value.value);
        emit('update:modelValue',selected);
};

</script>

<style scoped></style>
