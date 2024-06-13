<template>
  <vu-modal
    :show="show"
    :title="title"
    :ok-label="okButtonText"
    @confirm="destroy"
    @close="destroy"
  >
    <template #modal-body>
      <div class="share-url-input">
        <vu-input
          ref="rss-url-form-control"
          class="left-text"
          :value="rssUrl"
        />

        <vu-btn
          class="right-button default"
          @click="copyLink"
        >
          {{ copyLinkButtonText }}
        </vu-btn>
      </div>
    </template>
  </vu-modal>
</template>

<script>

export default {
  name: 'SwymRssFeedModal',
  props: {
    rssUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    copyLinkButtonText: {
      type: String,
      required: true,
    },
    okButtonText: {
      type: String,
      required: true,
    },
    alertMessage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    /**
         * Put RSS Feed link into the clipboard
         */
    async copyLink() {
      const input = this.$refs['rss-url-form-control'].$el.getElementsByTagName('input')[0];

      input.focus();
      input.select();

      try {
        await navigator.clipboard.writeText(input.value); // Write the input value in the clipboard

        this.$message({
          text: this.alertMessage,
          timeout: 5000,
          color: 'success',
        });
      } catch (err) {
        throw new Error('Problem with the clipboard');
      }
    },

    destroy() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el); // Remove the component from the DOM
    },
  },
};
</script>

<style lang="scss" scoped>
.share-url-input{
    display: flex;
    margin-top: 20px;

    .left-text{
        display: inline-block;
        width: 80%;
    }

    .left-text::v-deep input{
        background-color: #f4f5f6;
        margin: 0px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-right: 0px;
    }
    .right-button {
        display: inline-block;
        width: 20%;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }
}

</style>

<style>
.alert-root{
    z-index: 2000;
}
</style>
