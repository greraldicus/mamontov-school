<template>
  <tr
  @click="this.$emit('rowClicked', this.object)"
  >
    <td
    v-for="objProp in object">
      {{ objProp }}
    </td>
    <td>
      <delete-button
      @deleteButtonClicked="this.$emit('deleteObject', object)"
      ></delete-button>
    </td>
  </tr>
</template>



<script>
  import DeleteButton from "@/components/UI/DeleteButton.vue";
  export default {
    props: {
      object: {
        type: Object
      }
    },
    data() {
      return {
        
      }
    },
    components: {
      DeleteButton
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
    position: relative;
  }

  .active-row {
    background-color: #ECECEC;
  }
</style>