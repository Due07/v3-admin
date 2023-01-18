import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';
import { ElMessage } from 'element-plus';
import 'tailwindcss/tailwind.css';
// import '@/assets/styles/index.scss';

const app = createApp(App);

app.config.globalProperties.$message = ElMessage;
console.log(app.config.globalProperties);

app.use(store).mount('#app');
