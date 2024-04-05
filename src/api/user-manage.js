import request from '@/utils/request'

/**
 * 获取用户列表数据
 */
export const getUserManageList = (data) => {
  return request({
    url: '/userinfo',
    params: data
  })
}
/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return request({
    url: '/userinfo'
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
export const deleteUser = (id) => {
  return request({
    url: `/userinfo/${id}`,
    method: 'DELETE'
  })
}
/**
 * 获取用户详情
 */
export const userDetail = (id) => {
  return request({
    url: `/userinfo/${id}`,
    method: 'GET'
  })
}

/**
 * 为用户分配角色
 */
export const updateRole = (id, role) => {
  return request({
    url: `/userinfo/${id}`,
    method: 'PATCH',
    data: {
      role
    }
  })
}
