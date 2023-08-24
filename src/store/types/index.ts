import { RouteRecordRaw } from 'vue-router';

export interface IRouterState {
  baseRouter: RouteRecordRaw[],
}

export interface IGlobalState {
  ADMIN_NAME: string;
  isCollapse: boolean;
  COLOR: string;
  SIZE: 'large' | 'default' | 'small';
}
