<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

// props是父组件传递参数给子组件
const props = defineProps({
  // icon 图标路径
  icon: {
    type: String,
    required: true
  },
  // 图标类名，用于处理图标样式
  className: {
    type: String,
    default: ''
  }
})

/**
 * 图标数据处理
 */
const iconName = computed(() => `#icon-${props.icon}`)

const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
