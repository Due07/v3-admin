import { defineStore } from 'pinia';
import piniaPersistConfig from '@/scripts/base/piniaPersist';
import { TGlobalState } from '../types';

/** 全局数据状态 */
export const useGlobalStore = defineStore({
  id: 'globalStore',
  state: (): TGlobalState => ({
    ADMIN_NAME: import.meta.env.VITE_APP_ADMIN_NAME,
    isCollapse: false,
    COLOR: 'rgba(64, 158, 255, 1)',
    SIZE: 'default',
  }),
  getters: {},
  actions: {
    /** 全局color颜色 */
    setColor(value: string) {
      const root = document.querySelector(':root');
      // console.log(getComputedStyle(root as Element).getPropertyValue('--el-color-primary'));
      // --el-color-primary
      (root as HTMLElement).style.setProperty('--el-color-primary', value);
      this.COLOR = value;
    },
    /** 全局Size */
    setSize (value: TGlobalState['SIZE']) {
      this.SIZE = value;
    },
  },
  persist: piniaPersistConfig('global-store', localStorage),
});

// export const globalStore = useGlobalStore();
