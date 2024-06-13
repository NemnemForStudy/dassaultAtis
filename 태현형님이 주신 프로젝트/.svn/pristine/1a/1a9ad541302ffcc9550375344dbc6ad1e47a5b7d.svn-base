<template>
  <span class="community-tag"
    :class="{ editable, closable: editable, 'selected': tag.selected, 'readonly': tag.readonly }" @click="tagSelected">
    <span class="fonticon icon" :class="`fonticon-${icon}`" :title="tag.label"></span>
    <span class="content">{{ tag.label }}</span>
    <span v-if="editable" class="fonticon fonticon-cancel close-btn" @click="tagClosed"></span>
  </span>
</template>

<script>
export default {
  name: 'SwymCommunityTag',
  props: {
    tag: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    tagSelected() {
      if (!this.editable) {
        this.$emit('tagSelected', this.tag);
      }
    },
    tagClosed() {
      this.$emit('tagClosed', this.tag);
    }
  },
  computed: {
    icon() {
      const sixw = this.tag.sixw_db || this.tag.sixw;
      return sixw.replace('ds6w:', '3ds-');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";
$line-height-custom: 21px;

.community-tag {
  display: inline-flex;
  vertical-align: baseline;
  margin: 1px 4px 1px 0;
  cursor: pointer;
  max-width: calc(100% - 2px);
  line-height: $line-height-custom;
  border-radius: $line-height-custom;
  padding-left: 5px;

  &.editable {
    cursor: default;
    color: $grey-6;
    background: $grey-1;
    border: 1px solid $grey-3;
    margin-bottom: 4px;
  }

  &:not(.editable) {
    color: $blue-3;
  }

  &.selected {
    background: $blue-3;
    color: #fff;
  }

  &:hover:not(.editable):not(.selected):not(.readonly) {
    color: $blue-3;
    background: $grey-4;
  }

  &.readonly {
    font-size: 15px;
  }

  &.readonly:hover {
    color: $blue-3;
    text-decoration: underline;

    .content {
      text-decoration: underline;
    }
  }

  .icon {
    vertical-align: middle;
    width: 15px;
    margin: 0;
    line-height: $line-height-custom;

    &.fonticon-3ds-how,
    &.fonticon-3ds-what,
    &.fonticon-3ds-when {
      margin-right: 0.2em;
    }
  }

  &.closable .icon {
    padding-bottom: 2px;
  }

  .content {
    vertical-align: middle;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    word-wrap: break-word;
    white-space: nowrap;
    line-height: $line-height-custom;
    padding-right: 7px;
  }

  &.closable .content {
    padding: 0 5px 2px 5px;
  }

  .close-btn {
    cursor: pointer;
    line-height: $line-height-custom;
    margin: 0;
    padding: 0;
    width: 25px;
    height: 22px;
    padding-top: 1px;
  }
}
</style>
