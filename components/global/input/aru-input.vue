<template>
  <div class="aruInput">
    <label :for="inputId">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    <div class="input-container">
      <input :id="inputId" :class="['input-base', borderClass, { 'input-required': required }]" :type="type" :placeholder="placeholder" v-model="inputValue" :required="required" />
      <fa v-if="icon" class="icon" :icon="icon.name" :type="icon.type" />
    </div>
    <span v-if="error" class="error">{{ error }}</span>
    <span v-else class="no-error"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  label: String,
  type: String,
  modelValue: String,
  placeholder: String,
  error: String,
  required: Boolean,
  icon: Object // { name: String, type: String }
});

const emits = defineEmits(['update:modelValue']);

const inputId = 'input-' + Math.random().toString(36).substr(2, 9);
const inputValue = ref('');


const borderClass = computed(() => props.error ? 'input-error' : 'input-default');

watch(inputValue, (newValue) => {
  emits('update:modelValue', newValue);
});

watch(() => props.modelValue, (newVal) => {
  if (newVal !== inputValue.value) {
    inputValue.value = newVal;
  }
});
</script>

<style lang="scss" scoped>
@mixin transition-effect {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

label {
  display: block;
  font-family: $font-family-dosis;
  font-size: $font-size-lg;
  margin-bottom: $spacing-xs;
  color: $secondary-color;
}

.required-indicator {
  color: $main-color;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

// Styles de base pour l'input
.input-base {
  width: 100%;
  padding: $spacing-xs;
  font-family: $font-family-roboto;
  font-size: $font-size-base;
  color: $secondary-color;
  background-color: $white-color;
  border: 1px solid $light-gray-color;
  border-radius: $spacing-xs;
  @include transition-effect;

  &:focus {
    outline: none;
    box-shadow: 0 0 8px rgba($main-color, 0.2);
  }

  &::placeholder {
    color: $secondary-color;
    opacity: 0.5;
  }
}

.input-required {
  @extend .input-base;
  &:after {
    content: '*';
    position: absolute;
    right: 10px;
    color: $danger-color;
  }
}

.icon {
  position: absolute;
  right: 10px;
  color: $secondary-color;
}

// Classes dynamiques pour les états de l'input
.input-default {
  @extend .input-base;
  &:focus {
    border-color: $main-color;
  }
}

.input-error {
  @extend .input-base;
  border-color: $danger-color;

  &:focus {
    border-color: $danger-color;
    box-shadow: 0 0 8px rgba($danger-color, 0.2);
  }
}

label:hover {
  color: $main-color;
  cursor: pointer;
}

.error {
  color: $danger-color;
  margin-top: $spacing-xs;
}

.no-error {
  ::after{
    content: '';
    height: 20px;
  }
  padding: 20px;
}
</style>
