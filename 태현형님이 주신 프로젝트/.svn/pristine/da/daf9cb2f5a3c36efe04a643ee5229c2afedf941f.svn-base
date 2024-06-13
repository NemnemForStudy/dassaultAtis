<template>
  <div class="pipeline">
    <!-- <h3>Ideas status management </h3>i18n, TO REMOVE-->
    <SwymPipelineGraph
      :status-array="statusArray"
    />

    <SwymPipelineStatus
      v-if="!readOnly"
      :status-array="statusArray"
      :min-status-to-transfer="minStatusToTransfer"
      v-on="$listeners"
    />
  </div>
</template>

<script>
//test comment
export default {
  name: 'SwymPipeline',
  props: {
    statusArray: {
      type: Array,
      required: true,
    },
    minStatusToTransfer: {
      type: String,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
