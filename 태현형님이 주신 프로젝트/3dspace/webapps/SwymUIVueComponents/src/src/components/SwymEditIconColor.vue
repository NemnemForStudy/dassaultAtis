<template>
  <div>
    <div
      class="edit-icon-color-link"
    >
      <a
        ref="link"
        href="#"
        @click.prevent="show = true"
      >
        <vu-icon icon="pencil" />
        {{ $i18n("edit") }}
      </a>
    </div>
    <div
      v-if="show"
      ref="popover"
      class="edit-icon-color-wrapper"
    >
      <div class="edit-icon-color-header">
        <ul>
          <li :class="`${isIconMode ? 'active' : ''}`">
            <a
              href="#"
              @click.prevent="switchColorToIcon"
            >{{ $i18n("icons") }}</a>
          </li>
          <li :class="`${isColorMode ? 'active' : ''}`">
            <a
              href="#"
              @click.prevent="switchIconToColor"
            >{{ $i18n("colors") }}</a>
          </li>
        </ul>
      </div>

      <div
        v-if="isIconMode"
        class="edit-icon-color-body"
      >
        <SwymIconList
          class="icon-list"
          @onIconClick="(icon) => $emit('iconSelected', icon)"
        />
      </div>

      <div
        v-if="isColorMode"
        class="edit-icon-color-body"
      >
        <!-- Comes from SwymBusinessMethod/Vuetify -->
        <ColorPicker
          class="vuetify-color-picker"
          :value="colorSelected"
          @update:value="(color) => $emit('colorSelected', color)"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 2 modes: Icon & Color
 * Represented by Tabs
 */
const MODE = {
  ICON: 'icon',
  COLOR: 'color',
};

export default {
  name: 'SwymEditIconColor',
  props: {
    colorSelected: {
      type: String,
      default: '#000000',
    },
  },
  data() {
    return {
      show: false,
      mode: MODE.ICON,
    };
  },
  computed: {

    /**
     * Return true if we are in Icon tab
     */
    isIconMode() {
      return this.mode === MODE.ICON;
    },

    /**
     * Return true if we are in Color tab
     */
    isColorMode() {
      return this.mode === MODE.COLOR;
    },
  },
  watch: {
    /**
     * Show
     * If true, set the top of the popover
     */
    show(newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => this.setPopoverTopPosition());
      }
    },
  },
  mounted() {
    document.addEventListener('click', (event) => this.hidePopover(event));
  },

  destroy() {
    document.removeEventListener('click');
  },
  methods: {
    /**
     * Icon to Color
     */
    switchIconToColor() {
      this.mode = MODE.COLOR;
    },

    /**
     * Color to Icon
     */
    switchColorToIcon() {
      this.mode = MODE.ICON;
    },

    /**
     * Set the top of the popover
     * (Must be below the Edit link + gap)
     */
    setPopoverTopPosition() {
      const popoverEl = this.$refs.popover;
      const linkEl = this.$refs.link;

      const topLinkEl = linkEl.getBoundingClientRect().top;

      popoverEl.style.top = `${topLinkEl}px`;
    },

    /**
     * Hide popover when the user clicks outside the popover element
     */
    hidePopover(event) {
      if (this.show) {
        const popoverEl = this.$refs.popover;
        const linkEl = this.$refs.link;

        if (popoverEl && linkEl) {
          // The clicked element can be the element itself, of an element inside
          const clickOnPopover = popoverEl === event.target || popoverEl.contains(event.target);
          const clickOnLink = linkEl === event.target || linkEl.contains(event.target);

          // If click event is not on popover or edit link, hide the popover
          if (!(clickOnPopover || clickOnLink)) {
            this.show = false;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../styles/variables";

  .edit-icon-color-link{
    a{
      text-decoration: none;
    }
  }

  .edit-icon-color-wrapper{
    position: absolute;
    bottom: 0;

    box-shadow: 0 3px 9px rgb(0 0 0 / 20%);
    border-radius: 6px;
    width: 380px;
    height: 300px;
    padding: 0 15px 0 15px;

    background-color: white;

    .edit-icon-color-header{
      display: flex;
      align-items: center;

      border-bottom: 1px solid $grey-3;
      height: 12%;

      ul{
        display: flex;
        gap: 10px;

        margin: 0;
        padding: 0;

        list-style: none;

        li{
          &.active a{
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: $grey-6
          }
        }
      }
    }

    .edit-icon-color-body{
      height: 88%;
    }
  }
</style>
