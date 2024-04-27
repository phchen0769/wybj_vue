import request from '@/utils/request'

export const featureListAPI = () => {
  return request({
    url: '/features',
    method: 'GET'
  })
}

// 获取章节模块
export const chapterListAPI = () => {
  return request({
    url: '/chapters',
    method: 'GET'
  })
}
