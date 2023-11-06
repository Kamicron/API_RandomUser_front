<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="user.login" placeholder="Nom d'utilisateur" required />
    <input type="email" v-model="user.email" placeholder="Email" required />
    <input type="password" v-model="user.password" placeholder="Mot de passe" required />
    <button type="submit">S'inscrire</button>
  </form>
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
</script>

<style lang="scss" scoped>
// Votre CSS ici pour styliser le formulaire
</style>
