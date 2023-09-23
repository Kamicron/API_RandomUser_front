<template>
  <div class="wrapper">
    <CardComponent class="test" :character="character"/>
  </div>
</template>

<script setup lang='ts'>
import { getRandomCharacter } from '../services/apiService';

const character = ref()

import CardComponent from '/components/card-component.vue';
onMounted(async () => {
  character.value = await getRandomCharacter();
  console.log('  character.value ',  character.value );
});

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
}

.test {
  height: 192px;
}
</style>
