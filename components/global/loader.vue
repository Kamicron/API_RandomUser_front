<template>
  <div class="loader">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang='ts'>
// Vous pouvez ajouter des logiques spécifiques ici si nécessaire
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.spinner {
  border: 4px solid $light-gray-color;
  border-radius: 50%;
  border-top: 4px solid $main-color;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;  // Prend toute la hauteur du conteneur
  width: 100%;  // Prend toute la largeur du conteneur
}

</style>
