<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :default-active="activeMenu"
    :unique-opened="true"
    router>
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"></sidebar-item>
  </el-menu>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
// 通过后端返回的路由数组生成菜单
import { arrayToMenu } from '@/utils/routes'

// 导入前端路由过滤函数
import { filterRouters, generateMenus } from '@/utils/route'

// 实例化vue-router对象
const router = useRouter()
// 前端控制路由：生成可用动态路由，并赋值给vue-router
computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

// 获取vuex中的路由
const store = useStore()
// 设置计算属性，获取用户路由
const privateRoutes = computed(() => {
  return arrayToMenu(store.getters.userInfo.menus)
})

// 添加私有动态路由
privateRoutes.value.forEach((item) => {
  router.addRoute(item)
})

console.log(router.getRoutes())

// 默认激活项
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
