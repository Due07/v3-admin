<template>
    <LayoutForm ref="layoutForm" :form-data="form" :column="column">
        <template #ce="{ i, form: forms }">
            {{ JSON.stringify(i) }}
            {{ JSON.stringify(forms) }}
        </template>
    </LayoutForm>

    <!-- :upload-url="uploadUrl" -->
    <el-button type="primary" size="default" @click="click">123</el-button>
    <FileUpload ref="fileUpload" v-model:form-data="form" :column="{value: 'aa', fileType: 'image'}">
    </FileUpload>

</template>
<script setup lang="ts">
import LayoutForm from '@/components/layout/Form/Form.vue';
import FileUpload from '@/components/widget/FileUpload/index.vue';
import { formData, column } from '@/components/layout/Form/test';
import { reactive, ref } from 'vue';

const form = reactive(formData);

// const uploadUrl = async() => {
//     const value = await new Promise((res) => {
//         setTimeout(() => {
//             res({ name: 'asd', file: 4 });
//         }, (1000));
//     });
//     return value;
// };
// TODO: test
const fileUpload = ref();
const click = () => {
    fileUpload.value.resetFileList();
};
</script>
<style scoped lang="scss">
</style>
