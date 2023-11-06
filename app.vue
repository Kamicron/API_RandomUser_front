<template>
  <div class="layout">
    <header>
      <HeaderMenu />
      <HeaderAuthentification />
    </header>
    <NuxtPage />
  </div>
  <FooterApiFooter />
</template>

<script lang="ts" setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-regular-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser)



useHead(() => ({
  link: [
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css' },
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-solid.css' },
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-regular.css' },
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-light.css' },
  ]
}))

</script>

<style lang='scss' scoped>
.layout {
  // height: 85vh;
  max-width: 1200px;
  margin: auto;
}
</style>
