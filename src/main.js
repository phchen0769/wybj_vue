import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 初始化样式表
import '@/styles/reset.scss'
// 导入svgIcon
import installIcons from '@/icons'
// 创建vue实例
const app = createApp(App)
installElementPlus(app)
// 使用installIcons插件
installIcons(app)
// 在vue实例中挂载store和router插件
app.use(store).use(router).mount('#app')
