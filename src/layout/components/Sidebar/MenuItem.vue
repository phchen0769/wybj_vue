<template>
  <!-- element icon -->
  <el-icon
    v-if="icon && icon.includes('el-icon')"
    class="sub-el-icon"
    :class="icon">
    <component :is="iconName" />
  </el-icon>
  <!-- svg icon -->
  <svg-icon v-else :icon="icon"></svg-icon>
  <!-- 文本 -->
  <span>{{ title }}</span>
</template>

<script setup>
import { ElIcon } from 'element-plus'
// 定义 props,从父组件接收数据
// MenuItem->SidebarItem->SidebarMenu->Sidebar(index.vue)
defineProps({
  title: {
    type: String,
    // required: true,
    default: ''
  },
  icon: {
    type: String,
    // required: true,
    default: ''
  },
  iconName: {
    type: String,
    required: false,
    default: ''
  }
})
// console.log({ title: props.title, icon: props.icon, iconName: props.iconName })
</script>

<style lang="scss" scoped></style>
