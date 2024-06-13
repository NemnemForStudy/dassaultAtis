<template>
  <div
    class="small-pipeline"
    :style="gradient"
    @click="$emit('click')"
  />
</template>

<script>
export default ({
  name: 'SwymSmallPipeline',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // Return dynamic linear gradient to have a rectangle divided by color
    // https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient#gradient_with_multi-position_color_stops
    gradient() {
      const n = this.items.length;
      let linearSlot = '';

      for (let i = 0; i < n; i += 1) {
        const { color } = this.items[i];
        const firstPercent = Math.floor((i / n) * 100);
        const secondPercent = Math.floor(((i + 1) / n) * 100);
        linearSlot += `${color} ${firstPercent}% ${secondPercent}%${i + 1 === n ? '' : ','}`;
        // e.g red 0% 33%, blue 33% 66%, green 66% 100%
      }

      const linearTemplate = `linear-gradient(to right, ${linearSlot})`;
      // e.g linear-gradient(to right, red 0% 33%, blue 33% 66%, green 66% 100%)
      return {
        background: linearTemplate,
      };
    },
  },
});
</script>

<style>
  .small-pipeline{
    width: 150px;
    height: 20px;

    border-radius: 5px;
    background-color: grey;

    cursor: pointer;
  }
</style>
