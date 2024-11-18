<template>
  <div class="button-container">
    <button class="button" @click="handleClick">
      Novo chat
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonComponent",
  emits: ["new-chat"], // Declaração do evento emitido pelo componente
  methods: {
    handleClick() {
      // Emite o evento para o componente pai
      this.$emit("new-chat");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./ButtonComponent.scss";
</style>
