import request from '@/utils/request'
/**
 * 登录（封装登录模块）
 * return promise
 */

export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
