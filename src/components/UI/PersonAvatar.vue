<template>
  <div 
  class="avatar"
  :style="avatarStyles"
  @click="this.$emit('avatarClicked')"
  >
  </div>
</template>

<script>
  export default {
    props: {
      imgPath: {
        type: String,
        default: "../../images/baretskiy-avatar.jpg"
      }
    },
    computed: {
      avatarStyles() {
        return {
          backgroundImage: `url(${this.imgPath})`,
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
    cursor: pointer;
    background-color: black;
  }
</style>