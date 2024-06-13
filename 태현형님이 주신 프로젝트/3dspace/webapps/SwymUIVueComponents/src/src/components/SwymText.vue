<template>
  <span v-if="displayText">{{ displayText }}</span>
</template>

<script>
export default {
  name: 'SwymText',
  props: {
    displayText: {
      type: String,
      default: '',
    },
  },
};
</script>
