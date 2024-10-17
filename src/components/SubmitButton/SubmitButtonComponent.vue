<template>
  <button 
    class="rounded-button"
    @click="submit"
  >
    <img class="send-icon" src="../../assets/icons/SendIcon.svg" alt="Enviar Mensagem">
  </button>
</template>

<script>
export default {
  name: "SubmitButtonComponent",
  methods: {
    submit() {
      this.$emit("submitMessage"); // Emite o evento para enviar a mensagem
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./SubmitButtonComponent.scss";
</style>
