<script setup lang='ts'>
import { ref } from 'vue';

const frontendVersion = ref("0.1.3");
const backendVersion = ref("0.1.4"); 

const goToChangelog = (version, port) => {
  const url = `http://localhost:${port}/changelog.md#v${version}`; 
  window.open(url, '_blank');
}
</script>

<template>
  <footer>
    <div>
      Tous droits réservés &copy; 2023
    </div>
    <div>
      Version Frontend: <a class="link" href="http://localhost:3000/changelog.md" target="_blank">{{ frontendVersion }}</a>
    </div>
    <div>
      Version Backend: <a class="link" href="http://localhost:3001/changelog.md" target="_blank">{{ backendVersion }}</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1em;

  font-family: $font-family-roboto;
  .link {
    font-weight: $font-weight-semibold;
    color: $main-color;
    text-decoration: none;
    &:hover {
      color: $secondary-color;
    }
  }
}
</style>
