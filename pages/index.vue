<template>
  <div class="wrapper">
    <div class="pnj_generator">
      <CardComponent class="test" :character="character" />
      <div class="selector">
        <dropdown option="system" @update:selected="handleSystem" />
        <dropdown option="species" @update:selected="handleSpecies" />
        <dropdown option="gender" @update:selected="handleGender" />
        <dropdown option="origin" @update:selected="handleOrigin" />
        <dropdown option="suborigin" @update:selected="handleSuborigin" />
        <button class="button" @click="newRandomPnj()">nouveau pnj</button>
      </div>

    </div>

    <Alert ref="alertRef" />
    <div class="distribution"><array-distribution :data="data" /></div>
    <stats class="stats"/>
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
const selectedGender = ref();
const selectedOrigin = ref();
const selectedSuborigin = ref();
const selectedSystem = ref();
const selectedSpecies = ref();

const handleSystem = (value) => {
  selectedSystem.value = value;
  console.log('Valeur sélectionnée:', value);
};

const handleSpecies = (value) => {
  selectedSpecies.value = value;
  console.log('Valeur sélectionnée:', value);
};


const handleGender = (value) => {
  selectedGender.value = value;
  console.log('Valeur sélectionnée:', value);
};

const handleOrigin = (value) => {
  selectedOrigin.value = value;
  console.log('Valeur sélectionnée:', value);
};

const handleSuborigin = (value) => {
  selectedSuborigin.value = value;
  console.log('Valeur sélectionnée:', value);
};


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
  const params = {};
  if (selectedGender.value?.id_gender) params.gender = selectedGender.value.id_gender;
  if (selectedOrigin.value?.id_origin) params.origin = selectedOrigin.value.id_origin;
  if (selectedSuborigin.value?.id_suborigin) params.suborigin = selectedSuborigin.value.id_suborigin;
  if (selectedSystem.value?.id_system) params.system = selectedSystem.value.id_system;
  if (selectedSpecies.value?.id_species) params.species = selectedSpecies.value.id_species;

  try {
    // Appelez `getRandomCharacter` avec les paramètres définis
    character.value = await getRandomCharacter(params);

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

.test {}

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

.pnj_generator {
  display: flex;

  .selector {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px;
    width: 100%;
  }
}

.stats {
  width: 100%;
}

.distribution {
  width: 100%;
}
</style>
