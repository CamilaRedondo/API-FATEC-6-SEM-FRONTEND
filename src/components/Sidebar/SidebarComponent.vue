<template>
  <div class="sidebar-container">
    <div class="sidebar-header">
      <img src="../../assets/images/LIGHTHOUSE BOT.svg" alt="Logo" />
      <button>
        <img class="SidebarIcon" src="../../assets/icons/SidebarIcon.svg" alt="Icon" />
      </button>
    </div>

    
    <div class="sidebar-body">
      <!-- Lista de datas e conversas -->
      <div v-for="(conversations, date) in groupedConversations" :key="date" class="conversation-group">
      <DividerComponent />
        <p class="conversation-date">{{ date }}</p>
        <div v-for="(conversation, index) in conversations" :key="index" class="conversation-item">
          <button @click="loadConversation(date, index)" class="conversation-button">
            <p class="conversation-snippet">{{ conversation.snippet }}</p>
          </button>
        </div>
      </div>
    </div>

    <DividerComponent />

    <ButtonComponent class="custom-button" />
  </div>
</template>

<script>
import ButtonComponent from "../Button/ButtonComponent.vue";
import DividerComponent from "../Divider/DividerComponent.vue";

export default {
  name: "SidebarComponent",
  components: {
    DividerComponent,
    ButtonComponent
  },
  data() {
    return {
      // Conversas agrupadas por data
      groupedConversations: {
        '17/10/2024': [
          { snippet: 'Olá, como posso ajudar?', fullText: 'Histórico completo da conversa 1 no dia 17/10/2024...' },
          { snippet: 'Poderia me ajudar com uma tarefa?', fullText: 'Histórico completo da conversa 2 no dia 17/10/2024...' }
        ],
        '16/10/2024': [
          { snippet: 'Qual é a previsão do tempo?', fullText: 'Histórico completo da conversa 1 no dia 16/10/2024...' }
        ],
        '15/10/2024': [
          { snippet: 'Me conte mais sobre IA.', fullText: 'Histórico completo da conversa 1 no dia 15/10/2024...' }
        ]
      }
    };
  },
  methods: {
    loadConversation(date, index) {
      // Carrega a conversa selecionada e emite para o componente pai
      this.$emit('conversation-selected', this.groupedConversations[date][index]);
      console.log(this.groupedConversations[date][index]);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./SidebarComponent.scss";
</style>
