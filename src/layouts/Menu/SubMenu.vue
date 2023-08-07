<template>
  <template v-for="(subMenu, index) in menuList" :key="index">
    <el-sub-menu :index="index">
      <template #title>
        <el-icon>
          <component :is="subMenu.meta.icon"></component>
        </el-icon>
        <span class="sub-title">{{ subMenu.meta.title }}</span>
      </template>
    </el-sub-menu>
    <SubMenu :menu-list="{}"></SubMenu>
  </template>
</template>

<script lang="ts" setup>
// TODO: 待定
defineProps<{ menuList: any }>();
</script>

<style lang="scss" scoped>
// .sub-title {}
</style>
