<template>
  <div class="nav-bar">
    <div class="header">
      <img src="https://www.parma.ru/img/Logo-2-31.svg">
      <person-info></person-info>
    </div>
    <div class="nav-items">
      <text-button
      v-for="item in navItems"
      :content="item.content"
      :style="{ color: '#0F2232', 'margin-right': '45px', 'margin-bottom': '10px' }"
      :class="{ 'last-button': item.content === 'Настройки'}"
      @buttonClicked="setRoute"
      >
      </text-button>
      
    </div>
  </div>
</template>

<script>
  import PersonInfo from "./UI/PersonInfo";
  import TextButton from "./UI/TextButton";
  export default {
    components: {
      PersonInfo,
      TextButton
    },
    data() {
      return {
        navItems: [
          {
            content: "Профиль"
          },
          {
            content: "Бронирование"
          },
          {
            content: "Карта"
          },
          {
            content: "Настройки"
          }
        ]
      }
    },
    methods: {
      setRoute(content) {
        switch(content) {
          case('Профиль'):
            this.$router.push('/home/profile');
            break;
          case('Бронирование'):
            this.$router.push('/home/booking');
            break;
          case('Карта'):
            this.$router.push('/home/map');
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .header {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: white;
    box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
    z-index: 2;
    padding-left: 100px;
    padding-right: 100px;
  }
  .header img {
    height: 100px;
    width: 200px;
  }
  .nav-items {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 100%;
    height: 250px;
    background-color: white;
    z-index: 1;
    padding-left: 100px;
    padding-right: 100px;
  }
  .last-button {
    position: absolute;
    right: 100px;
  }
</style>