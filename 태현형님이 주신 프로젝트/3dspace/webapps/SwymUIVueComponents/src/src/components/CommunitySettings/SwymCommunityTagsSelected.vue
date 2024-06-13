<template>
  <div class="community-tags-selected">
    <h6>{{ NLS.SelectedTags }}</h6>
    <div class="community-tags-area" is="transition-group" name="fade">
      <SwymCommunityTag v-for="tag in tags" :key="tag.object" :tag="tag" :editable="true" @tagSelected="tagSelected"
        @tagClosed="tagClosed" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwymCommunityTagsSelected',
  props: {
    NLS: {
      type: Object,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    }
  },
  methods: {
    tagSelected(tag) {
      this.$emit('tagSelected', tag);
    },
    tagClosed(tag) {
      this.$emit('tagClosed', tag);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.community-tags-area {
  border: 1px solid $grey-5;
  border-radius: 4px;
  padding: 10px;
  min-height: 100px;
}

// Transition specific styling
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>