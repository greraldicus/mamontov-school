<template>
  <div class="logout-btn"
  @click="logout"
  >
    <img src="@/images/exit.png">
    Выйти
  </div>
</template>

<script>
  import AvatarButton from "./AvatarButton.vue";
  import TextButton from "@/components/UI/TextButton.vue";
  import { deleteCookie } from "@/utils/authUtils.js"

  export default {
    components: {
      AvatarButton,
      TextButton
    },
    data() {
      return {
      }
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
    cursor: pointer;
    color: white;
  }
</style>