<template>
  <div class="admin-users">
    <div class="title">Пользователи</div>
    <table-item
    :objectsList="this.usersList"
    :style="'width: 100%;'"
    ></table-item>
  </div>
</template>

<script>
  import TableItem from "@/components/UI/TableItem.vue";
  export default {
    components: {
      TableItem
    },
    data() {
      return {
        usersList: [
          {
            id: 1,
            name: "Anton Antropov",
            birthdate: "15.05.2000",
            dolg: "Observer"
          },
          {
            id: 2,
            name: "Grigorii Beshliaga",
            birthdate: "15.05.2001",
            dolg: "Fucker"
          },
          {
            id: 3,
            name: "Daria Tomilova",
            birthdate: "15.05.2002",
            dolg: "Cleaner"
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .admin-users {
    width: 100%;
    background-color: white;
    border-radius: 15px;
    padding: 15px;
  }
  .title {
    font-size: 24px;
    margin-bottom: 15px;
  }
</style>