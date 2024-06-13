<template>
  <div
    class="type-selector-wrapper"
    :style="formattedValue ? `background-color: ${formattedValue.color}` : ''"
  >
    <vu-dropdownmenu
      :items="formattedItems"
      @update:show="(show) => resetPositionDropdown(show, 'top')"
    >
      <vu-icon
        ref="dropdown-btn"
        :icon="formattedValue ? formattedValue.icon : 'plus'"
      />
    </vu-dropdownmenu>
  </div>
</template>

<script>
import dropdownMixin from '../mixins/dropdown';
import { CONTENT_TYPE_ICON_COLOR } from '../utils/style';

export default {
  name: 'SwymTypeSelector',
  mixins: [dropdownMixin],
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    /**
     * Return items formatted
     * e.g. label/icon?/color?/value? -> text/fonticon/icon/color/handler/index
     * value (post/idea/question/...) OR icon/color (derived type)
     */
    formattedItems() {
      return this.items.map((el, index) => {
        const icon = el.icon || CONTENT_TYPE_ICON_COLOR[el.value].icon;
        const color = el.color || CONTENT_TYPE_ICON_COLOR[el.value].color;

        return {
          text: el.label,
          fonticon: `${icon} item-${index + 1} ${el.value.toLowerCase().replaceAll(' ', '-')} `, // Bypass, to change background color of fonticon in dropdownmenu
          icon,
          color,
          handler: this.updateTypeSelected,
          index,
        };
      });
    },

    /**
     * Return value (from v-model) formatted
     * text/icon/color
     */
    formattedValue() {
      const icon = this.value.icon || CONTENT_TYPE_ICON_COLOR[this.value.value].icon;
      const color = this.value.color || CONTENT_TYPE_ICON_COLOR[this.value.value].color;

      return {
        text: this.value.label,
        icon,
        color,
      };
    },
  },
  watch: {
    items() {
      this.$nextTick(() => this.updateBackgroundColor());
    },
  },
  mounted() {
    let dropdown = null;

    // Loop on items to set the background color
    this.formattedItems.forEach((el, index) => {
      const fonticonEl = document.querySelector(`.item-${index + 1}`); // Bypass, to change background color of fonticon in dropdownmenu
      fonticonEl.style['background-color'] = el.color || CONTENT_TYPE_ICON_COLOR[el.value].color;

      if (dropdown === null) {
        dropdown = fonticonEl.closest('.dropdown-menu');

        // By pass, to identify the dropdown and apply style on it
        dropdown.id = 'dropdown-menu-type-selector';
      }
    });
  },
  methods: {
    /**
     * Return the item selected in the original list items (not formattedList)
     */
    updateTypeSelected(item) {
      this.$emit('input', this.items[item.index]);
    },

    /**
     * Update background color of fonticon for each item
     */
    updateBackgroundColor() {
      // Loop on items to set the background color
      this.formattedItems.forEach((el, index) => {
        const fonticonEl = document.querySelector(`.item-${index + 1}`); // Bypass, to change background color of fonticon in dropdownmenu
        fonticonEl.style['background-color'] = el.color || CONTENT_TYPE_ICON_COLOR[el.value].color;
      });
    },
  },
};
</script>

<style lang="scss">
@import '../styles/variables';
  .type-selector-wrapper{
    width: 34px;
    font-size: 1.5em;
    background-color: $gray-dv-2;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px 0 0 5px;

    .fonticon{
      color: white !important;

      width: 34px;
      height: 36px;
      //font-size: 1.5em;
      line-height: 36px;
    }
  }

  .type-selector-wrapper:hover{
    opacity: 0.8;
  }

  #dropdown-menu-type-selector.dropdown-menu{
    &.dropdown-menu-root{
        border-radius: 5px;
        overflow: hidden;
    }

    .dropdown-menu-wrap{

      .item {
        padding: 0;

        .fonticon{
          opacity: 0.4;
          color: white;
          background-color: black;

          width: 34px;
          height: 38px;

          margin: 0;

          font-size: 1.5em;
          line-height: 38px;
        }

        .item-text{
          margin-left: 10px;
        }

        &:last-child{
          border-bottom: none;
        }
      }

      .item:hover{
        .fonticon{
          opacity: 1;
        }
      }
    }
  }

</style>
