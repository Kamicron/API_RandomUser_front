<script setup lang='ts'>
import { ref } from 'vue';

const frontendVersion = ref("0.1.3");
const backendVersion = ref("0.1.4"); 
</script>

<template>
  <footer>
    <div>
      Tous droits réservés &copy; 2023
    </div>
    <div>
      Version Frontend: {{ frontendVersion }}
    </div>
    <div>
      Version Backend: {{ backendVersion }}
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1em;
  }
</style>
