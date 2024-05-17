<template>
  <div class="header">
    <img src="https://www.parma.ru/img/Logo-2-31.svg">
    <logout-button></logout-button>
  </div>
</template>

<script>
  import LogoutButton from './UI/LogoutButton.vue';
  export default {
    components: {
      LogoutButton
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style scoped>
  .header {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100px;
      background-color: white;
      box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
      /* z-index: 2; */
      padding-left: 100px;
      padding-right: 100px;
    }
    .header img {
    height: 100px;
    width: 200px;
    }
</style>