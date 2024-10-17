import { createI18n } from 'vue-i18n'
// 引入自定义语言包
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'
import store from '@/store'

// 定义数据源
const messages = {
  en: {
    msg: {
      // 结构语言包
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}

/**
 * 返回当前 lang
 */
function getLanguage() {
  return store && store.getters && store.getters.language
}

// i18n配置
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getLanguage() || 'zh',
  messages
})

export default i18n
