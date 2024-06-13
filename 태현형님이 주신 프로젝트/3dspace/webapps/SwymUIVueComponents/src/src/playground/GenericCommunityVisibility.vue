<template>
  <div>
    <SwymGenericCommunityVisibility
      title="For employees"
      :list-visibility="[
        {
          label: 'Public',
          value: '1',
        },
        {
          label: 'Private',
          value: '0',
          checked: true
        },
        {
          label: 'Secret',
          value: '4'
        }
      ]"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing
      elit sed do, eiusmod tempor incididunt
      ut labore et dolore magna aliqua"
      :deactivate-content-display-in-whats-new="{
        label: 'Deactivate content display in what\'s new',
        value: true,
        disabled: false
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'GenericCommunityVisibility',

};
</script>

<style>

</style>
