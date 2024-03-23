export default {
  namespaced: true,
  state: () => ({
    // 侧边栏默认是展开的
    sidebarOpened: true
  }),
  mutations: {
    // sidebarOpened 的值取反
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}
