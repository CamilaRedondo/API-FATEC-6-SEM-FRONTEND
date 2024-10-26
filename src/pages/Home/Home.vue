<template>
  <div class="home-container">
    <div class="row">
      <div class="col-3">
        <Sidebar />
      </div>

      <div class="col-9">
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