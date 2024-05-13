<template>
  <div class="dropdown-menu">
    <text-button
    v-for="item in navOptions"
    :content="item.content"
    @buttonClicked="processClick"
    :style="'margin-bottom: 5px;'"
    >
    </text-button>
  </div>
</template>

<script>
  import TextButton from "./TextButton.vue";
  import { deleteCookie } from "@/utils/authUtils.js";
  export default {
    components: {
      TextButton
    },
    data() {
      return {
        navOptions: [
          {
            content: "Профиль"
          },
          {
            content: "Выйти"
          }
        ]
      }
    },
    methods: {
      processClick(content) {
        switch(content) {
          case('Профиль'):
            this.$router.push('/home/profile');
            this.$emit('closeDropdownMenu');
            break;
          case('Выйти'):
            deleteCookie('access-token');
            deleteCookie('refresh-token');
            this.$router.push('/auth');
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .dropdown-menu {
    position: absolute;
    left: 0;
    bottom: -49px;
    width: 150px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: grey;
  }
</style>