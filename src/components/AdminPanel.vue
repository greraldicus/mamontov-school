<template>
    <header-bar
    ></header-bar>
    <div class="admin-panel">
      <menu-item
      :contentsList="this.contentsList"
      ></menu-item>
      <router-view></router-view>
    </div>
</template>

<script>
  import HeaderBar from "./HeaderBar.vue";
  import MenuItem from "./UI/MenuItem.vue";
  export default {
    components: {
      HeaderBar,
      MenuItem,
    },
    data() {
      return {
        contentsList: [
          "Пользователи",
          "Бронирование",
          "Рабочие места",
          "Карта"
        ]
      }
    }
  }
</script>

<style scoped>
  .admin-panel {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: #D9D9D9;
    /* background-repeat: repeat;
    background-size: auto; */
    padding-left: 100px;
    padding-right: 100px;
    height: 100vh;  
  }
</style>