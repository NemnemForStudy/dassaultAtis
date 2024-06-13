<template>
  <div>
    <SwymPipeline
      v-model="status"
      :min-status-to-transfer="minStatusToTransfer"
    />

    <vu-btn
      color="primary"
      @click="log"
    >
      Log
    </vu-btn>
  </div>
</template>

<script>
export default {
  name: 'Pipeline',
  data() {
    return {
      status: [
        {
          label: 'New Idea',
          value: 'newIdea',
          color: '#F3ACCA',
        },
        {
          label: 'Concept',
          value: 'concept',
          color: '#FBE7CD',
        },
        {
          label: 'Project Plan',
          value: 'projectPlan',
          color: '#F6BDC4',
        },
      ],
      minStatusToTransfer: 'projectPlan',
    };
  },

  methods: {
    log() {
      console.log(this.status);
    },
  },
};
</script>

<style>

</style>
