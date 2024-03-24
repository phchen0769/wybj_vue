<template>
  <router-view />
</template>
<script>
// import { useStore } from 'vuex'
// import { generateNewStyle, writeNewStyle } from '@/utils/theme'

// const store = useStore()
// // 生成新的主题色，并写入（用于解决刷新后，更换的主题失效问题）
// generateNewStyle(store.getters.mainColor).then((newStyleText) => {
//   writeNewStyle(newStyleText)
// })

export default {
  name: 'App'
}
</script>
<style lang="scss"></style>
