// stores/useGlobalStore.js
import { reactive } from 'vue';

export const useGlobalStore = () => {
  const state = reactive({
    user: null,
  });

  const setUser = (newUser) => {
    state.user = newUser;
  };

  return { state, setUser };
};
