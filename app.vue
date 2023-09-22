<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>

useHead(() => ({
  link: [
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css' },
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-solid.css' },
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-regular.css' },
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-light.css' }
  ]
}))

</script>
