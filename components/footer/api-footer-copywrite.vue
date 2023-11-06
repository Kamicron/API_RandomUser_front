<script setup lang='ts'>
import MarkdownIt from 'markdown-it';

const frontendVersion = ref("0.1.8");
const backendVersion = ref("0.1.9"); 

const markdownContent = ref("");
const parsedHtml = ref("");
const md = new MarkdownIt();

const goToChangelog = (version, port) => {
  const url = `http://localhost:${port}/changelog.md#v${version}`; 
  window.open(url, '_blank');
}

const response = await fetch('http://localhost:3000/changelog.md');
  const text = await response.text();
  markdownContent.value = text;
  parsedHtml.value = md.render(markdownContent.value);

  onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/changelog.md');
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
      Version Frontend: <a class="link" href="http://localhost:3000/changelog.md" target="_blank">{{ frontendVersion }}</a>
      
    </div>
    <div>
      Version Backend: <a class="link" href="http://localhost:3001/changelog.md" target="_blank">{{ backendVersion }}</a>
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
