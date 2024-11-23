<template>
  <input
    type="text"
    class="rounded-input"
    placeholder="O que precisa saber hoje?"
    v-model="message"
    @keyup.enter="onEnter"
  />
</template>

<script setup>
import { ref } from 'vue';

const message = ref();
/* eslint-disable */
const emit = defineEmits(['submitMessage']);
    function onEnter() {
      emit("submitMessage"); // Dispara o envio da mensagem ao pressionar Enter
      message.value = '';
    }
</script>

<style lang="scss" scoped>
@import "./MessageInputComponent.scss";
</style>
