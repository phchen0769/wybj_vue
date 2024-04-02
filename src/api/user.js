import request from '@/utils/request'

export const feature = () => {
  return request({
    url: '/feature',
    method: 'get'
  })
}

// 获取章节模块
export const chapter = () => {
  return request({
    url: '/chapter',
    method: 'get'
  })
}
