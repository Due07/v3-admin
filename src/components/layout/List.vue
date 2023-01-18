<template>
    <el-card class="view-list">
        <template #header>
            <div class="flex justify-between">
                <div class="title">
                    {{ title || '' }}
                    <slot name="headerTitle"></slot>
                </div>
                <slot></slot>
            </div>
        </template>
        <el-table
            :data="tableData"
            v-bind="$attrs"
        >
            <template v-for="(i, index) in list" :key="index">
                <!-- https://element-plus.gitee.io/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7 -->
                <!-- slot / expand(展开行) -->
                <el-table-column
                    v-if="['slot', 'expand'].includes(i.type)"
                    :type="i.type === 'expand' ? i.type : ''"
                    :label="i.name"
                    :prop="i.value"
                    :width="i.width" :align="i.align ?? 'center'"
                    v-bind="i.bind"
                >
                    <template #default="{ row }">
                        <slot :name="i.name" :i="i" :row="row"></slot>
                    </template>
                </el-table-column>

                <el-table-column
                    v-if="i.type === 'text'"
                    :label="i.name"
                    :prop="i.value"
                    :width="i.width" :align="i.align ?? 'center'"
                    v-bind="i.bind"
                >
                </el-table-column>
                <!-- date / datetime -->
                <el-table-column
                    v-if="['date', 'datetime'].includes(i.type)"
                    :label="i.name"
                    :prop="i.value"
                    :width="i.width" :align="i.align ?? 'center'"
                    v-bind="i.bind"
                    :formatter="(row: unknown) => (i.formatter ? formatterData(row, i) : i.formatter)"
                >
                    <!-- formatter格式化内容 不可使用插槽 -->
                </el-table-column>
                <!-- hash / boolean -->
                <el-table-column
                    v-if=" ['hash', 'boolean'].includes(i.type)"
                    :label="i.name"
                    :prop="i.value"
                    :width="i.width" :align="i.align ?? 'center'"
                    v-bind="i.bind"
                >
                    <template #default="{ row }">
                        {{ i.options
                            ? (i.type === 'hash' ? i.options[row[i.value]] : i.options[row[i.value] ? 1 : 0])
                            : row[i.value] }}
                    </template>
                </el-table-column>

                <!-- array -->
                <el-table-column
                    v-if="i.type === 'tagArray'"
                    :label="i.name"
                    :prop="i.value"
                    :width="i.width" :align="i.align ?? 'center'"
                    v-bind="i.bind"
                >
                    <template #default="{ row }">
                        <template v-for="(val, valIndex) in row[i.value]" :key="valIndex">
                            <el-tag
                                :size="i.tagSize ?? ''"
                                :type="val.type ? val.type : i.itemType ?? ''"
                            >
                                {{ i.itemKey !== undefined ? val[i.itemKey] : val }}
                            </el-tag>
                        </template>
                    </template>
                </el-table-column>
                <!-- avatar / image -->
                <el-table-column
                    v-if="['avatar', 'image'].includes(i.type)"
                    :label="i.name"
                    :prop="i.value"
                    :width="i.width" :align="i.align ?? 'center'"
                    v-bind="i.bind"
                >
                    <template #default="{ row }">
                        <el-avatar
                            v-if="i.type === 'avatar'"
                            :fit="i.fit ?? 'cover'"
                            :size="i.size || 60"
                            :src="row[i.value]"
                        />
                        <el-image
                            v-if="i.type === 'image'"
                            :fit="i.fit ?? 'cover'"
                            :src="row[i.value]"
                            :lazy="i.lazy ?? false"
                            :preview-src-list="[row[i.value]]"
                        >
                            <template #error>
                                <i-ep-picture-filled class="mx-auto relative top-1/2 -translate-y-2/4">
                                </i-ep-picture-filled>
                            </template>
                        </el-image>
                    </template>
                </el-table-column>

                <el-table-column
                    v-if="i.type === 'actions'"
                    :label="i.name"
                    :prop="i.value"
                    :width="i.width" :align="i.align ?? 'center'"
                    v-bind="i.bind"
                >
                    <template v-if="i.actions !== undefined && i.actions.length" #default="{ row }">
                        <template v-for="(x, y) in i.actions">
                            <el-button
                                v-if="!x.connect"
                                :key="y"
                                :type="handleFun('type', x, [row])"
                                :plain="x.plain"
                                :class="handleFun('class', x, [row])"
                                size="small"
                                :disabled="judgmentType(x.disabled, 'Function')
                                    ? (x.disabled as Function)(row)
                                    : x.disabled"
                                @click="x.actions(row)"
                            >
                                {{ handleFun('name', x, [row]) }}
                            </el-button>
                            <template v-else>
                                <template v-if="x.children">
                                    <el-button
                                        v-for="(k, j) in (
                                            x.children[row[x.connect] as number] as unknown as Record<number, IActions>
                                        )"
                                        :key="j"
                                        :type="handleFun('type', k, [row])"
                                        :plain="k.plain"
                                        :class="handleFun('class', k, [row])"
                                        size="small"
                                        :disabled="judgmentType(k.disabled, 'Function')
                                            ? (k.disabled as Function)(row)
                                            : k.disabled"
                                        @click="k.actions(row)"
                                    >
                                        {{ handleFun('name', k, [row]) }}
                                    </el-button>
                                </template>
                            </template>
                        </template>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        {{ list }}
    </el-card>
</template>

<script lang="ts">
// import { ref, reactive } from 'vue';
import { handleFun, judgmentType } from '@/scripts/base/methods';
import type { PropType } from 'vue';
import type { IList as TList } from '@/types/components/list';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import type { IActions } from '@/types/components/list';

export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        tableData: {
            type: Array,
            required: true,
            default: () => [{
                qqq: 'aaa',
                qqqs: true,
                aa: 1,
            }],
        },
        list: {
            type: Array as PropType<TList[]>,
            required: true,
            default: (): TList[] => ([
                {
                    name: '123',
                    type: 'text',
                    value: 'qqq',
                    align: 'left',
                    bind: {
                        sortable: true,
                    },
                },
                {
                    name: '123',
                    type: 'boolean',
                    value: 'qqqs',
                    align: 'center',
                    options: ['cuo', 'dui'],
                },
                {
                    name: '123',
                    type: 'hash',
                    value: 'aa',
                    align: 'center',
                    options: ['0', '1', '2', '3'],
                },
            ]),
            // default() {
            //     return [] as TList[];
            // },
        },
    },

    setup(props, context) {
        console.log(props, context);

        return {
            judgmentType,
            handleFun,
        };
    },

    mounted() {},

    methods: {
        // 格式化时间
        formatterData<T>(row: T, list: TList) {
            console.log(row, list);
            return 1;
        },
    },
};
</script>

<style lang="scss" scoped>
.view-list {
    .el-image {
        width: 100%;
        min-height: 50px;
    }
}
</style>
