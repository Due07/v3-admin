import { defineStore } from 'pinia';
import piniaPersistConfig from '@/scripts/base/piniaPersist';
import { IGlobalState } from '../types';

/** 全局数据状态 */
export const useGlobalStore = defineStore({
  id: 'globalStore',
  state: (): IGlobalState => ({
    ADMIN_NAME: '后台管理系统',
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
    setSize (value: IGlobalState['SIZE']) {
      this.SIZE = value;
    },
  },
  persist: piniaPersistConfig('global-store', localStorage),
});

// export const globalStore = useGlobalStore();
