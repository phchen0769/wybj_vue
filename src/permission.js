import router from '@/router'
import store from '@/store'
import { computed } from 'vue'
import { arrayToRouter } from '@/utils/router'

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
        await store.dispatch('user/fetchUserInfo')

        // console.log(store.getters.userInfo)
        // 设置计算属性，获取用户路由
        const privateRoutes = computed(() => {
          return arrayToRouter(store.getters.userInfo.routers)
        })
        // 后端控制路由：私有动态路由，赋值给vue-router
        privateRoutes.value.forEach((item) => {
          router.addRoute(item)
          // trigger a redirection
          return to.fullPath
        })

        // 不强制进行跳转，浏览器刷新后会找不到页面
        // 此时已添加了后端返回的动态路由，进行跳转一次
        // if (privateRoutes.value) {
        //   // 此处 next 里就不可用 ...to，因为 to 是临时路由
        //   next({ path: to.path, query: to.query, replace: true })
        // } else {
        //   next({ ...to, replace: true })
        // }
        if (privateRoutes.value) {
          // 此处 next 里就不可用 ...to，因为 to 是临时路由
          next({ path: to.path, query: to.query, replace: true })
          return
        } else {
          next({ ...to, replace: true })
          return
        }
      }
    }
    next()
  } else {
    // 2、用户未登录，则只允许进入login
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
