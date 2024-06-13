<template>
  <div
    ref="pipeline-graph"
    class="pipeline-graph"
    :style="{'clip-path': `path('${pathDynamique}')`}"
  >
    <div
      v-for="status, index in statusArray"
      :key="index"
      :class="`pipeline-subpart subpart-${index}`"
      :style="{
        'background-color': status.color
      }"
    >
      <span />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwymPipelineGraph',
  props: {
    statusArray: {
      type: Array,
      required: true,
    },
  },

  watch: {
    statusArray: {
      deep: true,
      handler() {
        this.pathDynamique();
      },
    },
  },
  created() {
    this.$nextTick(function () { this.pathDynamique(); });
    window.addEventListener('resize', () => this.pathDynamique());
  },
  methods: {

    /**
     * Curve drawing for Pipeline
     */
    pathDynamique() {
      // TODO change parameters to have the exact curve with the old Pipeline
      if (!this.$refs['pipeline-graph']) {
        return;
      }
      const width = this.$refs['pipeline-graph'].offsetWidth;
      const height = this.$refs['pipeline-graph'].offsetHeight;
      const gap = 30;

      // Usage of clip-path and the function path -> https://developer.mozilla.org/fr/docs/Web/CSS/clip-path
      const path = `M 0 0 C 0 0 ${width / 2} ${gap} ${width} ${gap} L ${width} ${height - gap} C ${width} ${height - gap} ${width / 2} ${height - gap} 0 ${height}`;

      this.$refs['pipeline-graph'].style = `clip-path: path('${path}')`;
    },
  },
};
</script>

<style lang="scss" scoped>
.pipeline-graph{
    //background-color: lightgrey;

    height: 140px;
    margin-bottom: 20px;

    display: flex;

    .pipeline-subpart{
      flex-grow: 1;
    }
}
</style>
