<template>
  <div class="cockpit-container">
    <div
      v-if="defaultView"
      class="default-view"
    >
      <h5>{{ $i18n("defaultView") }}</h5>
      <span> {{ $i18n("or") }} </span>
      <vu-btn
        color="primary"
        @click="switchDefaultToEditView"
      >
        <vu-icon
          color="white"
          icon="plus"
        />
        {{ $i18n("selectContent") }}
      </vu-btn>
    </div>

    <div
      v-if="editView"
      class="edit-view"
    >
      <div class="edit-view-body">
        <vu-select
          v-model="contentTypeValue"
          :label="$i18n('contentType')"
          placeholder="Select"
          :hide-placeholder-option="true"
          :options="contentTypeList"
        />
        <vu-select
          v-if="contentTypeValue"
          v-model="contentToDisplaySelected"
          :label="$i18n('contentToDisplay')"
          placeholder="Select"
          :hide-placeholder-option="true"
          :options="contentToDisplayList"
        />
      </div>
      <div class="edit-view-footer">
        <vu-btn
          color="primary"
          @click="switchEditOrSelectionToDefaultView"
        >
          {{ $i18n("cancel") }}
        </vu-btn>
        <vu-btn
          color="primary"
          :disabled="!contentToDisplaySelected"
          @click="switchEditToSelectionView"
        >
          {{ $i18n("addContent") }}
        </vu-btn>
      </div>
    </div>

    <div
      v-if="selectionView"
      class="selection-view"
    >
      <h5>{{ $i18n("selectedView") }}</h5>
      <div>
        <vu-icon
          :icon="iconColorType.icon"
          :style="`color: ${iconColorType.color};`"
        />
        {{ labelSelection }}
        <vu-icon-btn
          icon="close"
          @click="removeContent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { isDerivedType } from '../utils/types';
import { CONTENT_TYPE_ICON_COLOR, MEDIA_TYPE_ICON_COLOR} from '../utils/style';




