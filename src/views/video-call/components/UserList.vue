<template>
  <SvgIcon
    icon="video-menu"
    size="22"
    :class="['mobile-menu', isOpen ? 'open-menu' : '']"
    color="#67c23a"
    v-if="isMobile"
    @click="userInfo.userInfo.username && (isOpen = !isOpen)"
  />
  <div class="userlist-mask" @click="isOpen = false" v-if="isOpen"></div>
  <div :class="['user-list', 'show-box', isMobile ? 'mobile' : '', isOpen ? 'open-user' : '']">
    <span class="title" :style="{ color: $store.getters.cssVar.menuBg }">{{
      $t('msg.videoCall.title')
    }}</span>
    <div class="list">
      <div class="item show-box" v-for="item in userInfo.userList" :key="item.userId">
        <div class="left">
          <SvgIcon icon="video-user" size="22" />
          <span class="name">{{ item.username }}</span>
        </div>
        <AppButton
          @click="$emit('callUser', item.username)"
          v-if="item.username !== userInfo.userInfo.username"
          v-show="props.callState === CALL_STATE.WAIT"
          >{{ $t('msg.videoCall.call') }}</AppButton
        >
        <span v-else class="now">{{ $t('msg.videoCall.current') }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import SvgIcon from './SvgIcon.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import AppButton from './AppButton.vue'
import { useUserInfo } from '@/stores/userInfo'
import { CALL_STATE } from '../enum'
import { computed, ref } from 'vue'
let userInfo = useUserInfo()
const $emit = defineEmits(['callUser'])
interface PropsType {
  callState: CALL_STATE
}
let isOpen = ref(false)
let isMobile = computed(() => {
  let w = window.screen.width
  let h = window.screen.height
  // 粗略判断是否是移动端
  return w <= h
})
const props = withDefaults(defineProps<PropsType>(), {})
</script>
<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.open-user {
  left: 0px !important;
}
.open-menu {
  transform: rotate(90deg);
}
.mobile-menu {
  position: fixed;
  left: 24px;
  top: 24px;
  z-index: 2003;
  transition: 0.22s;
}
.userlist-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 2001;
}
.mobile {
  position: fixed;
  left: -320px;
  height: 100%;
  background-color: white;
  transition: 0.5s;
  z-index: 2002;
}
.user-list {
  padding: 12px;
  width: 300px;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
  .title {
    align-self: center;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .list {
    height: 100%;
    overflow: auto;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;
      padding: 12px;
      margin-bottom: 12px;
      box-sizing: border-box;
      .now {
        font-size: 12px;
        color: #67c23a;
        font-weight: bold;
        // width: 10%;
      }
      .left {
        display: flex;
        align-items: center;
        .name {
          margin-left: 12px;
          font-weight: bold;
          color: gray;
        }
      }
    }
  }
}
</style>
