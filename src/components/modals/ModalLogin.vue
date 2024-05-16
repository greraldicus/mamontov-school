<template>
  <div class="modal">
    <div class="modal-window">
      <h2>Вход</h2>
      <form>
        <input
        type="text"
        v-model="login"
        placeholder="Email"
        >
        <input
        id="last-input"
        type="password"
        v-model="password"
        placeholder="Пароль"
        >

        <button
        class="login-button"
        @click="verifyUser"
        >
        Войти
        </button>
      </form>
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
  import TextButton from "../UI/TextButton.vue";
  import { authenticateUser } from "../../api/api.js";
  import { getFormattedCookie } from "../../utils/authUtils.js";
  import { getTokenPayload } from "../../utils/authUtils.js";
  export default {
    components: {
      ButtonClose,
      TextButton
    },
    data() {
      return {
        login: '',
        password: '',
      }
    },
    methods: {
      verifyUser(event) {
        event.preventDefault();

        authenticateUser(this.login, this.password)
        .then(response => {
          const accessToken = response.access_token;
          const refreshToken = response.refresh_token;

          document.cookie = getFormattedCookie('access-token', accessToken);
          document.cookie = getFormattedCookie('refresh-token', refreshToken);
          
          this.$router.push('/home');
        })
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
    z-index: 0;
  }

  .modal-window {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
    width: 350px;
    height: 320;
    border-radius: 10px;
    box-shadow: 0 10px 15px rgba(0,0,0, .4);
    background-color: #D9D9D9AB;
    padding: 30px;
  }

  .btn-close {
    position: absolute;
    right: 20px;
    top:20px;
    border: none;
    background: none;
    opacity: 0.7;
  }
  .btn-close:hover {
    opacity: 1;
  }

  input {
    width: 100%;
    height: 30px;
    margin-top: 40px;
    margin-bottom: 40px;
    padding-left: 5px;
  }
  #last-input {
    margin-top: 0px;
  }
  .login-button {
    width: 100%;
    color: white;
    background-color: #293240;
    height: 45px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
  }
</style>