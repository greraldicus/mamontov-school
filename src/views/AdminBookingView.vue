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
    data() {
      return {
        components: {
          TableItem
        },
        optionsList: [
          {
            'ID места': 1,
            'Дата брони': '22.22.2022',
            'Промежуток времени': '16:00-18:00'
          },
          {
            'ID места': 1,
            'Дата брони': '22.22.2022',
            'Промежуток времени': '16:00-18:00'
          },
          {
            'ID места': 1,
            'Дата брони': '22.22.2022',
            'Промежуток времени': '16:00-18:00'
          },
          {
            'ID места': 1,
            'Дата брони': '22.22.2022',
            'Промежуток времени': '16:00-18:00'
          },
          {
            'ID места': 1,
            'Дата брони': '22.22.2022',
            'Промежуток времени': '16:00-18:00'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .admin-booking-view {
    width: 100%;
  }
</style>