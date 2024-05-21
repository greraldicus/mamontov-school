<template>
  <div class="admin-workplaces">
    <div class="title">Рабочие места</div>
    <table-item
    :objectsList="this.workplacesList"
    :activeUserId="this.activeUserId"
    @rowClicked="this.modalVisible = true"
    @setActiveId="setActiveId"
    >
    </table-item>

    <modal-workplace-info
    v-if="this.modalVisible"
    :activeUserId="this.activeUserId"
    @closeModalWindow="this.modalVisible = false"
    >
    </modal-workplace-info>
  </div>
  
</template>

<script>
  import TableItem from "@/components/UI/TableItem";
  import ModalWorkplaceInfo from "@/components/modals/ModalWorkplaceInfo";

  import { getWorkplaces } from "@/api/api.js";

  export default {
    data() {
      return {
        workplacesList: [],
        activeUserId: null,
        modalVisible: false
      }
    },
    components: {
      TableItem,
      ModalWorkplaceInfo
    },
    methods: {
      setActiveId(object) {
        this.activeUserId = object.id;
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
  }
  .title {
    font-size: 24px;
    margin-bottom: 15px;
    font-weight: 600;
  }
</style>