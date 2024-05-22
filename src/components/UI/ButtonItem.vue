<template>
  <button
  @click="this.$emit('buttonClicked')"
  :style="{ backgroundColor: backgroundColor, color: fontColor}"
  >
    {{ textContent }}
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
      },
      textContent: {
        type: String,
        default: 'push me'
      }
    }
  }
</script>

<style scoped>
  button {
    width: 130px;
    height: 30px;
    font-size: 16px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    cursor: pointer;
  }
</style>