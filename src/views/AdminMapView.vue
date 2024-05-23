<template>
  <div class="map-wrapper">
    <div class="buttons-wrapper">
      <div class="office-button-wrapper">
        <button-item
        :backgroundColor="'#FF0000'"
        :fontColor="'white'"
        :textContent="this.officeTextContent"
        :style="'font-size: 12px;'"
        @buttonClicked="processOfficeBtnClick"
        >
        </button-item>
        <select-item
        :optionsList="this.officesList"
        v-if="this.dropdownOfficesVisible"
        @optionClicked="processOfficeOptionClick"
        >
        </select-item>
      </div>

      <div class="floor-button-wrapper">
        <button-item
        :backgroundColor="'#FF0000'"
        :fontColor="'white'"
        :textContent="this.floorTextContent"
        :style="'font-size: 12px;'"
        @buttonClicked="processFloorBtnClick"
        >
        </button-item>
        <select-item
        :optionsList="this.floorsListToSelect"
        v-if="this.dropdownFloorsVisible"
        @optionClicked="processFloorOptionClick"
        >
        </select-item>
      </div>
    </div>
    <booking-map
    :imgUrl="this.currentFloor.mp_layer_img_url"
    :floorId="this.currentFloor.mp_id"
    >
    </booking-map>
  </div>
</template>

<script>
  import BookingMap from "@/components/BookingMap";
  import ButtonItem from "@/components/UI/ButtonItem";
  import SelectItem from "@/components/UI/SelectItem";

  import { getOffices } from "@/api/api.js";
  import { getMaps } from "@/api/api.js";

  export default {
    components: {
      BookingMap,
      ButtonItem,
      SelectItem
    },
    data() {
      return {
        officeTextContent: "Выберите офис",
        currentOffice: {
          id: null,
          title: ""
        },
        officesList: [],
        dropdownOfficesVisible: false,
        floorTextContent: "Выберите этаж",
        currentFloor: {
          mp_id: null,
          mp_layer_img_url: "",
          mp_of_id: null,
          mp_title: ""
        },
        floorsList: [],
        dropdownFloorsVisible: false,
      }
    },
    methods: {
      processOfficeBtnClick() {
        getOffices()
        .then(response => {
          this.officesList = response;
          this.dropdownOfficesVisible = true;
        })
      },    
      processOfficeOptionClick(officeId) {
        let office = this.officesList.find(item => item.id === officeId);
        this.currentOffice = office;
        this.officeTextContent = office.title;
        this.dropdownOfficesVisible = false;
        this.floorTextContent = "Выберите этаж";
      },
      processFloorBtnClick() {
        console.log(this.currentOffice.id);
        getMaps(this.currentOffice.id)
        .then(response => {
          this.floorsList = response;
          this.dropdownFloorsVisible = true;
        })
        .catch(error_code => alert('Сначала выберите офис'));
      },
      processFloorOptionClick(floorId) {
        let floor = this.floorsList.find(item => item.mp_id === floorId);
        this.currentFloor = floor;
        this.floorTextContent = floor.mp_title;
        this.dropdownFloorsVisible = false;
      }
    },
    computed: {
      floorsListToSelect() {
        return this.floorsList.map(({ mp_id, mp_title }) => ({
          id: mp_id,
          title: mp_title
        }));
      }
    }
  }
</script>

<style scoped>  
  .map-wrapper {
    position: relative;
    width: 100%;
    background-color: white;  
    border-radius: 15px;
    border: 1px solid #D9D9D9;
    padding: 20px;
  }
  
  .buttons-wrapper {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    flex-direction: row;
    z-index: 100000000000000000000;
  }
  
  .office-button-wrapper {
    position: relative;
    margin-right: 10px;
  }
  .floor-button-wrapper {
    position: relative;
  }
</style>