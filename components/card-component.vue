<!-- <template>
  <div class="card">
    <p>Prénom aléatoire : {{ firstname }}</p>
    <button @click="createRandomPNJ">Créer un PNJ aléatoire</button>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { getRandomFirstName } from '../services/apiService';
import axios from 'axios';

const firstname = ref('');

onMounted(async () => {
  firstname.value = await getRandomFirstName();
});

const createRandomPNJ = async () => {
  try {
    const response = await axios.post('/apocalypse/create-random-pnj');
    if (response.status === 200) {
      console.log('PNJ créé avec succès');
    }
  } catch (error) {
    console.error('Erreur lors de la création du PNJ', error);
  }
};

</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style> -->


<template>
  <div class="character-card">
    <div class="wrapper">
      <div class="card-left">
        <img
          :src="`/img/pnj/${props.character.personalInfo.ethnicity.label.toLowerCase()}/${props.character.personalInfo.gender.label.toLowerCase()}/${props.character.photo.src}.png`"
          alt="test" class="character-image" />
      </div>
      <div class="card-right">
        <div class="top-section">
          <h2>{{ character.personalInfo.firstname }} {{ character.personalInfo.lastname }}</h2>
          <div class="row">
            <fa class="icon" v-if="character.personalInfo.gender.label === 'woman'" icon="venus" type="regular" />
            <fa class="icon" v-if="character.personalInfo.gender.label === 'man'" icon="mars" type="regular" />

            <p>{{ character.personalInfo.gender.display_name }}</p>
          </div>
          <div class="row">
            <fa class="icon" :icon="character.work.logo_work" type="regular" />
            <p>{{ character.work.displayName }}</p>
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
</template>

<script setup lang="ts">
import type {  PnjInfo } from '@types';

// import useExperienceLevels from '@/composables/global/pnj/leveling'
// Utiliser le composable
// const { getNextLevelXP, formatNumber } = useExperienceLevels()

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

console.log('character.personalInfo.gender.displayName', props.character.personalInfo.gender.display_name
);

const maxStat = 20
// const strength = ref<progressData>({ data: props.character.strength, displayName: 'Force', maxData: maxStat })
// const agility = ref<progressData>({ data: props.character.agility, displayName: 'Agilité', maxData: maxStat })
// const stealth = ref<progressData>({ data: props.character.stealth, displayName: 'Discretion', maxData: maxStat })
// const intelligence = ref<progressData>({ data: props.character.intelligence, displayName: 'Intelligence', maxData: maxStat })
// const charisma = ref<progressData>({ data: props.character.charisma, displayName: 'Charimse', maxData: maxStat })
// const survival = ref<progressData>({ data: props.character.survival, displayName: 'Survie', maxData: maxStat })
// const accuracy = ref<progressData>({ data: props.character.accuracy, displayName: 'Précision', maxData: maxStat })
// const perception = ref<progressData>({ data: props.character.perception, displayName: 'Perception', maxData: maxStat })

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
</style>
