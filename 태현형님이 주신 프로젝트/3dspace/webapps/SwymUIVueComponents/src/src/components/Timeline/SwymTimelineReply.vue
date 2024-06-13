<template>
  <div class="replied-message">
    <span class="replied-message-content">
      <span class="fonticon fonticon-chat-alt" />
      <a
        :href="`#people:${author.login}/activities`"
        class="btn btn-link"
      >{{ author.firstName }} {{ author.lastName }}</a>
      <span class="semi-colon">:</span>
      <span
        class="ellipsis-text"
        v-html="text"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: 'SwymTimelineReply',
  props: {
    author: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  /* eslint-disable vue-scoped-css/require-selector-used-inside,
                    vue-scoped-css/no-unused-selector */

  @import "../../styles/variables";
  .replied-message {
    width: 100%;
    border-top-left-radius: 5px;
    padding: 5px;
    background-color: $grey-1;
    max-height: 30px;
    min-height: 30px;
    white-space: nowrap;
    overflow: hidden;

    .replied-message-content {
      display: flex;
      width: 100%;

      .fonticon-chat-alt {
        margin: 0 5px;
        color: $grey-6;
        font-size: 12px;
        margin-top: 2px;
      }

      a.btn-link {
        font-weight: normal;
        font-size: 14px;
        padding: 0;
        flex-grow: 1;
        min-width: fit-content;
        max-width: fit-content;
      }

      .semi-colon {
        margin-right: 5px;
      }

      .ellipsis-text {
        img {
          display: none;
        }

        max-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;

        &::v-deep >* {
          display: inline;
        }
      }
    }

    &::v-deep p {
      margin: 0; //override UIKIT CSS
    }
  }
</style>
