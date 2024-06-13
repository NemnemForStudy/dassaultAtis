<template>
  <div
    :class="['app-tile', {
            active: active,
            'interaction': interaction
        }]"
    @click="onClick"
  >
    <div class="icon-ctn">
      <v-progress-circular
        v-if="showIconLoading"
        class="loading"
        size="15"
        width="1"
        color="#77797c"
        indeterminate
      />

      <div
        class="icon"
        :style="styles.icon"
      />

      <div
        :class="['icon-wrapper', `is-${appBrand}`]"
        :style="styles.iconWrapper"
      />
    </div>

    <div class="name">
      {{ appName }}
    </div>
  </div>
</template>
