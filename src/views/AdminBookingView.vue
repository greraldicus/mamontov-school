<template>
  <div class="admin-booking-view">
    <table-item
    :objectsList="optionsList"
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
            'ID брони': 1,
            'Дата брони': '22.06.2022',
            'Промежуток времени': '16:00-18:00'
          },
          {
            'ID брони': 2,
            'Дата брони': '10.05.2024',
            'Промежуток времени': '16:00-18:00'
          },
          {
            'ID брони': 3,
            'Дата брони': '11.05.2024',
            'Промежуток времени': '15:00-18:00'
          },
          {
            'ID брони': 4,
            'Дата брони': '12.05.2024',
            'Промежуток времени': '16:00-18:00'
          },
          {
            'ID брони': 5,
            'Дата брони': '13.05.2024',
            'Промежуток времени': '16:00-18:00'
          }
        ],
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .admin-booking-view {
    width: 100%;
  }
</style>