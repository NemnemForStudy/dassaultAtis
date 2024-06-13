<template>
  <div class="community-setting">
    <div>
      <h3>{{ $i18n("content") }}</h3>
    </div>
    <div class="content-items">
      <SwymContentSettingItem
        v-for="feature, index in featuresComputed"
        :key="index"
        :feature="feature"
        :search-component="searchComponent"
        :readOnly="readOnly"
        @update:feature="(data) =>
        $emit('update:feature', {featureIndex: index, ...data})"
        @update:feature_checked="(checked) =>
          $emit('update:feature_checked', {featureIndex: index, featureChecked: checked})"
        @update:feature_allowContributorsToCreate_checked="(checked) =>
          $emit('update:feature_allowContributorsToCreate_checked',
                {featureIndex: index,
                 allowContributorsToCreateChecked: checked})"
        @update:feature_template="(data) =>
          $emit('update:feature_template', {featureIndex: index, ...data})"
        @search="(data) =>
          $emit('search', {featureIndex: index, ...data})"

        @addNewStatus="(status) => $emit('addNewStatus', {featureIndex: index, status})"
        @removeStatus="(statusIndex) => $emit('removeStatus', {featureIndex: index, statusIndex})"
        @changePositionStatus="(data) =>
          $emit('changePositionStatus', {featureIndex: index, ...data})"
        @update:status_label="(data) =>
          $emit('update:status_label', {featureIndex: index, ...data})"
        @update:status_color="(data) =>
          $emit('update:status_color', {featureIndex: index, ...data})"
        @update:status_minStatusToTransfer="(value) =>
          $emit('update:status_minStatusToTransfer',
                {featureIndex: index,
                 minStatusToTransfer: value})"

        @remove:derivedType="() => $emit('remove:derivedType', {featureIndex: index})"
        @showContentCreationInline ="(data)=>$emit('showContentCreationInline', {featureIndex: index,...data})"
        @showContentEditInline="(data)=>$emit('showContentEditInline', {featureIndex: index, ...data})" 

      />
    </div>

    <vu-icon-link
      v-if='!readOnly'
      icon="plus"
      @click="showFeatureCreationModal = true"
    >
      {{ $i18n('addContentType') }}
    </vu-icon-link>

    <!-- <div class="statistics">
     
      <vu-select
        v-model="roleSelected"
        label="Statistics available to"
        :options="roles"
      />
    </div> -->

    <SwymFeatureCreationModal
      :show="showFeatureCreationModal"
      :icon-list="['leaf', '3ds-what']"
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
      @create="addNewFeature"
      @cancel="showFeatureCreationModal = false"
      @close="showFeatureCreationModal = false"
    />
  </div>
</template>

<script>

export default {
  name: 'SwymCommunityContentSettings',
  props: {
    title: {
      type: String,
      required: true,
    },
    /**
     * List of available features
     */
    features: {
      type: Array,
      required: true,
    },
    /**
     * List of roles
     * @property {string} label
     */
    roles: {
      type: Array,
      default: () => [],
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
      roleSelected: null,
      showFeatureCreationModal: false,
    };
  },
  created() {
    this.roles.forEach((role) => {
      if (role.selected) {
        this.roleSelected = role.value;
      }
    });
  },
  methods: {
    addNewFeature(data) {
      this.$emit('addNewFeature', data);
      this.showFeatureCreationModal = false;
    },
  },
  computed: {
    featuresComputed(){
      if(this.readOnly){
        return this.features.filter(feature => feature.checked)
      } else {
        return this.features
      }
    }
  }
};
</script>

<style lang="scss">
// Align & center "Allow contributors to create" to the checkboxes
// TODO: find another way to this
.header{
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  .header-array{
    display: flex;
    justify-content: center;
    align-self: flex-end;
    text-align: center;
  }
}
/********/

.statistics{
  .form-group{
    display: flex; // inline label & select
    align-items: baseline; // align text from label & select
    flex-wrap: wrap; // select below label when viewport is reduced

    .select{
      width: 290px; // set size for select
    }

    .form-control{
      margin: 0; // margin to 0, else the select button is 1px bigger than select itself
    }

    label{
      margin-right: 5px; // space between label & select
    }
  }
}

.community-setting{
  .modal-wrap{
      padding-top: 30px;
    }
}

.content-items{
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  margin-bottom: 15px;
}
</style>
