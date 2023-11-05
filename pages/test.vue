<template>
  <div>
    <!-- <button @click="() => displayAlert('success')">Afficher l'Alerte de Succès</button>
    <button @click="() => displayAlert('error', 'Mot de passe erroné')">Erreur Mot de Passe</button>
    <button @click="() => displayAlert('error', 'Bad Request')">Erreur Bad Request</button>
    <button @click="() => displayAlert('error', 'Droits insuffisants')">Erreur Droits</button> -->
    <Alert ref="alertRef" />
    <div class="test">
      <dropdown option="gender" @update:selected="handleGender"/>
      <dropdown option="origin" @update:selected="handleOrigin"/>
      <dropdown option="suborigin" @update:selected="handleSuborigin"/>
      <dropdown option="work" @update:selected="handleWork"/>
      <button class="button" @click="newRandomPnj()">nouveau pnj</button>

    </div>

  </div>
</template>

<script setup lang='ts'>
import { getRandomCharacter, getEthnicDistributionByNationality } from '../services/apiService';
import { AxiosError } from 'axios';
import Alert from '/components/global/alert/alert.vue';  // Importez simplement Alert ici

const alertRef = ref(null);

// const displayAlert = (type: 'success' | 'error') => {
//   const message = type === 'success' ? 'Requête réussie !' : 'Requête échouée !';
//   alertRef.value?.addMessage(message, type);
// };

const displayAlert = (type: 'success' | 'error', text?: string) => {
  alertRef.value?.addMessage(type, text);
};

const handleGender = (value) => {
  // Traitez la valeur sélectionnée comme nécessaire
  console.log('Valeur sélectionnée:', value);
};

const handleOrigin = (value) => {
  // Traitez la valeur sélectionnée comme nécessaire
  console.log('Valeur sélectionnée:', value);
};

const handleSuborigin = (value) => {
  // Traitez la valeur sélectionnée comme nécessaire
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
  try {
    character.value = await getRandomCharacter();
    console.log('character.value', character.value);
    
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
