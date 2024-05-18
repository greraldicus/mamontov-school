<template>
  <table>
    <thead>
      <th
      v-for="header in headersList"
      >
      {{ header }}
      </th>
    </thead>
    <table-row-button
    v-for="object in objectsList"
    :object="object"
    @rowClicked="processRowClick"
    :class="{ 'active-row': activeUserId === object.id }"
    >
    </table-row-button>
  </table>
</template>

<script>
  import TableRowButton from "./TableRowButton";
  export default {
    components: {
      TableRowButton,
    },
    props: {
      objectsList: { 
        type: Array
      },
      activeUserId: {
        type: Number
      }
    },
    data() {
      return {
      }
    },
    computed: {
      headersList() {
        if (this.objectsList !== null && this.objectsList.length > 0) {
          let headersList = [];
          let obj = this.objectsList[0]; 
          for (let key in obj) {
            headersList.push(key);
          }
          return headersList;
        }
      }
    },
    methods: {
      processRowClick(object) {
        this.$emit('setActiveId', object);
        this.$emit('rowClicked');
      }
    }
  }
</script>

<style scoped>
  table, tr {
    border: 1px solid black;
    border-collapse: collapse;
  }

  th {
    padding-left: 5px;
    padding-right: 5px;
    text-align: left;
    font-weight: 600;
    font-size: 20px;
    
  }
</style>