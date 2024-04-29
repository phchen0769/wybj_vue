import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isTimeOut } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求头中添加token
    if (store.getters.token) {
      if (isTimeOut()) {
        // 如果超时，跳转到登录页
        store.dispatch('user/logout')
        return Promise.reject(new Error('token超时,请重新登录'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config
  },
  (error) => {
    // 提示错误信息
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    // 需要判断当前请求是否成功
    if (success) {
      // 请求成功，且返回数据，解析数据
      // ElMessage.success(message)
      console.log(message)
      return data
      // } else {
      //   // 请求成功，但请求数据失败，返回错误信息
      //   ElMessage.error(message)
      //   return Promise.reject(new Error(message))
    }
  },
  //  响应失败
  (error) => {
    // token超时
    if (error.response && error.response.data && error.response.data.code === 401) {
      store.dispatch('user/logout')
      return Promise.reject(error)
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
