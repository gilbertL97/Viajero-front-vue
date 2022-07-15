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
    import { onMounted, reactive, ref } from 'vue';
    import { getContractors } from '../../services/contractor.service';
    import { Contractor } from '../../types/contractor.types';
    import type { SelectProps } from 'ant-design-vue';

    let data = reactive<Contractor[]>([]);
    const options = ref<SelectProps['options']>([]);
    const props = defineProps<{
        contractorId?: number;
    }>();
    const contractor = ref<number | undefined>();
    onMounted(async () => {
        await refresh();

        options.value = data.map((client: Contractor) => ({
            label: client.client,
            value: client.id,
        }));
        contractor.value = props.contractorId;
        console.log(contractor.value);
    });
    const isloading = ref(false);

    const refresh = async () => {
        isloading.value = true;
        try {
            data = (await getContractors()).data;
        } catch (error) {}
        isloading.value = false;
    };
    const filterOption = (input: string, options: any) => {
        return options.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange: SelectProps['onChange'] = (value) => {
        emit('update:contractor', value);
        console.log(value);
    };

    const emit = defineEmits(['update:contractor']);
</script>
<style scoped>
    .ant-select {
        padding-left: 13px !important;
    }
</style>
