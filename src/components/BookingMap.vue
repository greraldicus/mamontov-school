<template>
  <div id="map">

  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    mounted() {
      var map = L.map('map', {
        minZoom: 1,
        maxZoom: 2,
        center: [0, 0],
        zoom: 1,
        crs: L.CRS.Simple
      });
      var w = 850;
      var h = 408;
      var url = '../images/office_image.png';
      var southWest = map.unproject([0, h], map.getMaxZoom()-1);
      var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
      var bounds = new L.LatLngBounds(southWest, northEast);

      L.imageOverlay(url, bounds).addTo(map);

      map.setMaxBounds(bounds);

      map.on('click', function(e) {
      // Получение координат клика
      const latLng = e.latlng;
      const latitude = latLng.lat;
      const longitude = latLng.lng;


      // Создаем новый маркер и добавляем его на карту
      let marker = L.marker([latitude, longitude]).addTo(map);
      
      console.log(JSON.stringify(marker));

      // Выполнение дополнительных действий, если необходимо
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      });
    }
  }
</script>

<style scoped>
  #map {
    height: 400px;
    width: 100%; 
  }
</style>