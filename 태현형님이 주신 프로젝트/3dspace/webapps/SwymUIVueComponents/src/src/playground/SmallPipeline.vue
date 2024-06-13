<template>
  <div>
    <SwymSmallPipeline :items="list" />
  </div>
</template>

<script>
export default {
  name: 'SmallPipeline',
  data() {
    return {
      list: [
        {
          color: 'red',
        },
        {
          color: 'blue',
        },
        {
          color: 'green',
        },
      ],
    };
  },
};
</script>

<style>

</style>
