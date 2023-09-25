<template>
  <el-form-item
    v-show="judgmentType(column.hide, 'Function') ? (column.hide as Function)(column, form) : column.hide ?? true"
    :label="handleFun('name', column, [form, column])"
    :prop="column.value"
    v-bind="column.bind"
    :rules="fromItemRules(column)"
  >
    <!-- 文本 / 多行文本 / 密码 / 数字 -->
    <el-input
      v-if="['text', 'textarea', 'password', 'number'].includes(column.type)"
      v-model="form[column.value]"
      :type="column.type"
      :clearable="column.clearable ?? true"
      :placeholder="!Array.isArray(column.placeholder) ? column.placeholder : column.placeholder[0]"
      :disabled="column.readonly || column.disabled"
      v-bind="column.itemBind"
      @blur="column.blur"
      @change="column.change"
    >
      <template v-if="column.type === 'textarea' && column.slot">
        <component :is="column.slot"></component>
      </template>
    </el-input>

    <!-- https://element-plus.org/zh-CN/component/input-number.html#attributes -->
    <el-input-number
      v-if="column.type === 'inputNumber'"
      v-model="form[column.value]"
      v-bind="column.itemBind"
      :readonly="column.readonly || column.disabled"
      :placeholder="!Array.isArray(column.placeholder) ? column.placeholder : column.placeholder[0]"
      @change="column.change"
    >
    </el-input-number>

    <!-- https://element-plus.org/zh-CN/component/select.html#select-attributes -->
    <el-select
      v-if="column.type === 'select'"
      v-model="form[column.value]"
      :readonly="column.readonly || column.disabled"
      :clearable="column.clearable ?? true"
      :placeholder="!Array.isArray(column.placeholder) ? column.placeholder : column.placeholder[0]"
      :filterable="judgmentType(column.remoteMethod, 'Function') as boolean || column.filterable"
      :remote="judgmentType(column.remoteMethod, 'Function') as boolean ?? undefined"
      :remote-method="column.remoteMethod"
      v-bind="column.itemBind"
      @change="column.change"
      @visible-change="column.visibleChange"
    >
      <el-option
        v-for="optionsItem in column.options"
        :key="optionsItem.id"
        :label="optionsItem.name"
        :value="optionsItem.value"
        :disabled="optionsItem.disabled"
      >
      </el-option>
    </el-select>

    <!-- https://element-plus.org/zh-CN/component/date-picker.html#attributes -->
    <!-- https://element-plus.org/zh-CN/component/datetime-picker.html#attributes -->
    <el-date-picker
      v-if="['date', 'datetime'].includes(column.type)"
      v-model="form[column.value]"
      :type="column.connect ? dateRangeObj[column.type].range : column.type"
      :placeholder="(!column.connect && (
        !Array.isArray(column.placeholder) ? column.placeholder : column.placeholder[0])
      ) || undefined"
      :readonly="column.readonly || column.disabled"
      :format="column.format ?? dateRangeObj[column.type].format"
      :value-format="column.valueFormat ?? ''"
      :disabled-date="column.disabledDate"

      :range-separator="column.connect && (column.rangeSeparator ?? '至')"
      :start-placeholder="(column.connect && Array.isArray(column.placeholder)) && column.placeholder[0] || undefined"
      :end-placeholder="(column.connect && Array.isArray(column.placeholder))
        && [...column.placeholder].pop() || undefined"

      v-bind="column.itemBind"
      @change="column.change"
    >
    </el-date-picker>

    <FileUpload
      v-if="column.type === 'file'"
      v-model:form-data="form"
      :column="column"
      :file-upload-input="column.fileUploadInput"
    />

    <slot v-if="column.type === 'slot'" :name="column.value" :i="column" :form="form"></slot>
    <slot v-if="column.type === 'components'">
      <component :is="column.component" :i="column" :form="form"></component>
    </slot>
  </el-form-item>
</template>

<!-- generic="T" vue = 3.3 才生效 -->
<script lang="ts" name="FormItem" setup>
import FileUpload from '@/components/widget/FileUpload/index.vue';
import { handleFun, judgmentType } from '@/scripts/base/methods';
import { IColumn } from '../Form/type';
import { reactive, readonly, watch } from 'vue';
import ValidatorRule, { TRulesKey, TRulesObj } from '@/scripts/helpers/validateRules';

const validatorRule = new ValidatorRule();

const props = withDefaults(defineProps<{
  column: IColumn,
  formData: Record<string, any>,
}>(), {
  formData: () => ({}),
});

let form = reactive(props.formData);
watch(
  () => props.formData,
  (nVal: typeof props.formData) => {
    form = nVal;
  },
);

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

const fromItemRules = (item: IColumn) => {
  return [
    {required: item.required, message: item.message, trigger: 'blur'},
    ...(item.rules ?? []),
    ...(judgmentType(item.ruleType, 'Object')
      ? ValidatorRule.validatorFun(item.ruleType as TRulesObj)
      : (item.ruleType ? validatorRule.templateValidatorRule(item.ruleType as TRulesKey) : [])
    ),
  ];
};
</script>

<style lang="scss" scoped>
</style>
