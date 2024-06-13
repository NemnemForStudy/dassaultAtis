<template>
  <!-- using vuetify's generic component v-input is handy for homogeneous labels, validation, etc. -->
  <v-input
    :value="value"
    :name="fullKey"
    :label="label"
    :disabled="disabled"
    :rules="rules"
    :required="required"
    class="vjsf-3dsearch-input"
  >
    <v-text-field
      v-if="showSearchInput"
      v-model="searchInput"
      outlined
      hide-details
      clearable
      @keydown.enter="search"
      @blur="(required || rules) && $emit('validate')"
      class="search-input"
    >
      <template v-slot:append-outer>
        <v-btn
          icon
          @click="search"
        >
          <span class="fonticon fonticon-search w-icon clickable" />
        </v-btn>
      </template>
    </v-text-field>

    <div
      v-if="hasAsset"
      class="uploaded-result"
    >
      <div class="wrapper-uploaded-result">
        <UploadedTile
          :label="getLabel()"
          :type="getType()"
          :previewUrl="getPreviewUrl()"
          :type-icon-url="getTypeIconUrl()"
          :loading="asset.uploading"
          :success="asset.uploaded"
          :error="asset.error"
          :error-msg="assetErrorMsg"
          :hide-delete="asset.uploading"
          hide-status
          @remove="remove"
        />
      </div>
    </div>
  </v-input>
</template>
