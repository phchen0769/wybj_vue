import request from '@/utils/request'

export const feature = () => {
  return request({
    url: '/features'
  })
}

// 获取章节模块
export const chapter = () => {
  return request({
    url: '/chapters'
  })
}
