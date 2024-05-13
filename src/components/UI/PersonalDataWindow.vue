<template>
  <div class="data-window">
    <h2>Персональные данные</h2>
    <div class='data'>
      <div class="name">
        <span style="font-weight:400;">Имя</span> <span>{{ personalData.name }}</span>
      </div>
      <div class="surname">
        <span style="font-weight:400;">Фамилия</span> {{ personalData.surname }}
      </div>
      <div class="birthdate">
        <span style="font-weight:400;">Дата рождения</span> <span>{{ personalData.birthdate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      personalData: {
        type: Object,
        default: {
          name: "Alexey",
          surname: "Sultanov",
          birthdate: "10.11.1992",
        }
      }
    }
  }
</script>

<style scoped>
  .data-window {
    width: 100%;
    height: 150px;
    margin-top: 30px;
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 20px;
  }
  .data-window > h2 {
    font-weight: bold;
    margin-bottom: 20px;
  }
  .data {
    display: flex;
    flex-direction: column;
  }
  .name, .surname, .birthdate {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 300px;
  }
</style>