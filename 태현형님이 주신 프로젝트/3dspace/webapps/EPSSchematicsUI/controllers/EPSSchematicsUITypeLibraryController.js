/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUITypeLibraryController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUITypeLibraryController", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeDocument", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents"], function (require, exports, WUXTreeDocument, WUXTreeNodeModel, UINLS, TypeLibrary, ModelEnums, Events) {
    "use strict";
    /**
     * This class defines a UI type library controller.
     * @class UITypeLibraryController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUITypeLibraryController
     * @private
     */
    var UITypeLibraryController = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         */
        function UITypeLibraryController(editor) {
            this._treeDocument = new WUXTreeDocument({ useAsyncPreExpand: true });
            this._onTypeLibraryRegisterGlobalCB = this._onTypeLibraryRegisterGlobal.bind(this);
            this._onTypeLibraryRegisterLocalCustomCB = this._onTypeLibraryRegisterLocalCustom.bind(this);
            this._onTypeLibraryUnregisterLocalCustomCB = this._onTypeLibraryUnregisterLocalCustom.bind(this);
            this._applyTypeIconCB = { module: 'DS/EPSSchematicsUI/controllers/EPSSchematicsUITypeLibraryController', func: '_applyTypeToSelectedPort' };
            this._deleteTypeIconCB = { module: 'DS/EPSSchematicsUI/controllers/EPSSchematicsUITypeLibraryController', func: '_removeSelectedNode' };
            this._editor = editor;
            this._applyTypeIconCB.argument = { editor: this._editor };
            this._deleteTypeIconCB.argument = { editor: this._editor };
            this._initializeTreeDocument();
            this._initializeGlobalTypes();
            TypeLibrary.addListener(Events.TypeLibraryRegisterGlobalEvent, this._onTypeLibraryRegisterGlobalCB);
            TypeLibrary.addListener(Events.TypeLibraryRegisterLocalCustomEvent, this._onTypeLibraryRegisterLocalCustomCB);
            TypeLibrary.addListener(Events.TypeLibraryUnregisterLocalCustomEvent, this._onTypeLibraryUnregisterLocalCustomCB);
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
        UITypeLibraryController.prototype.remove = function () {
            TypeLibrary.removeListener(Events.TypeLibraryRegisterGlobalEvent, this._onTypeLibraryRegisterGlobalCB);
            TypeLibrary.removeListener(Events.TypeLibraryRegisterLocalCustomEvent, this._onTypeLibraryRegisterLocalCustomCB);
            TypeLibrary.removeListener(Events.TypeLibraryUnregisterLocalCustomEvent, this._onTypeLibraryUnregisterLocalCustomCB);
            if (this._treeDocument !== undefined) {
                this._treeDocument.empty();
            }
            this._editor = undefined;
            this._treeDocument = undefined;
            this._appTypesNode = undefined;
            this._customTypesNode = undefined;
            this._onTypeLibraryRegisterGlobalCB = undefined;
            this._onTypeLibraryRegisterLocalCustomCB = undefined;
            this._onTypeLibraryUnregisterLocalCustomCB = undefined;
            this._applyTypeIconCB = undefined;
            this._deleteTypeIconCB = undefined;
        };
        /**
         * Gets the tree document.
         * @public
         * @returns {TreeDocument} The tree document.
         */
        UITypeLibraryController.prototype.getTreeDocument = function () {
            return this._treeDocument;
        };
        /**
         * Gets the custom types node.
         * @public
         * @returns {WUXTreeNodeModel} The custom types node.
         */
        UITypeLibraryController.prototype.getCustomTypesNode = function () {
            return this._customTypesNode;
        };
        /**
         * Gets the application types node.
         * @public
         * @returns {WUXTreeNodeModel} The application types node.
         */
        UITypeLibraryController.prototype.getApplicationTypesNode = function () {
            return this._appTypesNode;
        };
        /**
         * Gets the tree node model matching the provided type name.
         * @public
         * @param {string} typeName - The type name.
         * @param {boolean} [includeApplicationTypes=false] - True to include application types.
         * @returns {TreeNodeModel} The matching tree node model.
         */
        UITypeLibraryController.prototype.getTreeNodeModelFromTypeName = function (typeName, includeApplicationTypes) {
            if (includeApplicationTypes === void 0) { includeApplicationTypes = false; }
            var children = this._customTypesNode.getChildren() || [];
            if (includeApplicationTypes) {
                children = children.concat(this._appTypesNode.getChildren());
            }
            var treeNodModel = children.find(function (childNode) { return childNode.getLabel() === typeName; });
            return treeNodModel;
        };
        /**
         * Sorts the custom and applicative types by alphabetic order.
         * @public
         */
        UITypeLibraryController.prototype.sortTypes = function () {
            this._customTypesNode.sortChildren();
            this._appTypesNode.sortChildren();
        };
        /**
         * Updates the apply button disabled state.
         * @public
         */
        UITypeLibraryController.prototype.updateApplyButtonDisabledState = function () {
            var typeLibraryPanel = this._editor.getTypeLibraryPanel();
            if (typeLibraryPanel.isOpen()) {
                var selectedDataPorts = this._editor.getViewerController().getCurrentViewer().getSelectedDataPorts();
                var allowedValueTypes_1 = [];
                if (selectedDataPorts.length > 0) {
                    var areSettable = selectedDataPorts.every(function (dataPort) { return dataPort.getModel().isValueTypeSettable(); });
                    if (areSettable) {
                        selectedDataPorts.forEach(function (dataPort, index) {
                            if (index === 0) {
                                allowedValueTypes_1 = dataPort.getModel().getAllowedValueTypes();
                            }
                            else {
                                allowedValueTypes_1 = allowedValueTypes_1.filter(function (valueType) { return dataPort.getModel().isValueTypeSettable(valueType); });
                            }
                            var typeIndex = allowedValueTypes_1.indexOf(dataPort.getModel().getValueType());
                            if (typeIndex > -1) {
                                allowedValueTypes_1.splice(typeIndex, 1);
                            }
                        });
                    }
                }
                this._updateApplyButtonDisabledStateFromTypeList(allowedValueTypes_1);
            }
        };
        /**
         * Updates the occurence count.
         * @public
         */
        UITypeLibraryController.prototype.updateOccurenceCount = function () {
            var _this = this;
            var typeLibraryPanel = this._editor.getTypeLibraryPanel();
            if (typeLibraryPanel !== undefined && typeLibraryPanel.isOpen()) {
                // First reset the occurence count
                var typeNodes = [].concat(this._customTypesNode.getChildren() || [], this._appTypesNode.getChildren() || []);
                typeNodes.forEach(function (childNode) { return childNode.setAttribute('occurenceCount', 0); });
                // Then compute occurence count for each used types
                var rootGraph = this._editor.getViewerController().getRootViewer().getMainGraph();
                var objectsByType_1 = rootGraph.getModel().getObjectsByType();
                var graphContext_1 = this._editor._getViewer().getMainGraph().getModel().getGraphContext();
                var typeNames = Object.keys(objectsByType_1);
                if (typeNames.length > 0) {
                    typeNames.forEach(function (typeName) {
                        var typeCount = objectsByType_1[typeName].length;
                        var hasLocalCustomType = TypeLibrary.hasLocalCustomType(graphContext_1, typeName, ModelEnums.FTypeCategory.fAll);
                        var hasGlobalType = !hasLocalCustomType && TypeLibrary.hasGlobalType(typeName, ModelEnums.FTypeCategory.fAll);
                        var rootNode = hasLocalCustomType ? _this._customTypesNode : hasGlobalType ? _this._appTypesNode : undefined;
                        if (rootNode) {
                            var foundNode = (rootNode.getChildren() || []).find(function (childNode) { return childNode.getLabel() === typeName; });
                            if (foundNode) {
                                foundNode.setAttribute('occurenceCount', typeCount);
                                foundNode.setAttribute('occurenceReferences', objectsByType_1[typeName]);
                            }
                        }
                    });
                }
            }
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
         * Updates the apply button disabled state from the provided type list.
         * @private
         * @param {string[]} types - The allowed value types.
         */
        UITypeLibraryController.prototype._updateApplyButtonDisabledStateFromTypeList = function (types) {
            var customTypesChildren = this._customTypesNode.getChildren() || [];
            var appTypesChildren = this._appTypesNode.getChildren() || [];
            var childrenNodes = customTypesChildren.concat(appTypesChildren);
            childrenNodes.forEach(function (childNode) {
                var isTypeAllowed = types.indexOf(childNode.getLabel()) > -1;
                childNode.setAttribute('disabled', !isTypeAllowed);
            });
        };
        /**
         * Initializes the tree document.
         * @private
         */
        UITypeLibraryController.prototype._initializeTreeDocument = function () {
            this._appTypesNode = new WUXTreeNodeModel({
                label: UINLS.get('categoryApplicationTypes'),
                grid: {}
            });
            this._customTypesNode = new WUXTreeNodeModel({
                label: UINLS.get('categoryCustomTypes'),
                grid: {}
            });
            this._treeDocument.addRoot(this._customTypesNode);
            this._treeDocument.addRoot(this._appTypesNode);
            this._treeDocument.setFilterModel({
                typeName: {
                    filterId: 'stringRegexp',
                    filterModel: {}
                }
            });
        };
        /**
         * Initializes the global types already registered in the type library.
         * @private
         */
        UITypeLibraryController.prototype._initializeGlobalTypes = function () {
            var _this = this;
            var globalTypeNames = TypeLibrary.getGlobalTypeNameList(ModelEnums.FTypeCategory.fAll ^ ModelEnums.FTypeCategory.fArray);
            this._appTypesNode.prepareUpdate();
            globalTypeNames.forEach(function (typeName) { return _this._registerGlobalType(typeName); });
            this._appTypesNode.pushUpdate();
        };
        /**
         * The callback on the type library register global event.
         * @private
         * @param {TypeLibraryRegisterGlobalEvent} event - The type library register global event.
         */
        UITypeLibraryController.prototype._onTypeLibraryRegisterGlobal = function (event) {
            this._registerGlobalType(event.getName());
        };
        /**
         * The callback on the type library register local custom event.
         * @private
         * @param {TypeLibraryRegisterLocalCustomEvent} event - The type library register local custom event.
         */
        UITypeLibraryController.prototype._onTypeLibraryRegisterLocalCustom = function (event) {
            this._registerLocalCustomType(event.getName());
        };
        /**
         * The callback on the type library unregister local custom event.
         * @private
         * @param {TypeLibraryUnregisterLocalCustomEvent} event - The type library unregister local custom event.
         */
        UITypeLibraryController.prototype._onTypeLibraryUnregisterLocalCustom = function (event) {
            var treeNodeModel = this.getTreeNodeModelFromTypeName(event.getName(), false);
            if (treeNodeModel !== undefined) {
                this._customTypesNode.removeChild(treeNodeModel);
            }
        };
        /**
         * Registers a global type.
         * @private
         * @param {string} typeName - The type name.
         */
        UITypeLibraryController.prototype._registerGlobalType = function (typeName) {
            this._appTypesNode.addChild(new WUXTreeNodeModel({
                label: typeName,
                grid: {
                    typeName: typeName,
                    occurenceCount: 0,
                    occurenceReferences: [],
                    applyType: this._applyTypeIconCB,
                    disabled: true
                }
            }));
        };
        /**
         * Registers a local custom type.
         * @private
         * @param {string} typeName - The type name.
         */
        UITypeLibraryController.prototype._registerLocalCustomType = function (typeName) {
            var disabled = true;
            var selectedDataPorts = this._editor.getViewerController().getCurrentViewer().getSelectedDataPorts();
            if (selectedDataPorts.length > 0) {
                var areSettable = selectedDataPorts.every(function (dataPort) { return dataPort.getModel().isValueTypeSettable(); });
                if (areSettable) {
                    disabled = !selectedDataPorts.every(function (dataPort) { return (dataPort.getModel().typeCategory & ModelEnums.FTypeCategory.fObject) === ModelEnums.FTypeCategory.fObject; });
                }
            }
            this._customTypesNode.addChild(new WUXTreeNodeModel({
                label: typeName,
                grid: {
                    typeName: typeName,
                    occurenceCount: 0,
                    occurenceReferences: [],
                    applyType: this._applyTypeIconCB,
                    deleteType: this._deleteTypeIconCB,
                    disabled: disabled
                }
            }));
            this._customTypesNode.expand();
        };
        /**
         * Removes the selected node from the type library treeDocument.
         * @protected
         * @static
         * @param {IFunctionIconArguments} args - The function icon arguments.
         */
        UITypeLibraryController._removeSelectedNode = function (args) {
            var nodeModel = args.context.nodeModel;
            var editor = args.editor;
            var graphContext = editor._getViewer().getMainGraph().getModel().getGraphContext();
            var typeName = nodeModel.getLabel();
            try {
                TypeLibrary.unregisterLocalCustomTypes(graphContext, [typeName]);
                editor.getHistoryController().registerRemoveCustomTypeAction();
            }
            catch (error) {
                var title = UINLS.get('notificationRemoveTypeError', { typeName: typeName });
                editor.displayNotification({
                    level: 'error',
                    title: title,
                    subtitle: error.stack
                });
                editor.displayDebugConsoleMessage(ModelEnums.ESeverity.eError, title);
                editor.displayDebugConsoleMessage(ModelEnums.ESeverity.eError, error.stack);
            }
        };
        /**
         * Apply the selected type to the selected data ports.
         * @protected
         * @static
         * @param {IFunctionIconArguments} args - The function icon arguments.
         */
        UITypeLibraryController._applyTypeToSelectedPort = function (args) {
            var typeName = args.context.nodeModel.getLabel();
            if (typeName !== undefined && typeName !== '') {
                var editor = args.editor;
                var dataPorts = editor.getViewerController().getCurrentViewer().getSelectedDataPorts();
                var changedDataPorts_1 = [];
                dataPorts.forEach(function (dataPort) {
                    var result = dataPort.getModel().setValueType(typeName);
                    if (result) {
                        dataPort.triggerPulseAnimation();
                        changedDataPorts_1.push(dataPort);
                    }
                });
                if (dataPorts.length) {
                    var historyController = editor.getHistoryController();
                    historyController.registerEditDataPortTypeAction(dataPorts);
                    editor.getTypeLibraryController().updateApplyButtonDisabledState();
                }
            }
        };
        return UITypeLibraryController;
    }());
    return UITypeLibraryController;
});
