import { getStorage, setStorage } from '@/utils/storage'
import { LANGUAGE } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    // 侧边栏默认是展开的
    sidebarOpened: true,
    language: getStorage(LANGUAGE) || 'zh'
  }),
  mutations: {
    // sidebarOpened 的值取反
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 设置语言
    setLanguage(state, lang) {
      // 把语言存到本地
      setStorage(LANGUAGE, lang)
      // 把语言存到中vuex中
      state.language = lang
    }
  }
}
