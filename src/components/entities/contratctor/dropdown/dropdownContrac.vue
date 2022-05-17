<template>
    <a-select
        v-model:value="value"
        show-search
        placeholder="Seleccione al cliente"
        style="width: 200px"
        :options="options"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
    />
</template>
<script lang="ts" setup>
    import type { SelectProps } from 'ant-design-vue';
    import { onMounted, ref } from 'vue';
    import { getContractors } from '../services/contractor.service';
    import { Contractor } from '../types/modeltypes';

    type list = {
        label: string;
        value: number;
    };
    let data = ref<Contractor[]>([]);
    const select = ref<list[]>([]);
    onMounted(async () => {
        await refresh();

        select.value = data.value.map((client: Contractor) => ({
            label: client.client,
            value: client.id,
        }));
    });
    const value = ref<string | undefined>(undefined);
    const loading = ref(false);
    const options = ref<SelectProps['options']>(select.value);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const handleBlur = () => {
        console.log('blur');
    };
    const handleFocus = () => {
        console.log('focus');
    };
    /*const filterOption = (input: string, option: any) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };*/
    const refresh = async () => {
        loading.value = true;
        try {
            data.value = (await getContractors()).data;
        } catch (error) {}
        loading.value = false;
    };
</script>
