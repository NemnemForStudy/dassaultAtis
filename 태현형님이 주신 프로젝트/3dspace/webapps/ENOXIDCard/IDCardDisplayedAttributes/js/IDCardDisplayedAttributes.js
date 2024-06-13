
define('DS/ENOXIDCard/IDCardDisplayedAttributes/js/IDCardDisplayedAttributes', [
    'UWA/Core',
    'DS/Handlebars/Handlebars',
    'DS/TreeModel/TreeDocument',
    'DS/TreeModel/TreeNodeModel',
    'DS/DataGridView/DataGridView',
    'DS/Windows/Dialog',
    'DS/Windows/ImmersiveFrame',
    'DS/Controls/Button',
    'DS/Controls/TooltipModel',
    'DS/ResizeSensor/js/ResizeSensor',
    'i18n!DS/ENOXIDCard/assets/nls/ENOXIDCard',
    'text!DS/ENOXIDCard/IDCardDisplayedAttributes/html/IDCardDisplayedAttributes.html',
    'css!DS/ENOXIDCard/IDCardDisplayedAttributes/css/IDCardDisplayedAttributes.css',
], function (UWA,Handlebars,TreeDocument, TreeNodeModel, DataGridView, WUXDialog, WUXImmersiveFrame, WUXButton,WUXTooltipModel,ResizeSensor,NLSKeys,IDCardDisplayedAttributesTemplate) {
    'use strict';

    var dialogTemplate = Handlebars.compile(IDCardDisplayedAttributesTemplate);

    /**
    * creates a popup to manage attributes displayed in the IDCard component
    * @param options.model  model of IDCard
    */
    var IDCardDisplayedAttributesComponent = function (options) {

        this.attributesList={};
        this.model=options.model;
        this.modelEvents = this.model.get('modelEvents');
        this.modelEventsTokens = [];

        var that=this;

        this.setAttributesList();

        this.updateDisplayedAttributesIDcard();

        // create a clone of the attributes list to have a copy of the Initial state of the attribute list
        this.attributesListDefault = UWA.clone(this.attributesList);

        if(this.model.get("savedAttributesList")) this.retreiveSavedAttributesList(this.model.get("savedAttributesList"));

        this.dialog=null;
        this.gridViewAvailableAttributes =null;
        this.gridViewSelectedAttributes =null;
        this.gridView =null;

        this.modelEventsTokens.push(that.modelEvents.subscribe({event: 'open-idcard-manage-displayed-attributes'}, function () {
            that.render();
        }));
        this.modelEventsTokens.push(that.modelEvents.subscribe({event: 'change-values-fullListAvailableAttributes'}, function () {
            // update the attributes list
            that.setAttributesList();
            that.updateDisplayedAttributesIDcard();

        }));

    };
    IDCardDisplayedAttributesComponent.prototype.setAttributesList = function () {

        var attributesListUpdated={};
        var i=1;
        for( var attribute of this.model.get("fullListAvailableAttributes")){

            if(this.attributesList[attribute.id]){
                attributesListUpdated[attribute.id]=this.attributesList[attribute.id];
                attributesListUpdated[attribute.id].attribute=attribute;
            }else {
                attributesListUpdated[attribute.id]={
                    attribute : attribute,
                    visibility : attribute.defaultVisibility,
                    order : null
                };
                if(attribute.defaultVisibility){
                    attributesListUpdated[attribute.id].order=i;
                    i++;
                }
            }
        }
        this.attributesList=attributesListUpdated;

    };
    IDCardDisplayedAttributesComponent.prototype.getAttributesList = function () {
        return this.attributesList;
    };
    /**
    * @method retreiveSavedAttributesList - set attributes that have been retreive from the last event saved-displayedAttributes-idcard
    */
    IDCardDisplayedAttributesComponent.prototype.retreiveSavedAttributesList = function (savedAttributesList) {
        this.attributesList=savedAttributesList;
        this.updateDisplayedAttributesIDcard();
    };

    IDCardDisplayedAttributesComponent.prototype.render = function () {
        var that = this;

        var immersiveFrame=that.model.get("immersiveFrame");
        if(!immersiveFrame && widget.body){
            immersiveFrame = new WUXImmersiveFrame({
                  domId: 'customize-header-frame'
            });
            immersiveFrame.inject(widget.body);
        }

        that.dialog = new WUXDialog({
            title: NLSKeys.customize_header,
            height: 500,
            width: 900,
            resizableFlag: true,
            modalFlag: true,
            immersiveFrame: immersiveFrame,
            buttons: {
                Save: new WUXButton({
                    emphasize: 'primary',
                    onClick: function(e) {
                        that.updateAttributesStatus();
                        that.updateDisplayedAttributesIDcard();
                        that.modelEvents.publish({event : "saved-displayedAttributes-idcard", data : {savedAttributes : that.getAttributesList()}});
                        that.dialog.close();
                    }
                }),
                Reset: new WUXButton({
                    emphasize: 'secondary',
                    onClick: function(e) {
                        that.renderListAttributes(that.attributesListDefault);
                    }
                }),
                Cancel: new WUXButton({
                    emphasize: 'secondary',
                    onClick: function(e) {
                        that.dialog.close();
                    }
                })
            }
        });
        that.dialog.addEventListener('close', function () {
            that.dialog.destroy();
            that.gridViewAvailableAttributes.destroy();
            that.gridViewSelectedAttributes.destroy();
        });

        // grid view for Available attributes
        that.gridViewAvailableAttributes= new DataGridView({
            identifier: 'IDCard-manage-displayedAttributes-dataGridViewAvailableAttributes',
            height: 'inherit',
            placeholder : NLSKeys.label_no_attributes_found,
            treeDocument: new TreeDocument({useAsyncPreExpand: true}),
            columns: [
                {
                    text: NLSKeys.label_attribute_name,
                    dataIndex: 'attributeName',
                    typeRepresentation: 'string',
                    sortableFlag : true,
                }],
                defaultColumnDef: {
                    width: 'auto'
                },
                showOutlineFlag : true,
                showRowIndexFlag : false,
                rowSelection : "multiple",
                cellSelection : "none"
            });
            // Set a filter on your model
            that.gridViewAvailableAttributes.getTreeDocument().setFilterModel({
                attributeName : {
                    filterId : 'stringRegexp'
                }
            });

            // grid view for selected attributes
            that.gridViewSelectedAttributes= new DataGridView({
                identifier: 'IDCard-manage-displayedAttributes-dataGridViewSelectedAttributes',
                height: 'inherit',
                treeDocument: new TreeDocument({useAsyncPreExpand: true}),
                columns: [
                    {
                        text: NLSKeys.label_attribute_name,
                        dataIndex: 'attributeName',
                        typeRepresentation: 'string',
                        sortableFlag : false,
                    },{
                        text: NLSKeys.label_displayed_minified,
                        dataIndex: "displayWhenMinified",
                        typeRepresentation: "boolean",
                        editableFlag: true,
                        editionPolicy: "EditionOnOver",
                        sortableFlag : false
                    }],
                    defaultColumnDef: {
                        width: 'auto'
                    },
                    showOutlineFlag : true,
                    showRowIndexFlag : true,
                    rowDragEnabledFlag : true,
                    cellDragEnabledFlag : true,
                });

            // create the content of the dialog
            that.dialog.elements._contentDiv.innerHTML=dialogTemplate({nls : NLSKeys});
            // add gridView
            that.dialog.elements._contentDiv.getElementsByClassName("idcard-displayedattributes-dialog-datagridviewAvailableAttributes")[0].appendChild(that.gridViewAvailableAttributes.getContent());
            that.dialog.elements._contentDiv.getElementsByClassName("idcard-displayedattributes-dialog-datagridviewSelectedAttributes")[0].appendChild(that.gridViewSelectedAttributes.getContent());

            // buttons to move elements from a grid view the other
            var moveToRightContainer=that.dialog.elements._contentDiv.getElementsByClassName("idcard-displayedattributes-dialog-movebuttonright")[0];
            var moveToLeftContainer=that.dialog.elements._contentDiv.getElementsByClassName("idcard-displayedattributes-dialog-movebuttonleft")[0];
            that.moveToRightBtn=new WUXButton({className : "style-litegreyicon", displayStyle: "lite", icon:{iconName:"expand-right", fontIconFamily: WUXManagedFontIcons.Font3DS/*,fontIconSize: "2x"*/} }).inject(moveToRightContainer);
            that.moveToLeftBtn=new WUXButton({className : "style-litegreyicon", displayStyle: "lite", icon:{iconName:"expand-left", fontIconFamily: WUXManagedFontIcons.Font3DS/*,fontIconSize: "2x"*/} }).inject(moveToLeftContainer);
            that.moveToRightBtn.getContent().classList.add("style-litegreyicon");
            that.moveToLeftBtn.getContent().classList.add("style-litegreyicon");
            that.moveToRightBtn.tooltipInfos = new WUXTooltipModel({
                title: NLSKeys.tooltip_title_add_selected_attr,
                shortHelp: NLSKeys.tooltip_shorthelp_add_selected_attr
            });
            that.moveToLeftBtn.tooltipInfos = new WUXTooltipModel({
                title: NLSKeys.tooltip_title_add_available_attr,
                shortHelp: NLSKeys.tooltip_shorthelp_add_available_attr
            });

            that.moveToRightBtn.getContent().addEventListener('buttonclick', function(){
                var selectedAvailableNodes=that.gridViewAvailableAttributes.treeDocument.getSelectedNodes();
                selectedAvailableNodes.forEach((node, i) => {
                    that.gridViewSelectedAttributes.treeDocument.addChild(node);
                });
                var moreThan12Attributes= that.gridViewSelectedAttributes.getTreeDocument().getChildren().length>12;
                that.displayWarning(moreThan12Attributes);
            });
            that.moveToLeftBtn.getContent().addEventListener('buttonclick', function(){
                var selectedNodes=that.gridViewSelectedAttributes.treeDocument.getSelectedNodes();
                selectedNodes.forEach((node, i) => {
                    that.gridViewAvailableAttributes.treeDocument.addChild(node);
                });
                var moreThan12Attributes= that.gridViewSelectedAttributes.getTreeDocument().getChildren().length>12;
                that.displayWarning(moreThan12Attributes);
            });

            // buttons to change the order of elements in grid view
            var iconBarSelectedAttributes=that.dialog.elements._contentDiv.getElementsByClassName("idcard-displayedattributes-dialog-datagridviewiconbar")[0];
            that.moveUpBtn = new WUXButton({displayStyle: "lite", icon:{iconName:"up", fontIconFamily: WUXManagedFontIcons.Font3DS} }).inject(iconBarSelectedAttributes);
            that.moveDownBtn = new WUXButton({displayStyle: "lite", icon:{iconName:"down", fontIconFamily: WUXManagedFontIcons.Font3DS} }).inject(iconBarSelectedAttributes);
            that.moveToTopBtn = new WUXButton({displayStyle: "lite", icon:{iconName:"move-to-top", fontIconFamily: WUXManagedFontIcons.Font3DS} }).inject(iconBarSelectedAttributes);
            that.moveToBottomBtn = new WUXButton({displayStyle: "lite", icon:{iconName:"move-to-bottom", fontIconFamily: WUXManagedFontIcons.Font3DS} }).inject(iconBarSelectedAttributes);
            that.moveUpBtn.getContent().classList.add("style-litegreyicon");
            that.moveDownBtn.getContent().classList.add("style-litegreyicon");
            that.moveToTopBtn.getContent().classList.add("style-litegreyicon");
            that.moveToBottomBtn.getContent().classList.add("style-litegreyicon");
            that.moveUpBtn.getContent().classList.add("moveButton");
            that.moveDownBtn.getContent().classList.add("moveButton");
            that.moveToTopBtn.getContent().classList.add("moveButton");
            that.moveToBottomBtn.getContent().classList.add("moveButton");
            that.moveUpBtn.tooltipInfos = new WUXTooltipModel({
                title: NLSKeys.tooltip_title_moveup,
                shortHelp: NLSKeys.tooltip_shorthelp_moveup
            });
            that.moveDownBtn.tooltipInfos = new WUXTooltipModel({
                title: NLSKeys.tooltip_title_movedown,
                shortHelp: NLSKeys.tooltip_shorthelp_movedown
            });
            that.moveToTopBtn.tooltipInfos = new WUXTooltipModel({
                title: NLSKeys.tooltip_title_movetop,
                shortHelp: NLSKeys.tooltip_shorthelp_movetop
            });
            that.moveToBottomBtn.tooltipInfos = new WUXTooltipModel({
                title: NLSKeys.tooltip_title_movebottom,
                shortHelp: NLSKeys.tooltip_shorthelp_movebottom
            });

            that.moveUpBtn.getContent().addEventListener('buttonclick', function(){
                // move up selected nodes in the grid view of selected attributes
                var selectedNodes=that.gridViewSelectedAttributes.treeDocument.getSelectedNodes();
                var sortedSelectedNodes=selectedNodes.sort((a,b) => a._rowID - b._rowID);
                sortedSelectedNodes.forEach((node, i) => {
                    if(node._rowID!==i){
                        that.gridViewSelectedAttributes.treeDocument.addChild(node,node._rowID-1);
                    }
                    node.select();
                });
            });
            that.moveDownBtn.getContent().addEventListener('buttonclick', function(){
                // move down selected nodes in the grid view of selected attributes
                var selectedNodes=that.gridViewSelectedAttributes.treeDocument.getSelectedNodes();
                var sortedSelectedNodes=selectedNodes.sort((a,b) => b._rowID - a._rowID);
                var nbNodes=that.gridViewSelectedAttributes.treeDocument.getChildren().length;
                sortedSelectedNodes.forEach((node, i) => {
                    if(node._rowID!==nbNodes-1-i){
                        that.gridViewSelectedAttributes.treeDocument.addChild(node,node._rowID+1);
                    }
                    node.select();
                });

            });
            that.moveToTopBtn.getContent().addEventListener('buttonclick', function(){
                // move to top selected nodes in the grid view of selected attributes
                var selectedNodes=that.gridViewSelectedAttributes.treeDocument.getSelectedNodes();
                var sortedSelectedNodes=selectedNodes.sort((a,b) => a._rowID - b._rowID);
                sortedSelectedNodes.forEach((node, i) => {
                    that.gridViewSelectedAttributes.treeDocument.addChild(node,i);
                    node.select();
                });
            });
            that.moveToBottomBtn.getContent().addEventListener('buttonclick', function(){
                // move to bottom selected nodes in the grid view of selected attributes
                var selectedNodes=that.gridViewSelectedAttributes.treeDocument.getSelectedNodes();
                var sortedSelectedNodes=selectedNodes.sort((a,b) => b._rowID - a._rowID);
                var nbNodes=that.gridViewSelectedAttributes.treeDocument.getChildren().length;
                sortedSelectedNodes.forEach((node, i) => {
                    that.gridViewSelectedAttributes.treeDocument.addChild(node,nbNodes-1-i);
                    node.select();
                });
            });

            function adaptHeaderDialogHeight (){
                var headerWithIcons = that.dialog.elements._contentDiv ? that.dialog.elements._contentDiv.getElementsByClassName("idcard-displayedattributes-dialog-datagridviewheader")[1] : null;
                var headerWithIconsHeight=headerWithIcons ? headerWithIcons.clientHeight : null;
    	        if(headerWithIconsHeight) that.dialog.elements._contentDiv.getElementsByClassName("idcard-displayedattributes-dialog-datagridviewheader")[0].setAttribute("style","min-height:"+headerWithIconsHeight+"px");
            }
            adaptHeaderDialogHeight();
            var headerWithIcons = that.dialog.elements._contentDiv.getElementsByClassName("idcard-displayedattributes-dialog-datagridviewheader")[1];
            that.resizeSensorHeaderDialog=new ResizeSensor(headerWithIcons, function () {
                adaptHeaderDialogHeight();
            });

            that.renderListAttributes(this.attributesList);
        };

        /**
        * @method renderListAttributes render the content of datagrid views with the list of attributes
        * @param {Map} attributesList Map of attribute to manage
        */
        IDCardDisplayedAttributesComponent.prototype.renderListAttributes = function(listAttributes){
            var that = this;
            that.gridViewAvailableAttributes.treeDocument.empty();
            that.gridViewSelectedAttributes.treeDocument.empty();

            var attributesListSorted=[];

            // sort attributes by their order
            for (var attributeId in listAttributes) {
                attributesListSorted.push(listAttributes[attributeId]);
            }
            attributesListSorted.sort((a, b) => a.order - b.order);

            for(var attr of attributesListSorted){
                var newNode;
                if(attr.visibility){
                    // attributes selected
                    newNode = new TreeNodeModel({
                        grid: {
                            attributeName: attr.attribute.name,
                            displayWhenMinified : attr.attribute.displayWhenMinified ? attr.attribute.displayWhenMinified : false,
                        },
                        attributeId : attr.attribute.id
                    });
                    that.gridViewSelectedAttributes.treeDocument.addChild(newNode);
                }
                else{
                    // other attributes availables
                    newNode = new TreeNodeModel({
                        grid: {
                            attributeName: attr.attribute.name,
                            displayWhenMinified : attr.attribute.displayWhenMinified ? attr.attribute.displayWhenMinified : false,
                        },
                        attributeId : attr.attribute.id
                    });
                    that.gridViewAvailableAttributes.treeDocument.addChild(newNode);
                }
            }
            var moreThan12Attributes= that.gridViewSelectedAttributes.getTreeDocument().getChildren().length>12;
            that.displayWarning(moreThan12Attributes);
        };


        /**
        * @method updateAttributesStatus saves change of visibility in the datagrid view
        */
        IDCardDisplayedAttributesComponent.prototype.updateAttributesStatus=function(){
            var i=1;
            var node;
            for(node of this.gridViewSelectedAttributes.getTreeDocument().getChildren()){
                this.attributesList[node.options.attributeId].visibility=true;
                this.attributesList[node.options.attributeId].order=i;
                this.attributesList[node.options.attributeId].attribute.displayWhenMinified=node.options.grid.displayWhenMinified;
                i++;
            }
            for(node of this.gridViewAvailableAttributes.getTreeDocument().getChildren()){
                this.attributesList[node.options.attributeId].visibility=false;
                this.attributesList[node.options.attributeId].order=null;
            }
        };

        /**
        * @method updateDisplayedAttributesIDcard update the model of attributes of the IDCard to display attributes wanted
        */
        IDCardDisplayedAttributesComponent.prototype.updateDisplayedAttributesIDcard=function(){
            var attributesListSorted=[];
            // sort the list with the chosen order
            for (var attributeId in this.attributesList) {
                attributesListSorted.push(this.attributesList[attributeId]);
            }
            attributesListSorted.sort((a, b) => a.order - b.order);
            var attributesToDisplay=[];
            var attribute=null;
            for (var attr of attributesListSorted){
                attribute = UWA.clone(attr.attribute);
                if(attr.visibility) attributesToDisplay.push(attribute);
            }
            // update the model with only attributes chosen for being displayed
            this.model.set('attributes',attributesToDisplay);
        };

        IDCardDisplayedAttributesComponent.prototype.destroy=function(){
            var that=this;
            if(that.dialog) that.dialog.close();
            this.modelEventsTokens.forEach(function (token) {
                that.modelEvents.unsubscribe(token);
            });
            if (that.resizeSensorHeaderDialog && that.dialog.elements._contentDiv && that.dialog.elements._contentDiv.getElementsByClassName("idcard-displayedattributes-dialog-datagridviewheader")[1]) {
                that.resizeSensorHeaderDialog.detach(that.dialog.elements._contentDiv.getElementsByClassName("idcard-displayedattributes-dialog-datagridviewheader")[1]);
            }
        };

        IDCardDisplayedAttributesComponent.prototype.displayWarning =function(toDisplay){
            var that=this;
            var warning =that.dialog.elements._contentDiv.getElementsByClassName("idcard-displayedattributes-dialog-datagridviewWarning")[0];
            if(toDisplay){
                warning.classList.remove("hidden");
            }else{
                warning.classList.add("hidden");
            }
        };

        return IDCardDisplayedAttributesComponent;
    });
