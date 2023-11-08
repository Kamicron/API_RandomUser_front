// import { FontAwesomeIcon } from './plugins/fontawesome'
// https://nuxt.com/docs/api/configuration/nuxt-config

import myConfig from './config';

export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  runtimeConfig: {
    public: {
      ...myConfig,
    },
  },
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
                @import "@/assets/scss/title.scss";
                @import "@/assets/scss/input.scss";
                `,
            },
        },
    },
  }
  
})
