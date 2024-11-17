import { defineStore } from "pinia";

export const useConversationStore = defineStore("conversationStore", {
  state: () => ({
    conversations: JSON.parse(localStorage.getItem("conversations") || "{}"),
    selectChat: 0,
  }),
  actions: {
    formatDate(date = new Date()) {
      return date.toLocaleDateString("pt-BR"); // Define o formato brasileiro
    },
    initializeDate() {
      const date = this.formatDate();
      // Cria uma nova entrada de data se não existir
      if (!this.conversations[date]) {
        this.conversations[date] = {}; // Inicializa como um dicionário
        this.selectChat = 0; // Define o primeiro chat como padrão
      }
      // Cria o chat `selectChat` caso ele não exista
      if (!this.conversations[date][this.selectChat]) {
        this.conversations[date][this.selectChat] = [];
      }
    },
    addConversation(text, type) {
      const date = this.formatDate();
      this.initializeDate();
      // Adiciona a nova conversa no array da data específica
      this.conversations[date][this.selectChat].push({ text, type });
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("conversations", JSON.stringify(this.conversations));
    },
    loadConversations() {
      this.conversations = JSON.parse(
        localStorage.getItem("conversations") || "{}"
      );
    },
    startNewChat() {
      const date = this.formatDate();

      // Se não houver data atual, cria uma nova
      if (!this.conversations[date]) {
        this.conversations[date] = {};
      }

      // Incrementa o índice do novo chat
      this.selectChat = Object.keys(this.conversations[date]).length;

      // Cria a lista de mensagens para o novo chat
      this.conversations[date][this.selectChat] = [];
      this.saveToLocalStorage();
    },
  },
});
