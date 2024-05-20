<template>
  <div class="admin-workplaces">
    <div class="title">Рабочие места</div>
  </div>
  
  <table-item
  :objectsList="1"
  :activeUserId="1"
  @rowClick="processRowClick"
  >
  </table-item>
</template>

<script>
  import TableItem from "@/components/UI/TableItem";

  export default {
    data() {
      return {
        
      }
    },
    components: {
      TableItem
    },
    methods: {
      processRowClick(object) {

      }
    }
  }
</script>

<style scoped>
  .admin-workplaces {
    width: 100%;
    background-color: white;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 24px;
    margin-bottom: 15px;
    font-weight: 600;
  }
</style>