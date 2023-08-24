<template>
  <el-aside width="260px">
    <el-scrollbar height="100vh" wrap-class="menu-scrollbar">
      <el-menu
        :collapse="isCollapse"
        :router="true"
        :unique-opened="true"
        :collapse-transition="false"
        background-color="rgb(48, 65, 86)"
        text-color="#ffffff"
      >
        <!-- header -->
        <div class="el-menu-item" @click="router.push(ROUTER_HOME.URL)">
          <div class="admin-menu flex items-center">
            <el-icon>
              <component :is="'HomeFilled'"></component>
            </el-icon>
            <h1 class="admin-name">{{ globalStore.ADMIN_NAME }}</h1>
          </div>
        </div>

        <SubMenu :menu-list="subMenuList" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" setup name="MenuBar">
import SubMenu from '@/layouts/Menu/SubMenu.vue';

import { computed } from 'vue';
import { ROUTER_HOME } from '@/config';
import { useRouterStore } from '@/store/state/router';
import { useGlobalStore } from '@/store/state/GLOBAL';
import { useRouter } from 'vue-router';

const routerStore = useRouterStore();
const globalStore = useGlobalStore();
const router = useRouter();

const subMenuList = computed(() => routerStore.visibleRouter);
const isCollapse = computed(() => globalStore.isCollapse);

</script>

<style lang="scss" scoped>
:deep(.menu-scrollbar) {
  .el-scrollbar__view {
    height: inherit;
  }
  .el-menu {
    height: inherit;
  }
}
</style>
