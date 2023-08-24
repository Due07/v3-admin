<template>
  <!-- :size="assemblySize" -->
  <el-config-provider :locale="zhCn">
    <!-- <component :is="test"></component> -->
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
// import { defineAsyncComponent } from 'vue';

// defineAsyncComponent(() => import('./components/HelloWorld.vue'));

// const { appContext } = getCurrentInstance() as ComponentInternalInstance;
// console.log(appContext.config.globalProperties.$message);

</script>

<style scoped lang="scss"></style>
