// import { FontAwesomeIcon } from './plugins/fontawesome'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  plugins: [
    '~/plugins/fontawesome.js',
  ],
  css: [
    '~/assets/normalize.css',
  ],
  vite: {
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @import "@/assets/scss/variables/colors.scss";
                @import "@/assets/scss/variables/spacing.scss";
                @import "@/assets/scss/variables/typographie.scss";
                @import "@/assets/scss/variables/font.scss";
                @import "@/assets/scss/button.scss";
                `,
            },
        },
    },
  }
  
})
