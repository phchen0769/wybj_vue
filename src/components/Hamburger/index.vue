<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- 触发triggerSidebarOpened函数 -->
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon id="guide-hamburger" class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// 触发triggerSidebarOpened函数
const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}

// 根据sidebarOpened的值设置图标
const icon = computed(() => (store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'))
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
