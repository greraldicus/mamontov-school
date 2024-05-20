<template>
  <ul class="dropdown-list">
    <li v-for="item in optionsList"
    @click="this.$emit('optionClicked', item.tenr_id)">
      {{ item.tenr_title }}
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        
      } 
    },
    props: {
      optionsList: {
        type: Array,
        default: [
          {
            tenr_id: 1,
            tenr_title: "Backend разработчик"
          },
          {
            tenr_id: 2,
            tenr_title: "Frontend разработчик"
          },
          {
            tenr_id: 3,
            tenr_title: "DevOps инженер"
          }
        ]
      },
    }
  }
</script>

<style scoped>
  .dropdown-list {
    width: 280px;
    min-height: 50px;
    max-height: 100px;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 110%;
    border: 1px solid black;
    padding: 5px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    background-color: #FFFFFF;
  }

  .dropdown-list li {
    cursor: pointer;
    margin-bottom: 3px;
    font-size: 14px;
  }  
  
  .dropdown-list li:last-child {
    margin-bottom: 0;
  }

  .dropdown-list li:hover {
    background-color: #D9D9D9;
  }

  
</style>