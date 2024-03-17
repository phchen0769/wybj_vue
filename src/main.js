import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import installElementPlus from './plugins/element'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 初始化样式表
import '@/styles/reset.scss'
// 导入svgIcon
import installIcons from '@/icons'
// 导入路由守卫
import '@/permission'

// 创建vue实例
const app = createApp(App)
// 使用installElementPlus插件
// installElementPlus(app)
// 使用installIcons插件(svgIcon)
installIcons(app)
// 使用ElementPlusIconsVue插件，导入所有element-plus的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 在vue实例中挂载store和router插件
app.use(ElementPlus).use(store).use(router).mount('#app')
