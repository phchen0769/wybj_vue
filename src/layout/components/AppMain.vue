<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
watch(route, (to, from) => {
  console.log('to:', to)
  console.log('from:', from)
})
</script>

<style lang="scss" scoped>
.app-main {
  //浏览器可视区域的高度
  min-height: calc(100vh - 54px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
