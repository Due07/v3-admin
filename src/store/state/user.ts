import { defineStore } from 'pinia';
import { type IUserState } from '../types';

export const useUserStore = defineStore({
  id: 'USER',
  state: (): IUserState => {
    return {
      user: {},
    };
  },
  actions: {
    setUser(user: IUserState['user']) {
      this.user = user;
    },
  },
});
