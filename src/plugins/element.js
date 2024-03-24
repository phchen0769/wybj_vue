import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css'
// import 'element-plus/theme-chalk/index.css'
// 导入element-plus的语言包
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from '@/store'

export default (app) => {
  // 使用ElementPlusIconsVue插件，导入所有element-plus的图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // 设置element-plus的语言包
  app.use(ElementPlus, { locale: store.getters.language === 'en' ? en : zhCn })
}
