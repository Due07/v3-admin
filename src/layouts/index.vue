<template>
  <el-container>
    <!-- 菜单栏 -->
    <MenuBar />

    <el-container>
      <el-header>
        <div class="header flex items-center justify-between h-full w-full">
          <el-icon :size="'22px'" class="header-left">
            <component :is="isCollapse ? 'expand' : 'fold'"></component>
          </el-icon>
          <el-icon :size="'20px'" class="header-right cursor-pointer" @click="onOut">
            <SwitchButton />
          </el-icon>
        </div>
      </el-header>
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in" appear>
          <section :key="route.fullPath">
            <component :is="Component" :key="route.fullPath" />
          </section>
        </transition>
      </router-view>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import MenuBar from '@/layouts/Menu/MenuBar.vue';
import { computed } from 'vue';
import { useGlobalStore } from '@/store/state/GLOBAL';

import { onOut } from './config';

const globalStore = useGlobalStore();

const isCollapse = computed(() => globalStore.isCollapse);

</script>

<style lang="scss" scoped>
.admin-menu {
  font-size: 1.5em;
  // .el-icon {}
  .admin-name {
    font-weight: bold;
  }
}

.el-header {
  box-sizing: border-box;
  border-bottom: 1px solid #e5e7eb;
}
</style>
