<template>
  <nav class="menu">
    <ul class="menu__list">
      <li class="menu__item"><RouterLink class="menu__link" to="/">Accueil</RouterLink></li>
      <li class="menu__item"><RouterLink class="menu__link" to="/test">Test</RouterLink></li>
      <li class="menu__item"><RouterLink class="menu__link" to="/profil">Mon compte</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup lang='ts'>
  // Logique TypeScript si nécessaire
</script>

<style lang='scss' scoped>
  .menu {
    background-color: $card_color_main;
    padding: $spacing-sm $spacing-md;
    box-shadow: 0 2px 4px $medium-gray-color;
    margin-bottom: $spacing-xxl;
  }

  .menu__list {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .menu__item {
    margin-right: $spacing-lg;

    &:last-child {
      margin-right: 0;
    }
  }

  .menu__link {
    text-decoration: none;
    color: $main-color;
    font-family: $font-family-roboto;
    font-size: $font-size-lg;
    transition: color 0.3s ease;

    &:hover {
      color: $secondary-color;
    }
  }
</style>
