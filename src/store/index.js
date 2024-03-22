import { createStore } from 'vuex'
// 导入 user 模块
import user from './modules/user'
import app from './modules/app'
// 导入getters 模块
import getters from './getters'

export default createStore({
  // 注册 getters
  getters,
  modules: {
    // 注册 user 模块
    user,
    app
  }
})
