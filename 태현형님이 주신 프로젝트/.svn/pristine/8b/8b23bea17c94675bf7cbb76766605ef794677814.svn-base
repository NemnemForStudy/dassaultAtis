<template>
  <!-- using vuetify's generic component v-input is handy for homogeneous labels, validation, etc. -->

  <!-- ENH: <v-input> broke <vu-select>, need to find why and how to fix -->
  <div :class="['vjsf-roles-input', {
      'error--text': !this.valid
    }]">
    <vu-multiple-select
      ref="select"
      :value="value"
      :label="label"
      :required="required"
      :placeholder="placeholder"
      :options="items"
      :rules="rules"
      :helper="helper"
      :disabled="disabled"
      autocomplete
      @input="onInput"
      @focus="onFocus"
      @blur="(required || rules) && $emit('validate')"
    />

    <span
      class="fetch-roles-progress"
      v-if="isFetchingRoles"
    >
      <v-progress-circular
        class="loading"
        size="20"
        width="1"
        color="#77797c"
        indeterminate
      />
    </span>

    <v-input
      ref="validInput"
      :value="value"
      :name="fullKey"
      :disabled="disabled"
      :rules="rules"
      :required="required"
      class="validation-input"
    />
  </div>
</template>
