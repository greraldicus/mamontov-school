<template>
  <div class="profile-view">
    <personal-data-window
    >
    </personal-data-window>
  </div>
</template>

<script>
  import PersonalDataWindow from "../components/UI/PersonalDataWindow.vue";

  export default {
    components: {
      PersonalDataWindow,
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style scoped>
  .profile-view {
    width: 100vw;
    padding-left: 100px;
    padding-right: 100px;
  }
</style>