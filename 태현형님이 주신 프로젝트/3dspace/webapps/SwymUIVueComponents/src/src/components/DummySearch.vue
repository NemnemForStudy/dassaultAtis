<template>
  <div>
    <input>
    <vu-icon-btn
      icon="search"
      @click="onClick"
    />
  </div>
</template>

<script>
// Dummy Search for local test purposes

export default {
  name: 'DummySearch',
  methods: {
    onClick() {
      const that = this;
      this.$emit('change', {
        asset: {
          preview_url: 'https://dsext001-eu1-215dsi0708-3dswym.3dexperience.3ds.com/api/media/streammedia/id/v-IkEFevTbKzQXt0AUsT3A/type/thumb/key/l_thumb/update/b61c34e04d8813458e99883523cf5fd8',
          'ds6w:label': 'test title',
          'ds6w:description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra eu arcu vel euismod. Vestibulum at sem ut lectus scelerisque eleifend id id elit. Praesent laoreet tincidunt leo, quis gravida elit tincidunt eget. Mauris vitae posuere odio, id ultricies eros. Ut blandit orci laoreet molestie lobortis. Sed id eros finibus, pulvinar elit sit amet, cursus metus. Praesent lobortis commodo leo, porttitor gravida nibh elementum quis. Cras dui velit, hendrerit in hendrerit vitae, vulputate eu est.',
          id: 'xxx',
          'ds6w:type': that.getRandomType(),
        },
      });
    },

    getRandomType() {
      const getRandomInt = (min, max) => {
        const mini = Math.ceil(min);
        const maxi = Math.floor(max);
        return Math.floor(Math.random() * (maxi - mini) + mini);
      };

      const n = getRandomInt(1, 5);
      switch (n) {
        case 1:
          return 'swym:Post';
        case 2:
          return 'swym:Question';
        case 3:
          return 'swym:Idea';
        default:
          return 'swym:WikitreePage';
      }
    },

  },
};
</script>

<style>

</style>
