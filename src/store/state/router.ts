import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { IRouterState } from '../types';
import { filterAuthorityList, showMenuList } from '@/scripts/base/router';
import { floatList } from '@/scripts/base/methods';
// 权限路由
export const useRouterStore = defineStore({
  id: 'authRouter',
  state: (): IRouterState => {
    return {
      // 基础路由
      baseRouter: [],
      roleRouter: [],
    };
  },
  getters: {
    /** 路由列表 =====> 过滤掉isHide: true 路由 */
    visibleRouter: (state) => showMenuList(state.baseRouter),
    /** 扁平化路由列表 */
    floatRouter: (state) => floatList<RouteRecordRaw>(state.baseRouter, 'children'),
    /** 扁平化权限路由列表 */
    floatRoleList: (state) => floatList<RouteRecordRaw>(state.roleRouter, 'children'),
  },
  actions: {
    getBaseRouter(list: RouteRecordRaw[]) {
      this.baseRouter = list;
    },
    /** 角色所拥有权限列表 */
    getRoleRouter() {
      this.roleRouter = filterAuthorityList(this.visibleRouter);
    },
  },
});
