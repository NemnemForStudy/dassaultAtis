<template>
  <div>
    <SwymFeatureCreationModal
      :show="true"
      :icon-list="['leaf', '3ds-what']"
      :content-to-reuse-list="[
        {
          label: 'Idea',
          value: 'ideation'
        },
        {
          label: 'Post',
          value: 'post'
        }
      ]"
      @create="log"
    />
  </div>
</template>

<script>
export default {
  name: 'FeatureCreationModal',
  methods: {
    log(value) {
      console.log(value);
    },
  },
};
</script>

<style>

</style>
