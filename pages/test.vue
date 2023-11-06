<template>
  <h2>inscription</h2>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="user.login" placeholder="Nom d'utilisateur" required />
    <input type="email" v-model="user.email" placeholder="Email" required />
    <input type="password" v-model="user.password" placeholder="Mot de passe" required />
    <button type="submit">S'inscrire</button>
  </form>
  <h2>connexion</h2>
  <form @submit.prevent="handleLogin">
    <input type="email" v-model="credentials.email" placeholder="Email" required />
    <input type="password" v-model="credentials.password" placeholder="Mot de passe" required />
    <button type="submit">Se connecter</button>
  </form>

  <div v-if="user">
    Connecté en tant que: {{ user.login }}
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import axios from 'axios';

const user = ref({
  login: '',
  email: '',
  password: '',
});

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:3001/users/inscription', user.value);
    console.log(response.data);
    // Gérer la réponse, par exemple en redirigeant l'utilisateur ou en affichant un message
  } catch (error) {
    console.error(error.response.data);
    // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
  }
};


// CONNEXION

const credentials = ref({
  email: '',
  password: '',
});


// const handleLogin = async () => {
//   try {
//     const response = await axios.post('http://localhost:3001/users/connexion', credentials.value);
//     user.value = response.data; // Supposons que l'API renvoie les données de l'utilisateur sur une connexion réussie
//     // Vous pouvez également stocker les données de l'utilisateur dans un état global avec Pinia ou Vuex
//   } catch (error) {
//     console.error(error.response.data);
//     // Gérer les erreurs de connexion ici
//   }
// };








// Fonction pour gérer l'inscription
// const handleSubmit = async () => {
//   try {
//     const response = await axios.post('http://localhost:3001/users/inscription', user.value);
//     console.log(response.data);
//     // Gérer la réponse
//   } catch (error) {
//     console.error(error.response.data);
//     // Gérer l'erreur
//   }
// };

// Fonction pour gérer la connexion
const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3001/users/connexion', credentials.value);
    user.value = response.data; // Si l'API renvoie les données de l'utilisateur

    // Enregistrer l'utilisateur dans sessionStorage
    sessionStorage.setItem('user', JSON.stringify(user.value));

    // Rediriger l'utilisateur ou rafraîchir l'état de l'application après la connexion
  } catch (error) {
    console.error(error.response.data);
    // Gérer les erreurs de connexion
  }
};

// Fonction pour récupérer l'utilisateur du sessionStorage lors du chargement de l'application

const loadUserFromSession = () => {
  if (typeof window !== 'undefined') {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
    }
  }
};

// Utiliser onMounted pour s'assurer que le code s'exécute côté client
onMounted(() => {
  loadUserFromSession();
});

</script>

<style lang="scss" scoped>
// Votre CSS ici pour styliser le formulaire
</style>
