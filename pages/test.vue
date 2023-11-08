<template>
  <div>
test
  </div>
</template>

<script setup lang='ts'>
const config = useRuntimeConfig();
console.log('API Base URL:', config.public.apiBaseUrl);
console.log('Port:', config.public.port);
</script>



<style lang="scss" scoped>
div {
  background-color: $danger-color;
}
</style>
  