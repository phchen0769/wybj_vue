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
import { computed } from 'vue'
import { useRouter } from 'vue-router'
// 导入路由过滤函数
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'

// 实例化vue-router对象
const router = useRouter()
// 生成可用动态路由，并赋值给vue-router
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
console.log(JSON.stringify(routes.value))
</script>
