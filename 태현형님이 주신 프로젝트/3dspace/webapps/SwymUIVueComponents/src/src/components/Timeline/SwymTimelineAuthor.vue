<template>
  <div>
    <a
      :href="`#people:${author.login}/activities`"
      class="btn btn-link"
    >{{ author.firstName }} {{ author.lastName }}</a>
    <span class="message-date">
      {{ date.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}) }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'SwymTimelineAuthor',
  props: {
    author: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  /* eslint-disable vue-scoped-css/require-selector-used-inside,
                    vue-scoped-css/no-unused-selector */

  @import "../../styles/variables";
  .btn {
    padding: 0;
  }
</style>
