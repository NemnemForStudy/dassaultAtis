<template>
  <!-- eslint-disable max-len -->
  <div class="playground">
    <div class="navigation">
      <SwymThreadsList
        :threads="filteredThreads"
        :selected.sync="selected"
        :i18n-keys="{
          myThread: 'Components',
          favoriteThreads: 'favoriteCommunities',
          inputPlaceholder: 'Find Components',
          unfollow: 'unfollowCommunities',
        }"
        @search="search = $event"
      />
    </div>
    <div class="main">
      <component :is="selected" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      search: '',
      selected: 'TimelineComponents',
      threads: window.components.map((el) => ({
        title: el,
        id: el,
        image: 'fonticon-electronic-component',
      })),
    };
  },
  computed: {
    filteredThreads() {
      return this.threads
        .filter((el) => el.title.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
};
</script>

<style lang="scss" scoped>
.playground {
  height: 100vh;
  display: flex;
  background-color: #f4f5f6;

  .navigation {
    width: 300px
  }
  .main {
    width: calc(100vw - 300px);
    max-height: 100%;
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
}
</style>
