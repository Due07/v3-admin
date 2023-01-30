import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';
// import { ElMessage } from 'element-plus';
import 'tailwindcss/tailwind.css';

const app = createApp(App);

// 全局挂载
// app.config.globalProperties.$message = ElMessage;
// console.log(app.config.globalProperties);

app.use(store).mount('#app');
