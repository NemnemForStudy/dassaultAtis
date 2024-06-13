<template>
  <div class="wrapper">
    <SwymTypeSelector
      v-model="featureSelected"
      :items="list"
      class="type-selector"
    />
    {{ featureSelected }}
  </div>
</template>

<script>
const listJ = [
  {
    label: 'Post',
    value: 'post',
  },
  {
    label: 'Question',
    value: 'question',
  },
  {
    label: 'RedIdea',
    value: 'redIdea',
    icon: 'doc',
    color: '#fcd703',
  },
];
export default {
  name: 'TypeSelector',
  data() {
    return {
      list: listJ,
      featureSelected: listJ[0],
    };
  },
};
</script>

<style lang="scss" scoped>
  .type-selector{
    position: absolute;
    top: 500px;
  }

</style>
