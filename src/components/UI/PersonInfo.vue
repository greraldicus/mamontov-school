<template>
  <div class="person-info">

    <avatar-button
    :avatarImgPath="'../../images/baretskiy-avatar.jpg'"
    >
    </avatar-button>
    <div class="person-chars">
      <h1>{{ personInfo.name }} {{ personInfo.surname }}</h1>
      <!-- <h2>{{ personInfo.department }}</h2> -->
      <h2>{{ personInfo.tenure }}</h2>
    </div>
  </div>
</template>

<script>
  import AvatarButton from "./AvatarButton.vue";
  import { getTokenPayload } from "@/utils/authUtils";
  import { getPersonInfo } from "@/api/api";

  export default {
    components: {
      AvatarButton
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
    }
  }
</script>

<style scoped>
  .person-info {
    width: 320px;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }
  .person-chars {
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
</style>