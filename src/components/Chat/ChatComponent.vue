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
      socket: null, // WebSocket
    };
  },
  components: {
    MessageInputComponent,
    SubmitButtonComponent,
  },
  created() {
    // Inicia a conexão WebSocket
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      // Cria uma conexão WebSocket com o servidor
      this.socket = new WebSocket("ws://localhost:8081");

      // Quando a conexão é estabelecida
      this.socket.onopen = () => {
        console.log("Conexão WebSocket estabelecida.");
      };

      // Quando o servidor envia uma mensagem
      this.socket.onmessage = (event) => {
        const botResponse = event.data;
        // Adiciona a resposta do bot nas mensagens
        this.messages.push({ text: botResponse, type: "bot" });
      };

      // Quando a conexão é fechada
      this.socket.onclose = () => {
        console.log("Conexão WebSocket fechada.");
      };

      // Quando ocorre um erro
      this.socket.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
      };
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        // Adiciona a mensagem do usuário
        this.messages.push({ text: this.newMessage, type: "user" });

        // Envia a mensagem para o servidor WebSocket
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(this.newMessage);
        } else {
          console.error("Conexão WebSocket não está aberta.");
        }

        // Limpa o campo de input
        this.newMessage = "";
      }
    },
  },
  beforeUnmount() {
    // Fecha a conexão WebSocket quando o componente for destruído
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./ChatComponent.scss";
</style>
