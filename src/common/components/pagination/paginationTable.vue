<template>
    <a-pagination
        v-model:current="currentPag.page"
        :total="props.total"
        :page-size-options="pageSizeOptions"
        size="small"
        @change="onChange"
        :show-total="(total:number) => `Total ${total} `"
    />
</template>
<script setup lang="ts">
    import { PaginationDto } from '@/common/types/pagination.type';
    const pageSizeOptions = ref<string[]>(['10', '20', '50']);
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
    const onChange = (current: number, pageSize: number) => {

        currentPag.page = current;
        currentPag.limit = pageSize;
        emits('page', currentPag);
    };
    watch([() => props.total], () => (currentPag.page = 1));
</script>

<style scoped></style>
