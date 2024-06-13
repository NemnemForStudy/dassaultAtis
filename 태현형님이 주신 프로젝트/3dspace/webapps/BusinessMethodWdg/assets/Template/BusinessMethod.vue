<template>
  <v-app
    class="main-content"
    v-mask="!isStoreInited"
  >
    <div
      v-if="!selectedAppId && !isMethodConfirmed"
      class="section apps-list-section"
      v-mask="isAppsFetching"
    >
      <div class="section-title">
        <h5>{{ $t('appsSectionTitle') }}</h5>
      </div>

      <div
        v-if="isAppsFailedToFetch"
        class="failed-to-fetch-apps"
      >
        <vu-message
          :show="true"
          color="error"
          :closable="false"
        >
          {{ $t('failedToFetchApps') }}
        </vu-message>
      </div>

      <div
        v-if="!hasApps && isAppsFetched"
        class="no-apps"
      >
        <vu-message
          :show="true"
          color="primary"
          :closable="false"
        >
          {{ $t('noApps') }}
        </vu-message>
      </div>

      <div
        v-if="isAppsFetched && hasApps"
        class="apps-list"
      >
        <AppTile
          v-for="(app, i) in apps"
          :key="`app-${i}`"
          :appId="app.id"
          :active="isSelectedApp(app)"
          @click="onSelectApp"
        />
      </div>
    </div>

    <div
      class="section create-method-section"
      v-if="selectedAppId"
    >
      <MethodForm
        :appId="selectedAppId"
        @confirm="onConfirmMethod"
        @cancel="onCancelMethod"
      >
    </div>
  </v-app>
</template>
