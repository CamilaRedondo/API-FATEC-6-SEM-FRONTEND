<template>
  <div class="chat-container">
    <div class="chat-messages">
      <!-- Se não houver mensagens, renderiza a imagem -->
      <img
        v-if="!hasMessages"
        class="logo"
        src="../../assets/images/LighthouseLogo.svg"
        alt="Logo"
      />
      <!-- Se houver mensagens, renderiza as mensagens -->
      <div v-else>
        <p v-for="(message, index) in messages" :key="index">
          {{ message }}
        </p>
      </div>
    </div>

    <div class="chat-footer">
      <div class="chat-footer-buttons">
        <MessageInputComponent />
        <SubmitButtonComponent />
      </div>
      <p class="chat-footer-info">
        LighthouseBot pode cometer erros. Considere verificar informações
        importantes.
      </p>
    </div>
  </div>
</template>

<script>
import MessageInputComponent from "../MessageInput/MessageInputComponent.vue";
import SubmitButtonComponent from "../SubmitButton/SubmitButtonComponent.vue";

export default {
  name: "ChatComponent",
  // props: {}
  components: {
    MessageInputComponent,
    SubmitButtonComponent,
  },
};
</script>

<style lang="scss" scoped>
@import "./ChatComponent.scss";
</style>
