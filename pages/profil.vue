<template>
  <div v-if="savedUser.login === ''">  Tu as acces a la page car tu es conecté
</div>
  <div v-else>
    
    Connecté en tant que {{ savedUser.login }}
    <InputAruInput v-model="savedUser.login" type="text" label="Nom d'utilisateur" placeholder="Nom d'utilisateur" />
    <InputAruInput v-model="savedUser.email" type="email" label="Adresse mail" placeholder="adressemail@fournisseur.fr" />
    
    </div>
</template>

<script setup lang='ts'>
import auth from '../middleware/auth';



definePageMeta({
  middleware: auth
});

const savedUser = ref({
  login: '',
  email: '',
  password: '',
});

const loadUserFromSession = () => {
   const userSession = sessionStorage.getItem('user');
   if (userSession) {
       savedUser.value = JSON.parse(userSession);
   } else {
       // Réinitialiser savedUser à un objet vide si aucun utilisateur n'est enregistré dans la session
       savedUser.value = { login: '', email: '', password: '' };
   }

   console.log("savedUser.value", savedUser.value);
};


onMounted(loadUserFromSession);
</script>

<style lang='scss' scoped></style>