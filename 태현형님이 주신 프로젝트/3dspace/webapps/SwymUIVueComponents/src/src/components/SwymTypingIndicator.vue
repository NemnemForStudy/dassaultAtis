<template>
  <div
    v-if="displayText"
    class="swym-typing-indicator"
  >
    <div class="blink-elements-wrapper">
      <span class="blink-dot" />
      <span class="blink-dot" />
      <span class="blink-dot" />
      <SwymText
        class="blink-text"
        :display-text="displayText"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwymTypingIndicator',
  props: {
    displayText: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

@keyframes indicatorblink {
  50% {
    opacity: 1;
  }
}

.swym-typing-indicator {
  position: absolute;
  bottom: 0;
  width: auto;
  display: flex;
  align-items: center;
  color: $cyan-1;
  border-right: 2px solid white;
  border-left: 2px solid white;
  margin: 0 2px;
  border-radius: 10px;
  background-color: $grey-1;

  .blink-elements-wrapper {
    display: flex;
    align-items: center;
    background-color: transparentize($cyan-1, 0.8);
    border-radius: 10px;
    padding: 2px 16px 2px 7px;
  }

  .blink-dot {
    height: 7px;
    width: 7px;
    margin: 0 1px;
    background-color: $cyan-1;
    display: block;
    border-radius: 50%;
    opacity: 0.4;
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        animation: 1s indicatorblink infinite ($i * 0.3333s);
      }
    }
  }

  .blink-text {
    font-size: 12px;
    font-weight: bold;
    margin-left: 7px;
  }
}
</style>
