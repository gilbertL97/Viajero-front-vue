<template>
    <a-upload
        v-model:fileList="fileList"
        name="file"
        :multiple="false"
        @change="handleChange"
        :max-count="1"
        :showUploadList="false"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :disabled="disable"
    >
        <a-button>
            <upload-outlined />
            Click para subir archivo
        </a-button>
    </a-upload>
</template>
<script lang="ts" setup>
    import { message } from 'ant-design-vue';
    import { ref } from 'vue';
    import type { UploadChangeParam } from 'ant-design-vue';
    import { FileErrorsDto } from '../../types/type.traveler';
    import { addFiles } from '../../services/traveler.service';

    const contractor = ref();
    const fileList = ref([]);
    const props = defineProps<{
        disable: boolean;
    }>();

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

    const sendFile = addFiles(); ///cargar la funion del servicio lla,mar a los emit y esperar las resdpuesta
</script>
