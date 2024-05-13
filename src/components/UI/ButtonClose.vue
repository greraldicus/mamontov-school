<template>
  <button
  class="btn-close"
  @click="this.$emit('buttonClicked')"
  >
  X
  </button>
</template>

<script>
  export default {
  }
</script>

<style scoped>
  .btn-close {
    position: absolute;
    right: 5px;
    top: 5px;
    border: none;
    background: none;
    opacity: 0.7;
    cursor: pointer;
  }

  .btn-close:hover {
    opacity: 1;
  }
</style>