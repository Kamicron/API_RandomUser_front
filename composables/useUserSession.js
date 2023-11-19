// composables/useUserSession.js
import { ref } from 'vue';

export function useUserSession() {
    const savedUser = ref({ login: '', email: '', password: '' });

    // Dans useUserSession composable
    const loadUserFromSession = () => {
        if (typeof window !== 'undefined') {
            const userSession = sessionStorage.getItem('user');
            if (userSession) {
                savedUser.value = JSON.parse(userSession);
            } else {
                savedUser.value = { login: '', email: '', password: '' }; // S'assurer de la réinitialisation
            }
        }
    };


    return { savedUser, loadUserFromSession };
}
