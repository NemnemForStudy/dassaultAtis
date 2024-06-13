<template>
  <div class="default-content-item" :class="content.type">
    <!--TODO : to be refactor -->
    <div
      :class="`default-content-icon ${getClassColor()}`"
      :style="`${content.color ? `background-color: ${content.color};` : ''}`"
    >
      <vu-icon
        :icon="getFonticon()"
      />
    </div>

    <div class="default-content-title">
      {{ content.label }}
      <div class="wiki-supbages-badge" v-if="content.type.includes('WikitreePage')">
        <vu-badge color="default" v-if="content.subpagesSelected && content.subpagesSelected !== '0'">{{'+'+ ' ' + content.subpagesSelected + ' ' + $i18n('subpages')}}</vu-badge>
      </div>
    </div>      
    <div class="wiki-set-as-root-button-radio" v-if="!readOnly && content.type.includes('WikitreePage')">
      <vu-checkbox 
        type="radio"
        :value="content.set_as_root? content.assetId: null"
        :disabled="content.disabled_set_as_root"
        :options="checkBoxOptions"
        @input="updateSetAsRootWikiPage"
      ></vu-checkbox>
    </div>
    <div class="default-content-context-menu" v-if="!readOnly">
      <vu-dropdownmenu
        :items="contextMenu"
        @update:show="(show) => resetPositionDropdown(show, 'bottom')"
      >
      <vu-icon-btn
        ref="dropdown-btn"
        icon="chevron-down"
      />
      </vu-dropdownmenu>
    </div>

  </div>
</template>

<script>
import dropdown from '../../mixins/dropdown';
import { getFonticonByUri } from '../../utils/style'

export default {
  name: 'SwymDefaultContentItem',
  mixins: [dropdown],
  props: {
    content: {
      type: Object,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkBoxOptions: [{
        value: this.content.assetId,
        label: this.$i18n('setAsRoot'),
      }],
      contextMenu: [{
        text: this.$i18n('delete'),
        fonticon: 'trash',
        handler: () => {
          this.$emit('removeDefaultContent');
        },
      }],
    };
  },
  computed: {
    descriptionFormatted() {
      return this.content.description;
    },
  },
  methods: {
    updateSetAsRootWikiPage(){
    /*  this.content.set_as_root = true;
      this.content.disabled_set_as_root = false;*/
      this.$emit('updateSetAsRootWikiPage', this.content);
    },
    getClassColor(){
      if(this.content.color){
        return ''
      }
      let contentType =  this.content.type.toLowerCase().split('swym:')[1];

      switch(contentType){
        case 'simulationmedia':
        case 'drawing':
        case 'picture':
        case 'sound':
        case 'video':
        case '3dmodel':
        case 'document':
        case 'animatedpicture':
          return 'media'
        default:
          return contentType
      }
     
    },

    getFonticon() {
      // Derived type
      if (this.content.icon) {
        return this.content.icon;
      }

      // Post/Media/Question/Wiki/Idea
      return getFonticonByUri(this.content.type)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/typecolors";
@import "../../styles/variables";

.default-content-item{
  display: flex;
  align-self: center;
  width: 100%;
  min-height: 40px;
  padding-right: 20px;
  background-color: white;
  border: 1px solid $grey-4;
  border-radius: 5px;

  .default-content-icon{
    min-width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: grey;
    border-radius: 4px 0 0 4px;

    &.post{
      background-color: map-get($map: $colors, $key: "post");
    }
    &.media{
      background-color: map-get($map: $colors, $key: "media");
    }
    &.question{
      background-color: map-get($map: $colors, $key: "question");
    }
    &.idea{
      background-color: map-get($map: $colors, $key: "idea");
    }
    &.wikitreepage{
      background-color: map-get($map: $colors, $key: "wiki");
    }

    .fonticon{
      color: white;
      font-size: 18px;
    }
  }
  
  .default-content-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: auto;
    padding-left: 10px;
    font-weight: bold;
    .wiki-supbages-badge {
      font-weight: normal;
      padding-left: 10px;
    }
  }
  .default-content-context-menu{
    align-self: center;
    width: 22px;
  }
}
</style>
