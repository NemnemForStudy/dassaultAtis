<template>
  <div class="community-contributions-list">
    <vu-scroller
      :infinite="infinite"
      :loading-text="NLS.Loading"
      @loading="onLoadingStart"
      ref="scroller"
    >
      <div class="contribution-list-body">
        <vu-lazy
          v-for="(item, index) in contributions"
          :key="item.mid"
          height="60px"
        >
          <SwymContributionItem
            :icon="item.icon"
            :color="item.color"
            :title="item.title"
            :contentType="item.contentType"
            :mid="item.mid"
            :isDraft="item.isDraft"
            :publishDate="item.publishDate"
            :relPath="item.relPath"
            :activated="item.activated"
            :isValidatedQuestion="item.isValidatedQuestion"
            @editItem="editContribution"
            @deleteItem="deleteContribution"
            @goToItem="goToContribution"
            @dragItem="dragContribution"
            :i18nKeys="i18nKeys"
            :NLS="NLS"
            :isLastItem="index === contributions.length - 1"
          />
        </vu-lazy>
      </div>
      <template v-if="!infinite && !contributions.length">
        <div class="no-results">
          <div class="no-results-icon">
            <span class="fonticon fonticon-5x fonticon-feather"></span>
          </div>
          <div class="no-results-text">{{ NLS.NoContent }}</div>
          <vu-btn
            class="no-results-button"
            color="link"
            @click="startContentCreation"
          >
            {{ NLS.StartNow }}
          </vu-btn>
        </div>
      </template>
    </vu-scroller>
  </div>
</template>

<script>
export default {
  name: "SwymContributionsList",
  props: {
    contributions: {
      type: Array,
      default: () => [],
    },
    i18nKeys: {
      type: Object,
      default: () => ({}),
    },
    NLS: {
      type: Object,
      default: () => ({}),
    },
    infinite: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    editContribution(mid) {
      this.$emit("editContribution", mid);
    },
    deleteContribution(mid) {
      this.$emit("deleteContribution", mid);
    },
    goToContribution(mid) {
      this.$emit("goToContribution", mid);
    },
    onLoadingStart() {
      this.$emit("onScrollerLoad");
    },
    onLoadingEnd() {
      this.$refs.scroller.stopLoading();
    },
    startContentCreation() {
      this.$emit("startContentCreation");
    },
    dragContribution(options) {
      this.$emit("dragContribution", options);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.community-contributions-list {
  width: 100%;
  background-color: #fff;
}

.no-results {
  margin: 10% 0;
  text-align: center;
}
</style>
