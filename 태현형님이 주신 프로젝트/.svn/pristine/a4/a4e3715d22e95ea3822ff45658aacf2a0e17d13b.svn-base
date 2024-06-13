<template>
  <!-- eslint-disable max-len -->
  <div class="wrapper">
    <SwymThreadsList
      type="community"
      :threads="filteredThreads"
      :selected.sync="selected"
      show-whats-new
      show-favorites
      :icons="[{ fonticon: 'chat-alt with-unread-content'}, { fonticon: 'logo-3dswym-add'}]"
      @search="search = $event"
      @remove-favorite="$event.is_favorite = false"
      @add-favorite="$event.is_favorite = true"
    />
  </div>
</template>

<script>
import communities from '../assets/mocks/communities.json';

export default {
  name: 'ThreadsList',
  data() {
    return {
      search: '',
      selected: '',
      communities: communities.map((el) => ({
        ...el,
        image: `https://picsum.photos/seed/${el.id}/50`,
      })),
    };
  },
  computed: {
    filteredThreads() {
      return this.communities
        .filter((el) => el.title.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 400px;
  width: 400px;
}
</style>
