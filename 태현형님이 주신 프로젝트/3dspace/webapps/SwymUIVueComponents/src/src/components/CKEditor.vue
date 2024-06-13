<template>
  <div class="ckeditor-container">
    <div
      ref="sticky"
      class="sticky_toolbar"
    />
    <div ref="placeholder" />
    <vu-scroller class="scroll">
      <textarea
        :id="mode"
        ref="editor"
        :name="mode"
        class="textarea-editor"
      />
    </vu-scroller>
  </div>
</template>
<script>
import { simpleFormattingEditorConfig, createCommand } from '../lib/ckeditor/CKEditorCommand';
// customlink dialog without internal link processing
import addCustomLinkDialog from '../lib/ckeditor/custom-link-plugin';

export default {
  name: 'CKEditor',
  props: {
    mode: {
      type: String,
      default: 'advancedRTE',
      validator: (type) => ['simpleRTE', 'instantMessageRTE', 'advancedRTE'].includes(type), // TODO to be completed
    },
    type: {
      type: String,
      default: 'classic',
      validator: (type) => ['classic', 'inline'].includes(type),
    },
    tagName: {
      type: String,
      default: 'textarea',
    },
    readOnly: {
      type: Boolean,
      default: null,
    },
    getBodyTemplate: {
      type: Object,
    },
  },
  mounted() {
    window.require(['DS/CKEditor/CKEditor'], (ckeditor) => {
      // Need to require plugin files before initialize CKEditor
      window.require(
        [
          'DS/SwymUIComponents/script/lib/ckeditor/customtable/dialogs/customtable',
          'DS/SwymUIComponents/script/lib/ckeditor/sticky/plugin',
          'DS/SwymUIComponents/script/lib/ckeditor/highlight/plugin',
          'DS/SwymUIComponents/script/lib/ckeditor/customtable/plugin',
          'DS/SwymUIComponents/script/lib/ckeditor/customlink/plugin',
        ],
        () => {
          // Add customlink dialog
          addCustomLinkDialog();

          this.initToolbar();
          this.initCkeditor();
          this.setPlugins();
          this.setBodyCkeditor();
          this.onChangeCkeditor();
        },
      );
    });
  },
  methods: {

    /**
     * Init toolbar
     * Add id attribute in sticky/placeholder div
     * -> for sticky plugin
     */
    initToolbar() {
      this.$refs.sticky.setAttribute('id', `sticky_${this.mode}`);
      this.$refs.placeholder.setAttribute('id', `placeholder_${this.mode}`);
    },

    /**
     * Init CKEditor
     */
    initCkeditor() {
      if (!CKEDITOR.instances[this.mode]) createCommand(CKEDITOR);
      const config = this.setCkeditorConfig();
      const method = this.type === 'inline' ? 'inline' : 'replace';
      const elementToReplace = this.$refs.editor;
      CKEDITOR[method](elementToReplace, config);
    },

    /**
     * Set plugins
     * Add plugins to CKEditor
     */
    setPlugins() {
      
      // Need the next line to be able to reuse customtable plugin
      CKEDITOR.instances[this.mode].element.$.addEvent = () => {};

      // Add all the necessary plugin
      // Sticky toolbar / Highlight / Custom table / Custom link
      CKEDITOR.plugins.addExternal('customtable', '../SwymUIComponents/script/lib/ckeditor/customtable/', 'plugin.js');
      CKEDITOR.plugins.addExternal('customlink', '../SwymUIComponents/script/lib/ckeditor/customlink/', 'plugin.js');
      CKEDITOR.plugins.addExternal('highlight', '../SwymUIComponents/script/lib/ckeditor/highlight/', 'plugin.js');
      CKEDITOR.plugins.addExternal('sticky', '../SwymUIComponents/script/lib/ckeditor/sticky/', 'plugin.js');
    },

    setCkeditorConfig() {
      const config = this.mode === 'advancedRTE' ? simpleFormattingEditorConfig : {};
      if (this.readOnly !== null) config.readOnly = this.readOnly;
      return config;
    },

    onChangeCkeditor() {
      CKEDITOR.instances[this.mode].on('instanceReady', (event) => {
        CKEDITOR.instances[this.mode].on('change', () => {
          const isEmpty = CKEDITOR.instances[this.mode].getData() === '';
          this.$parent.$emit('disableButtonSave', isEmpty);
        });
      });
    },

    setBodyCkeditor() {
      if (this.getBodyTemplate) {
        CKEDITOR.instances[this.mode].setData(this.getBodyTemplate);
      }
    },

  },
  render(createElement) {
    return createElement('div', {}, [
      createElement(this.tagName),
    ]);
  },
};
</script>
<style lang="scss">
@import "../styles/_variables";
@import "../styles/ckeditor/_ckeditor";

