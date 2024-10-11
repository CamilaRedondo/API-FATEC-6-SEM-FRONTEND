<template>
  <div class="sidebar-container">
    <div class="sidebar-header">
      <img src="../../assets/images/LIGHTHOUSE BOT.svg" alt="Logo" />
      <button>
        <img class="SidebarIcon" src="../../assets/icons/SidebarIcon.svg" alt="Icon" />
      </button>
    </div>

    <DividerComponent />

    <div class="sidebar-body">
      
    </div>

    <DividerComponent />

    <ButtonComponent class="custom-button" />
  </div>
</template>

<script>
import ButtonComponent from "../Button/ButtonComponent.vue";
import DividerComponent from "../Divider/DividerComponent.vue";

export default {
  name: "SidebarComponent",
  components: {
    DividerComponent,
    ButtonComponent
  },
};
</script>

<style lang="scss" scoped>
@import "./SidebarComponent.scss";
</style>
