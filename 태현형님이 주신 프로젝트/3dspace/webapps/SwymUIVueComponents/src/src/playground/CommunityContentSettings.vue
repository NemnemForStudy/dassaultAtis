<template>
  <div>
    <SwymCommunityContentSettings
      :search-component="searchComponent"
      title="Content"
      :features="featuresList"
      readOnly
    />
  </div>
</template>

<script>
import DummySearchVue from '../components/DummySearch.vue';

const list = [
  {
    label: 'Post',
    icon: 'newspaper',
    value: 'post',
    checked: true,
    disabled: true,
    allowContributorsToCreate: {
      checked: false,
      disabled: false,
      value: 'true',
    },
    createTemplate: true,
    isVisibleInFeaturesList: true
  },
  {
    label: 'Question',
    icon: 'help',
    value: 'question',
    checked: false,
    disabled: false,
    allowContributorsToCreate: {
      checked: false,
      disabled: false,
      value: 'true',
    },
    createTemplate: true,
    isVisibleInFeaturesList: true
  },
  {
    label: 'Idea',
    icon: 'lightbulb',
    value: 'ideation',
    checked: true,
    disabled: false,
    allowContributorsToCreate: {
      checked: false,
      disabled: false,
      value: 'true',
    },
    'status-array': [
      {
        label: 'New Idea',
        color: '#92BE8B',
        value: 'New Idea',
      },
      {
        label: 'Concept',
        color: '#02869B',
        value: 'Concept',
      },
      {
        label: 'Project Plan',
        color: '#22CBEA',
        value: 'Project Plan',
      },
    ],
    minStatusToTransfer: 'Project Plan',
    createTemplate: true,
    isVisibleInFeaturesList: true
  },
  {
    label: 'Survey',
    icon: 'clipboard',
    value: 'survey',
    checked: true,
    disabled: false,
    allowContributorsToCreate: {
      checked: false,
      disabled: false,
      value: 'true',
    },
  },
  {
    label: 'Wiki',
    icon: 'book-open',
    value: 'wiki',
    checked: true,
    disabled: false,
    allowContributorsToCreate: {
      checked: false,
      disabled: false,
      value: 'true',
    },
    createTemplate: true,
    isVisibleInFeaturesList: true,
    template: {
      transientId: 'xxx',
      label: 'Default'
    }
  },
  {
    label: 'Innovations',
    title: 'Innovations',
    value: 'Innovations',
    color: '#590076',
    icon: 'text-special-character',
    checked: true,
    disabled: true,
    allowContributorsToCreate: {
      checked: false,
      disabled: false,
      value: 'true',
    },
    contentToReuse: 'ideation',
    createTemplate: true,
    'status-array': [
      {
        label: 'New Idea',
        color: '#92BE8B',
        value: 'New Idea',
      },
      {
        label: 'Concept',
        color: '#02869B',
        value: 'Concept',
      },
      {
        label: 'Project Plan',
        color: '#22CBEA',
        value: 'Project Plan',
      },
    ],
    minStatusToTransfer: 'Project Plan',
    transientId: '8bc752f9-ddd7-433d-aebb-78510e9cc4f8',
    isVisibleInFeaturesList: true
  },
];

export default {
  name: 'CommunityContentSettings',
  data: () => ({
    featuresList: list,
    searchComponent: DummySearchVue,
  }),
};
</script>

<style lang="scss" scoped>
  div{
    width: 100%;
    padding: 20px;
  }
</style>
