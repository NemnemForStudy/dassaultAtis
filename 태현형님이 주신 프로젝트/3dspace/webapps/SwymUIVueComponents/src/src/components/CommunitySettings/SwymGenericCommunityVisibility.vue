<template>
  <div>
    <h5>{{ title }}</h5>
    <p v-if="description">
      {{ description }}
    </p>
    <div v-if="readOnly">
      <div class="label-visibility">
          <h5><vu-icon :icon="visibilitySelected.icon" /> {{ visibilitySelected.label }}</h5>
          <p>{{ visibilitySelected.description }}</p>
      </div>
    </div>
    <div
      ref="options"
      class="options"
      v-else
    >
      <vu-checkbox
        :value="value.visibilitySelected"
        type="radio"
        :options="formattedVisibility"
        @input="(v) => $emit('update:visibility', v)"
      />
      <div
        v-if="value.deactivateContentDisplayInWhatsNew"
        ref="optin"
        class="optin"
      >
        <vu-checkbox
          :value="value.deactivateChecked"
          :options="[value.deactivateContentDisplayInWhatsNew]"
          @input="(v) => $emit('update:blacklist', v)"
        />

        <!-- i18n for tooltip help, TO REMOVE -->
        <vu-icon-btn
          v-tooltip.top="$i18n('deactivateContentDisplayInWhatsNewHelp')"
          icon="info"
          class="info"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwymGenericCommunityVisibility',
  props: {
    value: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedVisibility() {
      const v = this.value.visibility.map((visibility) => ({
        ...visibility,
        label: `
        <div class="label-visibility">
          <h5><span class="fonticon fonticon-${visibility.icon}"></span>${visibility.label}</h5>
          <p>${visibility.description}</p>
        </div>`,
      }));

      return v;
    },
    visibilitySelected(){
      return this.value.visibility.find(el => this.value.visibilitySelected === el.value)
    },
  },
  
  mounted() {
    if (this.value.deactivateContentDisplayInWhatsNew) {
      const firstRadioButton = this.$refs.options && this.$refs.options.querySelector('.control-label');

      if(firstRadioButton){
        firstRadioButton.appendChild(this.$refs.optin);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

  .options, .optin{
    display: flex;
  }

  .optin{
    align-items: baseline;
  }

  ::v-deep .label-visibility{
    h5{
      margin: 0;
      color: $grey-6;

      .fonticon{
        font-size: 16px;
        margin: 0 5px 4px 0;
      }
    }

  }

  .optin ::v-deep {

    .vu-icon-btn{
      font-size: 14px;
      height: 14px;
      width: 14px;

      margin-left: 5px;
    }

    .form-group{
      margin-bottom: 0;
    }

    .toggle-primary{
      margin: 0;
    }

    .control-label{
      padding-bottom: 0 !important;
      padding-right: 0 !important;
    }
  }
</style>
