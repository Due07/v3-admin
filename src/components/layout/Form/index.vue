<template>
  <el-form ref="refForm" :label-width="labelWidth" :model="form" v-bind="$attrs">
    <template v-for="(iColumn, iIndex) in column" :key="iIndex">
      <FormItem v-model:form-data="form" :column="iColumn">
        <template
          v-for="(slotItem, slotIndex) in soltColumn"
          :key="slotIndex"
          #[slotItem.value]="{ i, form: forms }"
        >
          <slot :name="slotItem.value" :i="i" :form="forms"></slot>
        </template>
      </FormItem>
    </template>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import FormItem from '@/components/layout/FormItem/index.vue';
import { formatterData } from '@/scripts/base/methods';
import { onMounted, ref, reactive, watch, computed } from 'vue';
import { IColumn } from './type';

const refForm = ref();

const props = withDefaults(
  defineProps<{
    labelWidth?: string,
    formData: Record<string, any>,
    column: IColumn[],
  }>(),
  {
    labelWidth: '100px',
    formData: () => ({}),
    column: undefined,
  },
);
let form: Object = reactive({});

const soltColumn = computed(() => {
  return props.column.filter(item => (item.type === 'slot'));
});

const initData = (initForm: Object, column: IColumn[]) => {
  if (!Reflect.ownKeys(initForm).length || !column) return false;
  return column.reduce((pre, cur) => {
    if (Reflect.has(initForm, cur.value)) {
      let value = '';
      switch (cur.type) {
        case 'date':
          value = cur.valueFormat
            ? formatterData(initForm, cur, cur.valueFormat)
            : formatterData(initForm, cur);
          break;
        case 'datetime':
          value = cur.valueFormat
            ? formatterData(initForm, cur, cur.valueFormat)
            : formatterData(initForm, cur);;
          break;
        default: {
          const nullValue = { inputNumber: null, number: 0 };
          // text textarea password number
          value = initForm[cur.value] ?? nullValue[cur.type];
          break;
        }
      }

      pre[cur.value] = value;
    }
    return pre;
  }, {});
  // return
};

watch(() => (props.formData),
  // oVal: Object | undefined
  (nVal: Object) => {
    // console.log(nVal);
    form = Object.assign(form, initData(nVal, props.column));
  },
  { deep: true },
);

// 重置表单
const resetForm = () => {
  refForm.value.resetFields();
  console.log(form);
};

const onSubmit = () => {
  refForm.value.validate((validate: Boolean) => {
    if (!validate) return;

    // 处理逻辑
    console.log(form, refForm);
  });
};

onMounted(() => {
  const initForm = initData(props.formData, props.column);
  if (initForm) {
    form = Object.assign(form, initForm);
  }
  // console.log(prop.column);
});

// 暴露属性
defineExpose({
  resetForm,
});
</script>

<style lang="scss">
</style>
