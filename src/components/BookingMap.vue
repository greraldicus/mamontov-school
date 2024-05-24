  <template>
    <div id="map">
      <div class="close-flag">

      </div>
    </div>
    <modal-workplace-info
    v-if="this.modalVisible"
    :isNewWorkplace="this.isNewWorkplace"
    :wpCoords="this.currentWpCoords"
    :wpFloorId="this.floorId"
    :newOfficeId="this.floorId"
    @closeModalWindow="processCloseModal"
    >

    </modal-workplace-info>
  </template>

  <script>
    import ModalWorkplaceInfo from "@/components/modals/ModalWorkplaceInfo.vue";

    import { getWorkplacesByFloorId } from "@/api/api.js";

    export default {
      props: {
        imgUrl: {
          type: String,
        },
        floorId: {
          type: Number
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
          currentWpCoords: {
            x: null,
            y: null
          },
          currentMarker: null,
        }
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
        },
        async setMap(imgUrl) {
          return this.getImageSize(imgUrl)
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
            var url = imgUrl;
            var southWest = this.map.unproject([0, h], this.map.getMaxZoom()-1);
            var northEast = this.map.unproject([w, 0], this.map.getMaxZoom()-1);
            var bounds = new L.LatLngBounds(southWest, northEast);

            L.imageOverlay(url, bounds).addTo(this.map);

            this.map.setMaxBounds(bounds);
            
            this.map.on('click', (e) => {
              
              this.currentMarker = L.marker(e.latlng).addTo(this.map);

              // Добавляем обработчик события клика на маркер
              this.currentMarker.on('click', () => {
                
                console.log(newMarker._latlng);
              });
              this.modalVisible = true;
            });
            console.log('Сначала отрисовали карту');
            return Promise.resolve();
          });
        },

        async drawMarkers(floorId) {
          if (this.map !== null ) {
            console.log('Затем зашли в drawMarkers');
            return getWorkplacesByFloorId(floorId)
            .then(response => {
              for (let wpCoords of response) {
                const newMarker = L.marker([wpCoords.wp_x_coord, wpCoords.wp_y_coord]).addTo(this.map);
              }
              return Promise.resolve();
            })
            .catch(error_code => alert(error_code)); 
          } else {
            return Promise.resolve();
          }
        },

        async handleSomeDataUpdates() {
          await this.setMap(this.imgUrl);
          await this.drawMarkers(this.floorId);
          return Promise.resolve();
        },

        processCloseModal() {
          this.modalVisible = false;
          this.currentMarker.remove();
          this.currentMarker = null;
        }
      },
      updated() { 
        if (this.prevFloorId != this.floorId || this.prevImgUrl != this.imgUrl) {
          if (this.map) {
            this.map.remove();
            this.map = null;
          }
          this.handleSomeDataUpdates();
          this.prevFloorId = this.floorId;
          this.prevImgUrl = this.imgUrl;
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
      z-index: 1500000;
    }
  </style>