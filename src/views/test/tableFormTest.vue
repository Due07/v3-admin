<template>
  <el-form
    v-for="(form, index) in formList"
    :key="index"
    :model="form"
  >
    <el-table :data="[form]">
      <el-table-column v-for="(column, cIndex) in columnList" :key="cIndex" :label="column.name">
        <FormItem
          :column="column"
          :form-data="form"
        >
        </FormItem>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script lang="ts" setup>
import FormItem from '@/components/layout/FormItem/index.vue';
import { IColumn, ISelectOptions } from '@/components/layout/Form/type';
import { reactive } from 'vue';
const formList = reactive([
  { name: '大', num: 1 }, { name: 'a', num: 2 }, { name: 'D', num: 5 },
]);
const nameOptions = reactive([
  {
    id: 0,
    name: '大',
    value: '大',
    disabled: (column: IColumn, options: ISelectOptions) => {
      return formList.some(item => item.name === options.value);
    },
  },
  {
    id: 1,
    name: '1',
    value: '1',
    disabled: (column: IColumn, options: ISelectOptions) => {
      return formList.some(item => item.name === options.value);
    },
  },
  {
    id: 2,
    name: '2',
    value: '2',
    disabled: (column: IColumn, options: ISelectOptions) => {
      return formList.some(item => item.name === options.value);
    },
  },
  {
    id: 3,
    name: '3',
    value: '3',
    disabled: (column: IColumn, options: ISelectOptions) => {
      return formList.some(item => item.name === options.value);
    },
  },
  {
    id: 4,
    name: '4',
    value: '4',
    disabled: (column: IColumn, options: ISelectOptions) => {
      return formList.some(item => item.name === options.value);
    },
  },
  {
    id: 5,
    name: '5',
    value: '5',
    disabled: (column: IColumn, options: ISelectOptions) => {
      return formList.some(item => item.name === options.value);
    },
  },
  {
    id: 6,
    name: '6',
    value: '6',
    disabled: (column: IColumn, options: ISelectOptions) => {
      return formList.some(item => item.name === options.value);
    },
  },
  {
    id: 7,
    name: '7',
    value: '7',
    disabled: (column: IColumn, options: ISelectOptions) => {
      return formList.some(item => item.name === options.value);
    },
  },
]);

const columnList = reactive<IColumn[]>([
  {
    name: '选择项',
    value: 'name',
    type: 'select',
    options: nameOptions,
    filterable: true,
    bind: { label: '' },
    remoteMethod: (val: string) => {
      console.log(val);
    },
  },
  {
    name: '数量',
    value: 'num',
    type: 'text',
    required: true,
    bind: { label: '' },
  },
]);

</script>

<style lang="scss" scoped></style>
