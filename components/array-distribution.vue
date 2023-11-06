<template>
  <div class="container">
    <div v-if="data && Object.keys(data).length > 0">
      <div v-for="(details, country) in data" :key="country">
        <h2 class="container__title">{{ details.language.fr }}</h2>
        <table class="container__table">
          <thead>
            <tr>
              <th v-for="ethnicity in details.suboriginities" :key="ethnicity.label" class="container__table-header">
                {{ ethnicity.language.fr }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td :style="{ 'background-color': calculateBackgroundColor(ethnicity.percentage) }" v-for="ethnicity in details.suboriginities" :key="ethnicity.label" class="container__table-cell">
                {{ ethnicity.percentage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="container__no-data">
      Pas de data
    </div>
  </div>
</template>


<script setup lang='ts'>
import { defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  }
});

console.log('props.data', props.data);


const calculateBackgroundColor = (percentage: number) => {
  let red, green, blue;

  if (percentage <= 10) {
    // De #f5eace à #d1f5ce
    const factor = percentage / 10;
    red = Math.round(245 + (209 - 245) * factor);
    green = Math.round(234 + (245 - 234) * factor);
    blue = Math.round(206 + (206 - 206) * factor);
  } else {
    // De #d1f5ce à #41943a
    const factor = (percentage - 10) / 90;
    red = Math.round(209 + (65 - 209) * factor);
    green = Math.round(245 + (148 - 245) * factor);
    blue = Math.round(206 + (58 - 206) * factor);
  }

  return `rgb(${red}, ${green}, ${blue})`;
};


</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  // background-color: $card_color_main;
  padding: $spacing-md 0;
  font-family: $font-family-roboto;

  &__title {
    font-family: $font-family-dosis;
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $main-color;
    margin-bottom: $spacing-md;
  }

  &__table {
    width: 100%;
    margin-bottom: $spacing-xl;
    overflow: hidden;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 5px;
    border: 1px solid $medium-gray-color;

    &-cell,
    &-header {
      border-right: 1px solid $medium-gray-color;
      border-bottom: 1px solid $medium-gray-color;

      padding: $spacing-md;
      text-align: center;
      border-radius: 0;

      &:last-child {
        border-right: 0; // Enlever la bordure droite pour le dernier élément
      }
    }

    &-header {
      background-color: $secondary-color;
      color: $white-color;
      font-weight: $font-weight-semibold;
    }

    &-cell {
      background-color: $white-color;
      color: $black-color;
    }

    // thead tr:first-child th:first-child {
    //   border-top-left-radius: 5px;
    //   border-left: 1px solid $medium-gray-color; // Ajouter une bordure gauche
    //   border-top: 1px solid $medium-gray-color; // Ajouter une bordure en haut
    // }

    // thead tr:first-child th:last-child {
    //   border-top-right-radius: 5px;
    //   border-top: 1px solid $medium-gray-color; // Ajouter une bordure en haut
    // }

    // tbody tr:last-child td:first-child {
    //   border-bottom-left-radius: 5px;
    //   border-left: 1px solid $medium-gray-color; // Ajouter une bordure gauche
    // }

    // tbody tr:last-child td:last-child {
    //   border-bottom-right-radius: 5px;
    // }

    // // Enlever la bordure du bas pour la dernière ligne pour éviter un double bord
    // tbody tr:last-child td {
    //   border-bottom: 0;
    // }
  }

  &__no-data {
    color: $danger-color;
    font-size: $font-size-lg;
    margin-top: $spacing-lg;
  }

}
</style>
