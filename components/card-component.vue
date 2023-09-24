<template>
  <div class="container" :key="forceUpdate">
    <div v-if="character !== undefined" class="character-card">
      <!-- <div v-if="1 !== 1 " class="character-card"> -->
      <div class="wrapper">
        <div class="card-left">
          <img
            :src="`/img/pnj/${props.character.personalInfo.ethnicity.label.toLowerCase()}/${props.character.personalInfo.gender.label.toLowerCase()}/${props.character.photo.src}.png`"
            alt="test" class="character-image" />
        </div>
        <div class="card-right">
          <div class="top-section">
            <h2>{{ character.personalInfo.firstname }} {{ character.personalInfo.lastname }}</h2>
            <div class="flex">
              <div class="row">{{ character.personalInfo.ethnicity.display_name }}</div>
              <div class="row">
                <img class="nationalityFlag" :src="`img/flags/${character.personalInfo.nationality.flag}.png`" :alt="`icon of ${character.personalInfo.nationality.flag}`"/>
                {{ character.personalInfo.nationality.display_name_fr }}
              </div>
              <div class="row">
                <fa class="icon" v-if="character.personalInfo.gender.label === 'woman'" icon="venus" type="regular" />
                <fa class="icon" v-if="character.personalInfo.gender.label === 'man'" icon="mars" type="regular" />
                <p>{{ character.personalInfo.gender.display_name }}</p>
              </div>
              <div class="row">
                <fa class="icon" :icon="currentCharacter.work.logo_work" type="regular" />
                <p>{{ character.work.displayName }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="level">
        <div class="level__value">{{ character.level }}</div>
        <div class="level__exp">{{ formatNumber(character.exp) }} / {{ formatNumber(getNextLevelXP(character.level)) }}
        </div>
      </div> -->
      </div>
      <div class="bottom-section">
        <div class="column stats">
          <!-- <PnjProgressBar :progress-bar="strength" />
        <PnjProgressBar :progress-bar="agility" />
        <PnjProgressBar :progress-bar="stealth" />
        <PnjProgressBar :progress-bar="intelligence" /> -->
        </div>
        <div class="column stats">
          <!-- <PnjProgressBar :progress-bar="charisma" />
        <PnjProgressBar :progress-bar="survival" />
        <PnjProgressBar :progress-bar="accuracy" />
        <PnjProgressBar :progress-bar="perception" /> -->
        </div>
      </div>

    </div>
    <div v-else class="loader-container">
      <loader :isLoading="character" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PnjInfo } from '@types';

// import useExperienceLevels from '@/composables/global/pnj/leveling'
// Utiliser le composable
// const { getNextLevdelXP, formatNumber } = useExperienceLevels()

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const currentCharacter = ref(props.character);

const forceUpdate = ref(0);

watch(() => props.character, async (newVal) => {
  currentCharacter.value = newVal;
  forceUpdate.value += 1;
  await nextTick();
  console.log('Logo should be updated now.');
});


// Juste pour le débogage
onMounted(() => {
  watch(() => currentCharacter.value, (newVal) => {
    if (newVal) {
      console.log('currentCharacter updated:', newVal.work.logo_work);
    }
  }, { immediate: true });
});

const loadingData = ref(false);

// Simulez le chargement de données
setTimeout(() => {
  loadingData.value = false;
}, 2000);
</script>

<style lang='scss' scoped>
h1 {
  color: #333;
}

.wrapper {
  display: flex;
  position: relative;
  font-weight: $font-weight-bold;
}

.level {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  flex-direction: column;

  &__value {
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    background-color: $main-color;
    color: $white-color;
    height: 50px;
    width: 50px;
  }

  &__exp {
    font-size: $font-size-sm;
    margin: $spacing-xxs 0;
    color: $dark-gray-color;
  }
}

.character-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}

.character-card {
  width: 400px;
  height: 200px;
  margin: 20px;
  background: $card_color_main;
  box-shadow: 0px 10px 20px -5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: 0.3s ease-in-out;
}

.character-card:hover {
  transform: translateY(-5px);
}

.card-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.character-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.card-right {
  flex: 2;
}

h2 {
  margin-bottom: 10px;
  color: #333;
}

p {
  color: #666;
  margin: 10px 0;
}

.top-section {
  max-width: 210px;
}

.bottom-section {
  display: flex;
  gap: 20px;
  padding: 0 10px;
}

.column {
  flex: 1;
}

.progress-bar {
  height: 10px;
  background-color: $light-gray-color;
  /* couleur de fond de la barre de progression complète */
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  /* permet de maintenir la bordure arrondie pour la barre de progression interne */
}

.progress-bar-inner {
  height: 100%;
  background-color: $main-color;
  /* couleur de fond de la barre de progression remplie */
  position: absolute;
  left: 0;
  top: 0;
}

.value,
h2 {
  color: $main-color;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: $spacing-xs 0;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.row {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  text-align: center;
}

.icon {
  color: $dark-gray-color;
  width: 20px;
}

.align-end {
  align-items: flex-end;
}

.add-stat {
  width: 100%;
}

.flex {
  display: flex;
  flex-direction: column;
  gap: 10px
}

.container {
  position: relative; // Position relative pour le conteneur
  width: 400px; // Ou une largeur fixe, selon votre design
  height: 200px; // Ou une hauteur fixe, selon votre design
}

.loader-container {
  width: 400px; // Ou une largeur fixe, selon votre design
  height: 200px; // Ou une hauteur fixe, selon votre design
  box-shadow: 0px 10px 20px -5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  // border: 1px solid black;
  margin: 20px;
  background-color: $card_color_main;

  // position: absolute; // Position absolue pour le loader
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
}

p {
  margin: 0;
}

.nationalityFlag {
  width: 25px;
}
</style>
