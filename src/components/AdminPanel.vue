<template>
    <header-bar
    ></header-bar>
    <div class="admin-panel">
      <menu-item
      :contentsList="contentsList"
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
          "Бронирование"
        ]
      }
    }
  }
</script>

<style scoped>
  .admin-panel {
    display: flex;
    flex-direction: row;
    padding-top: 30px;
    background-color: #D9D9D9;
    padding-left: 100px;
    padding-right: 100px;
    height: 100vh;
  }
  .admin-panel .menu {
    height: 90px;
  }
</style>