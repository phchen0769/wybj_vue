/**
 * 判断是否为外部资源
 * @param {string} icon
 */

export function isExternal (icon) {
  return /^(https?:|mailto:|tel:)/.test(icon)
}
