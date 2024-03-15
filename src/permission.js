import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 * @param {*} to 要到的路由
 * @param {*} from 从哪个路由来
 * @param {*} next 是否要去
 */
router.beforeEach(async (to, from, next) => {
  // 从vuex（快捷路径）中获取token
  // if(store.state.user.token)
  if (store.getters.token) {
    // 1、用户已登录，则不允许进入login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户信息是否存在，如不存在，则获取用户信息
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 2、用户未登录，则只允许进入login
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
