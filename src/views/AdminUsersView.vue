<template>
  <div class="admin-users">
    <div class="title">Пользователи</div>
    <table-item
    :objectsList="this.usersList"
    :style="'width: 100%;'"
    @showModal="this.modalVisible = true"
    @setActiveId="setActiveId"
    :activeUserId="this.activeUserId"
    ></table-item>
    <modal-user-info
    v-if="modalVisible"
    @closeModalWindow="this.modalVisible = false"
    :activeUserId="this.activeUserId"
    ></modal-user-info>
  </div>
</template>

<script>
  import TableItem from "@/components/UI/TableItem.vue";
  import ModalUserInfo from "@/components/modals/ModalUserInfo.vue";
  import { getPersons}  from "@/api/api.js";
  export default {
    components: {
      TableItem,
      ModalUserInfo
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
            dolg: "Director"
          },
          {
            id: 3,
            name: "Daria Tomilova",
            birthdate: "15.05.2002",
            dolg: "Cleaner"
          }
        ],
        activeUserId: null,
        modalVisible: false,
      }
    },
    methods: {
      setActiveId(id) {
        this.activeUserId = id;
      }
    },
    mounted() {
      getPersons()
      .then(response => {
        response.forEach(item => {
          item['ФИО'] = item['name'] + " " + item['surname'] + " " + item['patronymic'];
          delete item['name'];
          delete item['surname'];
          delete item['patronymic'];
          delete item['img_url'];
        })
        this.usersList = response;
      }
      )
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