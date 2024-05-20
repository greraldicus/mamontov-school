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
            <input type="file"
            style="margin-bottom: 10px"
            @change="processFileUpload">
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
            <input v-model="this.personInfo.surname">
          </div>
          <div class="name">
            <h2>Имя</h2>
            <input v-model="this.personInfo.name">
          </div>
          <div class="patronymic">
            <h2>Отчество</h2>
            <input v-model="this.personInfo.patronymic">
          </div>
        </div>
        <div class="user-other-info">

          <div class="birthdate">
            <h2>Дата рождения</h2>
            <input
            type ="date"
            v-model="this.personInfo.date_of_birth"
            :style="'width: 120px'"
            >
          </div> 
          
          <div class="tenure" :style="'position: relative'">
            <h2>Должность</h2>
            <input 
            class="tenure-input"
            v-model="this.personInfo.tenure.tenr_title"
            @input="handleTenureInput">

            <select-item
            :optionsList="this.tenuresToSelectItem"
            v-if="dropdownListVisible" 
            @optionClicked="processOptionClick"
            ></select-item>
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
        :activeUserId="this.credentialId"
        @rowClicked="processRowClick"
        >
        </table-item>
      </div>

      <div class="data-buttons">
        <button-item
        :backgroundColor="'#7AD789'"
        :fontColor="'#FFFFFF'"
        :textContent="'Сохранить'"
        @buttonClicked="savePerson"
        ></button-item>

        <button-item
        :backgroundColor="'#D9D9D9'"
        :fontColor="'#000000'"
        :textContent="'Отмена'"
        :style="'margin-left: 10px'"
        @buttonClicked="this.$emit('closeModalWindow')"
        ></button-item>

        <button-close
        @buttonClicked="this.$emit('closeModalWindow')"
        > 
        </button-close>
      </div>

      <modal-account-edit
      v-if="modalVisible"
      @closeModalWindow="this.modalVisible = false"
      :login="credentialLogin"
      :userId="credentialId"
      >
      </modal-account-edit>
    </div>
    <div class = "overlay"></div>
  </div>
</template>