export default {
  name: 'SwymCockpit',
  props: {
    contentTypesAndContentToDisplay: {
      type: Array,
      required: true,
    },
    dataCockpit: {
      type: Object,
      default: null,
    },
  },

  data() {
    // The user want to display all content from the (derived) type selected
    const allContent = {
      label: this.$i18n("allContent"),
      value: 'allContent',
    };
    const { dataCockpit } = this;
    const contentType = dataCockpit && dataCockpit.contentType;
    const contentToDisplay = dataCockpit && dataCockpit.contentToDisplay;
    const contentToDisplayIsNull = dataCockpit && (dataCockpit.contentToDisplay === null);
    const allContentIsSelected = contentToDisplayIsNull && contentType;

    return {
      contentTypeValue: contentType || null,
      // 3 ways -> YYY-YYY-YYY / allContent / null
      contentToDisplaySelected: (
        contentToDisplay
        || (allContentIsSelected ? allContent.value : contentToDisplay)
        || null),
      isSelectingContent: false,
      allContent
    };
  },
  computed: {

    /**
     * Return the content type list formatted
     */
    contentTypeList() {
      const list = this.contentTypesAndContentToDisplay.map((el) => (
        {
          label: el.label,
          value: el.transient_id || el.type,
        }));

      return list;
    },

    /**
     * Return the content to display (regarding the content type selected before)
     */
    contentToDisplayList() {
      // All (derived) type can be used to filter the Business Method community
      const list = [this.allContent];

      if (this.contentTypeValue) {
        const type = this.contentTypesAndContentToDisplay.find(
          (el) => (el.transient_id === this.contentTypeValue)
          || (el.type === this.contentTypeValue),
        );

        const contentsToDisplayList = type.contentToDisplay
        && type.contentToDisplay.map((content) => ({
          label: content.label,
          value: content.transient_id,
        }));
        if(contentsToDisplayList){
          list.push(...contentsToDisplayList);
        }
      }

      return list;
    },

    /**
     * Return the icon & color of the (derived) type
     */
    iconColorType() {
      if (isDerivedType(this.contentTypeValue)) {
        const contentType = this.contentTypesAndContentToDisplay.find(
          (el) => el.transient_id && el.transient_id === this.contentTypeValue,
        );

        if (contentType) {
          return {
            icon: contentType.icon,
            color: contentType.color,
          };
        } else {
          // If the content type was removed in Business Method
          // Return in the Default View
          this.switchEditOrSelectionToDefaultView()
        }
      }

      // Media - different icon according to media type
      if(this.contentTypeValue === 'media'){
        if(this.contentToDisplaySelected){
          const type = this.contentTypesAndContentToDisplay.find(
            (el) => el.transient_id === this.contentTypeValue
                    || el.type === this.contentTypeValue,
          );
          const contentsToDisplayList = type.contentToDisplay;
          const contentToDisplay = contentsToDisplayList && contentsToDisplayList.find(
            (el) => el.transient_id === this.contentToDisplaySelected,
          );

          if(contentToDisplay){
            return MEDIA_TYPE_ICON_COLOR(contentToDisplay.type)
          }
        }
      }

      return CONTENT_TYPE_ICON_COLOR[this.contentTypeValue];
    },

    /**
     * State of all views in Cockpit
     */

    /**
     * Default view
     * Logo & Select content button
     */
    defaultView() {
      return (
        !this.isSelectingContent
        && this.contentTypeValue === null
        && this.contentToDisplaySelected === null
      );
    },

    /**
     * Edit view
     * Content type & Content to display selection
     */
    editView() {
      return (
        this.isSelectingContent
      );
    },

    /**
     * Selection view
     * Content/All content selected
     */
    selectionView() {
      return (
        !this.isSelectingContent
        && this.contentTypeValue !== null
      );
    },

    /**
     * Show formatted label
     * e.g. Post / Sample post (X)
     * Post (X)
     * Idea (X)
     * Idea / Good idea (X)
     */
    labelSelection() {
      let labelFormatted = '';

      const type = this.contentTypesAndContentToDisplay.find(
        (el) => el.transient_id === this.contentTypeValue
                || el.type === this.contentTypeValue,
      );
      const contentsToDisplayList = type.contentToDisplay;
      const contentToDisplay = contentsToDisplayList && contentsToDisplayList.find(
        (el) => el.transient_id === this.contentToDisplaySelected,
      );
      const labelType = type.label;
      const labelContentToDisplay = contentToDisplay ? contentToDisplay.label : '';
      const allContentIsSelected = this.contentToDisplaySelected === this.allContent.value;

      labelFormatted = `${labelType}${allContentIsSelected ? '' : ` / ${labelContentToDisplay}`}`;
      return labelFormatted;
    },
  },
  mounted() {
    // Create BE Data Cockpit at the beginning
    const beDataCockpit = this.createBEDataCockpit();
    this.$emit('sendBEDataCockpit', beDataCockpit);
  },
  methods: {

    /**
     * Switch Default view -> Edit view
     */
    switchDefaultToEditView() {
      this.isSelectingContent = true;

      this.$emit('isEditView');
    },

    /**
     * Switch Edit view -> Selection view
     */
    switchEditToSelectionView() {
      if (this.contentTypeValue && this.contentToDisplaySelected) {
        this.isSelectingContent = false;

        // Create BE Data Cockpit
        const beDataCockpit = this.createBEDataCockpit();
        this.$emit('sendBEDataCockpit', beDataCockpit);

        this.$emit('isSelectionView');
      }
    },

    /**
     * Switch Edit or Selection view -> Default view
     */
    switchEditOrSelectionToDefaultView() {
      // Reset data
      this.isSelectingContent = false;
      this.contentTypeValue = null;
      this.contentToDisplaySelected = null;

      // Create BE Data Cockpit
      const beDataCockpit = this.createBEDataCockpit();
      this.$emit('sendBEDataCockpit', beDataCockpit);

      this.$emit('isDefaultView');
    },

    /**
     * Remove content selected -> All content selected -> default view
     * e.g. Post / YYY (X) -> Post (X) -> Default View
     */
    removeContent() {
      // If All content was selected, switch to default view
      if (this.contentToDisplaySelected === this.allContent.value) {
        this.switchEditOrSelectionToDefaultView();
      }
      // If a specific content was selected,
      // Set the contentToDisplaySelected to All Content
      else if (this.contentToDisplaySelected !== null) {
        this.contentToDisplaySelected = this.allContent.value;

        // Create BE Data Cockpit
        const beDataCockpit = this.createBEDataCockpit();
        this.$emit('sendBEDataCockpit', beDataCockpit);
      }
    },

    /**
     * Create BE Data Cockpit
     * e.g.
     * - {contentType: "swym:Post", contentToDisplay: "XXX-XXX-XXX"}
     * Post with XXX-XXX-XXX id will be displayed
     *
     * - {contentType: "YYY-YYY-YYY", contentToDisplay: "ZZZ-ZZZ-ZZZ", contentToReuse: "swym:Post"}
     * Derived type (with YYY-YYY-YYY as ID) content (based on Post) with ZZZ-ZZZ-ZZZ id
     * will be displayed
     *
     * - {contentType: "swym:Post", contentToDisplay: null}
     * Community create by the BM will be filtered on Post
     */
    createBEDataCockpit() {
      // Get the derived type with the transient_id
      const allContentType = this.contentTypesAndContentToDisplay.find(
        (el) => el.transient_id && (el.transient_id === this.contentTypeValue),
      );

      const allContentIsSelected = this.contentToDisplaySelected === this.allContent.value;

      const beDataCockpit = {
        contentType: this.contentTypeValue,
        contentToDisplay: allContentIsSelected ? null : this.contentToDisplaySelected,
        ...allContentType && {
          // For derived type
          contentToReuse: allContentType.contentToReuse,
        },
      };

      return beDataCockpit;
    },

  },
};
</script>

<style lang="scss">
@import "../styles/variables";

  .cockpit-container{
    .default-view, .selection-view{
      h5{
        margin-bottom: 0;
      }

      span{
        color: $grey-4;
      }
      height: 45%;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;

      .vu-icon-btn{
        height: 25px;
        width: 25px;
        line-height: 22px;
        font-size: 13px;
      }
    }

    .edit-view{
      height: 100vh;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .edit-view-footer{
        align-self: flex-end;

        display: flex;
        gap: 5px;
      }
    }
  }
</style>
