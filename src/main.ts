import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import 'element-plus/dist/index.css';
import 'dayjs/locale';
import 'tailwindcss/tailwind.css';

const app = createApp(App);
// 全局挂载
// app.config.globalProperties.$message = ElMessage;
// console.log(app.config.globalProperties);

app.use(store).mount('#app');
