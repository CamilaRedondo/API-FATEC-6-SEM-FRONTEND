<template>
  <input
    type="text"
    class="rounded-input"
    placeholder="O que precisa saber hoje?"
    v-model="inputMessage"
    @keyup.enter="onEnter"
  />
</template>

<script>
export default {
  name: "MessageInputComponent",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  computed: {
    inputMessage: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value); // Atualiza o valor no componente pai
      },
    },
  },
  methods: {
    onEnter() {
      this.$emit("submitMessage"); // Dispara o envio da mensagem ao pressionar Enter
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./MessageInputComponent.scss";
</style>
