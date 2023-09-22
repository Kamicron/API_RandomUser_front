<template>
  <div class="card">
    <p>Prénom aléatoire : {{ firstname }}</p>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { getRandomFirstName } from '../services/apiService';

const firstname = ref('');

onMounted(async () => {
  firstname.value = await getRandomFirstName();
});
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
