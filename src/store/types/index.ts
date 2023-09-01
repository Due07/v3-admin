import { RouteRecordRaw } from 'vue-router';

export interface IRouterState {
  baseRouter: RouteRecordRaw[],
}

export type TGlobalState = {
  ADMIN_NAME: string;
  isCollapse: boolean;
  COLOR: string;
  SIZE: 'large' | 'default' | 'small';
}

export interface IUserState {
  token?: string;
  user: {
    name: string; // 用户名称
    account: string;
    id: number;
    authorityList?: string[]; // 权限列表
  } | {};
}
