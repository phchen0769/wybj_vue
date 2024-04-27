import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 导入element-plus
// import ElementPlus from 'element-plus'

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

// 在vue实例中挂载store
app.use(store)
// 在vue实例中挂载pinia
app.use(createPinia())
// 在vue实例中挂载router
app.use(router)
// 在vue实例中挂载i18n
app.use(i18n)

app.mount('#app')
