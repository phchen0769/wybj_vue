import { defineStore } from 'pinia'
import { loginAPI, getUserInfoAPI } from '@/api/sys'
import { setStorage, getStorage, clearStorage } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'
import type { LoginResponse, UserInfo } from '@/types/api.d'


export const useUserStore = defineStore('user', {
  // 应用状态
  state: () => ({
    token: getStorage(TOKEN) || '',
    // 初始化userInfo
    userInfo: {} as UserInfo
  }),
  // 获取状态以及修改状态
  actions: {
    // 设置Token到pinia的state中
    setToken(token: string) {
      this.token = token
      // 存token到localStorage
      setStorage(TOKEN, token)
    },
    // 设置UserInfo到pinia的state中
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    /**
     * 登录请求动作
     */
    login(userInfo: { username: string; password: string }): Promise<void> {
      const { username, password } = userInfo
      return new Promise<void>((resolve, reject) => {
        loginAPI({
          username,
          password: password
        })
          .then((response) => {
            // 打印返回的数据
            // console.log(response)

            // 跳过typescript的类型推断，
            // 因为后端返回的数据直接在response里
            // axios默认返回的数据在response.data
            const data = response as unknown as LoginResponse
            // 设置token
            this.setToken(data.access)
            // 跳转到首页
            router.push('/')

            // 保存登录时间
            setTimeStamp()

            // 用户标记Promise完成
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
      this.setUserInfo(res.data as UserInfo)
      return res.data
    },
    /**
     * 退出登录
     */
    logout() {
      // 清空用户路由
      resetRouter()
      // 清空state中的token
      this.setToken('')
      // 清空state中的userinfo
      this.setUserInfo({} as UserInfo)
      // 清空localStorage的token
      clearStorage()
      // TODO: 清理权限相关配置
      // 跳转到登录页
      router.push('/login')
    }
  },
  getters: {
    token: (state) => state.token,
    /**
     *
     * @param {*} state
     * @returns true 表示用户信息已存在，false 表示用户信息不存在
     */
    hasUserInfo: (state) => {
      return JSON.stringify(state.userInfo) !== '{}'
    },
    // 获取用户信息
    userInfo: (state) => state.userInfo,
  }
})
