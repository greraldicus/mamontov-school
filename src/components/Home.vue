<template>
    <div class="main-info">
      <nav-bar></nav-bar>
      <router-view></router-view>
  </div>
</template>

<script>
  import NavBar from "./NavBar"
  export default {
    data() {
      return { 
      }
    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .main-info {
    background-color: #D9D9D9;
    width: 100vw;
    height: 100vh;
  }
</style>