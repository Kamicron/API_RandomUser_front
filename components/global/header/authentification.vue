<template>
  <div>
    <Alert ref="alertRef" />
    <div v-if="!user.login">
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
    </div>
    <div v-else>
      Connecté en tant que: {{ user.login }}
      <button @click="handleLogout">Déconnexion</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Alert from '/components/global/alert/alert.vue';  // Importez simplement Alert ici
const alertRef = ref<typeof Alert | null>(null);


const user = ref({
  login: '',
  email: '',
  password: '',
});

const credentials = ref({
  email: '',
  password: '',
});

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:3001/users/inscription', user.value);
    console.log(response.data);
    user.value = response.data;
    sessionStorage.setItem('user', JSON.stringify(user.value));
    alertRef.value?.addMessage('success', 'Inscription réussie avec succès!');
  } catch (error) {
    console.error(error.response.data);
    alertRef.value?.addMessage('error', 'Erreur lors de l\'inscription.');
  }
};

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3001/users/connexion', credentials.value);
    user.value = response.data;
    sessionStorage.setItem('user', JSON.stringify(user.value));
    alertRef.value?.addMessage('success', 'Connexion réussie avec succès!');
  } catch (error) {
    console.error(error.response.data);
    alertRef.value?.addMessage('error', 'Erreur lors de la connexion.');
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
