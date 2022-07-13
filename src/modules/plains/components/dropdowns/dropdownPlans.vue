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
    import { onMounted, ref } from 'vue';
    import type { SelectProps } from 'ant-design-vue';
    import { Plans } from '../../types/plains.types';
    import { getPlansActive } from '../../services/plan.service';

    let data = ref<Plans[]>([]);
    const options = ref<SelectProps['options']>([]);
    const props = defineProps<{
        plainId?: number;
    }>();
    onMounted(async () => {
        await refresh();

        options.value = data.value.map((plain: Plans) => ({
            label: plain.name,
            value: plain.id,
        }));
    });
    const country = ref<number | undefined>();
    const loading = ref(false);

    const refresh = async () => {
        loading.value = true;
        try {
            data.value = (await getPlansActive()).data;
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
    /*  const emit = defineEmits<{
        (e: 'selected', contractor: string | undefined): void;
    }>();*/
</script>
<style scoped>
    .ant-select {
        padding-left: 13px !important;
    }
</style>
