<template>
  <div>
    <button @click="() => displayAlert('success')">Afficher l'Alerte de Succès</button>
    <button @click="() => displayAlert('error', 'Mot de passe erroné')">Erreur Mot de Passe</button>
    <button @click="() => displayAlert('error', 'Bad Request')">Erreur Bad Request</button>
    <button @click="() => displayAlert('error', 'Droits insuffisants')">Erreur Droits</button>
    <Alert ref="alertRef" />
  </div>
</template>

<script setup lang='ts'>
const alertRef = ref(null);

// const displayAlert = (type: 'success' | 'error') => {
//   const message = type === 'success' ? 'Requête réussie !' : 'Requête échouée !';
//   alertRef.value?.addMessage(message, type);
// };

const displayAlert = (type: 'success' | 'error', text?: string) => {
  alertRef.value?.addMessage(type, text);
};
</script>
