<template>
  <div class="wrapper">
    <CardComponent class="test" :character="character"/>
    <array-distribution :data="data"/>
  </div>
  <button @click="newRandomPnj()">nouveau pnj</button>

</template>

<script setup lang='ts'>
import { getRandomCharacter, getEthnicDistributionByNationality  } from '../services/apiService';

const character = ref()
const data = ref(null);

import CardComponent from '/components/card-component.vue';
onMounted(async () => {
  // newRandomPnj()
  data.value = await getEthnicDistributionByNationality();
});

async function newRandomPnj() {
  character.value = await getRandomCharacter();  
}

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
