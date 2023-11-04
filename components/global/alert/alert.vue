<template>
  <div class="alerts">
    <transition-group name="list" tag="div">
      <div v-for="message in messages" :key="message.id" :class="['alert', message.type]">
        {{ message.text }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang='ts'>
import { ref, defineExpose } from 'vue';

interface Message {
  id: number;
  text: string;
  type: 'success' | 'error';
}

const messages = ref<Array<Message>>([]);
let nextId = 1;

const addMessage = (type: 'success' | 'error', text?: string) => {
  const defaultText = type === 'success' ? 'Requête réussie !' : 'Erreur : ';
  messages.value.unshift({ id: nextId++, text: text || defaultText, type });
  setTimeout(() => {
    messages.value.pop();
  }, 5000);
};

defineExpose({ addMessage });

</script>



<style lang="scss" scoped>
.alerts {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;

  width: 250px;
}

.alert {
  background-color: $succes-color;
  color: white;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  font-family: $font-family-roboto;
}

.list-move {
  transition: transform 0.5s;
}

.success {
  background-color: $succes-color;
}

.error {
  background-color: $danger-color;
}
</style>
