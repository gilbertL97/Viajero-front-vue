<template>
    <a-select
        v-model:value="country"
        show-search
        placeholder="Seleccione el Plan"
        style="width: 200px"
        :options="options"
        :filter-option="filterOption"
        @change="handleChange"
    />
</template>
<script lang="ts" setup>
    import { onMounted, reactive, ref } from 'vue';
    import type { SelectProps } from 'ant-design-vue';
    import { Plans } from '../../types/plains.types';
    import { getPlansActive } from '../../services/plan.service';

    let data = reactive<Plans[]>([]);
    const options = ref<SelectProps['options']>([]);
    const props = defineProps<{
        plainId?: number;
    }>();
    const country = ref<number | undefined>();
    const loading = ref(false);
    onMounted(async () => {
        await refresh();
        options.value = data.map((plain: Plans) => ({
            label: plain.name,
            value: plain.id,
        }));
    });

    const refresh = async () => {
        loading.value = true;
        try {
            data = (await getPlansActive()).data;
            country.value = props.plainId;
        } catch (error) {}
        loading.value = false;
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
