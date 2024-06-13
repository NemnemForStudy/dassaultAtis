<template>
  <div class="wrapper">
    <SwymContributionsList
      ref="com"
      :contributions="contributions"
      :infinite="infinite"
      @onScrollerLoad="onScrollerLoad"
    />
  </div>
</template>

<script>
import contributions from "../assets/mocks/contributions.json";
export default {
  name: "ContributionsList",
  data() {
    return {
      limit: 20,
      infinite: true,
      contributions: contributions.slice(0, 20),
    };
  },
  methods: {
    onScrollerLoad() {
      this.limit += 20;
      setTimeout(() => {
        this.contributions = contributions.slice(0, this.limit);
        this.infinite = this.limit <= contributions.length;
        this.$refs.com.onLoadingEnd();
      }, 1000);
    },
  },
};
</script>

<style>
.wrapper {
  max-width: 1135px;
  width: 100%;
  height: 700px;
  position: relative;
}
</style>
