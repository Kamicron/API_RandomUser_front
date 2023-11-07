<template>
  <div>
    <button @click="openModalPassword">Open</button>

    <ModalAruModal :is-open="isModalPasswordOpen" title="Modification de votre mot de passe" @close="closeModalPassword">
    Ceci est une modale
    </ModalAruModal>
  </div>
</template>

<script setup lang='ts'>
const isModalPasswordOpen = ref<boolean>(false)

const openModalPassword = () => {
  isModalPasswordOpen.value = true
}

const closeModalPassword = () => {
  isModalPasswordOpen.value = false
}

</script>

<style lang="scss" scoped>
div {
  background-color: $danger-color;
}
</style>
