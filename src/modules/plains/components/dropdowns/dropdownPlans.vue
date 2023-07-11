<template>
    <a-select
        v-model:value="plain.id"
        v-model:label="plain.name"
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
    const data = ref<Plans[]>([]);
    const options = ref<SelectProps['options']>([]);
    const props = defineProps<{
        plainObject: Plans;
        activeSelect: boolean; // esto es para seleccionar los activos
    }>();

    const plain = reactive<Plans>({
        id: undefined,
        name: undefined,
        isActive: true,
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
        props.activeSelect ??
            (options.value = options.value.filter((plain) => delete plain.disabled));

        isLoading.value = false;
        plain.id = props.plainObject.id;
        plain.name = props.plainObject.name;
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
        emit('selected', plain.id!);
    };
    const emit = defineEmits<{
        (e: 'selected', contractor: number): void;
    }>();
    watch(props, (newProps) => {
        plain.id = newProps.plainObject.id;
        plain.name = newProps.plainObject.name;
    });
</script>
<style scoped></style>
