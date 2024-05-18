<template>
  <div class="modal">
    <div class="modal-window">
      <h1 style="margin-bottom: 15px; font-weight: 700">Персональные данные</h1>
      <div class="avatar-wrapper">
        <h2 style="margin-bottom: 15px; font-weight: 600; font-size: 20px;">Фотография</h2>
        <div class="avatar-data"> 
          <person-avatar
          :imgPath="this.personInfo.img_url"
          :style="'margin-right: 15px'"
          ></person-avatar>
          <div class="avatar-description"
          style="display: flex; flex-direction: column; justify-content: flex-start">
            <h1 style="font-weight: 500; font-size: 20px; margin-bottom:15px;">Загрузить новую фотографию</h1>
            <input type="file" style="margin-bottom: 10px">
            <p style="font-weight: 300;">Идеальный размер изображения 141x108 пикселей.<br>
              Максимальный размер файла - 200КБ</p>
          </div>
        </div>
      </div>
      <hr class="separator">
      <h1 style="font-size: 20px; font-weight: 600; margin-bottom: 20px;">
        Пользователь
      </h1>
      <form class="user-data-form">
        <div class="user-fio-info">
          <div class="surname">
            <h2>Фамилия</h2>
            <input v-model="this.personInfo.name">
          </div>
          <div class="name">
            <h2>Имя</h2>
            <input v-model="this.personInfo.surname">
          </div>
          <div class="patronymic">
            <h2>Отчество</h2>
            <input v-model="this.personInfo.patronymic">
          </div>
        </div>
        <div class="user-other-info">
          <div class="birthdate">
            <h2>Дата рождения</h2>
            <input v-model="this.personInfo.date_of_birth">
          </div> 
          <div class="tenure">
            <h2>Должность</h2>
            <input v-model="this.personInfo.tenure">
          </div>
        </div>
      </form>
      <hr class="separator">
      <h1 style="font-size: 20px; font-weight: 600; margin-bottom: 20px;">
        Пользователь
      </h1>
      <div class="accounts-wrapper">
        <table-item
        :objectsList="this.personAccounts"
        @rowClicked="processRowClick"
        >
        </table-item>
      </div>
      <button-close
      @buttonClicked="this.$emit('closeModalWindow')"
      > 
      </button-close>
      <modal-account-edit
      v-if="modalVisible"
      @closeModalWindow="this.modalVisible = false"
      >

      </modal-account-edit>
    </div>
    <div class = "overlay"></div>
  </div>
</template>

<script>
  import ButtonClose from "../UI/ButtonClose.vue";
  import PersonAvatar from "../UI/PersonAvatar.vue";
  import { getPersonInfoById } from "@/api/api.js"; 
  import TableItem from "@/components/UI/TableItem.vue";
  import { getAccountsByPersonId } from "@/api/api.js";
  import ModalAccountEdit from "@/components/modals/ModalAccountEdit.vue";
  import { updateUserCredentials } from "@/api/api.js"; 
  export default {
    props: {
      activeUserId: {
        type: Number
      }
    },
    components: {
      TableItem,
      ButtonClose,
      PersonAvatar,
      ModalAccountEdit
    },
    data() {
      return {
        personInfo: {
          name: "",
          surname: "",
          img_url: "",
          tenure: "",
          date_of_birth: ""
        },
        personAccounts: [],
        modalVisible: false,
        credentialId: null,
        credentialLogin: "",
      }
    },
    watch: {
      activeUserId: {
        immediate: true,
        handler(newVal) {
          getPersonInfoById(newVal)
          .then(response => this.personInfo = response);

          getAccountsByPersonId(newVal)
          .then(response => this.personAccounts = response);
        }
      }
    },
    methods: {
      processRowClick(object) {
        this.modalVisible = true;
        this.credentialId = object.user_id;
        this.credentialLogin = object.login;
      }
    }
  }
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
    z-index: 4;
  }

  .modal-window {
    display: flex;
    flex-direction: column;
    align-items: left;
    position: relative;
    z-index: 5;
    min-width: 80%;
    height: 80%;
    border-radius: 10px;
    box-shadow: 0 10px 15px rgba(0,0,0, .4);
    background-color: white;
    padding: 30px;
    overflow-y: auto;
  }
  .avatar-wrapper input {
    height: 30px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 14px;
    background-color: white;
  }
  .avatar-data {
    display: flex;
    flex-direction: row;
  }
  .separator {
    border: none;
    border-top: 1px solid #D9D9D9;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  form {
    display: flex;
    flex-direction: row;
  }
  form input {
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    width: 300px;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 400;
    font-size: 14px;
  }
  .user-fio-info {
    margin-right: 75px;
  }
  .user-data-form h2 {
    font-size: 20px;
    font-weight: 500;
    margin-top: 5px;
    margin-bottom: 5px;
  }

</style>