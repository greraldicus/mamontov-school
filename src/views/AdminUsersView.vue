<template>
  <div class="admin-users">
    <div class="title">Пользователи</div>
    <table-item
    :objectsList="this.usersList"
    :style="'width: 100%;'"
    @rowClicked="processRowClick"
    @setActiveId="setActiveId"
    :activeUserId="this.activeUserId"
    >
    </table-item>
    <div class="btn-add">
      <button-item
      :backgroundColor="'#7AD789'"
      :fontColor="'white'"
      :textContent="'Добавить'"
      @buttonClicked="processButtonClick"
      >
      </button-item>
    </div>
    <modal-user-info
    v-if="modalVisible"
    @closeModalWindow="this.modalVisible = false"
    :activeUserId="this.activeUserId"
    :isNewPerson="isNewPerson"
    >
    </modal-user-info>

  </div>
</template>

<script>
  import TableItem from "@/components/UI/TableItem.vue";
  import ModalUserInfo from "@/components/modals/ModalUserInfo.vue";
  import ButtonItem from "@/components/UI/ButtonItem.vue";
  import { getPersons }  from "@/api/api.js";
  export default {
    components: {
      TableItem,
      ModalUserInfo,
      ButtonItem
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
        isNewPerson: false
      }
    },
    methods: {
      setActiveId(object) {
        this.activeUserId = object.id;
      },
      processRowClick() {
        this.isNewPerson = false;
        this.modalVisible = true;
      },
      processButtonClick() {
        this.isNewPerson = true;
        this.modalVisible = true;
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
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 24px;
    margin-bottom: 15px;
  }
  .btn-add {
    margin-top: 20px;
    align-self: flex-end;
  }
</style>