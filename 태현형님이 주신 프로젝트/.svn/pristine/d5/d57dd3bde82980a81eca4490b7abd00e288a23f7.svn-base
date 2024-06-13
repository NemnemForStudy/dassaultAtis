<template>
  <div class="icon-list">
    <vu-scroller
      ref="scroller"
      class="scroller"
      infinite
      :infinite-margin="10"
      @loading="loadMore"
    >
      <SwymIconSection
        v-for="iconItem, index in iconsList"
        :key="index"
        :title="iconItem.title"
        :icons="iconItem.icons"
        @click="(icon) => $emit('onIconClick', icon)"
      />
    </vu-scroller>
  </div>
</template>

<script>
import iconsData from '../../../assets/bm-icons.json';

export default {
  name: 'SwymIconList',
  data() {
    return ({
      iconsList: iconsData.data.slice(0, 2),
      length: iconsData.data.length,
      limit: 3,
    });
  },
  methods: {

    /**
     * Add new icon sections in the scroller
     */
    loadMore() {
      if (this.limit === this.length) {
        this.$refs.scroller.stopLoading();
        return;
      }
      // SetTimeout to avoid loading too many icons
      setTimeout(() => {
        if (this.limit + 3 < this.length) {
          this.limit += 3;
          this.iconsList = iconsData.data.slice(0, this.limit - 1);
        } else if (this.length - this.limit > 0) {
          this.limit = this.length;
          this.iconsList = iconsData.data.slice(0, this.length);
        }
        this.$refs.scroller.stopLoading();
      }, 500);
    },
  },
};
</script>

<style scoped>
  .icon-list{
    height: 100%;
  }
</style>
