<template>
    <a-radio-group v-model:value="sex">
        <a-radio value="M">Masculino</a-radio>
        <a-radio value="F">Femenino</a-radio>
    </a-radio-group></template
>
<script setup lang="ts">
    const props = defineProps<{ sex?: string }>();
    watch(props, () => {
        
    })
    defineEmits(['update:sex']);
</script>

<style scoped></style>
