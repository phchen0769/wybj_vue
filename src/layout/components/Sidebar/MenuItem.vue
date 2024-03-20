<template>
  <el-icon
    v-if="icon && icon.includes('el-icon')"
    class="sub-el-icon"
    :class="icon">
    <component :is="iconName" />
  </el-icon>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ title }}</span>
</template>

<script setup>
// 定义 props,从父组件接收数据
// MenuItem->SidebarItem->SidebarMenu->Sidebar(index.vue)
const props = defineProps({
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
console.log(props.title, props.icon, props.iconName)
</script>

<style lang="scss" scoped></style>
