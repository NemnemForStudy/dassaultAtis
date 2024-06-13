<template>
  <div
    ref="thread"
    class="social-threads-list"
  >
    <div class="social-threads-toolbar-container">
      <div class="social-threads-toolbar-search">
        <input
          :value="search"
          type="text"
          :placeholder="$i18n(i18nKeys.inputPlaceholder)"
          spellcheck="true"
          class="input-button-left-part form-control form-control-root"
          @input="search = $event.target.value; $emit('search', search)"
        >
        <button
          type="button"
          class="input-button-right-part btn btn-root btn-with-icon btn-without-label"
          @click="search = ''; $emit('search', search)"
        >
          <span
            :class="'fonticon fonticon-clickable fonticon-' +
              (search ? 'cancel-circled' : 'search') "
          />
        </button>
      </div>
      <span
        v-for="icon in icons"
        :key="`social-threads-action-icons-${icon.fonticon}`"
        v-tooltip.body="icon.tooltip"
        :class="`social-threads-action-icons fonticon fonticon-clickable fonticon-${icon.fonticon}`"
        @click="$emit('click:icon', icon.fonticon)"
      />
    </div>
    <hr>
    <vu-scroller>
      <div
        class="my-threads social-threads-list-container"
        style="width: 100%;"
      >
        <template v-if="showWhatsNew">
          <div class="list-container">
            <SwymThreadTile
              image="fonticon-home"
              :name="$i18n('whatsNew')"
              :selected="!selected"
              @click="$emit('update:selected', '')"
            />
          </div>
          <hr>
        </template>
        <template v-if="showFavorites">
          <div class="list-container">
            <div class="favorites-thread-container">
              <div class="threads-section-header">
                <h5>{{ $i18n(i18nKeys.favoriteThreads) }}</h5>
                <a
                  v-if="type !== 'ritual'"
                  class="link show-all-threads"
                  @click="$emit('show-all-favorites')"
                >{{ $i18n('showAll') }}</a>
              </div>
              <div class="sortable-list-view-container">
                <vu-lazy
                  v-for="(thread, n) in favoriteThreads"
                  :key="thread.id"
                  height="60px"
                  :style="`order: ${n};`"
                >
                  <SwymThreadTile
                    v-show="!draggedThread || draggedThread.id !== thread.id"
                    :image="thread.image"
                    :selected="selected === thread.id"
                    :dropdown-options="dropDownOptions(thread)"
                    :unread="hasUnreadMessage(thread)"
                    :name="thread.title"
                    :draggable="showFavorites"
                    @dragstart.native="startDrag($event, thread)"
                    @dragend.native="stopDrag"
                    @dragover.native.prevent="dragOver($event, thread)"
                    @click="$emit('update:selected', thread.id)"
                  />
                </vu-lazy>
                <transition
                  name="fade-height"
                  mode="out-in"
                >
                  <div
                    v-show="(!favoriteThreads.length && !search) || draggedThread"
                    :style="`order: ${dropPosition};`"
                    class="drop-zone-default"
                    @drop="addFavorite(draggedThread)"
                    @dragover.prevent
                    @dragenter.prevent="$event.currentTarget.classList.add('dragover')"
                    @dragleave.prevent="$event.currentTarget.classList.remove('dragover')"
                  >
                    <span class="fonticon fonticon-drag-drop fonticon-2x" />
                    <span class="drop-zone-placeholder">{{ $i18n('dropAddFavorite') }}</span>
                  </div>
                </transition>
                <transition
                  name="fade-height"
                  mode="out-in"
                >
                  <div
                    v-show="draggedThread && draggedThread.is_favorite"
                    class="drop-zone-trash"
                    :style="`order: ${favoriteThreads.length};`"
                    @drop="removeFavorite(draggedThread)"
                    @dragover.prevent
                    @dragenter.prevent="$event.currentTarget.classList.add('dragover')"
                    @dragleave.prevent="$event.currentTarget.classList.remove('dragover')"
                  >
                    <span class="fonticon fonticon-trash fonticon-2x" />
                    <span class="drop-zone-placeholder">{{ $i18n('dropRemoveFavorite') }}</span>
                  </div>
                </transition>
                <div
                  v-if="search && !favoriteThreads.length"
                  class="threads-no-result"
                >
                  <span class="fonticon fonticon-search" />
                  <span>{{ $i18n('noSearchResult') }}</span>
                </div>
              </div>
            </div>
          </div>
          <hr>
        </template>
        <div class="list-container item-list-container">
          <div class="other-threads-container">
            <div class="threads-section-header">
              <h5>{{ $i18n(i18nKeys.myThread) }}</h5>
              <a
                v-if="type !== 'ritual'"
                class="link show-all-threads"
                @click="$emit('show-all-threads')"
              >{{ $i18n('showAll') }}</a>
            </div>
            <div class="item-list-body">
              <vu-lazy
                v-for="thread in otherThreads"
                :key="thread.id"
                height="60px"
              >
                <SwymThreadTile
                  v-show="!draggedThread || draggedThread.id !== thread.id"
                  :image="thread.image"
                  :selected="selected === thread.id"
                  :dropdown-options="dropDownOptions(thread)"
                  :unread="hasUnreadMessage(thread)"
                  :name="thread.title"
                  :draggable="showFavorites"
                  @dragstart.native="startDrag($event, thread)"
                  @dragend.native="stopDrag"
                  @click="$emit('update:selected', thread.id)"
                />
              </vu-lazy>
            </div>
            <template v-if="!otherThreads.length">
              <div
                v-if="!search"
                class="drop-zone-default"
              >
                <span class="fonticon fonticon-drag-drop fonticon-2x" />
                <span class="drop-zone-placeholder">{{ $i18n('dropAddFavorite') }}</span>
              </div>
              <div
                v-else
                class="threads-no-result"
              >
                <span class="fonticon fonticon-search" />
                <span>{{ $i18n('noSearchResult') }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </vu-scroller>
  </div>
</template>

<script>
import throttle from '../utils/throttle';

export default {
  name: 'SwymThreadsList',
  props: {
    type: {
      type: String,
      default: '',
      validator(value) { return ['', 'community', 'conversation', 'ritual'].includes(value); },
    },
    threads: {
      type: Array,
      required: true,
    },
    icons: {
      type: Array,
      default: () => ([]),
    },
    showFavorites: {
      type: Boolean,
      default: false,
    },
    showWhatsNew: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String,
      default: '',
    },
    i18nKeys: {
      type: Object,
      default: () => ({
        myThread: 'myCommunities',
        favoriteThreads: 'favoriteCommunities',
        inputPlaceholder: 'findCommunities',
        unfollow: 'unfollowCommunities',
      }),
    },
  },
  data: () => ({
    dropPosition: 0,
    search: '',
    draggedThread: null,
  }),
  computed: {
    favoriteThreads() {
      return this.threads.filter((el) => el.is_favorite);
    },
    otherThreads() {
      return this.showFavorites ? this.threads.filter((el) => !el.is_favorite) : this.threads;
    },
  },
  methods: {
    startDrag(event, thread) {
      // eslint-disable-next-line no-param-reassign
      event.dataTransfer.effectAllowed = 'move';
      setTimeout(() => { this.draggedThread = thread; });
    },
    stopDrag() {
      this.draggedThread = null;
      this.dropPosition = this.favoriteThreads.length;
    },
    dragOver: throttle(function dragOver(event, thread) {
      const { clientY, target } = event;
      let currentTarget = target;
      while (!currentTarget.className.includes('thread-view')) {
        currentTarget = currentTarget.parentElement;
      }
      const bounding = currentTarget.getBoundingClientRect();
      this.dropPosition = this.favoriteThreads.indexOf(thread);
      if (clientY - bounding.top < bounding.height / 2) { this.dropPosition -= 1; }
    }, 100),
    addFavorite(thread) {
      this.$emit('add-favorite', thread);
    },
    removeFavorite(thread) {
      this.$emit('remove-favorite', thread);
    },
    hasUnreadMessage(thread) {
      return (thread.last_message && thread.last_message.message_id)
      !== (thread.mark && thread.mark.message_id);
    },
    dropDownOptions(thread) {
      const options = [];
      if (this.type === 'community') {
        options.push({
          text: this.$i18n(this.i18nKeys.unfollow),
          fonticon: 'eye-slash',
          handler: (item) => this.$alert(`Click on ${item.text}! (${thread.title})`),
        });
      }

      if (this.showFavorites) {
        if (thread.is_favorite) {
          options.unshift({
            text: this.$i18n('removeFavorite'),
            fonticon: 'favorite-delete',
            handler: () => this.removeFavorite(thread),
          });
        } else {
          options.unshift({
            text: this.$i18n('addFavorite'),
            fonticon: 'favorite-add',
            handler: () => this.addFavorite(thread),
          });
        }
      }
      if (['community', 'conversation'].includes(this.type) && this.hasUnreadMessage(thread)) {
        options.unshift({
          text: this.$i18n('markAsRead'),
          fonticon: 'eye',
          handler: () => this.$emit('mark-as-read', thread),
        });
      }
      return options;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

// eslint-disable-next-line vue-scoped-css/require-selector-used-inside
.social-threads-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: white;

  .social-threads-toolbar-container {
    padding: 15px 10px 15px;
    flex: 0 0 auto;
    display: flex;
    background-color: white;
    min-height: 38px;

    .social-threads-toolbar-search {
      display: flex;
      position: relative;
      border-radius: 18px;
      width: 100%;
      height: 100%;
      margin-right: 10px;

      .form-control.input-button-left-part {
        border-color: $grey-5;
        border-radius: 19px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 6px 8px 6px 14px;
      }

      .btn.input-button-right-part {
        position: absolute;
        right: 0;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 38px;
        padding: 9px 9px 9px 8px;
        cursor: text;
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
      }
    }

    .social-threads-action-icons {
      min-width: 38px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 18px;
      margin: 0;
    }
  }

  .sortable-list-view-container {
    display: grid;
  }

  .threads-section-header {
    display: flex;
    justify-content: space-between;
    color: $blue-2;
    border-bottom: 1px solid $grey-2;
    margin: 0px calc(4% - -10px);

    h5, .link.show-all-threads {
      font-weight: bold;
      margin-top: 8px;
      margin-bottom: 8px;
      line-height: 12px;
      font-size: 12px;
    }

    .link.show-all-threads {
      cursor: pointer;
    }
  }

  .threads-no-result {
    text-align: center;
    color: $grey-5;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: $grey-5;
    margin: 30px 0px;
    font-size: 16px;
  }

  .drop-zone-default, .drop-zone-trash {
    border: solid 2px transparent;
    position: relative;
    margin: 10px 2px;
    padding: 15px 20px;
    border-radius: 3px;
    display: flex;
    line-height: 1.2em;
    align-items: center;

    .drop-zone-placeholder {
      vertical-align: super;
      margin: 0 5px;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  // eslint-disable-next-line vue-scoped-css/no-unused-selector
  .drop-zone-default {
    color: $blue-2;
    border-color: $blue-2;

    &.dragover {
      border-color: $blue-4;
      color: $blue-4;
    }
  }

  // eslint-disable-next-line vue-scoped-css/no-unused-selector
  .drop-zone-trash {
    border-color: $red-1;
    color: $red-1;

    &.dragover {
      border-color: $red-2;
      color: $red-2;
    }
  }

  hr {
    margin: 0;
    border-top: solid 4px $grey-2;
  }
}
</style>

<style>
.social-threads-list .vu-scroll-container {
  overflow-y: overlay;
}
</style>
