<template>
  <div class="logout-btn">

    <!-- <avatar-button
    :avatarImgPath="'../../images/baretskiy-avatar.jpg'"
    >
    </avatar-button> -->
    <img src="@/images/exit.png">
    <text-button
    :content="'Выйти'"
    :style="'color: white;'"
    @buttonClicked="logout"
    >
    </text-button>
    <!-- <div class="person-chars">
      <h1>{{ personInfo.name }} {{ personInfo.surname }}</h1>
      <h2>{{ personInfo.department }}</h2>
      <h2>{{ personInfo.tenure }}</h2>
    </div> -->
  </div>
</template>

<script>
  import AvatarButton from "./AvatarButton.vue";
  import { getTokenPayload } from "@/utils/authUtils";
  import { getPersonInfo } from "@/api/api";
  import TextButton from "@/components/UI/TextButton.vue";
  import { deleteCookie } from "@/utils/authUtils.js"

  export default {
    components: {
      AvatarButton,
      TextButton
    },
    data() {
      return {
        personInfo: {
          name: "",
          surname: "",
          tenure: ""
        }
      }
    },
    mounted() {
      let acsPayload = getTokenPayload('access-token');
      let personId = acsPayload.sub;

      getPersonInfo(personId)
      .then(response => {
        this.personInfo = response;
        console.log(response);
      });
    },
    methods: {
      logout() {
        deleteCookie('access-token');
        deleteCookie('refresh-token');
        this.$router.push('/auth');
      }
    }
  }
</script>

<style scoped>
  img {
    height: 25px;
    width: 25px;
  }
  .logout-btn {
    width: 130px;
    height: 50px;
    border-radius: 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: red;
  }
</style>