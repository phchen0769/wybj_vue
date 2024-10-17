/**
 * 存储数据
 */
export const setStorage = (key, value) => {
  // value分两种情况：
  // 1. value是对象，需要转换成字符串
  // 2. value是字符串，直接存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getStorage = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

/**
 * 删除指定数据
 */
export const removeStorage = (key) => {
  window.localStorage.removeItem(key)
}

/**
 * 清空数据
 */
export const clearStorage = () => {
  window.localStorage.clear()
}
