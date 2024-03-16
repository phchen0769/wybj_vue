<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <!-- 当userInfo为空时，el-avatar标签src内容也为空 -->
          <el-avatar
            shape="square"
            :size="40"
            :src="userInfo?.avatar || ''"></el-avatar>
          <!-- 工具栏 -->
          <el-icon><Setting /></el-icon>
        </div>
        <!-- 下拉菜单 （插槽）-->
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item></router-link
            >
            <a target="__blank" href="#"
              ><el-dropdown-item>课程主页</el-dropdown-item></a
            >
            <el-dropdown-item divided @click="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
// 设置计算属性，获取用户信息，用于显示头像
const userInfo = computed(() => store.getters.userInfo)
const logout = () => {
  // 触发退出登录动作
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          // 去掉背景色
          --el-avatar-bg-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
