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

/**
 * 获取当前用户信息
 * return promise
 */
export const getUserInfo = () => {
  return request({
    url: '/userinfo',
    method: 'GET'
  })
}
