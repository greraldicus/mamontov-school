<template>
  <div class="booking-info">
    <div class="number-of-booking">
      {{ numberOfBooking }}
    </div>
    <div class="datetime">
      <div class="property-names">
        <div class="property-name"
        v-for="item in bookingInfo"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="property-values">
        <div class="property-value"
        v-for="item in bookingInfo"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        numberOfBooking: "21E",
        bookingInfo: [
          {
            name: 'Дата',
            value: '10.04.2023'
          },
          {
            name: 'Время',
            value: '9:00-13:30'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .booking-info {
    min-width: 250px;
    height: 100px;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 25px;
    box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);

  }
  .number-of-booking {
    font-weight: 800;
    font-size: 50px;
    margin-right: 50px;
    color: #FF0000;
  }
  .datetime {
    display: flex;
    flex-direction: row;
  }
  .property-names {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .property-values {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .property-value {
    font-weight: 400;
  }
</style>