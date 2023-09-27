<template>
  <div class="wrapper">
    <CardComponent class="test" :character="character" />
    <button class="button" @click="newRandomPnj()">nouveau pnj</button>
    <div class="distribution"><array-distribution :data="data" /></div>
    <stats />
  </div>
</template>

<script setup lang='ts'>
import { getRandomCharacter, getEthnicDistributionByNationality } from '../services/apiService';

const character = ref()
const data = ref(null);

import CardComponent from '/components/card-component.vue';
onMounted(async () => {
  newRandomPnj()
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
  width: auto;
  margin: 50px 0;
  padding: 10px 20px;
  background-color: $main-color; // Couleur de fond rouge
  color: white; // Couleur du texte blanc
  border: none;
  border-radius: $spacing-xxs; // Coins arrondis
  cursor: pointer;
  transition: all 0.3s ease; // Effet de transition
  font-family: $font-family-dosis;
  text-transform: uppercase;
  letter-spacing: $spacing-xs;

  &:hover {
    background-color: $secondary-color; // Couleur de fond quand survolé
  }

  &:active {
    transform: scale(0.98); // Réduction de la taille quand cliqué
  }

  &:disabled {
    background-color: $dark-gray-color; // Couleur de fond quand désactivé
    cursor: not-allowed;
  }
}


.distribution {
  width: 50%;
}


</style>
