<template>
    <a-upload
        v-model:file-list="fileList"
        list-type="picture"
        :max-count="1"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
        <a-button>
            <upload-outlined />
            Upload (Max: 1)
        </a-button>
    </a-upload>
</template>
<script lang="ts" setup>
    import { UploadOutlined } from '@ant-design/icons-vue';
    import type { UploadProps } from 'ant-design-vue';
    import { ref } from 'vue';
    const fileList = ref<UploadProps['fileList']>([]);
</script>
