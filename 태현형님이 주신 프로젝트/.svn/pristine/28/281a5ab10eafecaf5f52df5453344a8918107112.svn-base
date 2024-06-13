<template>
  <div class="content-item" :class="this.feature.value.toLowerCase().replaceAll(' ', '-')" v-if="feature.isVisibleInFeaturesList">
    <div class="content-item-row">
      <div class="wrappable">
        <div class="left-row">
          <div class="content-item-infos">
            <div v-if="readOnly">
              <h5>
                <vu-icon 
                  :icon="feature.icon" 
                  :class="`${this.feature.value}`"
                  :style="`${this.feature.color ? 'color:' + this.feature.color : '' }`"
                />
                {{ feature.label }}
              </h5>
            </div>
            <vu-checkbox
              v-else
              :value="feature.checked ? feature.value : null"
              class="toggle-feature"
              type="switch"
              :options="[featureOptionFormatted]"
              @input="updateFeatureChecked"
            />
          </div>
        </div>

        <div class="middle-row">
          <div class="content-item-search">

            <!-- Search/Create template -->
            <span
              v-if="displayAddTemplate"
              class="search"
            > 
              <div v-if="displayCreateTemplateLinks"> 
                <!-- + Search template -->
                <vu-icon-link
                  class="search-template"
                  icon="plus"
                  @click="showSearchInput">
                  {{ $i18n('searchTemplate') }}
                </vu-icon-link>

                <!-- + Create template -->
                <vu-icon-link
                  class="create-template"
                  icon="plus"
                  @click="showContentCreationInline">
                  {{ $i18n('createTemplate') }}
                </vu-icon-link>
              </div>
              
              <!-- Search input -->			  
              <div v-if="displaySearch">
                <SwymSearchInput
                  v-model="querySearch"
                  @search="search"
                />
              </div>
              <!-- Display Template  -->
              <div  v-if="feature.template">
                <!-- Display Template editable when BM is not frozen -->
                <vu-icon-link v-if="feature.template.inlineTemplate && !readOnly" 
                  @dblclick="showContentEditInline">
                  {{ feature.template.label }}</vu-icon-link>
                <!-- Display only Template label when the template is created from the search or BM is frozen  -->
                <span v-if="!feature.template.inlineTemplate || readOnly">{{ feature.template.label }}</span>
              </div>

              <vu-icon-btn
                v-if="(isSearchingTemplate || feature.template) && !readOnly"
                icon="close"
                @click="searchOnClick"
              />
            </span>
          </div>


          <div
            v-if="isIdeation() || !inMobile"
            class="content-item-small-pipeline"
          >
            <SwymSmallPipeline
              v-if="isIdeation()"
              :items="feature['status-array']"
              @click="togglePipeline"
            />
          </div>
          <div class="content-item-allow">
            <vu-checkbox
              v-if='!readOnly'
              :value="feature.allowContributorsToCreate.checked ?
                feature.allowContributorsToCreate.value : null"
              :options="[allowContributorsToCreateFormatted]"
              @input="(checked) =>
                $emit('update:feature_allowContributorsToCreate_checked', checked != null)"
            />
          </div>
        </div>
      </div>

      <div class="right-row">
        <div class="content-item-context-menu">
          <vu-dropdownmenu
            v-if="feature.contentToReuse || feature.value == 'ideation'"
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
    </div>

    <div class="dropdown-pipeline">
      <transition
        name="dropdown"
      >
        <SwymPipeline
          v-if="isIdeation() && showPipeline"
          :status-array="feature['status-array']"
          :min-status-to-transfer="feature.minStatusToTransfer"
          :readOnly="readOnly"
          v-on="$listeners"
        />
      </transition>
    </div>


    <SwymFeatureCreationModal
      :show="showFeatureCreationModal"
      :feature="feature"
      :content-to-reuse-list="[
        {
          label: $i18n('idea'),
          value: 'ideation'
        },
        {
          label: $i18n('post'),
          value: 'post'
        }
      ]"
      @edit="editFeature"
      @cancel="showFeatureCreationModal = false"
      @close="showFeatureCreationModal = false"
    />
  </div>
</template>

<script>
import dropdown from '../../mixins/dropdown';

