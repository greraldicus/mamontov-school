<template>
  <div class="admin-workplaces">
    <div class="title">Рабочие места</div>

    <div class="workplaces-table">
      <table-item
      :objectsList="this.workplacesList"
      :activeUserId="this.activeWorkplaceId"
      @rowClicked="processRowClick"
      @setActiveId="setActiveId"
      @deleteObject="processDeleteWorkplace"
      >
      </table-item>
    </div>
    
    <div class="btn-add">
      <button-item
      :backgroundColor="'#7AD789'"
      :fontColor="'white'"
      :textContent="'Добавить'"
      @buttonClicked="processAddBtnClick"
      >
      </button-item>
    </div>
    
    <modal-workplace-info
    v-if="this.modalVisible"
    :isNewWorkplace="this.isNewWorkplace"
    :activeWorkplaceId="this.activeWorkplaceId"
    @closeModalWindow="this.modalVisible = false"
    >
    </modal-workplace-info>
  </div>
  
</template>

<script>
  import TableItem from "@/components/UI/TableItem";
  import ModalWorkplaceInfo from "@/components/modals/ModalWorkplaceInfo";
  import ButtonItem from "@/components/UI/ButtonItem";

  import { getWorkplaces } from "@/api/api.js";
  import { deleteWorkplace } from "@/api/api.js";

  export default {
    data() {
      return {
        workplacesList: [],
        activeWorkplaceId: null,
        modalVisible: false,
        isNewWorkplace: true,
      }
    },
    components: {
      TableItem,
      ModalWorkplaceInfo,
      ButtonItem
    },
    methods: {
      setActiveId(object) {
        this.activeWorkplaceId = object.id;
      },
      processDeleteWorkplace(object) {
        deleteWorkplace(object.id)
        .then(response => location.reload());
      },
      processAddBtnClick() {
        this.isNewWorkplace = true;
        this.modalVisible = true;
      },
      processRowClick() {
        this.isNewWorkplace = false;
        this.modalVisible = true;
      }
    },
    mounted() {
      getWorkplaces()
      .then(response => {
        this.workplacesList = response.map(({address, office, wp_x_coord, wp_y_coord, wp_mp_id, wp_id, type,}) => {
          return {
            id: wp_id,
            'Офис': office.of_name,
            'Адрес места': address,
            'Тип': type.wptype_title
          }
        })
      })
      .catch(error_code => alert(`Ошибка с кодом ${error_code}`));
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
    position: relative;
  }
  .title {
    font-size: 24px;
    margin-bottom: 15px;
    font-weight: 600;
  }
  .btn-add {
    align-self: flex-end;
    margin-top: 20px;
  }
</style>