<template>
  <div class="message-action">
    <span class="fonticon fonticon-comment" />
    <span v-html="actionHTML()" />
  </div>
</template>

<script>
export default {
  name: 'SwymTimelineAction',
  props: {
    type: {
      type: String,
      default: 'Comment',
    },
    content: {
      type: Object,
      default: () => ({}),
    },
    baseUrl: {
      type: String,
      default: '',
    },
  },
  methods: {
    actionHTML() {
      switch (this.type) {
        case 'Comment':
          return this.$i18n('timelineActionComment', {
            content_type: this.$i18n('media'),
            content_title: this.content.subject_title,
            content_href: `#${this.baseUrl}/${this.content.subject_model.toLowerCase()}:${this.content.subject_id}`,
          });
        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  /* eslint-disable vue-scoped-css/require-selector-used-inside,
                    vue-scoped-css/no-unused-selector */

  @import "../../styles/variables";
  .message-action {
    font-size: 13px;

    &::v-deep .btn {
      padding: 0;
      min-width: unset;
    }
  }
</style>
