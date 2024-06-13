<template>
  <vu-modal
    :show="show"
    :title="modalTitle"
    @close="() => $emit('close')"
  >
    <template #modal-body>
      <vu-form ref="form">
        <vu-select
          v-model="contentToReuseSelected"
          class="select-content-reuse"
          :label="$i18n('selectContentToReuse')"
          :options="contentToReuseList"
          :hide-placeholder-option="true"
          required
          :disabled="inEditionMode"
        />
        <vu-input
          v-model="contentName"
          :label="$i18n('name')"
          :rules="[
            v => v.length > 0 || 'Can\'t be empty',
          ]"
          required
        />

        <div class="icon-color">
          <h5>{{ $i18n('iconAndColor') }}</h5>

          <div class="section">
            <div class="demo-icon-color">
              <vu-icon
                :icon="iconSelected"
                :style="{color: colorSelected}"
              />
            </div>
            <SwymEditIconColor
              :color-selected="colorSelected"
              @iconSelected="(icon) => iconSelected = icon"
              @colorSelected="(color) => colorSelected = color"
            />
          </div>
        </div>
      </vu-form>
    </template>

    <template #modal-footer>
      <!-- Edit or Create button -->
      <vu-btn
        v-if="inEditionMode"
        color="primary"
        @click="edit"
      >
        {{ $i18n('confirm') }}
      </vu-btn>

      <vu-btn
        v-else
        color="primary"
        @click="create"
      >
        <vu-icon
          icon="plus"
          color="white"
        />{{ $i18n('create') }}
      </vu-btn>

      <vu-btn
        @click="() => $emit('cancel')"
      >
        {{ $i18n('cancel') }}
      </vu-btn>
    </template>
  </vu-modal>
</template>

<script>
export default {
  name: 'SwymFeatureCreationModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    iconList: {
      type: Array,
      required: true,
    },
    contentToReuseList: {
      type: Array,
      required: true,
    },
    feature: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return this.initialData();
  },
  watch: {
    show(newShowValue) {
      // Each time the modal is hidden (show == false)
      // -> Reset the modal
      if (!newShowValue) {
        this.reset();
      }
    },
  },
  computed: {
    /**
     * Return true if the component is in edition mode.
     * In Edition mode if the feature props exists.
     * @returns {boolean}
     */
    inEditionMode: function(){
      return this.feature ? true : false
    },


    /**
     * Return true if the component is in creation mode.
     * In Creation mode if the feature props does not exist.
     * @returns {boolean}
     */
    inCreationMode: function(){
      return this.feature ? false : true
    },

    /**
     * Return the title of the modal regarding the mode.
     * "Edit content type / Add content type".
     * @returns {string} Modal's title
     */
    modalTitle() {
      return this.inEditionMode ? this.$i18n('editContentType') : this.$i18n('addContentType');
    },
  },
  methods: {
    /**
     * Return the initial data
     */
    initialData() {
      const icon = this.feature && this.feature.icon;
      const color = this.feature && this.feature.color;
      const contentToReuse = this.feature && this.feature.contentToReuse;
      const name = this.feature && this.feature.label;

      return {
        iconSelected: icon || this.iconList[0],
        colorSelected: color || '#000000',
        contentToReuseSelected: contentToReuse || this.contentToReuseList[0].value,
        contentName: name || '',
      };
    },

    /**
     * Reset the modal with the initial data
     */
    reset() {
      Object.assign(this.$data, this.initialData());
    },

    /**
     * Check if the form is valid
     * & trigger create event
     */
    create() {
      if (this.$refs.form.validate()) {
        this.$emit('create', {
          contentToReuse: this.contentToReuseSelected,
          name: this.contentName,
          icon: this.iconSelected,
          color: this.colorSelected,
        });
      }
    },

    /**
     * Emit the "edit" event
     * - Label
     * - Icon/Color
     *  - Content to reuse (Post, Idea)
     */
    edit(){
      this.$emit(
        'edit',
        {
          label: this.contentName,
          icon: this.iconSelected,
          color: this.colorSelected,
          contentToReuse: this.contentToReuseSelected
        }
      )
    }
  },
};
</script>

<style lang="scss">
@import "../../styles/variables";

  .select-content-reuse{
    margin-bottom: 10px !important;
  }

  .icon-color{
    h5{
      color: $grey-7;
    }

    .section{
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .demo-icon-color{

      border: 2px solid lightgray;
      border-radius: 5px;

      //FIND ALTERNATIVE
      .fonticon{
        color: black;
        font-size: 24px;
      }
    }
  }

  .icon-list{
    height: 200px;
  }

  // When vu-select is disable, no UIKIT style is applied
  .form-control[disabled] ~ .select-choices{
    opacity: 1;
    cursor: default;
    color: $grey-5;
    background-color: $grey-2;
    border-color: $grey-3;
    user-select: none;

    &:hover{
      color: $grey-5;
      background-color: $grey-2;
      border-color: $grey-3;
    }
  }
</style>
