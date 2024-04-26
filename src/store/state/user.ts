import { defineStore } from 'pinia';
import { type IUserState } from '../types';

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => {
    return {
      user: {
        name: 'string', // 用户名称
        account: 'string',
        id: 1,
        authorityList: ['test', 'dev', 'prod'], // 权限列表
      },
    };
  },
  actions: {
    setUser(user: IUserState['user']) {
      this.user = user;
    },
  },
});
