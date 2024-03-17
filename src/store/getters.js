// 快捷访问

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
  userInfo: (state) => state.user.userInfo[0]
}

export default getters
