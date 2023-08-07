<template>
  <section class="file-upload relative" @click="fileInput.click()">
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <i-ep-upload-filled class="upload-icon"/>
      <div class="file-upload-text">将文件拖到此处，或<em>点击上传</em></div>
    </template>
    <input
      ref="fileInput"
      class="file-input absolute"
      type="file"
      :accept="props.fileUploadInput?.accept"
      :disabled="inputDisabled"
      :multiple="props.fileUploadInput?.multiple"
      @change="onChange"
    />
  </section>
  <template v-if="$slots.preview">
    <slot name="preview" :column="props.column" :form-data="props.formData" :file-list="fileList"></slot>
  </template>
  <template v-else>
    <section class="file-upload-list">
      <template v-if="props.column.fileType === 'image'">
        <PicturePreview :list="fileList" @delete="previewDelete"/>
      </template>
      <template v-else>
        <el-tag
          v-for="(tag, index) in fileList"
          :key="tag.name"
          :type="tag?.type"
          class="mx-1"
          closable
          @close="fileList.splice(index, 1)"
        >
          {{ tag.name }}
        </el-tag>
      </template>
    </section>
  </template>
</template>

<script lang="ts" setup>
// import { IColumn } from '@/components/layout/Form/type';
// import { judgmentType } from '@/scripts/base/methods';
import { ElMessage } from 'element-plus';
import PicturePreview from '@/components/widget/PicturePreview/index.vue';
import { onMounted, reactive, ref } from 'vue';
import { IColumn, IFileObj, Input } from './type';
import { clearReactive } from '@/scripts/base/utils';
import { blobToBase64 } from '@/scripts/base/methods';

/**
 * @param acceptRegExp 过滤正则
 * @param uploadSize 上传数量
 * @param uploadUrl 上传函数方法
 * @param fileSize 上传 KB 大小
 */
export interface IProps {
  column: IColumn,
  formData: Object,
  fileUploadInput?: Input,
  acceptRegExp?: RegExp | string,
  uploadSize?: Record<'min' | 'max', number>,
  uploadUrl?: Function,
  fileSize?: number, // 上传 KB 大小
}

const props = withDefaults(defineProps<IProps>(), {
  formData: () => ({}),
  fileUploadInput: () => ({
    accept: 'image/*', // 上传类型
    multiple: false, // 是否多选
  }),
  acceptRegExp: '.*',
  uploadSize: () => ({min: 1, max: 1}),
});

const emits = defineEmits<{
  (e: 'update:formData', formData: object): void,
}>();

const fileList: Array<IFileObj> = reactive([]);

let inputDisabled = false;

const fileInput = ref();
const onChange = async (event: Event) => {
  const { files } = event.target as HTMLInputElement;
  console.log(files);
  const handleFileList = [];
  inputDisabled = true;

  for (const iterator of [...Object.values(files || [])]) {
    const suffix = iterator.name.split('.').pop();
    if (new RegExp(props.acceptRegExp).test(`.${suffix}`)) {
      //  文件大小判断
      if (props.fileSize && (iterator.size / 1024 > props.fileSize)) {
        ElMessage.warning(`文件名: ${iterator.name} 文件过大, 自动剔除上传!`);
        continue;
      }

      // 超出数量警告
      if ((fileList.length + handleFileList.length) >= props.uploadSize.max) {
        ElMessage.warning('上传数量超出限制, 将自动排除超出部分');
        break;
      }

      const file = props.uploadUrl
        ? await props.uploadUrl(iterator, props.column, props.formData).then()
        : {
          name: iterator.name,
          file: iterator,
          link: props.column.fileType === 'image' ? await blobToBase64(iterator) : undefined,
        };
      handleFileList.push(file);
    }
  }
  // fileList = Object.assign(fileList, handleFileList);
  fileList.push(...handleFileList);

  emits('update:formData', Object.assign(props.formData, {[props.column.value]: [...fileList]} ));

  if (props.uploadSize.max > fileList.length) {
    inputDisabled = false;
  }
  // console.log(fileList, props.formData);
};

// 清空文件列表
const resetFileList = () => {
  clearReactive(fileList);
  emits('update:formData',  Object.assign(props.formData, {[props.column.value]:  [] }));
  console.log(fileList, props.formData);
};

/** 预览提交delete */
const previewDelete = (item: string, index: number) => {
  // console.log(item, index);
  fileList.splice(index, 1);
};

onMounted(() => {
  // 修复Android端调起选项无相机
  if (/Android/i.test(window.navigator.userAgent)) {
    (fileInput.value as HTMLElement).setAttribute('capture', 'camera');
  }
});

defineExpose({
  fileInput,
  resetFileList,
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
