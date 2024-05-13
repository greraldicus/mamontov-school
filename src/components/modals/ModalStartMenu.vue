<template>
  <div class="wrapper">
    <div class="nav-panel">
      <img src="https://www.parma.ru/img/Logo-2-31.svg">

      <text-button 
      v-for ="item in this.textButtonsData"
      :content="item.content"
      style="margin-left: 40px"
      @buttonClicked="this.processBtnClick"
      >
      </text-button>

      <modal-login
      v-if="modalVisible"
      @closeModalWindow="modalVisible=false"
      @userAuthenticated="this.$emit(userAuthenticated)"
      >
      </modal-login>
    </div>
  </div>
</template>

<script>
  import TextButton from "../UI/TextButton.vue";
  import ModalLogin from "./ModalLogin.vue";
  export default {
    components: {
      TextButton,
      ModalLogin
    },
    data() {
      return {
        modalVisible: false,
        textButtonsData: [
          {
            content: 'Домой'
          },
          {
            content: 'Контакты'
          },
          {
            content: 'Вход'
          }
        ],
      }
    },
    methods: {
          processBtnClick(content) {
            console.log(content);
            switch(content) {
              case('Домой'):

                break;
              case('Контакты'):

                break;
              case('Вход'):
                this.modalVisible = true;
                break;
            }
          }
        }
  }
</script>

<style scoped>
  .wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-image: url("../../images/baretskiy.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .nav-panel {
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    width: 100%;
    height: 100px;
    padding-right: 100px;
    background-color: rgba(0, 0, 0, 0.25);
  }
  img {
    height: 100px;
    width: 200px;
    position: absolute;
    top: 0;
    left: 100px;
    
  }
</style>