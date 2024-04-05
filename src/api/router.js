import request from '@/utils/request'

/**
 * 获取角色列表数据
 */
export const getRouterListAPI = () => {
  return request({
    url: '/routers',
    method: 'GET'
  })
}
