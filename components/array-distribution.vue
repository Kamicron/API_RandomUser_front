<template>
  <div class="container">
    <div v-if="data && Object.keys(data).length > 0">
      <div v-for="(details, country) in data" :key="country">
        <h2 class="container__title">{{ details.language.display_name_fr }}</h2>
        <table class="container__table">
          <thead>
            <tr>
              <th v-for="ethnicity in details.ethnicities" :key="ethnicity.label" class="container__table-header">
                {{ ethnicity.language.display_name_fr }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="ethnicity in details.ethnicities" :key="ethnicity.label" class="container__table-cell">
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
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  // background-color: $card_color_main;
  padding: $spacing-md;
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
    border-collapse: collapse;
    margin-bottom: $spacing-xl;

    &-cell,
    &-header {
      padding: $spacing-md;
      border: 1px solid $medium-gray-color;
      text-align: center;
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
  }

  &__no-data {
    color: $danger-color;
    font-size: $font-size-lg;
    margin-top: $spacing-lg;
  }

}
</style>
