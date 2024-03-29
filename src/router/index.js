import { createRouter, createWebHashHistory } from 'vue-router'
// import store from '@/store'
import layout from '@/layout/index.vue'
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
    component: layout,
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
        component: () => import('@/views/error-page/404')
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
// export function resetRouter() {
//   if (
//     store.getters.userInfo &&
//     store.getters.userInfo.permission &&
//     store.getters.userInfo.permission.menus
//   ) {
//     const menus = store.getters.userInfo.permission.menus
//     menus.forEach((menu) => {
//       router.removeRoute(menu)
//     })
//   }
// }
export default router
