import { defineStore } from "pinia";

export const useConversationStore = defineStore("conversationStore", {
  state: () => ({
    conversations: JSON.parse(localStorage.getItem("conversations") || "{}"),
    selectChat: 0,
  }),
  actions: {
    initializeDate() {
      const date = new Date().toLocaleDateString();
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
      const date = new Date().toLocaleDateString();
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
      const date = new Date().toLocaleDateString();

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
