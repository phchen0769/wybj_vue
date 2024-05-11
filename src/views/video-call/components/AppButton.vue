<template>
  <div
    class="app-btn"
    v-on="$attrs"
    :style="{
      borderRadius: props.isRund ? '100%' : '6px',
      padding: props.isRund ? '' : '2px 8px'
    }"
  >
    <slot />
  </div>
</template>
<script lang="ts" setup>
interface PropsType {
  isRund?: boolean
}
const props = withDefaults(defineProps<PropsType>(), {
  isRund: false
})
</script>
<style lang="scss" scoped>
.app-btn {
  background-color: #e5bc64;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.22s;
  &:hover {
    background-color: #e5bc64b9;
  }
  &:active {
    transform: scale(0.9);
  }
}
</style>
