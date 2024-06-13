<template>
  <div class="unread-header">
    <hr>
    <div class="unread-text">
      {{ $i18n('unreadMessages') }}
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'SwymTimelineSeparatorUnreadMessage',
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
  .unread-header {
    width: 100%;
    display: flex;
    gap: 4px;
    align-items: center;

    .unread-text {
      color: $cyan-1;
      font-size: 12px;
      font-weight: bold;
      padding: 2px 16px;
      border-radius: 10px;
      background-color: $cyan-0-1;
    }

    hr {
      flex-grow: 1;
      margin: 0;
      border-top-color: $cyan-1;
    }
  }
</style>
