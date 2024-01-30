<template>
  <el-form ref="refForm" :label-width="labelWidth" :model="form" v-bind="$attrs">
    <template v-for="(i, iIndex) in column" :key="iIndex">
      <el-form-item
        v-show="judgmentType(i.hide, 'Function') ? (i.hide as Function)(i, form) : i.hide ?? true"
        :label="handleFun('name', i, [form, i])"
        :prop="i.value"
        v-bind="i.bind"
        :rules="fromItemRules(i)"
      >
        <!-- 文本 / 多行文本 / 密码 / 数字 -->
        <el-input
          v-if="['text', 'textarea', 'password', 'number'].includes(i.type)"
          v-model.trim="form[i.value]"
          :type="i.type"
          :clearable="i.clearable ?? true"
          :placeholder="!Array.isArray(i.placeholder) ? i.placeholder : i.placeholder[0]"
          :disabled="i.readonly || i.disabled"
          v-bind="i.itemBind"
          @blur="i.blur"
          @change="i.change"
        >
          <template v-if="i.type === 'textarea' && i.slot">
            <component :is="i.slot"></component>
          </template>
        </el-input>

        <!-- https://element-plus.org/zh-CN/component/input-number.html#attributes -->
        <el-input-number
          v-if="i.type === 'inputNumber'"
          v-model="form[i.value]"
          v-bind="i.itemBind"
          :readonly="i.readonly || i.disabled"
          :placeholder="!Array.isArray(i.placeholder) ? i.placeholder : i.placeholder[0]"
          @change="i.change"
        >
        </el-input-number>

        <!-- https://element-plus.org/zh-CN/component/select.html#select-attributes -->
        <el-select
          v-if="i.type === 'select'"
          v-model="form[i.value]"
          :readonly="i.readonly || i.disabled"
          :clearable="i.clearable ?? true"
          :placeholder="!Array.isArray(i.placeholder) ? i.placeholder : i.placeholder[0]"
          :filterable="judgmentType(i.remoteMethod, 'Function') as boolean || i.filterable"
          :remote="judgmentType(i.remoteMethod, 'Function') as boolean ?? undefined"
          :remote-method="<T,>(event: T) => handleFun('remoteMethod', i, [event, i, form])"
          v-bind="i.itemBind"
          @change="i.change"
          @visible-change="i.visibleChange"
        >
          <el-option
            v-for="optionsItem in i.options"
            :key="optionsItem.id"
            :label="optionsItem.name"
            :value="optionsItem.value"
            :disabled="handleFun('disabled', optionsItem, [column, optionsItem, form])"
          >
          </el-option>
        </el-select>

        <!-- https://element-plus.org/zh-CN/component/date-picker.html#attributes -->
        <!-- https://element-plus.org/zh-CN/component/datetime-picker.html#attributes -->
        <el-date-picker
          v-if="['date', 'datetime'].includes(i.type)"
          v-model="form[i.value]"
          :type="i.connect ? dateRangeObj[i.type].range : i.type"
          :placeholder="(!i.connect && (!Array.isArray(i.placeholder) ? i.placeholder : i.placeholder[0])) || undefined"
          :readonly="i.readonly || i.disabled"
          :format="i.format ?? dateRangeObj[i.type].format"
          :value-format="i.valueFormat ?? ''"
          :disabled-date="i.disabledDate"
          :range-separator="i.connect && (i.rangeSeparator ?? '至')"
          :start-placeholder="(i.connect && Array.isArray(i.placeholder) && i.placeholder[0]) || undefined"
          :end-placeholder="(i.connect && Array.isArray(i.placeholder) && [...i.placeholder].pop()) || undefined"
          v-bind="i.itemBind"
          @change="i.change"
        >
        </el-date-picker>

        <FileUpload
          v-if="i.type === 'file'"
          v-model:form-data="form"
          :column="i"
          :file-upload-input="i.fileUploadInput"
        />

        <slot v-if="i.type === 'slot'" :name="i.value" :i="i" :form="form"></slot>
        <slot v-if="i.type === 'components'">
          <component :is="i.component" :i="i" :form="form"></component>
        </slot>
      </el-form-item>
    </template>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import FileUpload from '@/components/widget/FileUpload/index.vue';
import ValidatorRule, { TRulesKey, TRulesObj } from '@/scripts/helpers/validateRules';
import { formatterData, handleFun, judgmentType } from '@/scripts/base/methods';
import { onMounted, ref, reactive, watch, readonly } from 'vue';
import { IColumn } from './type';

const validatorRule = new ValidatorRule();

const refForm = ref();

const prop = withDefaults(
  defineProps<{
    labelWidth?: string;
    formData: Record<string, any>;
    column: IColumn[];
  }>(),
  {
    labelWidth: '100px',
    formData: () => ({}),
    column: undefined,
  },
);
let form: Object = reactive({});

const dateRangeObj = readonly({
  date: {
    range: 'daterange',
    format: 'YYYY-MM-DD',
  },
  datetime: {
    range: 'datetimerange',
    format: 'YYYY-MM-DD HH:mm:ss',
  },
});

const initData = (initForm: Object, column: IColumn[]) => {
  if (!Reflect.ownKeys(initForm).length || !column) return false;
  return column.reduce((pre, cur) => {
    if (Reflect.has(initForm, cur.value)) {
      let value = '';
      switch (cur.type) {
        case 'date':
          value = cur.valueFormat ? formatterData(initForm, cur, cur.valueFormat) : formatterData(initForm, cur);
          break;
        case 'datetime':
          value = cur.valueFormat ? formatterData(initForm, cur, cur.valueFormat) : formatterData(initForm, cur);
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

const fromItemRules = (item: IColumn) => {
  return [
    { required: item.required, message: item.message, trigger: 'blur' },
    ...(item.rules ?? []),
    ...(judgmentType(item.ruleType, 'Object')
      ? ValidatorRule.validatorFun(item.ruleType as TRulesObj)
      : item.ruleType ? validatorRule.templateValidatorRule(item.ruleType as TRulesKey) : []),
  ];
};

watch(
  () => prop.formData,
  // oVal: Object | undefined
  (nVal: Object) => {
    // console.log(nVal);
    form = Object.assign(form, initData(nVal, prop.column));
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
  const initForm = initData(prop.formData, prop.column);
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

<style lang="scss"></style>
