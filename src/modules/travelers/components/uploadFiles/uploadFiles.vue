<template>
    <a-upload
        name="file"
        :multiple="false"
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
    import { computed } from 'vue';
    import { FileErrorsDto, FilterTravelers } from '../../types/type.traveler';
    import { addFiles } from '../../services/traveler.service';
    import { UploadOutlined } from '@ant-design/icons-vue';

    const props = defineProps<{
        contractor?: number;
    }>();

    const isDisabled = computed(() => (props.contractor ? false : true));

    const emit = defineEmits<{
        (
            e: 'response',
            response: {
                response: FileErrorsDto[] | FilterTravelers[] | void;
                header: number;
            },
        ): void;
        (e: 'isLoading', isLoading: boolean): void;
    }>();

    const sendFile = async (file: File) => {
        emit('isLoading', true);
        await addFiles(props.contractor!, file)
            .then((response) => {
                emit('response', { response: response.data, header: response.status });
            })
            .catch((err) => {
                emit('response', {
                    response: err.response.data,
                    header: err.response.status,
                });
            })
            .finally(() => emit('isLoading', false));
    };
</script>
