<template>
  <div class="wrapper">
    <CardComponent class="test" :character="character" />
    <button class="button" @click="newRandomPnj()">nouveau pnj</button>
    <div class="distribution"><array-distribution :data="data" /></div>
  </div>
</template>

<script setup lang='ts'>
import { getRandomCharacter, getEthnicDistributionByNationality } from '../services/apiService';

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
  flex-direction: column;
}

.test {
  height: 192px;
}

.flex {
  display: flex;

}

.button {
  width: 150px;
  margin: 50px 0;
}

.distribution {
  width: 50%;
}
</style>
