<template>
    <a-select
        v-model:value="value"
        :show-search="showSearch"
        :placeholder="placeholder"
        style="width: 200px"
        :options="data"
        :filter-option="filterOption"
    />
</template>

<script setup lang="ts">
    interface DataInterface {
        [key: string]: any;
    }

    const props = defineProps<{
        data?: Array<DataInterface>; //arreglo completo de datos
        showSearch?: boolean; //si se usa para buscar
        propertySearch?: string; //la propiedad a buscar en los objetos
        placeholder?: boolean; //el placehoder
        modelValue?: DataInterface | string | number; //el valor seleccionado
    }>();
    const value = ref(props.modelValue);
    const filterOption = (input: string, options: any) => {
        return (
            props.propertySearch &&
            options[props.propertySearch].toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
    };
    const emit = defineEmits<{
        (e: 'update:modelValue', value: DataInterface | string | number): void;
    }>();
    // const handleUpdate = (newValue: DataInterface) => {
    //     emit('update:modelValue', newValue);
    // };

    watch(
        () => props.modelValue,
        (newVal) => {
            value.value = newVal;
        },
    );

    watch(
        () => value.value,
        (newVal) => {
            if (newVal) emit('update:modelValue', newVal);
        },
    );
</script>

<style scoped></style>
