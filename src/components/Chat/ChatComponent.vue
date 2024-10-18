<template>
  <div class="chat-container">
    <div class="chat-messages">
      <!-- Se não houver mensagens, renderiza a imagem -->
      <div v-if="!messages.length" class="logo-container">
        <img
          class="logo"
          src="../../assets/images/LighthouseLogo.svg"
          alt="Logo"
        />
      </div>
      <!-- Se houver mensagens, renderiza as mensagens -->
      <div class="h-100" v-else>
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="chat-message-wrapper"
          :class="message.type"
        >
          <!-- Ícone do bot ao lado esquerdo -->
          <img
            v-if="message.type === 'bot'"
            src="@/assets/icons/ProfileIconBot.svg"
            alt="Bot Profile"
            class="profile-icon"
          />

          <div class="chat-message" :class="message.type">
            <p>{{ message.text }}</p>
          </div>

          <!-- Ícone do usuário ao lado direito -->
          <img
            v-if="message.type === 'user'"
            src="@/assets/icons/ProfileIcon.svg"
            alt="User Profile"
            class="profile-icon"
          />
        </div>
      </div>
    </div>

    <div class="chat-footer">
      <div class="chat-footer-buttons">
        <!-- O MessageInputComponent recebe a mensagem via prop -->
        <MessageInputComponent v-model="newMessage" />
        <!-- O SubmitButtonComponent dispara o envio da mensagem -->
        <SubmitButtonComponent @submitMessage="sendMessage" />
      </div>
      <p class="chat-footer-info">
        LighthouseBot pode cometer erros. Considere verificar informações importantes.
      </p>
    </div>
  </div>
</template>

<script>
import MessageInputComponent from "../MessageInput/MessageInputComponent.vue";
import SubmitButtonComponent from "../SubmitButton/SubmitButtonComponent.vue";

export default {
  name: "ChatComponent",
  data() {
    return {
      newMessage: "", // Nova mensagem a ser enviada
      messages: [], // Armazena todas as mensagens
    };
  },
  components: {
    MessageInputComponent,
    SubmitButtonComponent,
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        // Adiciona a mensagem do usuário
        this.messages.push({ text: this.newMessage, type: "user" });
        this.newMessage = ""; // Limpa o campo de input

        // Simula uma resposta do bot após um curto delay
        setTimeout(() => {
          this.messages.push({
            text: "Esta é uma resposta do LighthouseBot.",
            type: "bot",
          });
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./ChatComponent.scss";
</style>
