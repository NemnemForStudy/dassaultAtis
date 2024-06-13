// prettier-ignore

// Need vu-dropdownmenu & btn with ref='dropdown-btn'

export default {
  data() {
    return {
      dropdownMenu: null,
    };
  },
  methods: {
    resetPositionDropdown(show, direction = 'bottom') {
      return null;
      if (!show) {
        this.dropdownMenu.classList.remove('open');
        this.dropdownMenu = null;
      }

      this.$nextTick(function () {
        if (show) {
          const dropdownMenu = Array.from(document.querySelectorAll('.dropdown-menu')).find(
            (el) => el.style.display !== 'none' && !el.classList.contains('open'),
          );
          this.dropdownMenu = dropdownMenu;
          const {
            top, left, height, width,
          } = (this.$refs['dropdown-btn'].$el && this.$refs['dropdown-btn'].$el.getBoundingClientRect()) || this.$refs['dropdown-btn'].getBoundingClientRect();

          const dropdownWidth = dropdownMenu.getBoundingClientRect().width;
          const dropdownHeight = dropdownMenu.getBoundingClientRect().height;

          this.$nextTick(() => {
            if (direction === 'bottom') {
              dropdownMenu.style.top = `${top + height}px`;
              dropdownMenu.style.left = `${left - dropdownWidth + width}px`;
            } else if (direction === 'top') {
              dropdownMenu.style.top = `${top - dropdownHeight - 10}px`;
              dropdownMenu.style.left = `${left}px`;
            }

            dropdownMenu.classList.add('open');
          });
        }
      });
    },
  },

};
