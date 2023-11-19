<template>
  <div v-if="savedUser.login === ''">Tu as accès à la page car tu es connecté</div>
  <div v-else>
    Connecté en tant que {{ savedUser.login }}
    <InputAruInput v-model="savedUser.login" type="text" label="Nom d'utilisateur" placeholder="Nom d'utilisateur" />
    <button class="button" @click="updateUserLogin">Modifier Login</button>

    <InputAruInput v-model="savedUser.email" type="email" label="Adresse mail" placeholder="adressemail@fournisseur.fr" />
    <button class="button" @click="updateUserEmail">Modifier Email</button>

    <InputAruInput v-model="newPassword" type="password" label="Nouveau mot de passe"
      placeholder="Nouveau mot de passe" />
    <button class="button" @click="updateUserPassword">Modifier Mot de Passe</button>

    <div v-if="showPasswordReset">
      <InputAruInput v-model="resetEmail" type="email" label="Adresse mail pour réinitialisation"
        placeholder="adressemail@fournisseur.fr" />
      <button class="button" @click="resetPassword">Réinitialiser Mot de Passe</button>
    </div>
  </div>

  <Alert ref="alertRef" />
</template>


<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import auth from '../middleware/auth';
import { updateLogin, updateEmail, updatePassword } from '../services/apiService';
import Alert from '/components/global/alert/alert.vue';
import { useUserSession } from '../composables/useUserSession';
import { useGlobalStore } from '../stores/useGlobalStore';

const { state, setUser } = useGlobalStore();


const { savedUser, loadUserFromSession } = useUserSession();

const alertRef = ref<typeof Alert | null>(null);


// const alertRef = ref<typeof Alert | null>(null);


definePageMeta({ middleware: auth });

console.log('savedUser', savedUser);
const newPassword = ref('');
const resetEmail = ref('');
const showPasswordReset = ref(false);

const updateUserLogin = async () => {
  try {
    // Assurez-vous que savedUser.value.id et loginToUpdate.value sont correctement définis
    console.log('savedUser.value', savedUser.value);

    const response = await updateLogin(savedUser.value.id_users, savedUser.value.login);
    console.log('response', response);


    const updatedUser = response.user;
    sessionStorage.setItem('user', JSON.stringify(updatedUser));
    state.value = updatedUser;
    setUser(updatedUser)
    if (response.message) {

      showMessageAlert('success', 'Login mis à jour avec succès')
      loadUserFromSession()
    }
  } catch (error) {
    showMessageAlert('error', error)
    console.error('Erreur lors de la mise à jour du login :', error);
  }
};


const updateUserEmail = async () => {
  try {
    // Assurez-vous que savedUser.value.id et emailToUpdate.value sont correctement définis
    const response = await updateEmail(savedUser.value.id, emailToUpdate.value);
    if (response.message) {
      showMessageAlert('success', 'Email mis à jour avec succès')
    }
  } catch (error) {
    showMessageAlert('error', 'Erreur lors de la mise à jour de l\'email')

    console.error('Erreur lors de la mise à jour de l\'email :', error);
  }
};


const updateUserPassword = async () => {
  try {
    // Assurez-vous que savedUser.value.id et passwordToUpdate.value sont correctement définis
    const response = await updatePassword(savedUser.value.id, passwordToUpdate.value);
    if (response.message) {
      showMessageAlert('success', 'Mot de passe mis à jour avec succès')
    }
  } catch (error) {
    showMessageAlert('error', 'Erreur lors de la mise à jour du mot de passe')
    console.error('Erreur lors de la mise à jour du mot de passe :', error);
  }
};


// const resetPassword = async () => {
//   try {
//     await resetUserPassword(resetEmail.value);
//     alert('Email de réinitialisation envoyé.');
//   } catch (error) {
//     console.error('Erreur lors de la réinitialisation du mot de passe:', error);
//   }
// };

onMounted(loadUserFromSession);

const showMessageAlert = (status: 'success' | 'error', message: string) => {
  alertRef.value?.addMessage(status, message);
};
</script>

<style lang='scss' scoped></style>