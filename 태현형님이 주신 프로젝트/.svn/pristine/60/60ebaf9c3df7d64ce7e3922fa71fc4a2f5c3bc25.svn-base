<template v-if="isVisible">
  <div class="media-content-edition">
    <vu-lightbox
      ref="lightboxContainer"
      :disableCompass="true" 
      :title="title"
      z-index="100"
      :userId='userId'
      :objectType="objectType"
      :panels="panels"
      :widget="is3DDWidget"
      :closeLabel="closeLabel"
      :moreActionsLabel="moreActionsLabel"
      v-on:click-comment="onClickComment"
      v-on:click-information="onClickInformation"
      v-on:close="onClose"
      v-on:close-panel-comment="onClickComment"
      v-on:close-panel-information="onClickInformation"
      :primaryActions="primaryActions"
      :sideActions="[]"
      :customActions="true"
      :customSideActions="true"
      :noAnimation="true"
    >
      <template v-slot:lightbox-content>
        <div
          class="lightbox-left-content"
          ref="leftContainer"
          :style="lightboxStyle"
          v-mask="masked"
        ></div>
      </template>
      <template v-slot:lightbox-panel-comment ref="lightboxComment">
        <div class="comment-panel" ref="lightboxComment"></div>
      </template>
      <template v-slot:lightbox-panel-information >
        <info-panel :editProperties="isInfoPanelCreation" :title="title" v-on:title-input="onTitleInput"></info-panel>
      </template>
    </vu-lightbox>
  </div>
</template>
