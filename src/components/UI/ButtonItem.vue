<template>
  <button
  @click="this.$emit('buttonClicked')
  >
    Сохранить
  </button>
</template>

<script>
  export default {
    props: {
      backgroundColor: {
        type: String,
        default: 'white'
      },
      fontColor: {
        type: String,
        default: 'black'
      }
    }
  }
</script>

<style scoped>
  .button {
    width: 130px;
    height: 30px;
    font-size: 16px;
  }
</style>