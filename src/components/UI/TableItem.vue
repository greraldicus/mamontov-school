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
    @rowClicked="processRowClick(object)"
    :class="{ 'active-row': activeUserId === object.id }"
    @deleteObject="processDeleteObject"> <!-- ТУТ ПЕРЕДАЕТСЯ OBJECT-->
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
        this.$emit('rowClicked', object);
      },
      processDeleteObject(object) {
        this.$emit('deleteObject', object);
      }
    }
  }
</script>

<style scoped>
  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead th:first-child {
    padding-left: 20px;
    border-left: none;
  }

  thead th:last-child {
    padding-right: 20px;
    border-right: none;
  }

  th {
    padding: 10px;
    text-align: left;
    font-weight: 600;
    font-size: 20px;
    border-top: none;
    border-bottom: 1px solid #D9D9D9;
  }
</style>