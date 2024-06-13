<template>
  <div :class="['form-group', {
      'has-error':error
  }]">
    <label
      v-if="showLabel"
      class="control-label"
    >
      {{ completeLabel }}
    </label>

    <input
      ref="upload-input"
      type="file"
      name="upload"
      style="display: none;"
      @change="fileFromInput"
    >

    <div :style="`max-width: ${maxWidth}px;`">
      <div :style="keepRatio ? `position: relative; width: 100%; padding-top: ${aspectRatio * 100}%` : ''">
        <div :class="{'ratio-container': keepRatio}">
          <div
            v-mask="loading"
            :class="['drop-container', {
              'is-dragover': dragOver
            }]"
            :style="keepRatio ? 'width: 100%; height: 100%' : `max-width: ${maxWidth}px; height: ${maxHeight}px;`"
            @drop.prevent.stop="fileFromDrop"
            @dragover.prevent="dragOver = true"
            @dragenter.prevent="dragOver = true"
            @dragleave="dragOver = false"
            @dragend="dragOver = false"
          >
            <video
              v-if="!error && isVideo(value)"
              :src="url"
            />
            <div
              :style="backgroundStyle"
              :class="['inner-container', {
                'preview': url
              }]"
            >
              <div>
                <span class="fonticon fonticon-drag-drop" />
              </div>

              <div class="drop-or-browse">
                {{ $t('dropImageOr') }}
                <span
                  id="button"
                  class="btn-link browse-btn"
                  @click="$refs['upload-input'].click()"
                >
                  {{ $t('browse') }}
                </span>
              </div>

              <div
                v-if="downloadUrlComputed"
                class="download-or-remove"
              >
                <a
                  :href="downloadUrlComputed"
                  class="btn btn-link"
                  download
                >
                  {{ $t('downloadAsset') }}
                </a>

                <vu-btn
                  class="btn-link"
                  @click="$emit('delete')"
                >
                  {{ $t('deleteAsset') }}
                </vu-btn>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <span
      v-if="error"
      class="form-control-error-text"
      style="display: block;"
    >
      {{ error }}
    </span>

  </div>
</template>
