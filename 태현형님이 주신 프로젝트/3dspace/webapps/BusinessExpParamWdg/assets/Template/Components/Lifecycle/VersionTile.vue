<template>
  <tr class="version-tile">
    <td class="">V{{ version.revision }}</td>
    <td class="">{{ version.state }}</td>
    <td class="publish-ctn">
      <div
        v-if="isStateInWork"
        class="publish-btn-ctn"
      >
        <vu-btn
          :loading="publishing"
          :disabled="publishing || isStatePublished"
          :color="publishBtnColor"
          type="button"
          @click="publish(PUBLISH_TARGET_PLATFORM)"
        >
          {{ $t('publish') }}
        </vu-btn>
      </div>

      <div
        class="published-ctn"
        v-if="isStatePublished"
      >
        <span class="fonticon fonticon-status-ok published-icon" />
        {{ $t('published') }}
      </div>
    </td>
  </tr>
</template>
