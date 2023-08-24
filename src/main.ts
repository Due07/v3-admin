import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import * as Icons from '@element-plus/icons-vue';

import 'tailwindcss/tailwind.css';
import 'element-plus/dist/index.css';
import 'dayjs/locale';
import router from './router';

const app = createApp(App);
// 全局挂载
// app.config.globalProperties.$message = ElMessage;
// console.log(app.config.globalProperties);

// register the element Icons component
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(store).use(router).mount('#app');
