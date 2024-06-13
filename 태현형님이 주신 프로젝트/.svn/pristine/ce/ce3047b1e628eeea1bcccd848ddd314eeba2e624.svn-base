<template>
  <div class="description-section section">
    <div class="section-title">
      <h4>{{ $t('descriptionSectionTitle') }}</h4>
    </div>

    <div class="section-content">
      <vu-form ref="form">
        <div :class="['tagline-description-ctn form-group', {
          'has-error': typeof taglineLengthRule === 'string'
        }]">
          <label class="control-label">
            {{ taglineLabel }}
          </label>
          <div class="tagline-ctn form-control form-control-custom">
            <vu-textarea
              class="tagline-textarea"
              v-model.trim="tagline"
              :rules="[taglineLengthRule]"
            />
          </div>

          <div class="description-ctn">
            <div :class="['form-group form-group-description', {
              'has-error': typeof descriptionLengthRule === 'string'
            }]">
              <label class="control-label">
                {{ descriptionLabel }}
              </label>
              <div class="form-control form-control-custom">
                <vu-textarea
                  class="description-textarea"
                  v-model.trim="description"
                  :rules="[descriptionLengthRule]"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="thumbnail-assets-ctn">
          <div class="thumbnail-ctn">
            <div class="form-group">
              <label class="control-label">
                {{ $t('thumbnailLabel') }}
              </label>

              <dropzone
                class="thumbnail asset"
                v-model="that[THUMBNAIL_KEY].model"
                :preview="that[THUMBNAIL_KEY].url"
                :min-height="172"
                :max-height="172"
                :min-width="310"
                :max-width="310"
                :no-check-dimension="true"
                :types="['jpg', 'jpeg']"
                :showRatio="false"
                :loading="that[THUMBNAIL_KEY].uploading"
                :error="that[THUMBNAIL_KEY].error"
                @input="setAsset(THUMBNAIL_KEY, $event)"
                @delete="deleteAsset(THUMBNAIL_KEY)"
              />
            </div>
          </div>

          <div class="assets-ctn form-group">
            <label class="control-label">
              {{ $t('assetsLabel') }}
            </label>

            <label
              class="control-label"
              style="display: block; margin-bottom: 5px;"
            >
              {{ $t('assetsDimensionLabel') }}
            </label>

            <div class="assets-list-ctn">
              <dropzone
                v-for="(asset, key) in assetsMap"
                :key="key"
                :class="['asset', key]"
                v-model="asset.model"
                :preview="asset.url"
                :showLabel="false"
                :min-height="172"
                :max-height="172"
                :min-width="310"
                :max-width="310"
                :no-check-dimension="true"
                :loading="asset.uploading"
                :error="asset.error"
                @input="setAsset(key, $event)"
                @delete="deleteAsset(key)"
              />
            </div>
          </div>
        </div>
      </vu-form>
    </div>
  </div>
</template>
