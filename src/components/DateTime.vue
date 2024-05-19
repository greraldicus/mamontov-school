<template>
  <input type="date"
  v-model="datetime"
  @input="console.log(this.datetime)">
</template>

<script>
  export default {
    data() {
      return {
        datetime: null
      }
    }
  }
</script>

<style scoped>
  
</style>