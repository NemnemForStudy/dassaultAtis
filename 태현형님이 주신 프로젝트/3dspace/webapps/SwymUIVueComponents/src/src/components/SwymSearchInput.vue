<template>
  <vu-form
    ref="form"
    class="search-input-container"
  >
    <div class="search-input">
      <vu-input
        :value="value"
        @input="(value) => $emit('input', value)"
      />
      <vu-icon-btn
        class="clear"
        icon="clear"
        @click="clear"
      />
    </div>

    <vu-icon-btn
      icon="search"
      @click="search"
    />
  </vu-form>
</template>

<script>
export default {
  name: 'SwymSearchInput',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const form = this.$refs.form.$el;
    form.addEventListener('submit', this.formHandler);
  },
  destroy() {
    const form = this.$refs.form.$el;
    form.addEventListener('submit', this.formHandler);
  },
  methods: {
    clear() {
      this.$emit('input', '');
    },
    search() {
      this.$emit('search');
    },
    /**
     * Submit event handler
     * Avoid reloading page & call search
     * @param {Event} event - Submit event
     */
    formHandler(event) {
      // Avoid reloading the page after pressing 'Enter' key in the form/input
      event.preventDefault();
      this.search();
    },
  },
};
</script>

<style lang="scss">
  @import "../styles/variables";
  .search-input-container{
    display: flex;

    align-items: center;

    .search-input{
      position: relative;

      display: flex;
      align-items: center;

      .form-group {
        margin-bottom: 0;
        justify-content: center;

      }

      input{
        padding-right: 38px;
      }

      .clear{
        position: absolute;

        right: 0;
      }
    }

  }
</style>
