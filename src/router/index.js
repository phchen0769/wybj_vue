import { createRouter, createWebHashHistory } from 'vue-router'
/**
 * 公开路由表
 */
const publicRoutes = [
  {
    // 登录页
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    // 首页
    path: '/',
    component: () => import('@/layout/index.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})
export default router
