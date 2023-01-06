<template>
    <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="false"
        @change="handleChange"
        @drop="handleDrop"
    >
        <p class="ant-upload-drag-icon">
            <inbox-outlined />
        </p>
        <p class="ant-upload-text"
            >Click o arrastre y suelte un archivo a esta area para subir
        </p>
    </a-upload-dragger>
</template>
<script lang="ts" setup>
    import { InboxOutlined } from '@ant-design/icons-vue';
    import { message } from 'ant-design-vue';
    import { ref } from 'vue';
    import type { UploadChangeParam } from 'ant-design-vue';

    const fileList = ref([]);
    const handleDrop = (e: DragEvent) => {
        console.log(e);
    };

    const handleChange = (info: UploadChangeParam) => {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };
</script>
