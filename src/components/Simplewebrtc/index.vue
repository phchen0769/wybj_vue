<template>
  <div>
    <div id="localVideo" muted></div>
    <div id="remoteVideo"></div>
  </div>
</template>

<script setup>
import SimpleWebRTC from 'simplewebrtc'

const webrtc = new SimpleWebRTC({
  localVideoEl: 'localVideo',
  remoteVideosEl: 'remoteVideo',
  autoRequestMedia: true
})

webrtc.on('readyToCall', function () {
  webrtc.joinRoom('My room name')
})
</script>

<style lang="scss" scoped></style>
