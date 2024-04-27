import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 导入element-plus
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 使用element-plus
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
