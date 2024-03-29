import { getStorage, setStorage } from '@/utils/storage'
import { LANGUAGE, TAGS_VIEW } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    // 侧边栏默认是展开的
    sidebarOpened: true,
    language: getStorage(LANGUAGE) || 'zh',
    tagsViewList: getStorage(TAGS_VIEW) || []
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
    },
    /**
     * 添加tags
     */
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag)
        setStorage(TAGS_VIEW, state.tagsViewList)
      }
    }
  }
}
