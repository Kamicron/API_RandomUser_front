<template>
  <div class="stat-card">
    <div class="stat-title">{{ title }}</div>
    <p class="stat-value">{{ formattedValue }}</p>
  </div>
</template>

<script setup lang='ts'>
import { ref, defineProps } from 'vue';

const { title, value } = defineProps(['title', 'value']);

const formattedValue = ref(value.toLocaleString('fr-FR'));
</script>

<style lang='scss' scoped>
.stat-card {
  background: $card_color_main;
  border-radius: $spacing-xxs;
  width: 100%;
}

.stat-title {
  background-color: $black-color;
  padding: $spacing-md;
  border-radius: $spacing-xxs $spacing-xxs 0 0 ;

  font-size: $font-size-xl;
  font-family: $font-family-roboto;
  font-weight: $font-weight-medium;
  color: $medium-gray-color;
  margin-bottom: $spacing-sm;
}

.stat-value {
  font-size: $font-size-2xl;
  font-family: $font-family-dosis;
  color: $main-color;
  font-weight: $font-weight-medium;

}
</style>
