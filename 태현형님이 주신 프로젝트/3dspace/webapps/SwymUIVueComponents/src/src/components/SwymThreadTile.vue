<template>
  <div
    :class="['thread-view my-communities draggable-community community-item-view-container',
             { 'menu-is-open': isDMenuOpen, selected }]"
    @click="$emit('click')"
  >
    <div class="media-thumbnail-view-container">
      <img
        v-if="!image.includes('fonticon')"
        :src="image"
      >
      <span
        v-else
        :class="[image, 'fonticon fonticon-2x']"
      />
    </div>
    <div class="info-section">
      <div class="title">
        {{ name }}
        <div class="ellipsis">
          ...
        </div>
      </div>
    </div>
    <div 
      v-if="unread || dropdownOptions.length"
      class="tile-action-menu">
      <span
        v-if="unread"
        class="fonticon fonticon-record"
      />
      <vu-dropdownmenu
        v-if="dropdownOptions.length > 1"
        :items="dropdownOptions"
        @close="isDMenuOpen = false"
        @click.native.stop="isDMenuOpen = true"
      >
        <span class="fonticon fonticon-clickable fonticon-chevron-down chevron-menu-icon" />
      </vu-dropdownmenu>
      <span
        v-else-if="dropdownOptions.length === 1"
        :class="`fonticon fonticon-clickable fonticon-${dropdownOptions[0].fonticon}`"
        @click.stop="dropdownOptions[0].handler(dropdownOptions[0])"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SwymThreadTile',
  props: {
    image: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    unread: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    dropdownOptions: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    console: window.console,
    isDMenuOpen: false,
  }),
};
</script>
<style lang="scss"
  scoped>
  @import "../styles/variables";

  .thread-view {
    padding: 10px 0 10px 20px;
    transition: box-shadow .2s ease-in-out, background-color .2s ease-in-out, color .2s ease-in-out;
    display: flex;
    height: 60px;
    align-items: center;
    cursor: pointer;
    flex-wrap: wrap;
    width: 100%;
    background-color: white;

    & .ellipsis {
      background-color: white; //adding explicit color for ellipsis, the transition is a bit weird now, a better solution is needed
    }

    &:not(.selected) {
      &:hover {
        background-color: $grey-0;
        color: $grey-7;

        & .ellipsis {
          background-color: $grey-0; //adding explicit color for ellipsis, the transition is a bit weird now, a better solution is needed
        }
      }
    }

    &.selected:not(.dragged) {
      margin: 0;
      background-color: $blue-3;

      & .ellipsis {
        background-color: $blue-3; //adding explicit color for ellipsis, the transition is a bit weird now, a better solution is needed
      }

      color: white;
      cursor: default;
      
      .media-thumbnail-view-container .fonticon {
        color: white;
      }
    }

    .media-thumbnail-view-container {
      display: inline-block;
      vertical-align: top;
      width: 50px;
      height: 40px;
      text-align: center;

      .fonticon {
        color: $grey-5;
        font-size: 24px;
        margin: 0;
        width: 100%;
        line-height: 40px;
      }

      img {
        max-height: 100% !important;
        max-width: 100% !important;
      }
    }

    .info-section {
      $line-height: 1.2em;
      $visible-line: 2;

      flex: 1 0 auto;
      max-height: $line-height * $visible-line;
      line-height: $line-height;
      padding-left: 10px;
      padding-right: 10px;
      width: calc(100% - 90px);
      overflow: hidden;
      white-space: normal;
      //background-color: inherit; //background color is not inherited, and transparent by default, so doesn't seem useful here

      .title {
        word-break: break-all;
        position: relative;
        display: block;
        max-height: $line-height * ($visible-line + 1);
        //background-color: inherit; //background color is not inherited, and transparent by default, so doesn't seem useful here

        .ellipsis {
          position: absolute;
          right: 0;
          top: calc($line-height * ($visible-line * 2) - 100%);
          text-align: left;
          padding-left: 5px;
          //background-color: inherit; //background color is not inherited, and transparent by default, so doesn't seem useful here
        }
      }
    }

    .tile-action-menu {
      width: 38px;
      height: 38px;
      text-align: center;
      line-height: 38px;

      .fonticon-record {
        font-size: 6px;
        color: $orange-1;
      }

      .fonticon-clickable {
        display: none;
      }
    }

    &:hover,
    &.menu-is-open {
      .tile-action-menu {
        .fonticon-record {
          display: none;
        }

        .fonticon-clickable {
          display: initial;
        }
      }
    }

    &.selected:not(.dragged) {

      .tile-action-menu {
        .fonticon-record {
          display: none;
        }

        .fonticon-clickable {
          display: initial;
        }
      }
    }
  }
</style>
