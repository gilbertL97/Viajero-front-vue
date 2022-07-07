<template>
    <a-select
        v-model:value="contractor"
        show-search
        placeholder="Seleccione al cliente"
        style="width: 200px"
        :options="options"
        :filter-option="filterOption"
        firstActiveValue
        @change="handleChange"
    />
</template>
<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import { getContractors } from '../../services/contractor.service';
    import { Contractor } from '../../types/contractor.types';
    import type { SelectProps } from 'ant-design-vue';

    let data = ref<Contractor[]>([]);
    const options = ref<SelectProps['options']>([]);
    onMounted(async () => {
        await refresh();

        options.value = data.value.map((client: Contractor) => ({
            label: client.client,
            value: client.id,
        }));
    });
    const contractor = ref<number | undefined>();
    const loading = ref(false);

    const refresh = async () => {
        loading.value = true;
        try {
            data.value = (await getContractors()).data;
        } catch (error) {}
        loading.value = false;
    };
    const filterOption = (input: string, options: any) => {
        return options.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange: SelectProps['onChange'] = (value) => {
        emit('selected', contractor.value);
        console.log(contractor.value, value);
    };
    const emit = defineEmits<{
        (e: 'selected', contractor: number | undefined): void;
    }>();
</script>
<style scoped>
    .ant-select {
        padding-left: 13px !important;
    }
</style>
