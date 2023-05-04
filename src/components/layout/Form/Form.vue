<template>
    <el-form
        :model="form"
        v-bind="$attrs"
    >
        <template v-for="(i, iIndex) in column" :key="iIndex">
            <el-form-item
                :label="handleFun('name', i, [form, i])"
                :prop="i.value"
                v-bind="i.bind"
                :rules="validateRules()"
            >
                <!-- TODO: doing~~~ -->
                <!-- 文本 / 多行文本 / 密码 / 数字 -->
                <el-input
                    v-if="['text', 'textarea', 'password', 'number'].includes(i.type)"
                    v-model="form[i.value]"
                    :type="i.type"
                    :clearable="i.clearable ?? true"
                    :placeholder="i.placeholder"
                    :readonly="i.readonly || i.disabled"
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
                    :placeholder="i.placeholder"
                    @change="i.change"
                >
                </el-input-number>

                <!-- https://element-plus.org/zh-CN/component/select.html#select-attributes -->
                <el-select
                    v-if="i.type === 'select'"
                    v-model="form[i.value]"
                    :readonly="i.readonly || i.disabled"
                    :clearable="i.clearable ?? true"
                    :placeholder="i.placeholder"
                    :filterable="judgmentType(i.remoteMethod, 'Function') || i.filterable"
                    :remote="judgmentType(i.remoteMethod, 'Function')"
                    :remote-method="i.remoteMethod"
                    v-bind="i.itemBind"
                    @change="i.change"
                    @visible-change="i.visibleChange"
                >
                    <el-option
                        v-for="optionsItem in i.options"
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
                    v-if="['date', 'datetime'].includes(i.type)"
                    v-model="form[i.value]"
                    :type="i.connect ? dateRangeObj[i.type].range : i.type"
                    :placeholder="!i.connect && i.placeholder"
                    :readonly="i.readonly || i.disabled"
                    :format="i.format ?? dateRangeObj[i.type].format"
                    :value-format="i.valueFormat ?? ''"
                    :disabled-date="i.disabledDate"

                    :range-separator="i.connect && (i.rangeSeparator ?? '至')"
                    :start-placeholder="(i.connect && Array.isArray(i.placeholder)) && i.placeholder[0]"
                    :end-placeholder="(i.connect && Array.isArray(i.placeholder)) && [...i.placeholder].pop()"

                    v-bind="i.itemBind"
                    @change="i.change"
                >
                </el-date-picker>

            </el-form-item>
        </template>

        <el-form-item>
            <el-button @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
// validateRules // TODO: doing~~~
import { handleFun, judgmentType } from '@/scripts/base/methods';
// import { useSizeStore } from '@/store/state/GLOBAL_SIZE';
import { onMounted, reactive } from 'vue';
import { IColumn } from './type';

const prop = withDefaults(
    defineProps<{
        formData: Record<string, any>,
        column: IColumn[],
    }>(),
    {
        formData: () => ({}),
        column: undefined,
    },
);
let form: Object = {};

const dateRangeObj = {
    date: {
        range: 'daterange',
        format: 'YYYY-MM-DD',
    },
    datetime: {
        range: 'datetimerange',
        format: 'YYYY-MM-DD HH:mm:ss',
    },
};

// TODO: test~
// computed('size', () => useSizeStore().name);

// const initData = (form: Object) => {
//     if (Reflect.ownKeys(prop.formData).length || !prop.column) return false;
//     prop.column.reduce((pre, cur) => {

//     }, {});
//     // return
// };

const validateRules = () => [];

const onSubmit = () => {
    console.log(form);
};

onMounted(() => {
    form = reactive({...prop.formData});
    // console.log(prop.column);
});

</script>

<style lang="scss">
</style>
