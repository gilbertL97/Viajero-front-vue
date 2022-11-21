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
    import { onBeforeMount, ref, reactive, watch } from 'vue';
    import type { SelectProps } from 'ant-design-vue';
    import { Plans } from '../../types/plains.types';
    import { getPlans } from '../../services/plan.service';
    type select = {
        label: string;
        value: number;
    };
    const data = ref<Plans[]>([]);
    const options = ref<SelectProps['options']>([]);
    const props = defineProps<{
        plainId?: number;
        plain?: string;
        activeSelect: boolean; // esto es para seleccionar los activos
    }>();

    const plain = reactive<select>({
        label: '',
        value: 0,
    });
    const isLoading = ref(false);
    onBeforeMount(async () => {
        isLoading.value = true;
        await refresh();
        options.value = data.value.map((plain: Plans) => ({
            label: plain.name,
            value: plain.id,
            disabled: !plain.isActive,
        }));
        props.activeSelect
            ? (options.value = options.value.filter((plain) => delete plain.disabled))
            : console.log('');
        isLoading.value = false;
        plain.label = props.plain!;
        plain.value = props.plainId!;
    });

    const refresh = async () => {
        isLoading.value = true;
        try {
            data.value = (await getPlans()).data;
        } catch (error) {}
    };

    const filterOption = (input: string, options: any) => {
        return options.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange: SelectProps['onChange'] = () => {
        emit('selected', plain.value);
        console.log(plain.value);
    };
    const emit = defineEmits<{
        (e: 'selected', contractor: number): void;
    }>();
    watch(props, (newProps) => {
        plain.label = newProps.plain!;
        plain.value = newProps.plainId!;
    });
</script>
<style scoped>
    .ant-select {
        padding-left: 13px !important;
    }
</style>