// Hide textarea
.textarea-editor{
  display: none;
}

// Fix the scroll's height in editable container
.scroll{
    height: calc(100vh - 250px) !important;
}


// Reset flex in toolgroup
.cke_toolgroup{
  display: flex;
  flex-direction: row;
}

.ckeditor-container{
    flex-direction: column;
    display: flex;
    padding: 0 58px;
    position: relative;
    color: $grey-4;
    height: 100%;

    .sticky_toolbar{
        border-bottom: 1px solid $grey-4;
        padding: 8px;

        .cke_button,
        .cke_button_on,
        .cke_button_off {
            height: 28px;
            line-height: normal;
            padding: 4px 6px;
            border: 1px solid transparent;

            // Need to override the class from UIKIT
            &.table {
                margin-bottom: 0;
            }
        }
        .cke_button_on {
            border: 1px solid #fff;
            background-color: $grey-3;
        }
    }

    .cke_editor_advancedRTE{
        border:none;
        width: 100%;
            .cke_top.cke_reset_all{
            display: flex;
            background-color: #fff;
            z-index: 2;
            padding: 8px;

            // Individual groups of items
            .cke_toolgroup {
                display: flex;
                margin: 0;
            }

        }
 /*       .cke_inner.cke_reset{
            iframe.cke_wysiwyg_frame.cke_reset{
                body.cke_editable.cke_editable_themed.cke_contents_ltr.cke_show_borders  {
                font-family: Arial,Helvetica,sans-serif;
                font-size: 13px; /*same as paragraphs
                color: $grey-5;
                line-height: 17px;
                word-wrap: break-word;
                }
                body.cke_editable.cke_editable_themed.cke_contents_ltr.cke_show_borders  h1 {
                    font-size: 1.625em;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #999;
                    padding-bottom: 10px;
                    font-weight: bold;
                }
            /
        }*/

    }

    .cke_editable{
        padding-top: 9px;

        &:focus-visible{
            outline: none;
        }
    }

}

/* Override style CKEditor */
.cke_editable{
    font-family: Arial,Helvetica,sans-serif;
    font-size: 13px;
    color: #5c5c5c;
    line-height: 17px;
    word-wrap: break-word;

    h1{
        font-size: 1.625em;
        margin-top: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #999;
        padding-bottom: 10px;
        font-weight: bold;
    }

    h2{
        font-size: 1.250em;
        margin-top: 14px;
        margin-bottom: 14px;
        font-weight: bold;
    }

    pre{
        border: 1px dashed #CCC;
        padding: 10px 14px 14px 10px;
        margin-bottom: 12px;
        margin-top: 12px;
    }

    p{
        margin: 0;
        padding-top: 6px;
        padding-bottom: 6px;
        line-height: 22px;
    }

    table{
        margin-top: 12px;
        border-collapse: collapse;
        margin-bottom: 12px;
    }

    th{
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        height: 25px;
        padding: 1px 3px;
        text-align: left;
    }

    td{
        border: 1px solid #ddd;
        padding: 1px 3px;
        font-family: Arial,Helvetica,sans-serif;
        font-size: 12px;
        color: #5c5c5c;
    }

    /*.external_link{

    }*/

    .internal_link{
        color: #6192d1;
    }

}
</style>
