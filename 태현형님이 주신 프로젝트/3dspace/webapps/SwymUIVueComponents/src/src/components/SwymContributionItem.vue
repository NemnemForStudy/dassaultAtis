<template>
  <div
    :class="[
      'contribution-item',
      { 'last-contribution': isLastItem, disabled: !activated },
    ]"
    :data-model-id="mid"
    :data-model-type="contentType"
  >
    <div
      :class="['icon-wrapper', contentType, { validated: isValidatedQuestion }]"
      :style="color ? { backgroundColor: color } : {}"
      @click="goToItem"
      :draggable="activated"
      @dragstart.native="dragItem($event)"
    >
      <span :class="['fonticon', `fonticon-${icon}`]"></span>
    </div>
    <div
      class="title-wrapper"
      :draggable="activated"
      @dragstart.native="dragItem($event)"
      @click="goToItem"
    >
      <template v-if="!title"> {{ NLS.NoTitleYet }} </template>
      <template v-else>
        <a :href="relPath" @click.prevent="() => false" class="title-text">{{
          title
        }}</a
        ><span class="draft-title" v-if="isDraft">{{ NLS.Draft }}</span>
      </template>
    </div>
    <div class="publish-data-wrapper">
      <span v-if="isDraft" class="draft-status"> {{ NLS.Draft }} </span>
      <span v-else>{{ publishDate }}</span>
    </div>
    <div class="dropdown-wrapper">
      <vu-dropdownmenu
        :items="activated ? dropdownOptions : []"
        @close="isDMenuOpen = false"
        @click.native.stop="isDMenuOpen = true"
      >
        <span class="fonticon fonticon-clickable fonticon-down-open" />
      </vu-dropdownmenu>
    </div>
    <div class="buttons-wrapper">
      <vu-btn-grp>
        <vu-icon-btn
          icon="pencil"
          :disabled="!activated"
          v-tooltip.body="NLS.Edit"
          @click="editItem"
        />
        <vu-icon-btn
          icon="trash"
          :disabled="!activated"
          v-tooltip.body="NLS.Delete"
          @click="deleteItem"
        />
      </vu-btn-grp>
    </div>
  </div>
</template>
<script>
export default {
  name: "SwymContributionItem",
  props: {
    activated: {
      type: Boolean,
      default: true,
    },
    isLastItem: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
    isValidatedQuestion: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    publishDate: {
      type: String,
      default: "",
    },
    mid: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    contentName: {
      type: String,
    },
    relPath: {
      type: String,
      default: "",
    },
    i18nKeys: {
      type: Object,
      default: () => ({}),
    },
    NLS: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isDMenuOpen: false,
      dropdownOptions: [
        {
          text: this.NLS.Edit,
          fonticon: "pencil",
          handler: () => this.editItem(),
        },
        {
          text: this.NLS.Delete,
          fonticon: "trash",
          handler: () => this.deleteItem(),
        },
      ],
    };
  },
  methods: {
    editItem() {
      this.activated && this.$emit("editItem", this.mid);
    },
    deleteItem() {
      this.activated && this.$emit("deleteItem", this.mid);
    },
    goToItem() {
      this.activated && this.$emit("goToItem", this.mid);
    },
    dragItem(event) {
      this.activated && this.$emit("dragItem", { event, mid: this.mid });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/variables";

%centered {
  align-items: center;
  display: flex;
  min-height: 44px;
}

%hideInSmall {
  @media all and (max-width: 799px) {
    display: none;
  }
}

%showInSmall {
  @media all and (min-width: 799px) {
    display: none;
  }
}

.contribution-item {
  display: flex;
  border: 1px solid $grey-3;
  border-bottom: 0;

  &.last-contribution {
    border-bottom: 1px solid $grey-3;
  }
  &:hover {
    background-color: $grey-2;
  }
  .icon-wrapper {
    color: #fff;
    width: 40px;
    height: 44px;
    font-size: 20px;
    line-height: 44px;
    text-align: center;
    margin: 10px;

    &[draggable="true"] {
      cursor: pointer;
      cursor: -webkit-grab;
      cursor: -moz-grab;
      cursor: grab;

      &:active {
        cursor: -webkit-grabbing;
        cursor: -moz-grabbing;
        cursor: grabbing;
      }
    }

    &.post {
      background-color: $grey-4;
    }
    &.iquestion,
    &.question {
      background-color: $red-1; //red by default
      &.validated {
        background-color: $green-1;
      }
    }
    &.idea,
    &.ideation {
      background-color: $cyan-1;
    }
    &.survey {
      background-color: $orange-1;
    }
    &.media {
      background-color: $violet-dv-1;
    }
    &.wiki,
    &.wiki_page {
      background-color: $turquoise-dv-0;
    }
    &.wedo {
      background-color: $blue-4;
    }
    &.social-event {
      background-color: $blue-4;
    }
    &.ritual {
      background-color: $blue-4;
    }
  }

  .title-wrapper {
    flex: 1;
    cursor: pointer;
    @extend %centered;

    @media all and (max-width: 799px) {
      overflow: hidden;

      & a {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .draft-status {
    color: $orange-1;
  }

  .draft-title {
    @extend .draft-status;
    @extend %showInSmall;
    margin-left: 10px;
  }

  .title-text {
    color: $grey-7;
  }

  .publish-data-wrapper {
    @extend %centered;
    min-width: 85px;
    justify-content: flex-end;

    @extend %hideInSmall;
  }

  .dropdown-wrapper {
    @extend %centered;
    width: 50px;
    justify-content: flex-end;

    @extend %showInSmall;
  }

  .buttons-wrapper {
    @extend %centered;
    width: 100px;
    justify-content: flex-end;

    @extend %hideInSmall;
  }

  &.disabled {
    .buttons-wrapper,
    .dropdown-wrapper {
      cursor: not-allowed;
    }
  }
}
</style>
