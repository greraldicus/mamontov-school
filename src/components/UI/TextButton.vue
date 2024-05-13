<template>
  <div 
  class="button"
  @click="this.$emit('buttonClicked', content)"
  >
    {{ content }}
  </div>
</template>

<script>
  export default {
    props: {
      fontSize: {
        type: Number,
        default: 500,
      },
      content: {
        type: String,
        required: true,
        default: "Push me",
      }
    }
  }
</script>

<style scoped>
  .button {
    color: white;
    cursor: pointer;
    position: relative;
  }
  .button:hover {
    color:red;
  }

  .button:hover:before {
    transform: scaleX(1);
    transition: transform 0.4s;
  }
  .button:before {
    content: '';
    width: 100%;
    height: 2px;
    background-color: red;
    position: absolute;
    left: 0;
    bottom: -5px;
    transform: scaleX(0);
    transform-origin: left;
  }
</style>