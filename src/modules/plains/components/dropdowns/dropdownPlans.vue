<template>
    <a-select
        v-model:value="plain.name"
        show-search
        placeholder="Seleccione el Plan"
        style="width: 200px"
        :options="options"
        :filter-option="filterOption"
        @change="handleChange"
        :loading="isLoading"
    >
        <a-select-option v-for="item in data" :key="item.id">{{
            item.name
        }}</a-select-option>
    </a-select>
</template>
<script lang="ts" setup>
    import { onBeforeMount, reactive, ref } from 'vue';
    import type { SelectProps } from 'ant-design-vue';
    import { Plans } from '../../types/plains.types';
    import { getPlansActive } from '../../services/plan.service';

    let data = reactive<Plans[]>([]);
    const options = ref<SelectProps['options']>([]);
    const props = defineProps<{
        plain?: Plans | null;
    }>();
    const plain = ref(props.plain!);
    const isLoading = ref(false);
    onBeforeMount(async () => {
        isLoading.value = true;
        await refresh();
        options.value = data.map((plain: Plans) => ({
            label: plain.name,
            value: plain.id,
        }));
        isLoading.value = false;
    });

    const refresh = async () => {
        isLoading.value = true;
        try {
            data = (await getPlansActive()).data;
        } catch (error) {}
    };
    const filterOption = (input: string, options: any) => {
        return options.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange: SelectProps['onChange'] = (value) => {
        emit('update:plain', value);
        console.log(value);
    };
    const emit = defineEmits(['update:plain']);
</script>
<style scoped>
    .ant-select {
        padding-left: 13px !important;
    }
</style>
