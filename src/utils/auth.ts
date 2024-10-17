import { TIME_STAMP, TOKEN_TIME_OUT } from '@/constant'
import { getStorage, setStorage } from '@/utils/storage'
/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getStorage(TIME_STAMP)
}
/**
 * 设置时间戳
 */
export function setTimeStamp() {
  setStorage(TIME_STAMP, Date.now())
}

/**
 * 是否超时
 */
export function isTimeOut() {
  // 当前时间
  const currentTime = Date.now()
  // 缓存时间
  const timeStamp = getStorage(TIME_STAMP)
  return currentTime - timeStamp > TOKEN_TIME_OUT
}
