<template>
  <div class="modal">
    <div class="modal-window">
      <h1>Рабочее место</h1>

      <h2>Фотография</h2>
      <div class="photo-wrapper">
        <img
        class="workplace-photo" 
        src="@/images/baretskiy-avatar.jpg"
        >
        <div class="photo-info">
          <p 
          :style="'font-weight: 500; font-size: 20px; margin-bottom: 10px;'"
          >
          Загрузить новую фотографию
          </p>

          <input
          type="file"
          @change="processFileUpload"
          >

          <p
          :style="'font-weight: 300; font-size: 14px; margin-top: 10px;'"
          >
          Идеальный размер изображения 200 x 140 пикселей.<br>
          Максимальный размер файла - 200KB.
          </p>
        </div>
      </div>

      <hr class="separator">

      <h1>Параметры</h1>
      <div class="parameters-wrapper">
        <form id="workplace-form">
          <div class="workplace-address">
            <h2>Адрес</h2>
            <input 
            type="text"
            v-model="this.workplaceInfo.address"
            >
          </div>
          <div class="workplace-type">
            <h2>Тип</h2>
            <input 
            type="text"
            v-model="this.workplaceInfo.type.title"
            >
          </div>
          <div class="something-else">
            <h2>Что-то еще</h2>
            <input 
            type="text"
            >
          </div>
        </form>

        <div class="schema-info">
          <h2>Место на схеме</h2>
          <div class="schema-replacer">

          </div>
        </div>
      </div>

      <hr class="separator">

      <table-item
      :objectsList="getWorkplaceAttributesToTable"
      @setActiveId="setActiveId"
      @rowClicked="this.modalVisible = true"
      :activeUserId="activeAttributeId"
      >
      </table-item>

      <button-close
      @buttonClicked="this.$emit('closeModalWindow')"
      >
      </button-close>
    </div>

    <div class = "overlay"></div>
  </div>
</template>

<script>
  import ButtonClose from "@/components/UI/ButtonClose";
  import TableItem from "@/components/UI/TableItem";

  import { getWorkplaceInfo } from "@/api/api.js";
  import { getAttributesByWorkplaceId } from "@/api/api.js";

  export default {
    props: {
      activeUserId: {
        type: Number
      },
      isNewWorkplace: {
        type: Boolean
      }
    },
    components: {
      ButtonClose,
      TableItem
    },
    methods: {
      setActiveId(object) {
        this.activeAttributeId = object.id;
      }
    },
    data() {
      return {
        workplaceInfo: {
          id: null,
          address: "",
          imgUrl: "",
          type: {
            title: "",
            id: null
          },
          attributes: [
            {
              id: 1,
              title: "",
              value: "",
              iconUrl: ""
            },
          ],
        },
        modalVisible: false,
        activeAttributeId: null
      }
    },
    watch: {
      activeUserId: {
        immediate: true,
        handler(newVal) {
          if (!this.isNewWorkplace) {
            getWorkplaceInfo(newVal)
            .then(response => {
              this.workplaceInfo.id = response.id;
              this.workplaceInfo.address = response.address;
              this.workplaceInfo.imgUrl = response.img_url;
              this.workplaceInfo.type = {};
              this.workplaceInfo.type.title = response.type.wptype_title;
              this.workplaceInfo.type.id = response.type.wptype_id;
              this.workplaceInfo.attributes = response.attributes.map(({ attr_id, attr_title, attr_value, attr_icon_url }) => {
                return {
                  id: attr_id,
                  title: attr_title,
                  value: attr_value,
                  iconUrl: attr_icon_url
                };
              });
            });
        }
        }
      }
    },
    computed: {
      getWorkplaceAttributesToTable() {
        let abobix = this.workplaceInfo.attributes.map(item => {
          let newItem = Object.create(item);
          for (let prop in newItem) {
            Object.defineProperty(newItem, prop, {
              value: item[prop],
              enumerable: false
            });
          }
          Object.defineProperty(newItem, 'Иконка', {
            value: item['iconUrl'],
            enumerable: true
          });
          Object.defineProperty(newItem, 'Название', {
            value: item['title'],
            enumerable: true
          });
          Object.defineProperty(newItem, 'Значение', {
            value: item['value'],
            enumerable: true
          });
          return newItem
        });
        return abobix;
      }
    }
  }
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
    z-index: 4;
  }

  .modal-window {
    display: flex;
    flex-direction: column;
    align-items: left;
    position: relative;
    z-index: 5;
    min-width: 800px;
    height: 80%;
    border-radius: 10px;
    box-shadow: 0 10px 15px rgba(0,0,0, .4);
    background-color: white;
    padding: 30px;
    overflow-y: auto;
  }

  h1 {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 20px;
  }

  h2 {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 15px;
  }

  .photo-wrapper {
    display: flex;
    flex-direction: row;
    height: 140px;
  }
  
  .workplace-photo {
    height: 100%;
    width: 200px;
    border-radius: 5px;
    margin-right: 30px;
  }

  .photo-wrapper .photo-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .separator {
    border: none;
    border-top: 1px solid #D9D9D9;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .parameters-wrapper {
    display: flex;
    width: 100%;
  }
  
  #workplace-form {
    display: flex;
    flex-direction: column;
    width: 280px;
    margin-right: 70px;
  }

  #workplace-form div > h2 {
    margin-bottom: 5px;
  }

  #workplace-form input {
    width: 100%;
    height: 30px; 
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
  }

  #workplace-form > div {
    margin-bottom: 10px;
  }

  .schema-info {
    width: 240px;
  }

  .schema-info h2 {
    margin-bottom: 8px; 
  }
  .schema-replacer {
    width: 100%;
    height: 160px;
    background-color: grey;
    border-radius: 10px;
  }
</style>