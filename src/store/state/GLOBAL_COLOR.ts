import { defineStore } from 'pinia';

export const useColorStore = defineStore({
    id: 'GLOBAL_COLOR',
    state: (): {name: string} => {
        return {
            name: 'rgba(64, 158, 255, 1)',
        };
    },
    actions: {
        updateColor(name: string) {
            const root = document.querySelector(':root');
            // console.log(getComputedStyle(root as Element).getPropertyValue('--el-color-primary'));
            // --el-color-primary
            (root as HTMLElement).style.setProperty('--el-color-primary', name);
            this.name = name;
        },
    },
});
