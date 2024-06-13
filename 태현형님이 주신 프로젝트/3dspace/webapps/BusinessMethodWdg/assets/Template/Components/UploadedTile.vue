<template>
  <div :class="['uploaded-tile', {
    uploaded: success,
    'upload-error': error,
    uploading: loading
  }]">
    <span
      v-if="error"
      class="upload-error-msg"
    >
      {{ errorMsg }}
    </span>

    <span
      v-if="!hideStatus"
      class="upload-status"
    >
      <span
        class="uploaded-icon w-icon fonticon fonticon-cloud-upload"
        :title="uploadedIconTooltip"
      />
    </span>

    <span
      v-if="previewUrl"
      class="uploaded-preview"
    >
      <img
        class="uploaded-preview-img"
        :src="previewUrl"
      />
    </span>

    <span class="upload-info">
      <hr
        v-if="error"
        class="hr-upload-error"
      />
      <slot name="info">
        <span class="info-label info-part">
          <template v-if="href">
            <a
              :href="href"
              target="_blank"
              class="file-link"
            >
              {{ labelText }}
            </a>
          </template>
          <template v-else>
            {{ labelText }}
          </template>
        </span>

        <span
          v-if="type"
          class="info-type info-part"
        >
          <span
            v-if="typeIconUrl"
            class="uploaded-type-icon"
          >
            <img
              class="uploaded-type-icon-img"
              :src="typeIconUrl"
            />
          </span>
          <span class="uploaded-type-text">
            {{ typeText }}
          </span>
        </span>

        <span
          v-if="lastModified"
          class="info-lastmodified info-part"
        >{{ lastModifiedText }}</span>

        <span
          v-if="size"
          class="info-size info-part"
        >{{ sizeText }}</span>
      </slot>
    </span>

    <span class="upload-actions">
      <span
        v-if="!hideDelete"
        class="delete-upload-btn w-icon clickable fonticon fonticon-trash"
        :title="$t('deleteUploadedTooltip')"
        @click="remove"
      />
    </span>

    <span
      class="upload-progress"
      v-if="loading"
    >
      <v-progress-circular
        class="loading"
        size="20"
        width="1"
        color="#77797c"
        indeterminate
      />
    </span>
  </div>
</template>
