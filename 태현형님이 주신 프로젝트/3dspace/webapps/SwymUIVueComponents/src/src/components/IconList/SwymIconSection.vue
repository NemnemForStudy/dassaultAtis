<template>
  <div class="icon-section">
    <h6>{{ title }}</h6>

    <div>
      <vu-icon-btn
        v-for="icon, index in icons"
        :key="index"
        :icon="`${icon}`"
        @click="() => $emit('click', `${icon}`)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwymIconSection',
  props: {
    title: {
      type: String,
      required: true,
    },
    icons: {
      type: Array,
      required: true,
    },
  },
  created() {
  },
};
</script>

<style lang="scss">
@import "../../styles/variables";

  .icon-section{
    .fonticon{
      font-size: 24px;
    }

    h6{
      font-weight: normal;
      color: $grey-6;
    }
  }
</style>
