<template>
  <div class="modal">
    <div class="modal-window">
      <h1
      :style="'align-self: flex-start'"
      >Аккаунт</h1>
      <form @submit.prevent>

        <div class="login">
          <h2>Логин</h2>
          <input
          class="login-input"
          type="text"
          v-model="localLogin"
          placeholder="Email"
          >
        </div>
        <div class="password">
          <h2>Пароль</h2>
          <input
          class="p"
          type="password-input"
          v-model="password"
          placeholder="Пароль"
          >
        </div>
        <div class="buttons-wrapper">
          <button-item
          :backgroundColor="'#7AD789'"
          :fontColor="'white'"
          :textContent="'Сохранить'"
          :style="'border: 1px solid #D9D9D9; border-radius: 5px'"
          @click="editUser"
          >
          Сохранить
          </button-item>
          <button-item
          :backgroundColor="'white'"
          :fontColor="'black'"
          :textContent="'Отмена'"
          :style="'border: 1px solid #D9D9D9; border-radius: 5px'"
          @click="this.$emit('closeModalWindow')"
          >
          Сохранить
          </button-item>
        </div>
      </form>
      <!-- <button-close
      @buttonClicked="this.$emit('closeModalWindow')"
      > 
      </button-close> -->
    </div>
    <div class = "overlay"></div>
  </div>
</template>

<script>
  import ButtonClose from "../UI/ButtonClose.vue";
  import TextButton from "../UI/TextButton.vue";
  import ButtonItem from "@/components/UI/ButtonItem.vue";
  import { updateUserCredentials } from "@/api/api.js";
  import { registerUser } from "@/api/api.js"; 
  export default {
    components: {
      ButtonClose,
      TextButton,
      ButtonItem
    },
    props: {
      login: {
        type: String
      },
      userId: {
        type: Number
      },
      isNewUser: {
        type: Boolean
      },
      personId: {
        type: Number
      }
    },
    data() {
      return {
        localLogin: this.login,
        password: '',
      }
    },
    methods: {
      editUser() {
        if (!isNewUser)
          updateUserCredentials(this.localLogin, this.password, this.userId)
          .then(response =>{
            alert('Данные пользователя успешно изменены');
            location.reload();
            })
          .catch(error => console.log(error.message));
        else {
          registerUser(this.localLogin, this.password, this.personId)
          .then(response =>{
            alert('Пользователь успешно зарегистрирован');
            location.reload();
            })
          .catch(error => console.log(error.message));
        }
      }
    },
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
    z-index: 0;
  }

  .modal-window {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    z-index: 2;
    width: 350px;
    height: 320;
    border-radius: 10px;
    box-shadow: 0 10px 15px rgba(0,0,0, .4);
    background-color: white;
    padding: 30px;
  }

  form {
    width: 100%;
  }
  h1 {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 30px;
  }

  h2 {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 5px;
  }

  .btn-close {
    position: absolute;
    right: 20px;
    top: 20px;
    border: none;
    background: none;
    opacity: 0.7;
  }
  .btn-close:hover {
    opacity: 1;
  }
  .login {
    margin-bottom: 12px;
    width: 100%;
  }
  .pasword {
    margin-bottom: 12px;
    width: 100%;
  }
  input {
    width: 100%;
    height: 30px;
    padding-left: 5px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
  }
  .login-button {
    width: 100%;
    color: white;
    background-color: #293240;
    height: 45px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  
  .buttons-wrapper {
    display: flex;
    margin-top: 30px;
    justify-content: space-between;
  }
</style>