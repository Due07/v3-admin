import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { IRouterState } from '../types';
import { showMenuList } from '@/scripts/base/router';

// 权限路由
export const useRouterStore = defineStore({
  id: 'authRouter',
  state: (): IRouterState => {
    return {
      // 基础路由, 过滤
      baseRouter: [],
    };
  },
  getters: {
    /** 路由列表 =====> 过滤掉isHide: true 路由 */
    visibleRouter: (state) => showMenuList(state.baseRouter),
  },
  actions: {
    getBaseRouter(list: RouteRecordRaw[]) {
      this.baseRouter = list;
    },
  },
});
