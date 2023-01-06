<template>
    <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="false"
        action =
        @change="handleChange"
        @drop="handleDrop"
        :max-count="1"
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
    import { FileErrorsDto } from '../../types/type.traveler';

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
            message.success(`${info.file.name} subido correctamente`);
        } else if (status === 'error') {
            message.error(
                `${info.file.name} ha ocurrido un fallo en la subida de archivos.`,
            );
        }
    };
        const emit = defineEmits<{
        (e: 'fileError', fileErrors: FileErrorsDto[]): void;
        (e: 'isOkResponse', boolean: number | number[] | undefined): void;
    }>();
    const sendFile = add///cargar la funion del servicio lla,mar a los emit y esperar las resdpuesta
</script>