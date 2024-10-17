import request from '@/utils/request'

/**
 * 获取权限列表数据, data是查询参数page,limit,key等
 */
export const getPermissionListAPI = (data) => {
  return request({
    url: '/permissions',
    method: 'GET',
    params: data
  })
}

/**
 * 获取权限列表所有数据
 */
export const getPermissionALLAPI = () => {
  return request({
    url: '/permissions',
    method: 'GET'
  })
}
/**
 * 添加权限数据
 */
export const postPermissionAPI = (data) => {
  return request({
    url: '/permissions',
    method: 'POST',
    data
  })
}

/**
 * 更新权限数据
 */
export const updatePermissionAPI = (id, data) => {
  return request({
    url: `/permissions/${id}`,
    method: 'PATCH',
    data
  })
}

export const deletePermissionAPI = (id) => {
  return request({
    url: `/permissions/${id}`,
    method: 'DELETE'
  })
}
