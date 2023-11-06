<template>
  Tu as acces a la page car tu es conecté
</template>

<script setup lang='ts'>
import auth from '../middleware/auth';

definePageMeta({
  middleware: auth
});
</script>

<style lang='scss' scoped></style>