<template>
  <div class="sidebar-container">
    <div class="sidebar-header">
      <img class="sidebar-logo" src="../../assets/images/LIGHTHOUSE BOT.svg" alt="Logo" />
    </div>

    <div class="sidebar-body">
      <!-- Lista de datas e conversas -->
      <div v-for="(conversations, date) in groupedConversations" :key="date" class="conversation-group">
      <DividerComponent />
        <p class="conversation-date">{{ date }}</p>
        <div v-for="(conversation, index) in conversations" :key="index" class="conversation-item">
          <button @click="loadConversation(date, conversation.originalIndex)" class="conversation-button">
            <p class="conversation-snippet">{{ conversation.preview }}</p>
          </button>
        </div>
      </div>
    </div>

    <DividerComponent />

    <ButtonComponent class="custom-button" @new-chat="startNewChat"/>
  </div>
</template>

<script>
import ButtonComponent from "../Button/ButtonComponent.vue";
import DividerComponent from "../Divider/DividerComponent.vue";
import { useConversationStore } from "@/stores/conversationStore.js";
import { computed } from "vue";

export default {
  name: "SidebarComponent",
  components: {
    DividerComponent,
    ButtonComponent,
  },
  setup(_, { emit }) {
    const conversationStore = useConversationStore();

    // Computa as conversas agrupadas com previews
    const groupedConversations = computed(() => {
      const data = conversationStore.conversations;

      // Ordena as datas em ordem decrescente
      const orderedDates = Object.entries(data).sort(([dateA], [dateB]) => {
        const [dayA, monthA, yearA] = dateA.split("/").map(Number);
        const [dayB, monthB, yearB] = dateB.split("/").map(Number);
        return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
      });

      return orderedDates.reduce((result, [date, chats]) => {
        const sortedChats = Object.entries(chats)
          .sort(([a], [b]) => b - a) // Ordena os índices em ordem decrescente
          .map(([originalIndex, messages]) => {
            const botMessage = Array.isArray(messages) ? messages.find((msg) => msg.type === "bot") : null;
            const preview = botMessage ? botMessage.text : (Array.isArray(messages) && messages[0]?.text);
            return { originalIndex, preview, fullChat: messages };
          });

        result[date] = sortedChats; // Adiciona os chats ordenados
        return result;
      }, {});
    });

    // Função para carregar uma conversa
    const loadConversation = (date, originalIndex) => {
      conversationStore.selectDate = date;
      conversationStore.selectChat = originalIndex;
      emit("conversation-selected", conversationStore.conversations[date][originalIndex]);
    };

    const startNewChat = conversationStore.startNewChat;

    return {
      groupedConversations,
      loadConversation,
      startNewChat,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./SidebarComponent.scss";
</style>
