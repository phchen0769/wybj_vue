// 快捷访问
import { generateColors } from '@/utils/theme'
import { getStorage } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant/index'

// vuex 中的计算属性
const getters = {
  token: (state) => state.user.token,
  /**
   *
   * @param {*} state
   * @returns true 表示用户信息已存在，false 表示用户信息不存在
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  // 获取用户信息
  userInfo: (state) => state.user.userInfo,
  // 定义动态菜单的css变量
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getStorage(MAIN_COLOR))
  }),
  // 获取主题色
  mainColor: (state) => state.theme.mainColor,
  // 定义动态菜单的css变量
  sidebarOpened: (state) => state.app.sidebarOpened,
  // 获取语言
  language: (state) => state.app.language,
  // tagview
  tagsViewList: (state) => state.app.tagsViewList
}

export default getters
