<template>
  <div class="map-wrapper">
    <booking-map></booking-map>
  </div>
</template>

<script>
  import BookingMap from "@/components/BookingMap";

  export default {
    components: {
      BookingMap
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style scoped>  
  .map-wrapper {
    width: 100%;
    background-color: white;  
    border-radius: 15px;
    border: 1px solid #D9D9D9;
    padding: 20px;
  }
</style>