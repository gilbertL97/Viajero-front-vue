<template>
    <a-upload
        name="file"
        :multiple="false"
        @change="handleChange"
        :max-count="1"
        :action="sendFile"
        :showUploadList="false"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    >
        <a-button :disabled="isDisabled">
            <upload-outlined />
            Click para subir archivo
        </a-button>
    </a-upload>
</template>
<script lang="ts" setup>
    import { message } from 'ant-design-vue';
    import { computed, ref } from 'vue';
    import type { UploadChangeParam } from 'ant-design-vue';
    import { FileErrorsDto } from '../../types/type.traveler';
    import { addFiles } from '../../services/traveler.service';
    import { UploadOutlined } from '@ant-design/icons-vue';

    const props = defineProps<{
        contractor?: number;
    }>();
    const loading = ref(false);
    const isValid = ref(false);
    const isDisabled = computed(() => (props.contractor ? false : true));

    const handleChange = (info: UploadChangeParam) => {
        const status = info.file.status;
        if (status !== 'uploading') {
            loading.value = true;
        }
        if (status === 'done') {
            message.success(`${info.file.name} subido correctamente`);
            loading.value = false;
        } else if (status === 'error') {
            message.error(
                `${info.file.name} ha ocurrido un fallo en la subida de archivos.`,
            );
            loading.value = false;
        }
    };
    const emit = defineEmits<{
        (e: 'fileError', fileErrors: FileErrorsDto[]): void;
        (e: 'isOkResponse', boolean: number | number[] | undefined): void;
    }>();

    const sendFile = (file: File) => {
        addFiles(props.contractor!, file).then((response) => {
            emit()
        }); ///cargar la funion del servicio lla,mar a los emit y esperar las resdpuesta
    };
</script>
