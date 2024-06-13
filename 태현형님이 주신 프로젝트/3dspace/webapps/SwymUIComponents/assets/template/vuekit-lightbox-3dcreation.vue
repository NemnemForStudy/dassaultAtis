<template v-if="isVisible" 
          v-show="isVisible">
    <vu-lightbox
      :noAnimation="true"
      :title="title"
      z-index="100"
      :disableCompass="true"
      :userId="userId"
      :objectType="objectType"
      :widget="is3DDWidget"
      :primary-actions="primaryActions"
      :side-actions="sideActions"
      :closeLabel="closeLabel"
      :moreActionsLabel="moreActionsLabel"
      v-on:close="onClose"
      >
      <template v-slot:lightbox-content>
        <div class="vuekit-lightbox-3dcreation" :style=lightboxStyle ref="lightboxContentContainer"></div>
      </template>
    </vu-lightbox>
</template>
