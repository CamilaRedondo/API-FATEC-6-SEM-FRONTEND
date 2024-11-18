<template>
  <div class="home-container">
    <div class="row h-100">
      <!-- Sidebar: Oculta em telas pequenas -->
      <div class="col-md-3 d-none d-md-block">
        <Sidebar />
      </div>

      <!-- Chat: Ocupa a largura total em telas menores -->
      <div class="col-12 col-md-9">
        <Chat />
      </div>
    </div>
  </div>
</template>

<script>
import Chat from "@/components/Chat/ChatComponent.vue";
import Sidebar from "@/components/Sidebar/SidebarComponent.vue";

export default {
  name: "HomePage",
  components: {
    Chat,
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
@import "./Home.scss";
</style>
