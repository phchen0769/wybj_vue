<template>
  <SvgIcon
    icon="video-setting"
    size="32"
    :class="['setting-menu', isShow ? 'open-setting' : '']"
    :color="$store.getters.cssVar.menuBg"
    @click="isShow = !isShow"
  />
  <div class="settings-mask" @click="isShow = false" v-if="isShow"></div>
  <Transition name="T_top_dow">
    <div class="setting show-box" @click.stop="void 0" v-if="isShow">
      <span class="title">{{ $t('msg.videoCall.callSetting') }}</span>
      <div class="item">
        <span class="name">{{ $t('msg.videoCall.remoteAudio') }}</span>
        <input type="checkbox" v-model="userInfo.settings.remoteAudio" />
      </div>
      <div class="item">
        <span class="name">{{ $t('msg.videoCall.localAudio') }}</span>
        <input type="checkbox" v-model="userInfo.settings.localAudio" />
      </div>
      <div class="item">
        <span class="name">{{ $t('msg.videoCall.remoteVideo') }}</span>
        <input type="checkbox" v-model="userInfo.settings.remoteVideo" />
      </div>
      <div class="item">
        <span class="name">{{ $t('msg.videoCall.localVideo') }}</span>
        <input type="checkbox" v-model="userInfo.settings.localVideo" />
      </div>
      <div class="item">
        <span class="name">{{ $t('msg.videoCall.video') }}</span>
        <input
          type="radio"
          name="radio"
          :value="SETTINGS_VIDEO.USER"
          v-model="userInfo.settings.video"
        />
      </div>
      <div class="item">
        <span class="name">{{ $t('msg.videoCall.deskShare') }}</span>
        <input
          type="radio"
          name="radio"
          :value="SETTINGS_VIDEO.DISPLAY"
          v-model="userInfo.settings.video"
        />
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
// import SvgIcon from './SvgIcon.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useUserInfo } from '@/stores/userInfo'
import { SETTINGS_VIDEO } from '../enum'
import { ref } from 'vue'
const userInfo = useUserInfo()
let isShow = ref(false)
</script>
<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
input {
  cursor: pointer;
}
.setting-menu {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 2001;
  transition: 0.22s;
  cursor: pointer;
}
.open-setting {
  transform: rotate(90deg);
}
.settings-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 2001;
}
.setting {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  width: 300px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  z-index: 2002;
  .title {
    align-self: center;
    font-size: 16px;
    font-weight: bold;
    color: $menuBg;
  }
  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 12px;
    margin-top: 12px;
  }
}
</style>
