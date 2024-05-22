<template>
  <div class="nav-bar">
    <header-bar></header-bar>
    <div class="nav-items">
      <div class="info-windows">
        <div class="person-info">
          <person-avatar
          :imgPath="this.personInfo.img_url"
          >
          </person-avatar>
          <div class="person-chars">
            <h1>{{ personInfo.name }} {{ personInfo.surname }}</h1>
            <h2>{{ personInfo.department }}</h2>
            <h2>{{ personInfo.tenure.tenr_title }}</h2>
          </div>
        </div>
        <booking-info></booking-info>
      </div>
      <div class="text-buttons">
        <text-button
        v-for="item in navItems"
        :content="item.content"
        :style="{ color: '#0F2232',
        'margin-right': '45px',
        'margin-bottom': '10px' }"
        :class="{ 'last-button': item.content === 'Настройки'}"
        @buttonClicked="setRoute"
        >
        </text-button>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from "./HeaderBar";
  import TextButton from "./UI/TextButton";
  import BookingInfo from "./UI/BookingInfo";
  import PersonAvatar from "./UI/PersonAvatar";
  import { getTokenPayload } from "@/utils/authUtils";
  import { getPersonInfo } from "@/api/api";
  export default {
    components: {
      HeaderBar,
      TextButton,
      BookingInfo,
      PersonAvatar
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
        ],
        personInfo: {
          name: "",
          surname: "",
          tenure: "",
          img_url: ""
        }
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
    },
    mounted() {
      let acsPayload = getTokenPayload('access-token');
      let personId = acsPayload.sub;
      console.log(personId);
      getPersonInfo(personId)
      .then(response => {
        this.personInfo = response;
        console.log(response);
      });
    },
  }
</script>

<style scoped>
  .nav-items {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
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
  .info-windows {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 25px;
  }
  .person-chars {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    margin-left: 10px;
  }
  .person-chars h1{
    font-size: 22px;
    margin-bottom: 10px;
  }
  .person-chars h2{
    font-size: 12px;
    color: #FF0000;
  }
  .person-chars > h2{
    margin-bottom: 10px;
  }
  .text-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
  .person-info {
    display: flex;
    flex-direction: row;
  }
</style>