<template>
  <div class="unread-header">
    <hr>
    <div class="unread-text">
      {{ prettyDate(date) }}
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'SwymTimelineSeparatorDate',
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  methods: {
    prettyDate(date) {
      const d = new Date(date);
      const y = d.getFullYear();
      const yearNow = (new Date()).getFullYear();
      const options = (y === yearNow)
        ? { weekday: 'long', month: 'long', day: 'numeric' }
        : {
          weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
        };

      return d.toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
  .unread-header {
    width: 100%;
    display: flex;
    gap: 4px;
    align-items: center;

    .unread-text {
      color: $grey-6;
      font-size: 12px;
      font-weight: bold;
      padding: 2px 16px;
      border-radius: 10px;
      background-color: $grey-3;
    }

    hr {
      flex-grow: 1;
      margin: 0;
      border-top: solid 2px $grey-3;
    }
  }
</style>
