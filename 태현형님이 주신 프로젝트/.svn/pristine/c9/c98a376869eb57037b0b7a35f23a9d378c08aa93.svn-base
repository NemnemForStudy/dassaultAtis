<template>
    <vu-modal
        :show="show"
        :title="title"
    >
    <template #modal-body>
        <label> {{ $i18n('messageInfoDefaultWiki') }} </label>
        <TreeView ref="treeView"
            :tree="wikiPagesToDisplay"
            :multipleActive="true"
            :activatable="true"
            :isVisible="true"
            :openAll="true"
            :selectedByDefault="pageSelectedByDefault"
        />
    </template>
    <template #modal-footer>
        <vu-btn color="primary" @click="onAdd">  {{ $i18n('add') }} </vu-btn>
        <vu-btn @click="onCancel"> {{ $i18n('cancel') }}</vu-btn>
    </template>
    </vu-modal>

</template>
<script>
export default {
    name: 'SwymDefaultContentWikiTreeModal',
    props: {
        show:{
            type: Boolean, 
            default: false
        },
        wikiPagesToDisplay: {
            type: Array
        },
        //if need to have page selected by default, add its subject6wuri 
        pageSelectedByDefault: {
            type: Array
        }

    }, 
    data(){
        return {
            title: this.$i18n('addNewDefaultPages'),
        }
    },
    mounted(){
        this.$emit('requestFullScreen');

    },
    methods:{
        onCancel() {
            //TODO : call search to display list again 
            this.$emit('leaveFullScreen')
            this.show = false;
        },
        onAdd(){
            this.$emit('leaveFullScreen')
            const pageSelected = this.$refs.treeView.getActiveSelection();
            this.$emit('addWikiDefaultContent', pageSelected);
            this.show = false;

        }
    }
}
</script>

<style lang="scss">
.modal-content{
   top: -10px;
}
</style>
