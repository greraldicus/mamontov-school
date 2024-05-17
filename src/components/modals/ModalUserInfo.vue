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
            <p>Идеальный размер изображения 141x108 пикселей.<br>
              Максимальный размер файла - 200КБ</p>
          </div>
        </div>
      </div>
      <form class="user-data-form">
        <div class="user-fio-info">
          <h1>Пользователь  </h1>
          <div class="surname">
            <h2>Фамилия</h2>
            <input v-model="this.personalData.name">
          </div>
          <div class="name">
            <h2>Имя</h2>
            <input v-model="this.personalData.surname">
          </div>
          <div class="patronymic">
            <h2>Отчество</h2>
            <input v-model="this.personalData.patronymic">
          </div>
        </div>
        <div class="user-other-info">

        </div>
  </form>
      <div class="accounts-wrapper">
        <!--Тут таблица учетных записей-->
      </div>
      <button-close
      @buttonClicked="this.$emit('closeModalWindow')"
      > 
      </button-close>
    </div>
    <div class = "overlay"></div>
  </div>
</template>

<script>
  import ButtonClose from "../UI/ButtonClose.vue";
  import PersonAvatar from "../UI/PersonAvatar.vue";
  import { getPersonInfo } from "@/api/api.js"; 
  export default {
    props: {
      activeUserId: {
        type: Number
      }
    },
    components: {
      ButtonClose,
      PersonAvatar,
    },
    data() {
      return {
        personInfo: {
          name: "",
          surname: "",
          img_url: "",
          tenure: ""
        }
      }
    },
    mounted() {
      getPersonInfo(this.activeUserId)
      .then(response => {this.personInfo = response
      console.log(response.img_url);}
      );
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
    width: 80%;
    height: 80%;
    border-radius: 10px;
    box-shadow: 0 10px 15px rgba(0,0,0, .4);
    background-color: white;
    padding: 30px;
  }
  .avatar-data {
    display: flex;
    flex-direction: row;
  }
</style>