<template>
  <div class="lifecycle-section section">
    <div class="section-title">
      <h4>{{ $t('lifecycleSectionTitle') }}</h4>
    </div>

    <div
      class="section-content"
      v-mask="!isInitied"
    >
      <div class="add-version-form">
        <vu-btn
          :loading="isCreatingVersion"
          :disabled="isCreatingVersion"
          @click="confirmCreateVersion"
          color="primary"
        >
          {{ $t('addVersionBtnText') }}
        </vu-btn>
      </div>

      <table
        v-mask="isCreatingVersion"
        class="table versions-table"
      >
        <thead>
          <tr>
            <th>{{ $t('versionTHLabel') }}</th>
            <th>{{ $t('stateTHLabel') }}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <VersionTile
            v-for="version in versions"
            :key="version.revision"
            :version="version"
            :publishing="isPublishing"
            @publish="confirmPublishVersion"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