export default {
  name: 'SwymContentSettingItem',
  mixins: [dropdown],
  props: {
    /**
     * Feature
     * @property {string} label - Label
     * @property {string} value - Value
     * @property {boolean} checked - Toggle on/off
     */
    feature: {
      type: Object,
      required: true,
    },
    searchComponent: {
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
      isSearchingTemplate: false,
      isCreatingTemplate: false,
      showPipeline: false,
      showFeatureCreationModal: false,
      inMobile: false,
      querySearch: '',
    };
  },
  computed: {

    /**
     * Display Search/Create template
     * If:
     *  - Is not searching a template
     *  - Is not creating a template
     *  - There is no template selected/created for this feature
     *  - Is not in readOnly mode
     * @returns {boolean}
     */
    displayCreateTemplateLinks() {
      return !this.isSearchingTemplate && !this.isCreatingTemplate && !this.feature.template && !this.readOnly
    },

    /**
     * Display Search input
     * If: 
     *  - Is searching a template (click on Search template link)
     *  - Is not creating a template
     *  - There is no template selected/created for this feature
     *  - Is not in readOnly mode
     * @returns {boolean}
     */
    displaySearch(){
      return this.isSearchingTemplate && !this.isCreatingTemplate && !this.feature.template && !this.readOnly;
    },
    
    /**
     * Display all template feature
     * If:
     *  - Feature is enabled/activated
     *  - Feature has creation template possibility
     * @returns {boolean}
     */
    displayAddTemplate() {
      return this.feature.checked && this.feature.createTemplate;
    },

    contextMenu() {
      const menu = [];
      
      // Edit
      if(this.feature.contentToReuse && !this.readOnly){
        menu.push({
          text: this.$i18n('editContent'),
          fonticon: 'pencil',
          handler: () => {
            this.showFeatureCreationModal = true;
          },
        })
      }

      // Show Pipeline
      if (this.isIdeation()) {
        menu.push({
          text: this.showPipeline ? this.$i18n('hidePipeline') : this.$i18n('showPipeline'),
          fonticon: 'chart-funnel',
          handler: () => {
            this.togglePipeline();
          },
        });
      }

      // Delete
      if (this.feature.contentToReuse && !this.readOnly) {
        menu.push({
          text: this.$i18n('delete'),
          fonticon: 'trash',
          handler: () => {
            // Ask confirmation to user when delete a derived type
            this.$confirm(
              this.$i18n('deleteContentType'),
              this.$i18n('confirm'),
              {
                okLabel: this.$i18n('confirm'),
                cancelLabel: this.$i18n('cancel'),
              },
            )
              .then(() => {
                this.$emit('remove:derivedType');
              })
              // eslint-disable-next-line
              .catch((err) => console.error(err));

          },
        });
      }

      return menu;
    },
    modalTitle() {
      return `${this.feature.contentToReuse ? this.feature.title : 'Idea'} - ${this.$i18n('pipeline')}`;
    },
    /**
     * Return the feature with the formatted label (include the icon)
     */
    featureOptionFormatted() {
      return {
        ...this.feature,
        // Bypass, fonticon in front of label in vu-checkbox
        label: `
          <span
          class="${this.feature.value} fonticon fonticon-${this.feature.icon}"
          ${this.feature.color ? `style="color: ${this.feature.color} ;"` : ''}></span>
          ${this.feature.label}`,
      };
    },

    /**
     * Return the allowContributorsToCreate with the label
     */
    allowContributorsToCreateFormatted() {
      return {
        ...this.feature.allowContributorsToCreate,
        label: this.$i18n('allowContributorsToCreate'),
      };
    },
  },
  mounted() {
    // Event listener to update inMobile data
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  destroy() {
    window.removeEventListener('resize');
  },
  methods: {
    /**
     * Triggered when the window is resized
     * inMobile is true if width is inferior to 900px
     */
    onResize() {
      this.inMobile = window.matchMedia('(max-width: 900px)').matches;
    },
    getSearchResult(data) {
      this.isSearchingTemplate = false;

      this.$emit('update:feature_template', {
        uri: data.asset.id,
        label: data.asset['ds6w:label'],
        description: data.asset['ds6w:description'],
      });
    },

    /**
     * Emit search event
     * -> to add a template
     */
    search() {
      this.isSearchingTemplate = false;
      this.$emit(
        'search',
        {
          query: this.querySearch,
          precond: this.getSearchPreconditionType(),
        },
      );

      this.querySearch = '';
    },

    searchOnClick() {
      this.isSearchingTemplate = false;
      this.$emit('update:feature_template', { uri: null});
    },

    // TO REFACTOR
    // For generic and global
    getSearchPreconditionType() {
      let precondition = null;
      switch (this.feature.contentToReuse || this.feature.value) {
        case 'post':
          precondition = 'Post';
          break;
        case 'question':
          precondition = 'Question';
          break;
        case 'ideation':
          precondition = 'Idea';
          break;
        case 'wiki':
          precondition = 'WikitreePage';
          break;
        default:
          precondition = 'Post';
      }

      return `([ds6w:type]:"swym:${precondition}")`;
    },

    showSearchInput() {
      this.isSearchingTemplate = true;

      // TODO: find another way
      // this.$nextTick(() => {
      //   let input = this.$refs["search-component"].$el.querySelector("input");

      //   input.focus()

      //   input.addEventListener('focusout', () => {
      //     this.searchOnClick() //TO REFACTOR
      //   })
      // })
    },
    showContentCreationInline(){
      this.$emit('showContentCreationInline',{ feature : this.feature}); 
    },
    showContentEditInline(){
          this.$emit('showContentEditInline',{feature : this.feature}); 
    }, 
    async updateFeatureChecked(toggle) {
      // If feature will be deactivate and it is not a derived type, show the warning
      if (toggle === null && !this.feature.contentToReuse) {
        this.$confirm(this.$i18n('disableContentType'), this.$i18n('confirm'), {
          okLabel: this.$i18n('confirm'), cancelLabel: this.$i18n('cancel'),
        })
          .then(() => {
            this.$emit('update:feature_checked', toggle != null);
          })
          // eslint-disable-next-line
          .catch((err) => console.error(err));
      } else {
        this.$emit('update:feature_checked', toggle != null);
      }
    },

    /**
     * True, if the content type is Idea
     * Or derived type based on Idea
     */
    isIdeation() {
      return (this.feature.value === 'ideation' || this.feature.contentToReuse === 'ideation');
    },

    /**
     * Show/Hide the pipeline
     */
    togglePipeline() {
      this.showPipeline = !this.showPipeline;
    },

    /**
     * Edit the feature
     * - Name/Title
     * - Icon
     * - Color
     * -> Emit an event 'update:feature'
     * @param {Object} data - Updated data for edition
     */
    editFeature(data) {
      this.$emit('update:feature', data);
      this.showFeatureCreationModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/typecolors";
$mobileBreakpoint: 910px;

.content-item{
  background-color: white;
  border-radius: 5px;
  border: 1px solid $grey-4;
}
.content-item-row{
  display: flex;
  justify-content: space-between;

  min-height: 50px;

  padding: 0 20px 0 20px;

  @media(max-width: $mobileBreakpoint){
    padding: 10px 20px 10px 20px;

  }

  .wrappable{
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    justify-content: space-between;

    .left-row{
      display: flex;
      align-items: center;

      .content-item-infos{
        width: 170px;

        ::v-deep .form-group{
          margin: 0;

          .toggle{
            display: flex;
            align-items: center;

            margin: 0;

            label{
              height: 100%
            }
          }
        }

        ::v-deep{
          .post{
            color: map-get($map: $colors, $key: "post")
          }
          .media{
            color: map-get($map: $colors, $key: "media")
          }
          .question{
            color: map-get($map: $colors, $key: "question")
          }
          .ideation{
            color: map-get($map: $colors, $key: "idea")
          }
          .survey{
            color: map-get($map: $colors, $key: "survey")
          }
          .wiki{
            color: map-get($map: $colors, $key: "wiki")
          }
        }
      }
    }

    .middle-row{
      display: flex;
      flex-wrap: wrap;
      column-gap: 50px;

      @media(max-width: $mobileBreakpoint){
        justify-content: center;
      }

      .content-item-search{
        .search{
          display: flex;

          align-items: center;
        }
      }
      .content-item-small-pipeline{
        width: 150px;
      }

      .content-item-search,
      .content-item-small-pipeline,
      .content-item-allow{
        display: flex;
        align-items: center;
      }

      .content-item-allow{
        ::v-deep .form-group{
          margin: 0;
        }
      }
    }
  }

  .right-row{
    display: flex;
    justify-content: flex-end;

    .content-item-context-menu{
      display: flex;
      align-items: center;
      width: 22px; // Same width as icon size

    }

  }
}

.dropdown-pipeline{
  padding: 0 20px 0 20px;
}

// Transition
// See with the UX Team

// .dropdown-enter-active,.dropdown-leave-active{
// transition: transform .5s ease-in-out;
//   transform-origin: top;
// }

// .dropdown-enter,.dropdown-leave-to{
// transform:scaleY(0);
// }

</style>
