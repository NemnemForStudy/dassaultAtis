<template>
  <div class="default-content-wrapper">
    <h3>{{ $i18n('defaultContent') }}</h3>
    <div class="search" v-if="!readOnly">
      <span class="search-label">{{ $i18n('selectDefaultContent') }}</span>
      <SwymTypeSelector
        v-model="featureSelected"
        :items="dropdownList"
      />
      <SwymSearchInput
        v-model="querySearch"
        @search="search"
      />
    </div>
    <div class="search-result container-fluid">
      <SwymDefaultContentItem
        v-for="content, index in defaultContents.list"
        :key="index"
        :content="contentWithIconColor(content)"
        :readOnly="readOnly"
        @removeDefaultContent=" () => $emit('removeDefaultContent', index)"
        @updateSetAsRootWikiPage="() =>$emit('updateSetAsRootWikiPage', content)"
      />
    </div>
  </div>
</template>

<script>
import dropdown from '../../mixins/dropdown';
import { isDerivedType as derivedType, getSearchPrecondition} from '../../utils/types';

export default {
  name: 'SwymDefaultContent',
  mixins: [dropdown],
  props: {
    searchComponent: {
      type: Object,
      required: true,
    },
    defaultContents: {
      type: Array,
      default: () => [],
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      featureSelected: this.defaultContents.featuresList[0], // Post is always the first
      querySearch: '',
    };
  },
  watch: {

    /**
     * Update the dropdown
     * Everytime there are changes in features
     * (Icon/Color/Name)
     */
    defaultContents: {
      handler: function(){
        let feature = this.dropdownList.find(el => (this.featureSelected.transientId === el.transientId) || (this.featureSelected.value === el.value))

        if(feature){
          this.featureSelected = feature
        }

      },
      deep: true,
    }
  },
  computed: {
    descriptionFormatted() {
      return this.content.description;
    },

    /**
     * Return dropdown list items according to features list (props)
     */
    dropdownList() {
      // Change feature selected with Post type
      // when the (derived) content type is disabled/removed

      const derivedTypeIsInFeaturesList = this.defaultContents.featuresList.find(
        (el) => el.transientId === this.featureSelected.transientId,
      );
      const contentTypeIsInFeaturesList = this.defaultContents.featuresList.find(
        (el) => el.value === this.featureSelected.value,
      );

      let mapping = this.defaultContents.featuresList.map((f) => ({
        label: f.label,
        icon: f.icon,
        color: f.color,
        value: f.value,
        precondition: f.contentToReuse || f.value,
        ...f.transientId && {
          transientId: f.transientId,
        },
      }))

      if (this.featureSelected.transientId) {
        if (!derivedTypeIsInFeaturesList) {
          this.featureSelected = this.defaultContents.featuresList[0];
        }
      } else if (this.featureSelected.value && !contentTypeIsInFeaturesList) {
        this.featureSelected = this.defaultContents.featuresList[0];
      }

      return mapping;
    },
  },
  methods: {
    /**
     * Trigger addNewDefaultContent event with the result of the search
     * -> Add new default content in Store
     */
    getSearchResult(data) {
      const isDerivedType = derivedType(this.featureSelected.value);

      const newData = {
        ...data,
        isDerivedType,
        ...isDerivedType && { // If a derived type has been selected in SwymTypeSelector
          derivedTypeTransientId: this.featureSelected.transientId,
        },
      };

      this.$emit('addNewDefaultContent', newData);
    },

    /**
     * Trigger removeDefaultContent event with the index of the default content
     * -> Remove the default content
     */
    removeDefaultContent(index) {
      this.$emit('removeDefaultContent', index);
    },

    /**
     * Change the feature selected
     */
    changeDefaultContentType(type) {
      this.featureSelected = type;
    },

    /**
     * Return query with precondition regarding the feature selected
     * for Search
     */
    getSearchPrecondition() {

      return getSearchPrecondition(this.featureSelected.precondition)

    },

    /**
     * Return content with icon & color
     */
    contentWithIconColor(content) {
      if (content.derivedTypeTransientId) {
        const { icon, color } = this.defaultContents.featuresList
          .find((el) => el.transientId === content.derivedTypeTransientId);

        return {
          ...content,
          icon,
          color,
        };
      }

      return content;
    },

    /**
     * Emit search event
     * -> to add a new default content
     */
    search() {
      const isDerivedType = derivedType(this.featureSelected.value);

      this.$emit(
        'search',
        {
          query: this.querySearch,
          precond: this.getSearchPrecondition(),
          isDerivedType,
          ...isDerivedType && { // If a derived type has been selected in SwymTypeSelector
            derivedTypeTransientId: this.featureSelected.transientId,
          },
        },
      );
    },
  },
};
</script>

<style lang='scss'>
  @import "../../styles/variables";
  .default-content-wrapper{
    .search{
      display: flex;
      align-items: center;

      .search-label{
        margin-right: 5px;
      }

      input{
        border-radius: 0 4px 4px 0;
        border-left: none;
      }
    }

    .search-result{
      padding: 5px;
      min-height: 100px;

      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }

    .v-text-field .v-input__control{
      border-radius: 0 5px 5px 0;
    }

    .v-text-field--outlined fieldset{
      border-left: none;
    }
  }

</style>
