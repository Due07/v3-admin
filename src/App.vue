<script setup lang="ts">
// import { ComponentInternalInstance, getCurrentInstance } from 'vue';
// import { defineAsyncComponent } from 'vue';
import Header from './components/base/Header';
// import test from './components/base/test.vue';
import HelloWorld from './components/HelloWorld.vue';
import List from './components/layout/List/List.vue';
// import VirtualList from './components/VirtualList/List.vue';
import { IList } from './types/components/list';
// defineAsyncComponent(() => import('./components/HelloWorld.vue'));
// import haha from '@/services/HahaServices';

const username = '123';

// const { appContext } = getCurrentInstance() as ComponentInternalInstance;
// console.log(appContext.config.globalProperties.$message);
const list: IList[] = [
    {
        name: '123',
        type: 'text',
        value: 'qqq',
        align: 'left',
        bind: {
            sortable: true,
        },
    },
    {
        name: '123',
        type: 'boolean',
        value: 'qqqs',
        align: 'center',
        options: ['cuo', 'dui'],
    },
    {
        name: 'date',
        type: 'date',
        value: 'date',
        align: 'center',
        options: ['cuo', 'dui'],
    },
    {
        name: '123',
        type: 'hash',
        value: 'aa',
        align: 'center',
        options: ['0', '1', '2', '3'],
    },
];
const tableData = [
    {
        qqq: 'aaa',
        qqqs: true,
        aa: 1,
        date: 1674980576871,
    },
];

// console.log(haha.getList, haha.getHaha({id: 1, name: '牛'}));
</script>

<template>
    <Header></Header>
    <!-- <component :is="test"></component> -->
    {{ username }}
    <!-- <div class="flex">
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div> -->

    <HelloWorld msg="Vite + Vue" />
    <List title="123" :list="list" :table-data="tableData" />
    <!-- <VirtualList /> -->
</template>

<style scoped lang="scss">

</style>
