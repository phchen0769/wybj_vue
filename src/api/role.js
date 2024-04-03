import request from '@/utils/request'

/**
 * 获取角色列表数据
 */
export const getRoleList = () => {
  return request({
    url: '/roles'
  })
}
