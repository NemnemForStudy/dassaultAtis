/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUINodeIdSelectorController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUINodeIdSelectorController", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeDocument", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/EPSSchematicsUIEnums", "DS/Utilities/Color", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, WUXTreeDocument, Tools, Events, UINLS, UIEnums, WUXColor, WUXTreeNodeModel, ModelEnums) {
    "use strict";
    /**
     * This class defines a nodeId selector controller.
     * @private
     * @class UINodeIdSelectorController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUINodeIdSelectorController
     */
    var UINodeIdSelectorController = /** @class */ (function () {
        /**
         * @public
         * @constructor
         * @param {UIGraph} graphUI - The UI graph.
         */
        function UINodeIdSelectorController(graphUI) {
            var _this = this;
            this._onNodeIdSelectorAddCB = this._onNodeIdSelectorAdd.bind(this);
            this._onNodeIdSelectorRemoveCB = this._onNodeIdSelectorRemove.bind(this);
            this._onNodeIdSelectorNameChangeCB = this._onNodeIdSelectorNameChange.bind(this);
            this._onNodeIdSelectorPoolChangeCB = this._onNodeIdSelectorPoolChange.bind(this);
            this._onNodeIdSelectorCriterionChangeCB = this._onNodeIdSelectorCriterionChange.bind(this);
            this._onNodeIdSelectorIdentifierChangeCB = this._onNodeIdSelectorIdentifierChange.bind(this);
            this._onNodeIdSelectorQueuingChangeCB = this._onNodeIdSelectorQueuingChange.bind(this);
            this._onNodeIdSelectorTimeoutChangeCB = this._onNodeIdSelectorTimeoutChange.bind(this);
            this._onNodeIdSelectorMaxInstanceCountChangeCB = this._onNodeIdSelectorMaxInstanceCountChange.bind(this);
            this._onNodeIdSelectorCmdLineChangeCB = this._onNodeIdSelectorCmdLineChange.bind(this);
            this._deleteNodeIdSelectorIconCB = { module: 'DS/EPSSchematicsUI/controllers/EPSSchematicsUINodeIdSelectorController', func: '_deleteNodeIdSelector' };
            this._applyNodeIdSelectorIconCB = { module: 'DS/EPSSchematicsUI/controllers/EPSSchematicsUINodeIdSelectorController', func: '_applyNodeIdSelector' };
            this._kColorPalette = [
                '98DDAA', '858DD6', 'D5A081', 'CF6E91', 'CFCA6E',
                'FF8F2E', '8454BF', '3D85B8', '2F8E78', '0056E0',
                '40B43C', '92256F', '71D0B5', '914930', 'D42B7D',
                'E067D2', '859D89', '52FF5A', 'FF3838', 'FFC2F0'
            ];
            this._graphUI = graphUI;
            this._deleteNodeIdSelectorIconCB.argument = { editor: this._graphUI.getEditor() };
            this._applyNodeIdSelectorIconCB.argument = { editor: this._graphUI.getEditor() };
            this._graphModel = graphUI.getModel();
            this._treeDocument = new WUXTreeDocument({ useAsyncPreExpand: true });
            this._graphModel.addListener(Events.NodeIdSelectorAddEvent, this._onNodeIdSelectorAddCB);
            this._graphModel.addListener(Events.NodeIdSelectorRemoveEvent, this._onNodeIdSelectorRemoveCB);
            this._graphModel.getNodeIdSelectors().forEach(function (nis) { return _this._addNodeIdSelectorListeners(nis); });
            this._initializeTreeDocument();
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Removes the controller.
         * @public
         */
        UINodeIdSelectorController.prototype.remove = function () {
            var _this = this;
            this._graphModel.removeListener(Events.NodeIdSelectorAddEvent, this._onNodeIdSelectorAddCB);
            this._graphModel.removeListener(Events.NodeIdSelectorRemoveEvent, this._onNodeIdSelectorRemoveCB);
            this._graphModel.getNodeIdSelectors().forEach(function (nis) { return _this._removeNodeIdSelectorListeners(nis); });
            if (this._treeDocument) {
                this._treeDocument.empty();
            }
            this._graphUI = undefined;
            this._graphModel = undefined;
            this._treeDocument = undefined;
            this._onNodeIdSelectorAddCB = undefined;
            this._onNodeIdSelectorRemoveCB = undefined;
            this._onNodeIdSelectorNameChangeCB = undefined;
            this._onNodeIdSelectorPoolChangeCB = undefined;
            this._onNodeIdSelectorCriterionChangeCB = undefined;
            this._onNodeIdSelectorIdentifierChangeCB = undefined;
            this._onNodeIdSelectorQueuingChangeCB = undefined;
            this._onNodeIdSelectorTimeoutChangeCB = undefined;
            this._onNodeIdSelectorMaxInstanceCountChangeCB = undefined;
            this._onNodeIdSelectorCmdLineChangeCB = undefined;
            this._deleteNodeIdSelectorIconCB = undefined;
            this._applyNodeIdSelectorIconCB = undefined;
        };
        /**
         * Gets the tree document.
         * @public
         * @returns {WUXTreeDocument} The tree document.
         */
        UINodeIdSelectorController.prototype.getTreeDocument = function () {
            return this._treeDocument;
        };
        /**
         * Exports the nodeId selectors to the provided JSON.
         * @public
         * @param {IJSONGraphUI} oJSONGraph - The JSON graph.
         */
        UINodeIdSelectorController.prototype.toJSON = function (oJSONGraph) {
            if (oJSONGraph !== undefined) {
                var nodeIdSelectors = this._getNodeIdSelectors();
                if (nodeIdSelectors.length > 0) {
                    oJSONGraph.nodeIdSelectors = [];
                    nodeIdSelectors.forEach(function (nodeIdSelector) { return oJSONGraph.nodeIdSelectors.push(nodeIdSelector.getAttributeValue('color')); });
                }
            }
        };
        /**
         * Creates the nodeId selectors from the provided JSON.
         * @public
         * @param {IJSONGraphUI} iJSONGraph - The JSON graph.
         */
        UINodeIdSelectorController.prototype.fromJSON = function (iJSONGraph) {
            if (iJSONGraph.nodeIdSelectors !== undefined) {
                var nodeIdSelectors = this._getNodeIdSelectors();
                nodeIdSelectors.forEach(function (nodeIdSelector, index) {
                    var color = iJSONGraph.nodeIdSelectors[index];
                    if (color !== undefined) {
                        nodeIdSelector.setAttribute('color', color);
                    }
                });
            }
        };
        /**
         * Gets the color of the nodeId Selector at provided index.
         * @public
         * @param {number} index - The index of the nodeId selector.
         * @returns {string} The color of the nodeId selector.
         */
        UINodeIdSelectorController.prototype.getColor = function (index) {
            var color;
            if (index > -1) {
                var nodeIdSelectors = this._getNodeIdSelectors();
                var nodeIdSelector = nodeIdSelectors[index];
                color = nodeIdSelector === null || nodeIdSelector === void 0 ? void 0 : nodeIdSelector.getAttributeValue('color');
            }
            return color;
        };
        /**
         * Creates the nodeId selector node model.
         * @public
         * @param {NodeIdSelector} nodeIdSelector - The nodeId selector.
         */
        UINodeIdSelectorController.prototype.createNodeIdSelectorNodeModel = function (nodeIdSelector) {
            this._addNodeIdSelectorListeners(nodeIdSelector);
            var children = [];
            if (nodeIdSelector.isPoolSettable()) {
                children.push(new WUXTreeNodeModel({
                    label: UINLS.get('treeListRowNodeIdSelectorPool'),
                    grid: { nodeIdSelector: nodeIdSelector, id: UIEnums.ENodeIdSelectorProperty.ePool, typeRepresentation: 'string', value: nodeIdSelector.getPool() }
                }));
            }
            if (nodeIdSelector.isCriterionSettable()) {
                var criterion = nodeIdSelector.getCriterion();
                criterion = criterion === undefined ? -1 : criterion;
                children.push(new WUXTreeNodeModel({
                    label: UINLS.get('treeListRowNodeIdSelectorCriterion'),
                    grid: { nodeIdSelector: nodeIdSelector, id: UIEnums.ENodeIdSelectorProperty.eCriterion, typeRepresentation: 'NodeIdSelectorCriterion', value: criterion }
                }));
            }
            if (nodeIdSelector.isIdentifierSettable()) {
                children.push(UINodeIdSelectorController._createIdentifierNodeModel(nodeIdSelector));
            }
            if (nodeIdSelector.isQueuingSettable()) {
                children.push(new WUXTreeNodeModel({
                    label: UINLS.get('treeListRowNodeIdSelectorQueuing'),
                    grid: { nodeIdSelector: nodeIdSelector, id: UIEnums.ENodeIdSelectorProperty.eQueuing, typeRepresentation: 'Boolean', value: nodeIdSelector.getQueuing() }
                }));
            }
            if (nodeIdSelector.isTimeoutSettable()) {
                children.push(new WUXTreeNodeModel({
                    label: UINLS.get('treeListRowNodeIdSelectorTimeout'),
                    grid: { nodeIdSelector: nodeIdSelector, id: UIEnums.ENodeIdSelectorProperty.eTimeout, typeRepresentation: 'uint32', value: nodeIdSelector.getTimeout() }
                }));
            }
            if (nodeIdSelector.isMaxInstanceCountSettable()) {
                children.push(new WUXTreeNodeModel({
                    label: UINLS.get('treeListRowNodeIdSelectorMaxInstanceCount'),
                    grid: { nodeIdSelector: nodeIdSelector, id: UIEnums.ENodeIdSelectorProperty.eMaxInstanceCount, typeRepresentation: 'NonZeroUInt32', value: nodeIdSelector.getMaxInstanceCount() }
                }));
            }
            if (nodeIdSelector.isCmdLineSettable()) {
                children.push(new WUXTreeNodeModel({
                    label: UINLS.get('treeListRowNodeIdSelectorCmdLine'),
                    grid: { nodeIdSelector: nodeIdSelector, id: UIEnums.ENodeIdSelectorProperty.eCmdLine, typeRepresentation: 'string', value: nodeIdSelector.getCmdLine() }
                }));
            }
            var index = this._graphModel.getNodeIdSelectors().length - 1;
            var color = index < 20 ? this._kColorPalette[index] : WUXColor.hslToHex([Math.floor(Math.random() * 361), 100, 50]);
            var nodeIdSelectorNodeModel = new WUXTreeNodeModel({
                label: nodeIdSelector.getName(),
                grid: {
                    nodeIdSelector: nodeIdSelector,
                    deleteNodeIdSelector: this._deleteNodeIdSelectorIconCB,
                    color: color,
                    applyNodeIdSelector: this._applyNodeIdSelectorIconCB
                },
                children: children
            });
            this._treeDocument.addRoot(nodeIdSelectorNodeModel);
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the list of nodeId selectors.
         * @private
         * @returns {WUXTreeNodeModel[]} The list of nodeId selectors
         */
        UINodeIdSelectorController.prototype._getNodeIdSelectors = function () {
            return this._treeDocument.getAllDescendants().filter(function (nodeModel) { return nodeModel.isRoot() && nodeModel.getAttributeValue('nodeIdSelector') !== undefined; });
        };
        /**
         * Initializes the tree document.
         * @private
         */
        UINodeIdSelectorController.prototype._initializeTreeDocument = function () {
            var _noNodeIdSelectorNodeModel = new WUXTreeNodeModel({
                label: 'No NodeId Selector',
                grid: { color: undefined, applyNodeIdSelector: this._applyNodeIdSelectorIconCB }
            });
            var _parentNodeIdSelectorNodeModel = new WUXTreeNodeModel({
                label: Tools.parentNodeIdSelector,
                grid: { color: '8C8C8C', applyNodeIdSelector: this._applyNodeIdSelectorIconCB }
            });
            this._treeDocument.addRoot(_noNodeIdSelectorNodeModel);
            this._treeDocument.addRoot(_parentNodeIdSelectorNodeModel);
        };
        /**
         * Adds event listeners to provided nodeId selector.
         * @private
         * @param {NodeIdSelector} nodeIdSelector - The nodeId selector.
         */
        UINodeIdSelectorController.prototype._addNodeIdSelectorListeners = function (nodeIdSelector) {
            nodeIdSelector.addListener(Events.NodeIdSelectorNameChangeEvent, this._onNodeIdSelectorNameChangeCB);
            nodeIdSelector.addListener(Events.NodeIdSelectorPoolChangeEvent, this._onNodeIdSelectorPoolChangeCB);
            nodeIdSelector.addListener(Events.NodeIdSelectorCriterionChangeEvent, this._onNodeIdSelectorCriterionChangeCB);
            nodeIdSelector.addListener(Events.NodeIdSelectorIdentifierChangeEvent, this._onNodeIdSelectorIdentifierChangeCB);
            nodeIdSelector.addListener(Events.NodeIdSelectorQueuingChangeEvent, this._onNodeIdSelectorQueuingChangeCB);
            nodeIdSelector.addListener(Events.NodeIdSelectorTimeoutChangeEvent, this._onNodeIdSelectorTimeoutChangeCB);
            nodeIdSelector.addListener(Events.NodeIdSelectorMaxInstanceCountChangeEvent, this._onNodeIdSelectorMaxInstanceCountChangeCB);
            nodeIdSelector.addListener(Events.NodeIdSelectorCmdLineChangeEvent, this._onNodeIdSelectorCmdLineChangeCB);
        };
        /**
         * Removes event listeners from provided nodeId selector.
         * @private
         * @param {NodeIdSelector} nodeIdSelector - The nodeId selector.
         */
        UINodeIdSelectorController.prototype._removeNodeIdSelectorListeners = function (nodeIdSelector) {
            nodeIdSelector.removeListener(Events.NodeIdSelectorNameChangeEvent, this._onNodeIdSelectorNameChangeCB);
            nodeIdSelector.removeListener(Events.NodeIdSelectorPoolChangeEvent, this._onNodeIdSelectorPoolChangeCB);
            nodeIdSelector.removeListener(Events.NodeIdSelectorCriterionChangeEvent, this._onNodeIdSelectorCriterionChangeCB);
            nodeIdSelector.removeListener(Events.NodeIdSelectorIdentifierChangeEvent, this._onNodeIdSelectorIdentifierChangeCB);
            nodeIdSelector.removeListener(Events.NodeIdSelectorQueuingChangeEvent, this._onNodeIdSelectorQueuingChangeCB);
            nodeIdSelector.removeListener(Events.NodeIdSelectorTimeoutChangeEvent, this._onNodeIdSelectorTimeoutChangeCB);
            nodeIdSelector.removeListener(Events.NodeIdSelectorMaxInstanceCountChangeEvent, this._onNodeIdSelectorMaxInstanceCountChangeCB);
            nodeIdSelector.removeListener(Events.NodeIdSelectorCmdLineChangeEvent, this._onNodeIdSelectorCmdLineChangeCB);
        };
        /**
         * Finds the node model corresponding to specified nodeId selector.
         * @private
         * @param {NodeIdSelector} nodeIdSelector - The nodeId selector.
         * @param {string} [childId] - The child Id.
         * @returns {WUXTreeNodeModel} The corresponding node model.
         */
        UINodeIdSelectorController.prototype._findNodeIdSelectorNodeModel = function (nodeIdSelector, childId) {
            var result;
            result = this._treeDocument.getAllDescendants().find(function (nodeModel) { return nodeModel.getAttributeValue('nodeIdSelector') === nodeIdSelector; });
            if (result && childId) {
                result = result.getChildren().find(function (nodeModel) { return nodeModel.getAttributeValue('id') === childId; });
            }
            return result;
        };
        /**
         * Creates the identifier node model.
         * @private
         * @static
         * @param {NodeIdSelector} nodeIdSelector - The nodeId selector.
         * @returns {WUXTreeNodeModel} The created node model.
         */
        UINodeIdSelectorController._createIdentifierNodeModel = function (nodeIdSelector) {
            return new WUXTreeNodeModel({
                label: UINLS.get('treeListRowNodeIdSelectorIdentifier'),
                grid: { nodeIdSelector: nodeIdSelector, id: UIEnums.ENodeIdSelectorProperty.eIdentifier, typeRepresentation: 'string', value: nodeIdSelector.getIdentifier() }
            });
        };
        /**
         * The callback on the nodeId selector add event.
         * @private
         * @param {Events.NodeIdSelectorAddEvent} event - The nodeId selector add event.
         */
        UINodeIdSelectorController.prototype._onNodeIdSelectorAdd = function (event) {
            this.createNodeIdSelectorNodeModel(event.getNodeIdSelector());
        };
        /**
         * The callback on the nodeId selector remove event.
         * @private
         * @param {Events.NodeIdSelectorRemoveEvent} event - The nodeId selector remove event.
         */
        UINodeIdSelectorController.prototype._onNodeIdSelectorRemove = function (event) {
            var nodeIdSelector = event.getNodeIdSelector();
            this._removeNodeIdSelectorListeners(nodeIdSelector);
            var foundNodeModel = this._findNodeIdSelectorNodeModel(nodeIdSelector);
            if (foundNodeModel) {
                this._treeDocument.removeRoot(foundNodeModel);
            }
        };
        /**
         * The callback on the nodeId selector name change event.
         * @private
         * @param {Events.NodeIdSelectorNameChangeEvent} event - The nodeId selector name change event.
         */
        UINodeIdSelectorController.prototype._onNodeIdSelectorNameChange = function (event) {
            var nodeIdSelector = event.getNodeIdSelector();
            var foundNodeModel = this._findNodeIdSelectorNodeModel(nodeIdSelector);
            if (foundNodeModel) {
                foundNodeModel.setLabel(nodeIdSelector.getName());
            }
        };
        /**
         * The callback on the nodeId selector pool change event.
         * @private
         * @param {Events.NodeIdSelectorPoolChangeEvent} event - The nodeId selector pool change event.
         */
        UINodeIdSelectorController.prototype._onNodeIdSelectorPoolChange = function (event) {
            var nodeIdSelector = event.getNodeIdSelector();
            var nodeModel = this._findNodeIdSelectorNodeModel(nodeIdSelector, UIEnums.ENodeIdSelectorProperty.ePool);
            if (nodeModel) {
                nodeModel.setAttribute('value', event.getPool());
            }
        };
        /**
         * The callback on the nodeId selector criterion change event.
         * @private
         * @param {Events.NodeIdSelectorCriterionChangeEvent} event - The nodeId selector criterion change event.
         */
        UINodeIdSelectorController.prototype._onNodeIdSelectorCriterionChange = function (event) {
            var nodeIdSelector = event.getNodeIdSelector();
            var nodeModel = this._findNodeIdSelectorNodeModel(nodeIdSelector, UIEnums.ENodeIdSelectorProperty.eCriterion);
            if (nodeModel) {
                var criterion = event.getCriterion();
                criterion = criterion === undefined ? -1 : criterion;
                nodeModel.setAttribute('value', criterion);
                var identifierNodeModel = this._findNodeIdSelectorNodeModel(nodeIdSelector, UIEnums.ENodeIdSelectorProperty.eIdentifier);
                if (identifierNodeModel) {
                    identifierNodeModel.getParent().removeChild(identifierNodeModel);
                }
                if (criterion === ModelEnums.ECriterion.eIdentifier) {
                    identifierNodeModel = UINodeIdSelectorController._createIdentifierNodeModel(nodeIdSelector);
                    nodeModel.getParent().addChild(identifierNodeModel, 2); // In third position just after criterion!
                }
            }
        };
        /**
         * The callback on the nodeId selector identifier change event.
         * @private
         * @param {Events.NodeIdSelectorIdentifierChangeEvent} event - The nodeId selector identifier change event.
         */
        UINodeIdSelectorController.prototype._onNodeIdSelectorIdentifierChange = function (event) {
            var nodeIdSelector = event.getNodeIdSelector();
            var nodeModel = this._findNodeIdSelectorNodeModel(nodeIdSelector, UIEnums.ENodeIdSelectorProperty.eIdentifier);
            if (nodeModel) {
                nodeModel.setAttribute('value', event.getIdentifier());
            }
        };
        /**
         * The callback on the nodeId selector queuing change event.
         * @private
         * @param {Events.NodeIdSelectorQueuingChangeEvent} event - The nodeId selector queuing change event.
         */
        UINodeIdSelectorController.prototype._onNodeIdSelectorQueuingChange = function (event) {
            var nodeIdSelector = event.getNodeIdSelector();
            var nodeModel = this._findNodeIdSelectorNodeModel(nodeIdSelector, UIEnums.ENodeIdSelectorProperty.eQueuing);
            if (nodeModel) {
                nodeModel.setAttribute('value', event.getQueuing());
            }
        };
        /**
         * The callback on the nodeId selector timeout change event.
         * @private
         * @param {Events.NodeIdSelectorTimeoutChangeEvent} event - The nodeId selector timeout change event.
         */
        UINodeIdSelectorController.prototype._onNodeIdSelectorTimeoutChange = function (event) {
            var nodeIdSelector = event.getNodeIdSelector();
            var nodeModel = this._findNodeIdSelectorNodeModel(nodeIdSelector, UIEnums.ENodeIdSelectorProperty.eTimeout);
            if (nodeModel) {
                nodeModel.setAttribute('value', event.getTimeout());
            }
        };
        /**
         * The callback on the nodeId selector max instance count change event.
         * @private
         * @param {Events.NodeIdSelectorMaxInstanceCountChangeEvent} event - The nodeId selector max instance count change event.
         */
        UINodeIdSelectorController.prototype._onNodeIdSelectorMaxInstanceCountChange = function (event) {
            var nodeIdSelector = event.getNodeIdSelector();
            var nodeModel = this._findNodeIdSelectorNodeModel(nodeIdSelector, UIEnums.ENodeIdSelectorProperty.eMaxInstanceCount);
            if (nodeModel) {
                nodeModel.setAttribute('value', event.getMaxInstanceCount());
            }
        };
        /**
         * The callback on the nodeId selector command line change event.
         * @private
         * @param {Events.NodeIdSelectorCmdLineChangeEvent} event - The nodeId selector command line change event.
         */
        UINodeIdSelectorController.prototype._onNodeIdSelectorCmdLineChange = function (event) {
            var nodeIdSelector = event.getNodeIdSelector();
            var nodeModel = this._findNodeIdSelectorNodeModel(nodeIdSelector, UIEnums.ENodeIdSelectorProperty.eCmdLine);
            if (nodeModel) {
                nodeModel.setAttribute('value', event.getCmdLine());
            }
        };
        /**
         * Removes the selected nodeId selector.
         * @private
         * @static
         * @param {IFunctionIconArguments} args - The function icon arguments.
         */
        UINodeIdSelectorController._deleteNodeIdSelector = function (args) {
            var nodeModel = args.context.nodeModel;
            if (nodeModel) {
                var nodeIdSelector = nodeModel.getAttributeValue('nodeIdSelector');
                if (nodeIdSelector) {
                    nodeIdSelector.graph.removeNodeIdSelector(nodeIdSelector);
                    var editor = args.editor;
                    editor.getHistoryController().registerRemoveNodeIdSelectorAction();
                }
            }
        };
        /**
         * Applies the selected nodeId selector.
         * @private
         * @static
         * @param {IFunctionIconArguments} args - The function icon arguments.
         */
        UINodeIdSelectorController._applyNodeIdSelector = function (args) {
            var nodeModel = args.context.nodeModel;
            if (nodeModel) {
                var editor = args.editor;
                var nodeIdSelectorPanel = editor.getNodeIdSelectorsPanel();
                var dataGridView = nodeIdSelectorPanel.getDataGridView();
                var currentNodeIdSelectorId = void 0;
                var nodeIdSelector = nodeModel.getAttributeValue('nodeIdSelector');
                if (nodeIdSelector) {
                    currentNodeIdSelectorId = nodeIdSelector.getName();
                }
                else if (nodeModel.getLabel() === Tools.parentNodeIdSelector) {
                    currentNodeIdSelectorId = Tools.parentNodeIdSelector;
                }
                dataGridView.setCurrentNodeIdSelectorId(currentNodeIdSelectorId);
                editor.getNodeIdSelectorsPanel().enablePaintMode();
            }
        };
        return UINodeIdSelectorController;
    }());
    return UINodeIdSelectorController;
});
