<template>
  <div>
    <div class="pipeline-status-header">
      <span v-html="$i18n('statusList')" />
      <vu-icon-link
        icon="plus"
        @click="addNewStatus"
      >
        {{ $i18n('addStatus') }}
      </vu-icon-link>
    </div>

    <vu-scroller class="status-scroller">
      <div class="pipeline-status">
        <div
          v-for="status, index in statusArray"
          :key="index"
          class="status"
        >
          <vu-input
            :value="status.label"
            @input="(value) => $emit('update:status_label', {statusIndex: index, label: value})"
          />
          <input
            :value="status.color"
            type="color"
            @input="(event) => $emit('update:status_color',
                                     {statusIndex: index, color: event.target.value}
            )"
          >
          <vu-btn-grp>
            <vu-icon-btn
              :disabled="statusArray.length <= minNbStatus"
              icon="close"
              @click="removeStatus(index)"
            />

            <vu-icon-btn
              :disabled="index == 0"
              icon="expand-left"
              @click="changePositionStatus(index, 'LEFT')"
            />

            <vu-icon-btn
              :disabled="index >= statusArray.length - 1"
              icon="expand-right"
              @click="changePositionStatus(index, 'RIGHT')"
            />
          </vu-btn-grp>
        </div>
      </div>
    </vu-scroller>

    <div>
      <span>
        <b>{{ $i18n('minimumStatus') }}</b>
      </span>
    </div>

    <div class="minimum-status">
      <vu-select
        :value="minStatusToTransfer"
        :options="statusArray"
        :hide-placeholder-option="true"
        @input="(value) => $emit('update:status_minStatusToTransfer', value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwymPipelineStatus',
  props: {
    statusArray: {
      type: Array,
      required: true,
    },
    minStatusToTransfer: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minNbStatus: 3,
    };
  },
  methods: {

    /**
     * Return random color (3DSwym)
     */
    rdmColor() {
      const r = (Math.round(Math.random() * 127) + 127).toString(16);
      const g = (Math.round(Math.random() * 127) + 127).toString(16);
      const b = (Math.round(Math.random() * 127) + 127).toString(16);

      return `#${r}${g}${b}`;
    },

    /**
     * Add new status in array
     */
    addNewStatus() {
      const newStatusN = this.statusArray.length + 1;
      this.$emit('addNewStatus', {
        label: `Status ${newStatusN}`,
        value: `status${newStatusN}`,
        color: this.rdmColor(),
      });
    },

    /**
     * Remove status in array relative to its index
     */
    removeStatus(index) {
      // this.statusArrayData.splice(index, 1);
      if (this.statusArray.length > this.minNbStatus) {
        this.$emit('removeStatus', index);
      }
    },

    /**
     * Change status's position in array relative to its index and direction
     * [a, b, c] --- LEFT b --> [b, a, c]
     * [a, b, c] --- RIGHT b --> [a, c, b]
     */
    changePositionStatus(index, direction) {
      // const item = this.statusArrayData[index];
      // switch (direction) {
      //   case 'LEFT':
      //     this.statusArrayData.splice(index, 1);
      //     this.statusArrayData.splice(index - 1, 0, item);
      //     break;
      //   case 'RIGHT':
      //     this.statusArrayData.splice(index, 1);
      //     this.statusArrayData.splice(index + 1, 0, item);
      //     break;
      //   default:
      // }
      if ((direction === 'LEFT' && index > 0)
      || (direction === 'RIGHT' && index < this.statusArray.length - 1)) {
        this.$emit('changePositionStatus', { statusIndex: index, direction });
      }
    },

  },
};
</script>

<style lang="scss">

  .pipeline-status-header{
    display: flex;
    justify-content: space-between;
  }

  .pipeline-status{
    display: flex;
    flex-wrap: wrap;

    .status{
      display:flex;
      align-items: flex-start;

      .vu-icon-btn{
        font-size: 15px;
        width: auto;
      }

      input[type=color]{
        height: 38px;
        width: 38px;

        margin: 3px 6px;
      }

      input[type=text]{
        width: 120px;
      }
    }

  }

  .status-scroller{
    max-height: 130px;
    margin-bottom: 15px;
  }

</style>
