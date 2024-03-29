import { getStorage, setStorage } from '@/utils/storage'
import { LANGUAGE, TAGS_VIEW } from '@/constant'
export default {
  namespaced: true,
  // 定义变量
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
    },
    /**
     * （国际化）为指定的 tag 修改 title
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setStorage(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
        return
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setStorage(TAGS_VIEW, state.tagsViewList)
    }
  }
}
