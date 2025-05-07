<template>
  <section class="picture-preview flex justify-evenly">
    <template v-for="(item, index) in list" :key="item">
      <div class="image inline-flex relative">
        <el-image
          ref="elImageRef"
          :preview-src-list="[item]"
          :hide-on-click-modal="true"
          :src="item"
          fit="contain"
        >
          <!-- <template #error>
          </template> -->
        </el-image>
        <div class="mask-options flex items-center justify-center absolute left-0 top-0 w-full h-full">
          <el-icon class="white" @click="onPreview(index)">
            <component :is="'search'"></component>
          </el-icon>
          <el-icon class="white delete" @click.stop="emits('delete', item, index)">
            <component :is="'delete'"></component>
          </el-icon>
        </div>
      </div>
    </template>
  </section>
  <!-- <Teleport></Teleport> -->
</template>

<script setup lang="ts">
import { judgmentType } from '@/scripts/base/methods';
import { computed, ref } from 'vue';
import { IFileObj } from '../FileUpload/type';

interface IProps {
  list: string[] | Partial<IFileObj>[],
};

const props = withDefaults(
  defineProps<IProps>(),
  { list: () => [] },
);

const emits = defineEmits(['delete']);

const elImageRef = ref();

const list = computed((): string[] => {
  // TODO: 未解决 any
  return (props.list as any[]).reduce((pre: string[], cur: string | Partial<IFileObj>) => {
    let link = cur;
    if (judgmentType(cur, 'Object')) {
      const fileObj = (cur as Partial<IFileObj>);

      if (fileObj.link) link = fileObj.link;
    }
    return [...pre, link];
  }, []);
});

const onPreview = (index: number) => {
  // console.log(index, elImageRef.value[index], elImageRef.value[index]);
  elImageRef.value[index].$el.firstChild.click();
};

</script>

<style lang="scss" scoped>
.picture-preview {
  width: 100%;
  flex-wrap: wrap;

  .image {
    width: 24%;
    flex: 0 1 auto;
    font-size: 20px;
    font-weight: bold;

    .el-image {
      width: 100%;
      height: 100%;
    }

    &:hover {
      .mask-options {
        opacity: 1;
        pointer-events: auto;
        cursor: pointer;
      }
    }
  }

  .white {
    color: #ffffff;
  }

  .mask-options {
    opacity: 0;
    pointer-events: none;
    background-color: rgba($color: #000000, $alpha: .3);
    transition: opacity ease-out .3s;

    .delete {
      margin-left: 10%;
    }
  }
}
</style>
