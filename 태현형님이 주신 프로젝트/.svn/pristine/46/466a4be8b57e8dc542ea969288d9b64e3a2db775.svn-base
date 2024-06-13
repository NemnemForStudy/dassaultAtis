<template>
  <SwymDefaultContent
    :search-component="searchComponent"
    :default-contents="defaultContents"
    :readOnly="false"
  />
</template>

<script>
import DummySearchVue from '../components/DummySearch.vue';

const list = {
  list: [
    {
      assetId: '8',
      label: 'Bear',
      description: 'Bears are carnivoran mammals of the family Ursidae. They are classified as caniforms, or doglike carnivorans. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, small rounded ears, shaggy',
      type: 'swym:Post',
      transientId: 'dcda709e-615f-49ad-be97-09bcd4b764f2',
    },
    {
      asset_id: '12',
      preview_url: 'https://devopsjvy42fvq971330-euw1-24dsw10505-3dswym.3dx-staging.3ds.com/api/media/streammedia/model/iquestion/model_id/OaSkOkUtTmq6zjphY8MdMQ/type/thumb/key/l_thumb/',
      label: 'The Sun',
      description: 'How do we get more energy from the sun?  ',
      type: 'swym:Question',
      transientId: '246230e3-5e54-4318-868b-39487a182db7',
    },
    {
      asset_id: '13',
      preview_url: 'https://devopsjvy42fvq971330-euw1-24dsw10505-3dswym.3dx-staging.3ds.com/api/media/streammedia/model/iquestion/model_id/FbvbPXOIQsCA0jNvd4aFuw/type/thumb/key/l_thumb/',
      label: 'Compensation in Business',
      description: 'Is the way we compensate people for their jobs ideal or should we have some way of making sure people are paid appropriately?  ',
      type: 'swym:Question',
      transientId: '3d2d9b45-6222-4859-a6c6-b8aeb6948b5d',
    },
    {
      asset_id: '14',
      preview_url: 'https://devopsjvy42fvq971330-euw1-24dsw10505-3dswym.3dx-staging.3ds.com/api/media/streammedia/model/wikitree/model_id/9APjwXesTX6-d8Ng0yI_WA/type/thumb/key/l_thumb/',
      label: 'Default root page',
      type: 'swym:WikitreePage',
      transientId: 'e92391ac-8988-4964-8de3-64d326e9920c',
      set_as_root: 'true', 
      disabled_set_as_root: false,
      subpagesSelected: '2'
    },
    {
      asset_id: '16',
      preview_url: 'https://devopsjvy42fvq971330-euw1-24dsw10505-3dswym.3dx-staging.3ds.com/api/media/streammedia/model/wikitree/model_id/9APjwXesTX6-d8Ng0yI_WA/type/thumb/key/l_thumb/',
      label: 'wiki page 1 ',
      type: 'swym:WikitreePage',
      transientId: 'e92391ac-8988-4964-8de3-64d326e9920c',
      set_as_root: 'false', 
      disabled_set_as_root: false,
      subpagesSelected: '1'
    },
    {
      asset_id: '17',
      preview_url: 'https://devopsjvy42fvq971330-euw1-24dsw10505-3dswym.3dx-staging.3ds.com/api/media/streammedia/model/wikitree/model_id/9APjwXesTX6-d8Ng0yI_WA/type/thumb/key/l_thumb/',
      label: 'wiki page 1 ',
      type: 'swym:WikitreePage',
      transientId: 'e92391ac-8988-4964-8de3-64d326e9920c',
      set_as_root: 'false', 
      disabled_set_as_root: false,
      subpagesSelected: '0'
    },
    {
      asset_id: '18',
      preview_url: 'https://devopsjvy42fvq971330-euw1-24dsw10505-3dswym.3dx-staging.3ds.com/api/media/streammedia/model/idea/model_id/5M6Ei5nWQ3KWq_n3mldDag/type/thumb/key/l_thumb/',
      label: 'Notify Conversation members without having to mention &quot;@user&quot;',
      description: 'Is there an option or best practice to have conversation members notified when additional comments/posts are added? If not, please add the capability. Tagging the &quot;@user&quot; to mention them becomes quite redundant.    ',
      type: 'swym:Idea',
      transientId: 'b1120ff9-baac-426c-9b86-4c68089a0baa',
      derivedTypeTransientId: '8bc752f9-ddd7-433d-aebb-78510e9cc4f8',
    },
    {
      asset_id: '19',
      preview_url: 'https://devopsjvy42fvq971330-euw1-24dsw10505-3dswym.3dx-staging.3ds.com/api/media/streammedia/model/idea/model_id/vj-Ynu-YQJaa1WHfZNRYaA/type/thumb/key/l_thumb/',
      label: 'Seach in current tab on MCE is not working.',
      description: 'I&#039;m trying to use search in the current tab on MCE but this functionality is not working. After select the option and click and press enter appear the search in full platform.   ',
      type: 'swym:Idea',
      transientId: 'd1ea3029-a72c-4dca-b6aa-e77c59807ad2',
    },
  ],
  featuresList: [
    {
      label: 'Post',
      value: 'post',
      icon: 'newspaper',
    },
    {
      label: 'Question',
      value: 'question',
      icon: 'help',
    },
    {
      label: 'Idea',
      value: 'ideation',
      icon: 'lightbulb',
    },
    {
      label: 'Wiki',
      value: 'wiki',
      icon: 'book-open',
    },
    {
      label: 'Innovations',
      value: 'Innovations',
      contentToReuse: 'ideation',
      transientId: '8bc752f9-ddd7-433d-aebb-78510e9cc4f8',
      icon: 'text-special-character',
      color: '#590076',
    },
  ],
};

export default {
  name: 'DefaultContent',
  data() {
    return {
      searchComponent: {
        component: DummySearchVue,
        propsData: {},
      },
      defaultContents: list,
    };
  },
};
</script>

<style>

</style>
