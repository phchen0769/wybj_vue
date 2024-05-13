import { CALL_STATE } from '../enum'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

// 导入i18n
import i18n from '@/i18n'

/**
 * 根据状态吐丝
 * @param state 状态
 * @returns 吐丝
 */
export function useToast(state: Ref<CALL_STATE>) {
  const toast = ref('...')
  watch(state, () => {
    switch (state.value) {
      case CALL_STATE.CONNECT:
        i18n.global.t('msg.videoCall.msgToast1')
        break
      case CALL_STATE.SEND:
        toast.value = i18n.global.t('msg.videoCall.msgToast2')
        break
      case CALL_STATE.REFUSE:
        toast.value = i18n.global.t('msg.videoCall.msgToast3')
        break
      case CALL_STATE.OFF:
        toast.value = i18n.global.t('msg.videoCall.msgToast4')
        break
      case CALL_STATE.WAIT:
      default:
        toast.value = '...'
        break
    }
  })
  return [toast]
}
