<template>
  <table>
    <tr 
    v-for="object in objectsList"
    >
      <td
      v-for="objProp in object">
        {{ objProp }}
      </td>
    </tr>
  </table>
</template>

<script>
  export default {
    props: {
      objectsList: { // m x n
        type: Array
      }
    },
    data() {
      return {
      }
    },
    watch: {
      objectsList: {
        handler(val, oldVal) {
          if (val.length > 0) {
            let firstObj = val[0];
            let th = document.createElement('th');
            for (let prop in firstObj) {
              let td = document.createElement('td');
              td.textContent = prop;
              th.append(td);
            }
            this.$el.append(th);
        }
      }
      }
    }
  }
</script>

<style scoped>
  table, tr {
    border: 1px solid black;
    border-collapse: collapse;
  }

  th, td {
    padding-left: 10px;
    padding-right: 10px;
  }
</style>