import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
// import ArticleCreaterRouter from './modules/ArticleCreate'
// import ArticleRouter from './modules/Article'
// import PermissionListRouter from './modules/PermissionList'
// import RoleListRouter from './modules/RoleList'
// import UserManageRouter from './modules/UserManage'

/**
 * 私有路由表
 */
// export const privateRoutes = [
//   RoleListRouter,
//   UserManageRouter,
//   PermissionListRouter,
//   ArticleCreaterRouter,
//   ArticleRouter
// ]
/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    // 登录页
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  // {
  //   // 注册页
  //   path: '/register',
  //   component: () => import('@/views/register/index.vue')
  // },
  {
    // 首页
    path: '/',
    redirect: '/profile',
    name: 'home',
    component: () => import('@/layout/index.vue'),
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'el-icon',
          iconName: 'User'
        }
      },
      // 视频通话
      {
        path: '/video-call',
        name: 'video-call',
        component: () => import('@/views/video-call/index.vue'),
        meta: {
          title: 'videoCall',
          icon: 'article',
          iconName: 'article'
        }
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/error-page/404.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  // routes: [...publicRoutes, ...privateRoutes]
  // 私有路由从后端传入
  routes: [...publicRoutes]
})
/**
 * 初始化路由表
 */
export function resetRouter() {
  if (store.getters.userInfo && store.getters.userInfo.routers) {
    const menus = store.getters.userInfo.routers
    menus.forEach((menu: any) => {
      if (menu.children) {
        // 如果存在子路由，分别移除每一个子路由
        menu.children.forEach((child: any) => {
          router.removeRoute(child.name)
        })
      }
      // 移除父路由
      router.removeRoute(menu.name)
    })
  }
  console.log(router.getRoutes())
}
export default router
