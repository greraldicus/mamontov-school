<template>
  <div id="map">
    <div class="close-flag">

    </div>
  </div>
  <modal-workplace-info
  v-if="this.modalVisible"
  :isNewWorkplace="this.isNewWorkplace"
  @closeModalWindow="this.modalVisible = false"
  >

  </modal-workplace-info>
</template>

<script>
  import ModalWorkplaceInfo from "@/components/modals/ModalWorkplaceInfo.vue";

  export default {
    props: {
      imgUrl: {
        type: String,
      }
    },
    components: {
      ModalWorkplaceInfo
    },
    data() {
      return {
        map: null,
        modalVisible: false,
        isNewWorkplace: true,
        imgWidth: null,
        imgHeight: null,
      }
    },
    mounted() {

    },
    methods: {
      async getImageSize(imgUrl) {
      try {
        const response = await fetch(imgUrl);
        const blob = await response.blob();
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        await new Promise(resolve => {
          img.onload = () => {
            resolve();
          };
        });
        this.imgWidth = img.width;
        this.imgHeight = img.height;
      } catch (error) {
        throw new Error('Failed to load image');
      }
    }
    },
    updated(prevProps) {
      if (prevProps?.imgUrl != this.imgUrl) {
        this.map?.remove();
        this.map = null;
      }
    },
    watch: {
      imgUrl: {
        immediate: true,
        handler(newVal) {
          this.getImageSize(newVal)
          .then(response => {
            this.map = L.map('map', {
              minZoom: 1,
              maxZoom: 2,
              center: [0, 0],
              zoom: 1,
              crs: L.CRS.Simple
            });
            var w = this.imgWidth;
            var h = this.imgHeight;
            var url = newVal;
            var southWest = this.map.unproject([0, h], this.map.getMaxZoom()-1);
            var northEast = this.map.unproject([w, 0], this.map.getMaxZoom()-1);
            var bounds = new L.LatLngBounds(southWest, northEast);

            L.imageOverlay(url, bounds).addTo(this.map);

            this.map.setMaxBounds(bounds);
            
            this.map.on('click', (e) => {
              // Создаем новый маркер на месте клика
              const newMarker = L.marker(e.latlng).addTo(this.map);

              // Добавляем обработчик события клика на маркер
              newMarker.on('click', () => {
                // Действия при клике на маркер
                console.log('Клик на маркер');
              });
            });
          });
        }
      }
    }
  }
</script>

<style scoped>
  #map {
    height: 500px;
    width: 100%; 
    z-index: 0;
  }
  .close-flag {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 30px;
    width: 100px;
    background-color: black;
    z-index: 150000000;
  }
</style>