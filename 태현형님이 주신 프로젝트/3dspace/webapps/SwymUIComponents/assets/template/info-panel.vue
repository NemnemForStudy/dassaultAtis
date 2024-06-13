<template>
  <div class="info-panel-view" >
    <div class="media-details-view-container" v-if="!(isEdit||editProperties)" >
        <div class="form-group">
            <label class="control-label">{{titleText}}</label>
            <div class ="properties">{{title}}</div>
            <label class="control-label">{{descriptionText}}</label>
            <div class ="properties" v-html="description"></div>
            <label class="control-label">{{authorText}}</label>
            <div class ="author-container" ref="authorContainer"></div>
            <template v-if="!isStorySketchWhiteboardModel">
              <label class="control-label">{{filesDetailsText}}</label>
              <div class ="media-display-flex">
                  <div class="media-label-details">
                      <div class="media-details-label">{{fileNameText}}</div>
                      <div class="media-details-label">{{resolutionText}}</div>
                      <div class="media-details-label">{{sizeText}}</div>
                  </div>
                  <div class="media-content-details">
                      <div>{{fileName}}</div>
                      <div>{{resolution}}</div>
                      <div>{{size}}</div>
                  </div>
              </div>
            </template>
          <div v-if="relatedPosts && relatedPosts.length">
            <label class="control-label">{{relatedPostsText}}</label>
            <div class="wraper_related_post" v-for="post in relatedPosts" :key="post.c_post_id">
              <span class ="fonticon fonticon-newspaper"></span>
              <a
                    class = "related-post-link"
                    :data-content-id="post.c_post_id"
                    data-content-type="post"
                    :data-community-id="post.community_id"
                    >{{post.post_title.escapeHTML()}}</a>
            </div>
          </div>
        </div>
    </div>
    <div class="media-properties-panel-edition" v-else>
        <div :style="rightColStyle">
          <vu-input
            :placeholder="titlePlaceholderText"
            :label="titleText"
            :required="true"
            v-model="title"
            v-on:input="onInput"
            :rules="titleInputRules"
            ref="titleInput"
          />
          <div class="form-group">
            <label class="control-label">{{ descriptionText }}</label>
            <div class="lightbox-right-content" ref="editInfoContainer"></div>
          </div>
          <div class="button-bar-background" v-show="!editProperties">
            <div class="button-bar-wrapper">
              <vu-btn v-on:click="onSave" color="primary">{{
              saveText
            }}</vu-btn>
            <vu-btn v-on:click="onCancel">{{ cancelText }}</vu-btn>
            </div>
          </div>
        </div>
    </div>
    
  </div>
  
</template>