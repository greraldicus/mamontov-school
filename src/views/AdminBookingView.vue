<template>
  <div class="admin-booking-view">
    <table-item
    :objectsList="optionsList"
    :activeUserId="this.activeUserId"
    @setActiveId="setActiveId"
    @deleteObject="deleteObject"
    >
    </table-item>
  </div>
</template>

<script>
  import TableItem from "@/components/UI/TableItem.vue";

  export default {
    components: {
      TableItem
    },
    data() {
      return {
        optionsList: [
          {
            id: 1,
            'Дата брони': '22.06.2022',
            'Промежуток времени': '16:00-18:00'
          },
          {
            id: 2,
            'Дата брони': '10.05.2024',
            'Промежуток времени': '16:00-18:00'
          },
          {
            id: 3,
            'Дата брони': '11.05.2024',
            'Промежуток времени': '15:00-18:00'
          },
          {
            id: 4,
            'Дата брони': '12.05.2024',
            'Промежуток времени': '16:00-18:00'
          },
          {
            id: 5,
            'Дата брони': '13.05.2024',
            'Промежуток времени': '16:00-18:00'
          }
          
        ],
        activeUserId: null
      }
    },
    methods: {
      setActiveId(object) {
        this.activeUserId = object.id;
      },
      deleteObject(object) {
        this.optionsList = this.optionsList.filter(item => item.id != object.id);
      }
    }
  }
</script>

<style scoped>
  .admin-booking-view {
    width: 100%;
    border-radius: 15px;
    background-color: white;
    padding: 15px;
  }
</style>