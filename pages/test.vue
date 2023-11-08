<template>
  <div class="flex">
    <h1>Titre 1</h1>
    <h2>Titre 2</h2>
    <h3>Titre 3</h3>
    <h4>Titre 4</h4>
    <h5>Titre 5</h5>
    <h6>Titre 6</h6>
    <InputAruInput label="test" required :icon="{name:'home', type:'regular'}" error="Ceci est une erreure" placeholder="ceci est un placeholder"/>
    <InputAruInput
      label="Nom d'utilisateur"
      placeholder="Entrez votre nom d'utilisateur"
      :required="true"
      :icon="{ name: 'home', type: 'regular' }"
    />
  </div>
</template>

<script setup lang='ts'>
const config = useRuntimeConfig();
console.log('API Base URL:', config.public.apiBaseUrl);
console.log('Port:', config.public.port);
</script>



<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
}
</style>
  