<script>
  import ButtonClose from "../UI/ButtonClose.vue";
  import PersonAvatar from "../UI/PersonAvatar.vue";
  import TableItem from "@/components/UI/TableItem.vue";
  import ModalAccountEdit from "@/components/modals/ModalAccountEdit.vue";
  import ButtonItem from "@/components/UI/ButtonItem.vue";
  import SelectItem from "@/components/UI/SelectItem.vue";

  import { getPersonInfoById } from "@/api/api.js"; 
  import { getAccountsByPersonId } from "@/api/api.js";
  import { getTenures } from "@/api/api.js";
  import { getTenureInfo } from "@/api/api.js";
  import { createPerson } from "@/api/api.js";
  import { updatePerson } from "@/api/api.js";
  import { uploadFile } from "@/api/api.js";
  import { downloadFile } from "@/api/api.js";
  export default {
    props: {
      activeUserId: {
        type: Number
      },
      isNewPerson: {
        type: Boolean,
      }
    },
    components: {
      TableItem,
      ButtonClose,
      PersonAvatar,
      ModalAccountEdit,
      ButtonItem,
      SelectItem
    },
    data() {
      return {
        personInfo: {
          name: "",
          surname: "",
          patronymic: "",
          img_url: "",
          tenure: {
            tenr_title: "",
            tenr_id: null
          },
          date_of_birth: ""
        },
        personAccounts: [],
        modalVisible: false,
        dropdownListVisible: false,
        credentialId: null,
        credentialLogin: "",
        tenuresList: [],
      }
    },
    watch: {
      activeUserId: {
        immediate: true,
        handler(newVal) {
          if (!this.isNewPerson) {
            getPersonInfoById(newVal)
            .then(response => {
              this.personInfo = response;
              this.dropdownListVisible = false;
            });

            getAccountsByPersonId(newVal)
            .then(response => {
              if (response) { 
                response.forEach(item => {
                  let oldPropNames = [];
                  for (let propName in item) {
                    oldPropNames.push(propName);
                  }

                  Object.defineProperty(item, 'Логин', {
                    value: item['login'],
                    enumerable: true
                  });
                  Object.defineProperty(item, 'Роль', {
                    value: item['role'],
                    enumerable: true
                  });
                  Object.defineProperty(item, 'Дата создания', {
                    value: item['created_at'],
                    enumerable: true
                  });
                  Object.defineProperty(item, 'Последняя авторизация', {
                    value: item['last_login'],
                    enumerable: true
                  });

                  oldPropNames.forEach(prop => {
                    Object.defineProperty(item, prop, {
                      enumerable: false
                    });
                  });
                });
                this.personAccounts = response;
            }
            });
          }
        }
      },
    },
    methods: {
      handleTenureInput() {
        getTenures(this.personInfo.tenure.tenr_title)
          .then(response => {
            this.personInfo.tenure.tenr_id = null;
            this.tenuresList = response;
            this.dropdownListVisible = this.tenuresList.length > 0 ? true : false;
          });
      },
      processRowClick(object) {
        console.log(object);
        this.modalVisible = true;
        this.credentialId = object.user_id;
        this.credentialLogin = object.login;
      },
      processOptionClick(tenr_id) {
        this.personInfo.tenure.tenr_id = tenr_id;
        let inputElement = this.$el.querySelector('.tenure-input');
        inputElement.style.backgroundColor = 'white';

        getTenureInfo(tenr_id)
        .then(response => {
          this.personInfo.tenure.tenr_title = response.tenr_title;
          this.dropdownListVisible = false;
        })
      },
      processFileUpload(event) {
        const file = event.target.files[0];
        uploadFile(file)
        .then(response => this.personInfo.img_url = `https://parma-coworking.ru/api_v1${response.download_url}` )

      },
      datetimeIsValid() {
        return true;
      },
      tenureIsValid() {
        return this.personInfo.tenure.tenr_id !== null;
      },
      dataIsValid() {
        return this.tenureIsValid() && this.datetimeIsValid();
      },
      savePerson() {
        if (this.dataIsValid()) {
          if (this.isNewPerson) {
            createPerson(this.personInfo.name,
            this.personInfo.surname,
            this.personInfo.patronymic,
            this.personInfo.date_of_birth,
            this.personInfo.img_url,
            this.personInfo.tenure.tenr_id,
            )
            .then(response => {
                alert('Пользователь успешно создан');
                location.reload();
              })
            .catch(error => alert(error.message));
          } else {
            updatePerson(this.personInfo.name,
            this.personInfo.surname,
            this.personInfo.patronymic,
            this.personInfo.date_of_birth,
            this.personInfo.img_url,
            this.personInfo.tenure.tenr_id,
            this.personInfo.id
            )
            .then(response => {
              alert('Данные о пользователе успешно обновлены');
              location.reload();
            })
            .catch(error => alert(error.message));
          }
        } else {
          if (!this.tenureIsValid()) {
            alert('Выберите профессию из списка');
            let inputElement = this.$el.querySelector('.tenure-input');
            inputElement.style.backgroundColor = '#FBDCDC';
          } 
        }
      },
    },
    computed: {
      tenuresToSelectItem() {
        let tenuresListCopy = JSON.parse(JSON.stringify(this.tenuresList));
        for (let tenure of tenuresListCopy) {
          let id = tenure.tenr_id
          let title = tenure.tenr_title
          tenure['id'] = id;
          tenure['title'] = title;
          delete tenure.tenr_id;
          delete tenure.tenr_title;
        }
        return tenuresListCopy;
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

  .data-buttons {
    display: flex;
    flex-direction: row;
    margin-top: 50px; 
    align-self: flex-end;
  }

</style>