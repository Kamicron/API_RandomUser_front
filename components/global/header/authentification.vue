<template>
  <div>
    <!-- Composant Alert pour les messages -->
    <Alert ref="alertRef" />

    <!-- Modal Inscription -->
    <ModalAruModal max-width="500px" :is-open="isModalInscriptionOpen" title="Inscription"
      @close="closeModalInscription">
      <form class="formulaire" @submit.prevent="handleInscription">
        <InputAruInput type="text" label="Login" v-model="user.login" required :icon="{name:'home', type:'regular'}" error="Ceci est une erreure" placeholder="login"/>
        <InputAruInput type="email" label="Email" v-model="user.email" required :icon="{name:'home', type:'regular'}" error="Ceci est une erreure" placeholder="email"/>
        <InputAruInput type="password" label="Mor de passe" v-model="user.password" required :icon="{name:'home', type:'regular'}" error="Ceci est une erreure" placeholder="Mot de passe"/>
        <button class="button" type="submit">S'inscrire</button>
      </form>
    </ModalAruModal>


    <!-- Modal Connexion -->
    <ModalAruModal max-width="500px" :is-open="isModalConnexionOpen" title="Connexion"
      @close="closeModalConnexion">
        <form class="formulaire" @submit.prevent="handleLogin" novalidate >
          <InputAruInput type="email" label="Email" v-model="credentials.email" required :icon="{name:'home', type:'regular'}" :error="errorMessages.email" placeholder="adresse mail"/>
          <InputAruInput type="password" label="Mot de passe" v-model="credentials.password" required :icon="{name:'home', type:'regular'}" :error="errorMessages.password" placeholder="mot de passe"/>
          <button class="button" type="submit">Se connecter</button>
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
const config = useRuntimeConfig();

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


const errorMessages = ref({
  email: '',
  password: '',
});

const validateEmail = (email) => {

  console.log('email', email);
  
  if (!email) {
    return 'Le champ Email est requis.';
  } else if (!email.includes('@') || !email.includes('.')) {
    return 'Le format de l\'email est incorrect.';
  }
  return '';
};

const validatePassword = (password) => {
  if (!password) {
    return 'Le champ Mot de passe est requis.';
  }
  // Ajoutez d'autres validations si nécessaire.
  return '';
};

// Fonction pour fermer le dialogue si aucune erreur n'est survenue
async function trySubmitForm(submitFunction: () => Promise<boolean>) {
  const isSuccessful = await submitFunction();
  return isSuccessful;
}

// Gestionnaire d'événements pour le formulaire d'inscription
const handleInscription = async () => {
  const isSuccessful = await trySubmitForm(async () => {
    try {
      const response = await axios.post(`http://${config.public.backBaseUrl}:${config.public.backPort}/users/inscription`, user.value);
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
  errorMessages.value.email = validateEmail(credentials.value.email);
  errorMessages.value.password = validatePassword(credentials.value.password);
  const isSuccessful = await trySubmitForm(async () => {
    try {
      const response = await axios.post(`http://${config.public.backBaseUrl}:${config.public.backPort}/users/connexion`, credentials.value);
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
.formulaire {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: $spacing-sm;
}
</style>
