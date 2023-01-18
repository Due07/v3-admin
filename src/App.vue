<script setup lang="ts">
// import { ComponentInternalInstance, getCurrentInstance } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import List from './components/layout/List.vue';

const username = '123';

// const { appContext } = getCurrentInstance() as ComponentInternalInstance;
// console.log(appContext.config.globalProperties.$message);
</script>

<template>
    {{ username }}
    <div class="flex">
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
    <List/>
</template>

<style scoped lang="scss">
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
