import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'vue3-toastify/dist/index.css';

const app = createApp(App)
app.use(router).mount('#app')