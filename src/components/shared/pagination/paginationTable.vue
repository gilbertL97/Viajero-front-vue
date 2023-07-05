<template>
    <a-pagination v-model:current="current" :total="50" show-less-items />
</template>
<script setup lang="ts">
    const current = ref(2);
</script>

<style scoped></style>
