<template>
  <div>
    <!-- <button @click="() => displayAlert('success')">Afficher l'Alerte de Succès</button>
    <button @click="() => displayAlert('error', 'Mot de passe erroné')">Erreur Mot de Passe</button>
    <button @click="() => displayAlert('error', 'Bad Request')">Erreur Bad Request</button>
    <button @click="() => displayAlert('error', 'Droits insuffisants')">Erreur Droits</button> -->
    <Alert ref="alertRef" />
    <div class="test">
      <dropdown option="system" @update:selected="handleSystem" />
      <dropdown option="species" @update:selected="handleSpecies" />
      <dropdown option="gender" @update:selected="handleGender" />
      <dropdown option="origin" @update:selected="handleOrigin" />
      <dropdown option="suborigin" @update:selected="handleSuborigin" />
      <dropdown option="work" @update:selected="handleWork" />
      <button class="button" @click="newRandomPnj()">nouveau pnj</button>

    </div>

  </div>
</template>

<script setup lang='ts'>
import { getRandomCharacter, getEthnicDistributionByNationality } from '../services/apiService';
import { AxiosError } from 'axios';
import Alert from '/components/global/alert/alert.vue';  // Importez simplement Alert ici

const alertRef = ref(null);

const selectedGender = ref();
const selectedOrigin = ref();
const selectedSuborigin = ref();
const selectedSystem = ref();
const selectedSpecies = ref();
const selectedWork = ref();

const displayAlert = (type: 'success' | 'error', text?: string) => {
  alertRef.value?.addMessage(type, text);
};

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

const handleWork = (value) => {
  // Traitez la valeur sélectionnée comme nécessaire
  console.log('Valeur sélectionnée:', value);
};

const character = ref()

function isAxiosError(error: unknown): error is AxiosError {
  return error instanceof AxiosError;
}


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
    console.log('character.value', character.value);
    console.log('system', character.value.system[0].id_system);
    console.log('species', character.value.personalInfo.lineage.species[0].id_species);
    console.log('gender', character.value.personalInfo.gender[0].id_gender);
    console.log('origin', character.value.personalInfo.lineage.origin[0].id_origin);
    console.log('gender', character.value.personalInfo.lineage.suborigin.id_suborigin);

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
.test {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
}
</style>
