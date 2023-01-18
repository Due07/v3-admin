import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'USER',
    state: () => {
        return {
            name: '张三',
        };
    },
    actions: {
        updateUserName(name: string) {
            this.name = name;
        },
    },
});
