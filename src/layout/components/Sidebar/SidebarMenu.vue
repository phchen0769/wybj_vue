<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    default-active="2"
    :unique-opened="true">
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"></sidebar-item>
  </el-menu>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
// 通过后端返回的路由数组生成菜单
import { arrayToMenu } from '@/utils/menus'

// 获取vuex中的路由
const store = useStore()
// 设置计算属性，获取用户菜单
const routes = computed(() => {
  return arrayToMenu(store.getters.userInfo.menus)
})

routes.value.forEach((item) => {
  console.log(item)
})

// // 导入前端路由过滤函数
// import { filterRouters, generateMenus } from '@/utils/route'

// import { useRouter } from 'vue-router'
// // 实例化vue-router对象
// const router = useRouter()
// // 前端控制路由：生成可用动态路由，并赋值给vue-router
// const routes = computed(() => {
//   const filterRoutes = filterRouters(router.getRoutes())
//   return generateMenus(filterRoutes)
// })
</script>
