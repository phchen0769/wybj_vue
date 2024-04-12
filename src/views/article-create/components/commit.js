import { postArticleAPI, updateArticleAPI } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
const t = i18n.global.t

export const commitArticle = async (data) => {
  const res = await postArticleAPI(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}
export const editArticle = async (id, data) => {
  const res = await updateArticleAPI(id, data)
  ElMessage.success(t('msg.article.editorSuccess'))
  return res
}
