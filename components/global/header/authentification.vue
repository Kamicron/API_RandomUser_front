<template>
  <div>
    <!-- Composant Alert pour les messages -->
    <Alert ref="alertRef" />

    <!-- Modal Inscription -->
    <ModalAruModal :is-open="isModalInscriptionOpen" title="Inscription"
      @close="closeModalInscription">
      <form @submit.prevent="handleInscription">
        <input type="text" v-model="user.login" placeholder="Nom d'utilisateur" required />
        <input type="email" v-model="user.email" placeholder="Email" required />
        <input type="password" v-model="user.password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
    </ModalAruModal>


    <!-- Modal Connexion -->
    <ModalAruModal :is-open="isModalConnexionOpen" title="Connexion"
      @close="closeModalConnexion">
        <form @submit.prevent="handleLogin">
          <input type="email" v-model="credentials.email" placeholder="Email" required />
          <input type="password" v-model="credentials.password" placeholder="Mot de passe" required />
          <button type="submit">Se connecter</button>
        </form>
      </ModalAruModal>

    <!-- Boutons pour afficher les modals -->
    <button v-if="!user.login" @click="openModalInscription">Inscription</button>
    <button v-if="!user.login" @click="openModalConnexion">Connexion</button>

    <!-- Affichage utilisateur connecté -->
    <div v-else>
      Connecté en tant que: {{ user.login }}
      <button @click="handleLogout">Déconnexion</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import axios from 'axios';
import Alert from '/components/global/alert/alert.vue';

// Références pour les éléments de l'interface et les données utilisateur
const alertRef = ref(null);
const inscriptionModal = ref(null);
const connexionModal = ref(null);


const isModalInscriptionOpen = ref<boolean>(false)

const openModalInscription = () => {
  isModalInscriptionOpen.value = true
}

const closeModalInscription = () => {
  isModalInscriptionOpen.value = false
}

const isModalConnexionOpen = ref<boolean>(false)

const openModalConnexion = () => {
  isModalConnexionOpen.value = true
}

const closeModalConnexion = () => {
  isModalConnexionOpen.value = false
}


const user = ref({
  login: '',
  email: '',
  password: '',
});

const credentials = ref({
  email: '',
  password: '',
});

// Fonction pour fermer le dialogue si aucune erreur n'est survenue
async function trySubmitForm(submitFunction: () => Promise<boolean>) {
  const isSuccessful = await submitFunction();
  return isSuccessful;
}

// Gestionnaire d'événements pour le formulaire d'inscription
const handleInscription = async () => {
  const isSuccessful = await trySubmitForm(async () => {
    try {
      const response = await axios.post('http://localhost:3001/users/inscription', user.value);
      user.value = response.data;
      sessionStorage.setItem('user', JSON.stringify(user.value));
      alertRef.value?.addMessage('success', 'Inscription réussie avec succès!');
      return true;
    } catch (error) {
      alertRef.value?.addMessage('error', 'Erreur lors de l\'inscription.');
      return false;
    }
  });

  if (isSuccessful) {
    closeModalInscription();
  }
};

// Gestionnaire d'événements pour le formulaire de connexion
const handleLogin = async () => {
  const isSuccessful = await trySubmitForm(async () => {
    try {
      const response = await axios.post('http://localhost:3001/users/connexion', credentials.value);
      user.value = response.data;
      sessionStorage.setItem('user', JSON.stringify(user.value));
      alertRef.value?.addMessage('success', 'Connexion réussie avec succès!');
      return true;
    } catch (error) {
      alertRef.value?.addMessage('error', 'Erreur lors de la connexion.');
      return false;
    }
  });

  if (isSuccessful) {
    closeModalConnexion();
  }
};


const handleLogout = () => {
  user.value = { login: '', email: '', password: '' };
  sessionStorage.removeItem('user');
  alertRef.value?.addMessage('success', 'Déconnexion réussie avec succès!');
};

const loadUserFromSession = () => {
  const savedUser = sessionStorage.getItem('user');
  if (savedUser) {
    user.value = JSON.parse(savedUser);
  }
};

onMounted(loadUserFromSession);

</script>

<style lang="scss" scoped>
// Votre CSS ici pour styliser le formulaire
</style>
