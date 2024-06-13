<template>
  <div :class="['content', type, { first }]">
    <slot />
    <div
      class="comment"
      v-html="text"
    />
  </div>
</template>

<script>
export default {
  name: 'SwymTimelineMessageBody',
  props: {
    type: {
      type: String,
      default: '',
      validate: (v) => (['post', 'media', 'idea', 'question'].includes(v)),
    },
    first: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  /* eslint-disable vue-scoped-css/require-selector-used-inside,
                    vue-scoped-css/no-unused-selector */

  @import "../../styles/variables";
  @import "../../styles/typecolors";

  .content {
    border-radius: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 10px;
    padding-left: 7px;
    background-color: white;
    position: relative;
    display: grid;
    gap: 5px;
    border-left: solid 3px white;

    @each $name, $color in $colors {
      &.#{$name} {
        border-color: $color;
      }
    }

    &.first:after {
      content: "";
      position: absolute;
      border-width: 14px 0 0 14px;
      border-style: solid;
      border-color: white transparent;
      display: block;
      left: -8px;
      top: 0;
    }

    &::v-deep p {
      margin: 0;
    }
  }
</style>
