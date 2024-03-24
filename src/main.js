import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/i18n'
import installElementPlus from './plugins/element'

// 初始化样式表
import '@/styles/reset.scss'
// 导入svgIcon
import installIcons from '@/icons'
// 导入路由守卫
import '@/permission'

// 创建vue实例
const app = createApp(App)
// 使用installElementPlus插件
installElementPlus(app)
// 使用installIcons插件(svgIcon)
installIcons(app)

// 在vue实例中挂载store和router插件
app.use(store).use(router).use(i18n).mount('#app')
