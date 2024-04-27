// 白名单
const whiteList = ['/login', '/register', '/import', '/404', '401']
// 判断是否需要添加tags,当在白名单中时，不需要添加tags
export function inWhiteList(path) {
  return whiteList.includes(path)
}
