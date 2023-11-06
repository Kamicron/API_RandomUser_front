<template>
  <div class="icon">
    <i class="icon" :class="`${iconString} ${props.button ? 'button-class' : ''}`" />
  </div>
</template>

<script setup lang='ts'>
const props = defineProps({
  type: {
    type: String,
    default: "solid",
  },
  icon: {
    type: String,
    default: "",
    required: true,
  },
  button: {
    type: Boolean,
    default: false
  }
});

const iconString = `fa-${props.type} fa-${props.icon}`
console.log("iconString",iconString);

</script>

<style lang='scss' scoped>
.button-class {
  color: $succes-color;
  &:hover {
    color: $main-color
  }
}
</style>
