// fichier : middleware/auth.js

export default defineNuxtRouteMiddleware((to, from) => {  // Cette fonction ne s'exécute que côté client
  if (process.client) {
    const user = sessionStorage.getItem('user');
    
    if (!user) {
      // Si aucun utilisateur n'est enregistré dans sessionStorage, redirigez vers l'accueil
      return navigateTo('/');
    }
    
    // Si un utilisateur est trouvé, rien ne se passe, la navigation continue
  }
});
