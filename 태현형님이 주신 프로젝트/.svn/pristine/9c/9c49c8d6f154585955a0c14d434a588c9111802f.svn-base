<template>
  <div class="community-tags-header" v-if="tags.length">
    <vu-icon v-if="showCommunityIcon" icon="users-alt" class="community-tags-icon" v-tooltip.body="NLS.CommunityTags" />
    <div ref="wrapper" class="community-tags-wrapper" :class="open ? 'opened' : 'closed'">
      <div class="community-tags-container" is="transition-group" name="slide">
        <SwymCommunityTag v-for="tag in tags" :key="tag.object_db" :tag="tag" @tagSelected="tagToggled" />
      </div>
      <div class="see-more-tags opened" @click="expandList(false)" v-if="!externalSeeMore && showSeeMore && open">
        <span>
          <vu-icon v-if="!hideExpander" icon="expand-up" class="expander" />{{ NLS.ViewLess }}
        </span>
      </div>
    </div>
    <div class="see-more-tags closed" @click="expandList(true)" v-if="!externalSeeMore && showSeeMore && !open">
      <span>
        <vu-icon v-if="!hideExpander" icon="expand-right" class="expander" />{{ NLS.ViewMore }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwymCommunityTagsHeader',
  props: {
    tags: {
      type: Array,
      required: true,
    },
    NLS: {
      type: Object,
      default: () => ({}),
    },
    externalSeeMore: {
      type: Boolean,
      default: false,
    },
    showCommunityIcon: {
      type: Boolean,
      default: true,
    },
    openByDefault: {
      type: Boolean,
      default: false,
    },
    hideExpander: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      open: this.openByDefault || false,
      showSeeMore: false,
    }
  },
  mounted() {
    this.recheckSeeMore();
  },
  methods: {
    tagToggled(tag) {
      this.$emit('tagToggled', tag);
    },
    expandList(val) {
      if (val == undefined) {
        this.open = !this.open;
        this.$emit('listExpanded', this.open);
        return;
      }
      this.open = val;
      this.$emit('listExpanded', val);
    },
    recheckSeeMore() {
      this.$nextTick(() => {
        setTimeout(() => {
          // We don't know when all child components will render. So adding a setTimeout
          const wrapper = this.$refs.wrapper;
          this.showSeeMore = wrapper ? wrapper.scrollHeight >= 30 : false;
          if (this.externalSeeMore) {
            this.$emit('seeMoreStatusUpdated', this.showSeeMore);
          }
        }, 100);
      });
    }
  },
  watch: {
    tags(newVal, oldVal) {
      this.recheckSeeMore();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.community-tags-header {
  // position: relative;
  display: flex;
}

.community-tags-header .community-tags-icon {
  position: relative;
  line-height: 24px;
}

@media (min-width: 799px) {
  .community-tags-header .community-tags-icon {
    margin-left: calc(3% - 10px);
    margin-right: calc(1.5% - 5px);
  }

  .community-tags-header {
    padding-right: calc(3% - 10px);
  }
}

@media (min-width: 1139px) {
  .community-tags-header .community-tags-icon {
    margin-left: calc(5% - 10px);
    margin-right: calc(2.5% - 5px);
  }

  .community-tags-header {
    padding-right: calc(5% - 10px);
  }
}

.community-tags-wrapper {
  height: 25px;
  overflow: hidden;
  transition: height 0.5s ease-in-out;
  flex: 1;

  &.opened {
    height: auto;
    transition: height 0.5s ease-in-out;
  }
}

.community-tags-container {
  flex: 1;
}

.see-more-tags {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.see-more-tags span {
  padding: 0 5px;
  line-height: 25px;
  cursor: pointer;
  color: $grey-7;
  font-size: 13px;

  .expander {
    font-size: 8px;
    text-align: left;
    color: $grey-6;
    padding: 0;
  }

  &:hover .expander {
    color: $grey-7;
  }
}

.see-more-tags.opened {
  align-items: flex-end;
}

// Transition specific styling
.slide-move {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>