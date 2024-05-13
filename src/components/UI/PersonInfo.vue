<template>
  <div class="person-info">
    <person-avatar
    :img_path="'../../images/baretskiy-avatar.jpg'"
    >
    </person-avatar>
    <div class="person-chars">
      <h1>{{ personInfo.name }} {{ personInfo.surname }}</h1>
      <!-- <h2>{{ personInfo.department }}</h2> -->
      <h2>{{ personInfo.tenure }}</h2>
    </div>
  </div>
</template>

<script>
  import PersonAvatar from "./PersonAvatar.vue";
  import { getTokenPayload } from "@/utils/authUtils";
  import { getPersonInfo } from "@/api/api";

  export default {
    components: {
      PersonAvatar
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