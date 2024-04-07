import { login, getUserInfoAPI } from '@/api/sys'
// import md5 from 'md5'
import { setStorage, getStorage, clearStorage } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  // 表示此模块是单独模块，不会被合并到其他模块中
  namespaced: true,
  // 应用状态
  state: () => ({
    token: getStorage(TOKEN) || '',
    // 初始化userInfo
    userInfo: {}
  }),
  // 获取状态以及修改状态
  mutations: {
    // 设置Token到vuex的state中
    setToken(state, token) {
      state.token = token
      // 存token到localStorage
      setStorage(TOKEN, token)
    },
    // 设置UserInfo到vuex的state中
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登录请求动作
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          // md5加密
          // password: md5(password)
          password: password
        })
          .then((data) => {
            // 打印返回的数据
            // console.log(data)
            // 设置token
            this.commit('user/setToken', data.access)

            // 跳转到首页
            router.push('/')

            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    /**
     * 获取用户信息
     */
    async fetchUserInfo() {
      const res = await getUserInfoAPI()
      this.commit('user/setUserInfo', res)
      return res
    },

    /**
     * 退出登录
     */
    logout() {
      // 清空用户路由
      resetRouter()
      // 清空vuex的token
      this.commit('user/setToken', '')
      // 清空vuex的用户信息
      this.commit('user/setUserInfo', {})
      // 清空localStorage的token
      clearStorage()
      // TODO: 清理权限相关配置
      // 跳转到登录页
      router.push('/login')
    }
  }
}
