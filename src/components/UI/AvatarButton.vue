<template>
  <person-avatar
  :imgPath="this.avatarImgPath"
  @avatarClicked="this.dropdownMenuVisible = !this.dropdownMenuVisible"
  >
  </person-avatar>
  <dropdown-menu
  v-if="dropdownMenuVisible"
  @closeDropdownMenu="this.dropdownMenuVisible = false"
  >
  </dropdown-menu>
</template>

<script>
  import PersonAvatar from "./PersonAvatar.vue";
  import DropdownMenu from "./DropdownMenu.vue";
  export default {
    props: {
      avatarImgPath: {
        type: String
      }
    },
    components: {
      PersonAvatar,
      DropdownMenu,
    },
    data() {
      return {
        dropdownMenuVisible: false,
      }
    }
  }
</script>

<style scoped>
  
</style>