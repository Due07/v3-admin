import { defineStore } from 'pinia';

export type TSize = 'large' | 'default' | 'small';

export const useSizeStore = defineStore({
  id: 'GLOBAL_SIZE',
  state: (): { name: TSize } => {
    return {
      name: 'default',
    };
  },
  actions: {
    updateSize(name: TSize) {
      this.name = name;
    },
  },
});
