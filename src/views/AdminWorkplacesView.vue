<template>
  <div class="admin-workplaces">
    <div class="title">Рабочие места</div>
    <table-item
    :objectsList="this.workplacesList"
    :activeUserId="this.activeUserId"
    @rowClicked="processRowClick"
    @setActiveId="setActiveId"
    @deleteObject="processDeleteWorkplace"
    >
    </table-item>
    
    <div class="btn-add">
      <button-item
      :backgroundColor="'#7AD789'"
      :fontColor="'white'"
      :textContent="'Добавить'"
      @buttonClicked="processAddBtnClick"
      :style="'position: absolute; right: 30px; bottom: 30px;'"
      >
      </button-item>
    </div>
    
    <modal-workplace-info
    v-if="this.modalVisible"
    :isNewWorkplace="this.isNewWorkplace"
    :activeUserId="this.activeUserId"
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
        activeUserId: null,
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
        this.activeUserId = object.id;
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
        response.forEach(item => {
          let tmp_address = item.address;
          let tmp_type = item.type.wptype_title;
          let tmp_id = item.wp_id;
          delete item.address;
          delete item.type;
          delete item.wp_id
          item['id'] = tmp_id;
          item['Адрес'] = tmp_address;
          item['Тип'] = tmp_type;
        })
        this.workplacesList = response;
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
    margin-top: 20px;
    align-self: flex-end;
  }
</style>