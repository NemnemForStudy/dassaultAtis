<template>
  <div>
    <h3>{{ $i18n("communityVisibility") }}</h3>
    <!-- i18n, TO REMOVE -->
    <!-- same for title & description -->
    <SwymGenericCommunityVisibility
      class="visibility-employee-container col-sm-6 col-xs-12"
      :value="visibilityModel.employees"
      :title="$i18n('visibilityForEmployees')"
      @update:visibility="(v) => $emit('update:employeesVisibility', v)"
      @update:blacklist="(v) => $emit('update:employeesBlacklist', v)"
      :readOnly="readOnly"
    />
    <SwymGenericCommunityVisibility
      class="visibility-contractor-container col-sm-6 col-xs-12"
      :value="visibilityModel.contractors"
      :title="$i18n('visibilityForContrators')"
      @update:visibility="(v) => $emit('update:contractorsVisibility', v)"
      :readOnly="readOnly"
    />
  </div>
</template>

<script>
export default {
  name: 'SwymCommunityVisibility',
  props: {
    visibilityModel: {
      type: Object,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style>

</style>
