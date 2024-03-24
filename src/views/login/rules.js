// 导入i18n
import i18n from '@/i18n'
export const validatePassword = (rule, value, callback) => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      // 使用i18n
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
