<template>
  <ion-icon
  name="trash-outline"
  @click="processButtonClick"
  >
  </ion-icon>
</template>

<script>
  export default {
    methods: {
      processButtonClick(event) {
        event.stopPropagation();
        this.$emit('deleteButtonClicked');
      }
    }
  }
</script>

<style scoped>
  ion-icon {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10%;
    bottom: 10px;
  }
</style>