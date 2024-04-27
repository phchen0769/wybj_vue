import request from '@/utils/request'

/**
 * 获取用户列表数据
 */
export const getUserManageList = (data) => {
  return request({
    url: '/users',
    params: data,
    method: 'GET'
  })
}
/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return request({
    url: '/users'
  })
}

/**
 * 批量导入
 */
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}
/**
 * 删除指定数据
 */
export const deleteUserAPI = (id) => {
  return request({
    url: `/users/${id}`,
    method: 'DELETE'
  })
}
/**
 * 获取用户详情
 */
export const getUserDetailAPI = (id) => {
  return request({
    url: `/users/${id}`,
    method: 'GET'
  })
}

/**
 * 为用户分配角色
 */
export const updateRole = (id, role) => {
  return request({
    url: `/users/${id}`,
    method: 'PATCH',
    data: {
      role
    }
  })
}
