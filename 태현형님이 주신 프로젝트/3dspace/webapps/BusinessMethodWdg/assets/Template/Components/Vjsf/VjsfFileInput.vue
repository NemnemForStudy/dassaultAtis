<template>
  <!-- using vuetify's generic component v-input is handy for homogeneous labels, validation, etc. -->
  <v-input
    :value="value"
    :name="fullKey"
    :label="label"
    :disabled="disabled"
    :rules="rules"
    :required="required"
    class="vjsf-file-input"
    @click="!value && $emit('validate')"
  >
    <div v-if="showFileInput">
      <input
        ref="fileInput"
        type="file"
        name="upload"
        style="display: none;"
        @change="onSelectFile"
      >

      <vu-btn @click="browseFile">
        <span class="fonticon fonticon-attach" />
        Browse...
      </vu-btn>
    </div>

    <div
      v-if="hasFile"
      class="uploaded-file"
    >
      <div class="wrapper-uploaded-file">
        <UploadedTile
          :href="file.href"
          :label="file.model.name"
          :lastModified="file.model.lastModified"
          :size="file.model.size"
          :type="file.model.type"
          :loading="file.uploading"
          :success="file.uploaded"
          :error="file.error"
          :error-msg="fileErrorMsg"
          :hide-delete="file.uploading"
          @remove="removeFile"
        >
        </UploadedTile>
      </div>
    </div>
  </v-input>
</template>
