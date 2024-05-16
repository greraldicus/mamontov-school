<template>
  <div class="menu">
    <text-button
    v-for="contentItem in contentsList"
    :content="contentItem"
    @buttonClicked="processClick"
    :style="'color: #000000; font-size: 20px; margin-bottom: 7px;'"
    >
    </text-button>
  </div>
</template>

<script>
  import TextButton from "./TextButton.vue";
  export default {
    components: {
      TextButton
    },
    props: {
      contentsList: {
        type: Array
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      processClick(content) {
        switch(content) {
          case('Пользователи'):
            this.$router.push('/admin/users');
            break;
          case('Бронирование'):
            this.$router.push('/admin/booking');
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .menu {
    width: 300px;
    height: auto;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color:#FFFFFF;
    margin-right: 30px;
  }
</style>