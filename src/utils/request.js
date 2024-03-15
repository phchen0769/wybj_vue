import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求头中添加token
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
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
      return data
    } else {
      // 请求成功，但请求数据失败，返回错误信息
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  //  请求失败
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
