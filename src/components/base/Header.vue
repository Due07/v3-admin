<template>
    <el-page-header
        icon=""
        title=""
        :content="titleContent"
    >
        <template
            v-for="(item, key, index) in (slotName ? slotName : defaultSlot)"
            :key="index"
            #[key]
        >
            <template v-if="slotName">
                <slot :name="key"></slot>
            </template>
            <template v-else>
                <component :is="item"></component>
            </template>
        </template>
    </el-page-header>
</template>

<script lang="tsx" setup>
import { useSlots } from 'vue';
import DefaultSlot from './default';

export interface IProps {
    titleContent?: string;
};

export type TSlotName = Readonly<Record<string, any>> | undefined;

withDefaults(defineProps<IProps>(),{
    titleContent: '',
    slotName: '',
});

const slots = useSlots();
const slotName: TSlotName = Object.keys(slots).filter(item => item !== 'default').length ? slots : undefined;
console.log(slots, slotName);

const defaultSlot = DefaultSlot;
</script>
<style lang="scss" scoped>

</style>
