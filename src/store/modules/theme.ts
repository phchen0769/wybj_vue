import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import { getStorage, setStorage } from '@/utils/storage'
import variables from '@/styles/variables.module.scss'

export default {
  namespaced: true,
  state: () => ({
    mainColor: getStorage(MAIN_COLOR) || DEFAULT_COLOR,
    variables: variables
  }),
  mutations: {
    setMainColor(state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      setStorage(MAIN_COLOR, newColor)
    }
  },
  actions: {}
}
