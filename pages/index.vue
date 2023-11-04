<template>
  <div class="wrapper">
    <CardComponent class="test" :character="character" />
    <button class="button" @click="newRandomPnj()">nouveau pnj</button>
    <Alert ref="alertRef" />
    <div class="distribution"><array-distribution :data="data" /></div>
    <stats />
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { getRandomCharacter, getEthnicDistributionByNationality } from '../services/apiService';
import { AxiosError } from 'axios';
import Alert from '/components/global/alert/alert.vue';  // Importez simplement Alert ici

const character = ref()
const data = ref(null);
const alertRef = ref<typeof Alert | null>(null);

function isAxiosError(error: unknown): error is AxiosError {
  return error instanceof AxiosError;
}

import CardComponent from '/components/card-component.vue';
onMounted(async () => {
  newRandomPnj()
  data.value = await getEthnicDistributionByNationality();
  console.log('data.value', data.value);

});

async function newRandomPnj() {
  try {
    character.value = await getRandomCharacter();
    alertRef.value?.addMessage('success', 'Nouveau PNJ généré avec succès!');
  } catch (error) {
    console.error('Erreur dans le try/catch', error);
    if (isAxiosError(error)) {
      let errorMessage = 'Erreur lors de la génération du nouveau PNJ';
      if (error.response) {
        errorMessage = `Erreur ${error.response.status}: ${error.response.data}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      alertRef.value?.addMessage('error', errorMessage);  // Appel direct ici
    }
  }
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
