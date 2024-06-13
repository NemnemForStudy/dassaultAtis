<template>
  <div
    v-if="show"
    class="content-creation-inline-wrapper"
  >
    <div class="content-creation-inline-container">
      <div class="content-creation-inline-header">
        <vu-icon
          class="content-icon"
          :icon="getFontIcon(feature.data)"
          :style="setColor(feature.data, 'background-color')"
        />
        <input
          v-model="title"
          class="content-title"
          :placeholder="$i18n('addTitle')"
        >
        <vu-icon-btn
          class="content-icon-close"
          icon="close"
          @click="show = false"
        />
      </div>
      <div class="content-creation-inline-body">
        <CKEditor
          :mode="modeCKEditor"
          :get-body-template="mode=== 'edit' ? feature.data.template.inlineTemplate.body : null "
          type="inline"
        />
      </div>
      <div class="creation-inline-footer">
        <div class="buttons">
          <vu-btn
            color="primary"
            :disabled="disable"
            @click="onSave"
          >
            {{ $i18n('save') }}
          </vu-btn>
          <vu-btn @click="onCancel">
            {{ $i18n('cancel') }}
          </vu-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import contentCreation from '../../mixins/contentCreation';
import { isDerivedType } from '../../utils/types';

export default {
  name: 'SwymContentCreationInline',
  mixins: [contentCreation],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    feature: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
    },
    modeCKEditor: String,

  },
  data() {
    return {
      title: '',
      disable: this.mode !== 'edit',

    };
  },
  mounted() {
    //TODO replace with event from swym bm message manager
    this.fullScreen();
    this.setTitle();
    // disable button save when the ckeditor is empty
    this.$on('disableButtonSave', this.disableButtonSave);
  },

  methods: {
    onSave() {
      const templateData = this.getTemplateData();
      const options = { feature: this.feature, templateData };
      if (this.mode === 'edit') {
        this.$emit('editTemplateInline', options);
      } else {
        this.$emit('saveTemplateInline', options);
      }
      this.leaveScreen();
      this.show = false;
    },
    onCancel() {
      this.leaveScreen();
      this.show = false;
    },
    setTitle() {
      // TODO : to be inproved
      if (this.mode === 'edit') this.title = this.feature.data.template.inlineTemplate.title;
    },

    /**
     * Return template data
     * @returns {Object} - Template data
     * - title
     * - body
     * - type
     * - derived_type_transient_id (if the feature is a derived type)
     */
    getTemplateData() {
      const featureData = {
        ...this.feature.data,
        ...(this.feature.data.value === 'wiki') && { // Exception for wiki, TO IMPROVE
          value: 'wiki_page', // Value in back-end side
        },
      };
      const featureIsDerivedType = isDerivedType(featureData.value);
      return {
        title: this.title,
        body: CKEDITOR.instances[this.modeCKEditor].getData(),
        type: (featureData.contentToReuse) ? featureData.contentToReuse.toUpperCase() : featureData.value.toUpperCase(),
        media_links: [], // TODO => support media
        ...featureIsDerivedType && {
          derived_type_transient_id: featureData.transientId,
        },
      };
    },
    fullScreen() {
      window.parent.postMessage({
        version: '1',
        type: 'requestFullScreen',
      }, '*');
    },
    leaveScreen() {
      window.parent.postMessage({
        version: '1',
        type: 'leaveFullScreen',
      }, '*');
    },
    disableButtonSave(ckeditorEmpty) {
      this.disable = ckeditorEmpty;
    },
  },

};
</script>
<style lang="scss">
@import "../../styles/typecolors";
@import "../../styles/variables";

  .content-creation-inline-wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: $grey-0;
   .content-creation-inline-container{
     // width: 900px;
      max-width: calc(150vh - 100px);
      //height: 90%;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      margin: 0 auto;
      margin-top: 20px;
      background-color: white;
      border: 1px solid $grey-4;
      .content-creation-inline-header
      {
        display: flex;
        align-items: center;

      .content-icon{
        width: 58px;
        text-align: center;
        height: 44px;
        margin: 0;
        line-height: 42px;
        }
       .content-icon.fonticon{
        color: white;
        font-size: 22px;
      }
      .content-title {
          height: 100%;
          width: 100%;
          margin-left: 10px;
          margin-right: 5px;
          font-size: 20px;
          border:none;
          outline:none;
        // color: $grey-5;
      }
      .content-icon-close{
        margin-right: 10px;
        .fonticon-close{
          font-size: 20px;
        }
        }
      }
      .content-creation-inline-body{
        flex: 1 0 auto;
      }
      .creation-inline-footer{
        position: relative;
        width:100%;
        box-shadow: 1px 2px 0px $grey-3;
        background-color: $grey-0;
        padding: 10px;
        .buttons{
          display:flex;
          justify-content: flex-end;
          gap: 10px;
        }
      }
    }

 }

</style>
