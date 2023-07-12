<template>
    <a-pagination
        v-model:current="currentPag.page"
        :total="props.total"
        :show-size-changer="false"
        size="small"
        @change="onChange"
        :show-total="(total:number) => `Total ${total} `"
    />
</template>
<script setup lang="ts">
    import { PaginationDto } from '@/common/types/pagination.type';

    const props = defineProps<{
        total: number;
    }>();
    const currentPag = reactive<PaginationDto>({
        limit: 10,
        page: 1,
    });
    const emits = defineEmits<{
        (e: 'page', current: PaginationDto): void;
    }>();
    const onChange = (current: number) => {
        console.log(current);
        currentPag.page = current;
        emits('page', currentPag);
    };
    watch([() => props.total], () => (currentPag.page = 1));
</script>

<style scoped></style>
