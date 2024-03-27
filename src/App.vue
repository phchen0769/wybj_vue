<template>
  <router-view />
</template>
<script>
export default {
  name: 'App'
}

// 解决ERROR ResizeObserver loop completed with undelivered notifications.

// 问题的

const debounce = (fn, delay) => {
  let timer = null

  return function () {
    const context = this

    const args = arguments

    clearTimeout(timer)

    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

const _ResizeObserver = window.ResizeObserver

window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16)
    super(callback)
  }
}
</script>
<style lang="scss"></style>
