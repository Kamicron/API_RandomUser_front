// stores/userStore.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user', // Il est recommandé d'utiliser l'option id pour un nommage cohérent
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
  },
  actions: {
    setUser(userData) {
      this.user = userData;
    },
    logOut() {
      this.user = null;
    },
  },
});
