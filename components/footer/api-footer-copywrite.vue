<script setup lang='ts'>
import MarkdownIt from 'markdown-it';
const config = useRuntimeConfig();

const frontendVersion = ref("0.2.1");
const backendVersion = ref("0.2.0"); 

const markdownContent = ref("");
const parsedHtml = ref("");
const md = new MarkdownIt();

const response = await fetch(`http://${config.public.frontBaseUrl}:${config.public.frontPort}/changelog.md`);
  const text = await response.text();
  markdownContent.value = text;
  parsedHtml.value = md.render(markdownContent.value);

  onMounted(async () => {
  try {
    const response = await fetch(`http://${config.public.backBaseUrl}:${config.public.backPort}/changelog.md`);
    const text = await response.text();
    markdownContent.value = text;
    parsedHtml.value = md.render(markdownContent.value);
  } catch (error) {
    console.error("Erreur lors de la récupération du Markdown:", error);
  }
});
</script>

<template>
  <footer>
    <div>
      Tous droits réservés &copy; 2023
    </div>

    <!-- <div v-html="parsedHtml"></div> -->
    <div>
      Version Frontend: <a class="link" :href="`http://${config.public.frontBaseUrl}:${config.public.frontPort}/changelog.md`" target="_blank">{{ frontendVersion }}</a>
      
    </div>
    <div>
      Version Backend: <a class="link" :href="`http://${config.public.backBaseUrl}:${config.public.backPort}/changelog.md`" target="_blank">{{ backendVersion }}</a>
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
