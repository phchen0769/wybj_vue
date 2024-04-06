import request from '@/utils/request'

/**
 * 获取所有路由数据
 */
export const getRouterAllAPI = () => {
  return request({
    url: '/routers',
    method: 'GET'
  })
}
