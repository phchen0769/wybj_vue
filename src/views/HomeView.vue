<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" on-click="@myFunction"/>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {

  name: 'HomeView',

  components: { HelloWorld }
}

createImageBitmap(() => {
  console.log('Image clicked')
})

</script>
