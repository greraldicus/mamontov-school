<template>
  <div class="avatar" :style="avatarStyles"></div>
</template>

<script>
  export default {
    props: {
      img_path: {
        type: String,
      }
    },
    computed: {
      avatarStyles() {
        return {
          backgroundImage: `url(${this.img_path})`,
        }
      }
    }
  }
</script>

<style scoped>
  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
</style>