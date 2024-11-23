import { defineStore } from "pinia";

export const useConversationStore = defineStore("conversationStore", {
  state: () => ({
    conversations: JSON.parse(localStorage.getItem("conversations") || "{}"),
    selectChat: 0,
    selectDate: Date(),
  }),
  actions: {
    formatDate(date = new Date()) {
      return date.toLocaleDateString("pt-BR"); // Define o formato brasileiro
    },
    initializeDate(date) {
      // Cria uma nova entrada de data se não existir
      if (!this.conversations[date]) {
        this.conversations[date] = {}; // Inicializa como um dicionário
        this.selectChat = 0; // Define o primeiro chat como padrão
        this.selectDate = date;
      }
      // Cria o chat `selectChat` caso ele não exista
      if (!this.conversations[date][this.selectChat]) {
        this.conversations[date][this.selectChat] = [];
      }
    },
    addConversation(text, type) {
      const date = this.formatDate();
      this.initializeDate(date);
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
      this.initializeDate(date);
      
      // Verifica se o chat atual está vazio antes de criar um novo
      const currentChat = this.conversations[date][this.selectChat];
      if (currentChat && currentChat.length === 0) {
        console.warn(
          "O chat atual está vazio. Não é possível criar um novo chat."
        );
        return;
      }

      // Incrementa o índice do novo chat
      this.selectChat = Object.keys(this.conversations[date]).length;

      this.saveToLocalStorage();
    },
  },
});
