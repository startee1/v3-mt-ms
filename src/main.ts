import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from "./router";
import { createPinia } from 'pinia'

const pinia = createPinia();
createApp(App).use(pinia).use(router).mount('#app')
