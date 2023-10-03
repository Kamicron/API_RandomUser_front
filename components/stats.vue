<template>
  <div class="stats-container">
    <p class="main-title">
      Cette API peut créer <span class="highlighted-value">{{ formattedMaxPnj }}</span> PNJ différents
    </p>

    <div class="stats-grid">
      <stats-cards v-if="stats.firstname" title="Prénoms" :value="formattedFirstname" />
      <stats-cards v-if="stats.lastname" title="Noms" :value="formattedLastname" />
      <stats-cards v-if="stats.gender" title="Genres" :value="formattedGender" />
    </div>

    <div class="stats-grid">
      <stats-cards v-if="stats.origin" title="Nationalités" :value="formattedOrigin" />
      <stats-cards v-if="stats.suborigin" title="Ethnies" :value="formattedsuborigin" />
      <stats-cards v-if="stats.photo" title="Photos par ethnies" :value="formattedPhoto" />

    </div>

  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, computed } from 'vue';
import { getStats } from '../services/apiService';

const stats = ref({
  gender: 0,
  suborigin: 0,
  origin: 0,
  maxPnj: 0,
  firstname:0,
  lastname: 0,
  photo: 0,  
});

onMounted(async () => {
  const data = await getStats();
  stats.value = data;
});

console.log('stats', stats);


const formattedMaxPnj = computed(() => stats.value ? stats.value.maxPnj.toLocaleString('fr-FR') : 0);

const formattedGender = computed(() => stats.value ? stats.value.gender.toLocaleString('fr-FR') : 0);
const formattedOrigin = computed(() => stats.value ? stats.value.origin.toLocaleString('fr-FR') : 0);
const formattedsuborigin = computed(() => stats.value ? stats.value.suborigin.toLocaleString('fr-FR') : 0);

const formattedFirstname = computed(() => stats.value ? stats.value.firstname.toLocaleString('fr-FR') : 0);
const formattedLastname = computed(() => stats.value ? stats.value.lastname.toLocaleString('fr-FR') : 0);
const formattedPhoto = computed(() => stats.value ? stats.value.photo.toLocaleString('fr-FR') : 0);

console.log(formattedPhoto);

</script>

<style lang='scss' scoped>
.stats-container {
  text-align: center;
  padding: $spacing-lg;
}

.main-title {
  font-size: $font-size-3xl;
  font-family: $font-family-dosis;
  color: $dark-gray-color;
  margin-bottom: $spacing-sm;
}

.highlighted-value {
  font-size: $font-size-4xl;
  color: $main-color;
  font-family: $font-family-dosis;
  margin: 0;
}

.stats-grid {
  display: flex;
  justify-content: space-around;
  gap: $spacing-xl;
  margin-top: $spacing-xl;
}

.stat-value {
  font-size: $font-size-2xl;
  font-family: $font-family-dosis;
  color: $main-color;
}
</style>