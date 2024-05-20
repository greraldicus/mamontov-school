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
    font-weight: 400;
    text-align: left;
    vertical-align: middle; 
    padding: 10px;
    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
  }

  tr:hover {
    background-color: #D9D9D9;
  }
  tr td:first-child {
    padding-left: 20px;
    border-left: none;
  }
  tr td:last-child {
    padding-right: 20px;
    border-right: none;
  }

  tr {
    cursor: pointer;
  }

  .active-row {
    background-color: #ECECEC;

  }
</style>