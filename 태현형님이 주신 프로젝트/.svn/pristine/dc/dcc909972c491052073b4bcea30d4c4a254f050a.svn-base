<template v-if="isVisible" 
          v-show="isVisible">
    <vu-lightbox
      ref='lightboxContainer'
      :title="title"
      z-index="100"
      :disableCompass="true" 
      :userId="userId"
      :primary-actions="primaryActions"
      :customActions="true"
      :menu-actions="menuActions"
      :side-actions="sideActions"
      :panels="panels"
      :objectType="objectType"
      :widget="is3DDWidget"
      :noAnimation="true"
      :closeLabel="closeLabel"
      :moreActionsLabel="moreActionsLabel"
      v-on:click-comment="onClickComment"
      v-on:click-share="onClickShare"
      v-on:click-download="onClickDownload"
      v-on:click-information="onClickInformation"
      v-on:click-edit="goToEdit"
      v-on:click-more-actions="onClickMoreActions"
      v-on:click-next="onClickNext"
      v-on:click-previous="onClickPrevious"
      v-on:close="onClose"
      v-on:close-panel-comment="onClickComment"
      v-on:close-panel-information="onClickInformation"
      v-on:panel-edit-information="onEditPropertiesPanelClick"
      >
      <template v-slot:lightbox-content>
        <div class="shared-lightbox-content" :style="lightboxStyle" ref="lightboxContentContainer"></div>
      </template>
      <template v-slot:lightbox-panel-comment>
      </template>
      <template v-slot:lightbox-panel-information>
        <info-panel :isEdit="isPropertyEdit" v-on:switch-info-panel="onCancelEditProperties" :title="title"></info-panel>
      </template>
    </vu-lightbox>
</template>
