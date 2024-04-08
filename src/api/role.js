import request from '@/utils/request'

/**
 * 获取角色列表数据
 */
export const getRoleListAPI = () => {
  return request({
    url: '/roles',
    method: 'GET'
  })
}

/**
 * 获取角色权限列表数据
 */
export const getRolePermissionAPI = (id) => {
  return request({
    url: `/roles/${id}`,
    method: 'GET'
  })
}

/**
 *
 */
export const distributePermission = () => {}
