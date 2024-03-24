/**
 * @description: 根据路由名称生成页面标题
 */
import i18n from '@/i18n'
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}
