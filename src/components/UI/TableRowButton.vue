<template>
  <tr
  @click="this.$emit('rowClicked', this.object)"
  >
    <td
    v-for="objProp in object">
      {{ objProp }}
    </td>
  </tr>
</template>



<script>
  export default {
    props: {
      object: {
        type: Object
      }
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style scoped>
  td {
    font-size: 14px;
    font-weight: 300;
    text-align: left;
    vertical-align: middle; 
    padding: 5px;
  }
  tr {
    cursor: pointer;
  }
  .active-row {
    background-color: #ECECEC;

  }
</style>