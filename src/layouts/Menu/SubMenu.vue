<template>
  <template v-for="(subMenu, index) in menuList" :key="index">
    <template v-if="subMenu.children?.length">
      <el-sub-menu :index="subMenu.path">
        <template #title>
          <el-icon v-if="subMenu?.meta?.icon">
            <component :is="subMenu.meta.icon"></component>
          </el-icon>
          <span class="sub-title">{{ subMenu?.meta?.title }}</span>
        </template>
        <SubMenu :menu-list="subMenu.children"></SubMenu>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="subMenu.path" :route="subMenu">
        <el-icon v-if="subMenu?.meta?.icon">
          <component :is="subMenu.meta.icon"></component>
        </el-icon>
        <span class="sub-title">{{ subMenu?.meta?.title }}</span>
      </el-menu-item>
    </template>
    <!-- <SubMenu :menu-list=""></SubMenu> -->
  </template>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router';
// TODO: 待定
defineProps<{ menuList: RouteRecordRaw[] }>();

</script>

<style lang="scss" scoped>
// .sub-title {}
</style>
