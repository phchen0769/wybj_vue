<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- 用户名 -->
      <el-form-item>
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
        <el-input
          placeholder="请输入用户名"
          name="username"
          type="text"
          prefix-icon="el-icon-user"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item>
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
        <el-input
          placeholder="请输入密碼"
          name="password"
          type="password"
          prefix-icon="el-icon-user"
        />
        <span class="show-pwd">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button type="primary" round>登录</el-button>
      <!-- 注册 -->
      <!-- <el-button type="primary" round>注册</el-button> -->
    </el-form>
  </div>
</template>

<script setup>
import { Avatar } from '@element-plus/icons'
</script>

<style lang="scss" scoped>
// 定义颜色变量
$bg: #2b3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    widows: 520px;
    padding:160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    // 深度选择器
    ::v-deep .el-form-item {
      border: 1px solid rgba($color(255,255,255),0.1);
      background-color: rgba($color: #000000, 0.1);
      color:#454545;
    //   margin-bottom: 20px;
    //   .svg-container {
    //     position: absolute;
    //     top: 50%;
    //     left: 0;
    //     transform: translateY(-50%);
    //     width: 40px;
    //     height: 40px;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     color: $dark_gray;
    //   }
    //   .el-input {
    //     padding-left: 40px;
    //     border-radius: 20px;
    //     background-color: $light_gray;
    //     color: $dark_gray;
    //     ::v-deep .el-input__inner {
    //       border: none;
    //       border-radius: 20px;
    //       background-color: $light_gray;
    //       color: $dark_gray;
    //       ::v-deep .el-input__prefix {
    //         color: $dark_gray;
    //       }
    //     }
    //   }
    //   .show-pwd {
    //     position: absolute;
    //     top: 50%;
    //     right: 0;
    //     transform: translateY(-50%);
    //     width: 40px;
    //     height: 40px;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     color: $dark_gray;
    //   }
    // }
  }
}
</style>
