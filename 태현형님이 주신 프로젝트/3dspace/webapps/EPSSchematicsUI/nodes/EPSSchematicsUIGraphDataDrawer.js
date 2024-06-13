/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphDataDrawer'/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphDataDrawer", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUINode", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphDataDrawerView", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphDataPort", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIGraphDataDrawerDialog", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, UINode, UIDom, UIGraphDataDrawerView, UIGraphDataPort, UIGraphDataDrawerDialog, Events, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines UI graph data drawer.
     * @class UIGraphDataDrawer
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphDataDrawer
     * @extends UINode
     * @private
     */
    var UIGraphDataDrawer = /** @class */ (function (_super) {
        __extends(UIGraphDataDrawer, _super);
        /**
         * @constructor
         * @param {UIGraph} graph - The graph that owns this block.
         * @param {ModelEnums.EDataPortType} portType - The data port type.
         * @param {boolean} [isInputLocal] - Optionnal parameter for local data port type.
         */
        function UIGraphDataDrawer(graph, portType, isInputLocal) {
            var _this = _super.call(this, { graph: graph, isDraggable: false }) || this;
            _this._dataPorts = [];
            _this._onDataPortAddCB = _this._onDataPortAdd.bind(_this);
            _this._onDataPortRemoveCB = _this._onDataPortRemove.bind(_this);
            _this._portType = portType;
            _this._isInputLocal = isInputLocal;
            _this._graphDataDrawerDialog = new UIGraphDataDrawerDialog(graph, portType);
            _this.setView(_this._createDrawerView());
            _this.setDimension(170, 18);
            _this.addNodeToViewer();
            _this._graph.getModel().addListener(Events.DataPortAddEvent, _this._onDataPortAddCB);
            _this._graph.getModel().addListener(Events.DataPortRemoveEvent, _this._onDataPortRemoveCB);
            return _this;
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
         * Removes the node from its parent graph.
         * @public
         */
        UIGraphDataDrawer.prototype.remove = function () {
            this._dataPorts.forEach(function (dataPort) { return dataPort.remove(); });
            if (this._graph.getModel() !== undefined) {
                this._graph.getModel().removeListener(Events.DataPortAddEvent, this._onDataPortAddCB);
                this._graph.getModel().removeListener(Events.DataPortRemoveEvent, this._onDataPortRemoveCB);
            }
            if (this._graphDataDrawerDialog) {
                this._graphDataDrawerDialog.remove();
                this._graphDataDrawerDialog = undefined;
            }
            this._portType = undefined;
            this._isInputLocal = undefined;
            this._dataPorts = undefined;
            this._onDataPortAddCB = undefined;
            this._onDataPortRemoveCB = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Checks if the node is selectable.
         * @public
         * @returns {boolean} True if the node is selectable else false.
         */
        // eslint-disable-next-line class-methods-use-this
        UIGraphDataDrawer.prototype.isSelectable = function () {
            return false;
        };
        /**
         * Checks if the data port is addable.
         * @public
         * @returns {boolean} True if the data port is addable else false.
         */
        UIGraphDataDrawer.prototype.isDataPortAddable = function () {
            return this._graph.getModel().isDataPortTypeAddable(this._portType);
        };
        /**
         * Gets the main view if the node.
         * @public
         * @override
         * @returns {UIGraphDataDrawerView} The main view of the node.
         */
        UIGraphDataDrawer.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the graph data drawer dialog.
         * @public
         * @returns {UIGraphDataDrawerDialog} The graph data drawer dialog.
         */
        UIGraphDataDrawer.prototype.getDialog = function () {
            return this._graphDataDrawerDialog;
        };
        /**
         * Hides the graph data drawer without hiding its ports.
         * @public
         */
        UIGraphDataDrawer.prototype.hide = function () {
            this.getView().hide();
        };
        /**
         * Shows the graph data drawer.
         * @public
         */
        UIGraphDataDrawer.prototype.show = function () {
            this.getView().show();
        };
        /**
         * Checks if the drawer is visible or not.
         * @public
         * @returns {boolean} True if the drawer is visible else false.
         */
        UIGraphDataDrawer.prototype.isVisible = function () {
            return this.getView().isVisible();
        };
        /**
         * Gets the graph data drawer port type.
         * @public
         * @returns {ModelEnums.EDataPortType} The graph data drawer port type.
         */
        UIGraphDataDrawer.prototype.getPortType = function () {
            return this._portType;
        };
        /**
         * The callback on the node click event.
         * @public
         * @param {Element} subElt - The node sub element.
         */
        UIGraphDataDrawer.prototype.onNodeClick = function (subElt) {
            var drawerView = this.getView();
            if (subElt === drawerView.getButtonElement()) {
                this._createDataPort();
            }
            else if (subElt === drawerView.getTitleElement()) {
                this._graphDataDrawerDialog.open();
            }
        };
        /**
         * Computes the position of the drawer.
         * @public
         * @param {number} [offsetLeft] - The optional adgacent drawer's left offset position.
         */
        UIGraphDataDrawer.prototype.computePosition = function (offsetLeft) {
            var graphLeft = this._graph.getLeft();
            var graphTop = this._graph.getTop();
            var graphHeight = this._graph.getHeight();
            var graphWidth = this._graph.getWidth();
            var graphPaddingLeft = this._graph.getPaddingLeft();
            var drawerHeight = this.getHeight();
            var drawerWidth = this.getWidth();
            var graphBorderWidth = this._graph.getView().getBorderWidth();
            var graphHalfBorderWidth = parseInt(String(graphBorderWidth / 2));
            var drawerLeft, drawerTop;
            if (this._portType === ModelEnums.EDataPortType.eInput) {
                drawerLeft = offsetLeft !== undefined ? offsetLeft : graphLeft + graphPaddingLeft;
                drawerTop = graphTop - drawerHeight - graphHalfBorderWidth;
            }
            else if (this._portType === ModelEnums.EDataPortType.eOutput) {
                drawerLeft = offsetLeft !== undefined ? offsetLeft - drawerWidth : graphLeft + graphWidth - graphPaddingLeft - drawerWidth;
                drawerTop = graphTop + graphHeight + graphHalfBorderWidth;
            }
            else if (this._portType === ModelEnums.EDataPortType.eLocal) {
                if (this._isInputLocal) {
                    drawerLeft = graphLeft + graphPaddingLeft;
                    drawerTop = graphTop + graphHalfBorderWidth;
                }
                else {
                    drawerLeft = graphLeft + graphWidth - graphPaddingLeft - drawerWidth;
                    drawerTop = graphTop + graphHeight - drawerHeight - graphHalfBorderWidth;
                }
            }
            this.setLeft(drawerLeft);
            this.setTop(drawerTop);
            this._dataPorts.forEach(function (dataPort) { var _a; return (_a = dataPort.getPersistentLabel()) === null || _a === void 0 ? void 0 : _a.synchronizePositionWithParentNode(); });
        };
        /**
         * Computes the width of the drawer.
         * @public
         */
        UIGraphDataDrawer.prototype.computeWidth = function () {
            var drawerViewElt = this.getView().getElement();
            var maxPort = this.getUIDataPorts(true, false).length;
            //const maxPort = this.dataPorts.length;
            var width = UIGraphDataDrawer._kBorderToDataPortOffset + maxPort * UIGraphDataDrawer._kPortToPortOffset;
            // Impose a minimum drawer width
            var minWidth = UIDom.getComputedStyleMinDimension(drawerViewElt).width;
            width = width > minWidth ? width : minWidth;
            // Set the drawer width
            this.setWidth(width);
            this._dispatchDataPorts();
            this._graph.updateSizeFromDataDrawers();
        };
        /**
         * Gets the list of UI data ports.
         * Sub data ports and invisible sub data ports can be included to the list.
         * @public
         * @param {boolean} [includeSubDataPorts=false] - True to include sub data ports else false.
         * @param {boolean} [includeUnexposed=false] - True to include unexposed data ports else false.
         * @returns {UIDataPort[]} The list of UI data ports.
         */
        UIGraphDataDrawer.prototype.getUIDataPorts = function (includeSubDataPorts, includeUnexposed) {
            if (includeSubDataPorts === void 0) { includeSubDataPorts = false; }
            if (includeUnexposed === void 0) { includeUnexposed = false; }
            var dataPorts = [];
            this._dataPorts.filter(function (dp) { return !includeUnexposed ? dp.isExposed() : true; }).forEach(function (dataPort) {
                dataPorts.push(dataPort);
                if (includeSubDataPorts) {
                    var subDataPorts = includeUnexposed ? dataPort.getAllSubDataPorts() : dataPort.getExposedSubDataPorts();
                    dataPorts = dataPorts.concat(subDataPorts);
                }
            });
            return dataPorts;
        };
        /**
         * Gets the list of model data ports.
         * @public
         * @returns {Array<DataPort>} The list of model data ports.
         */
        UIGraphDataDrawer.prototype.getModelDataPorts = function () {
            return this._dataPorts.map(function (dataPort) { return dataPort.getModel(); });
        };
        /**
         * Gets the UI data port from the provided data port model.
         * @public
         * @param {DataPort} dataPortModel - The data port model.
         * @returns {UIDataPort} The UI data port.
         */
        UIGraphDataDrawer.prototype.getUIDataPortFromModel = function (dataPortModel) {
            var dataPorts = this.getUIDataPorts(true, true);
            return dataPorts.find(function (dataPort) { return dataPort.getModel() === dataPortModel; });
        };
        /**
         * Unexpose all UI sub data ports.
         * @public
         */
        UIGraphDataDrawer.prototype.unexposeAllUISubDataPorts = function () {
            this._dataPorts.forEach(function (dataPort) { return dataPort.unexposeAllUISubDataPorts(); });
            this.computeWidth();
        };
        /**
         * Gets the input local state.
         * @public
         * @returns {boolean} True for input local type, false for output local type.
         */
        UIGraphDataDrawer.prototype.getInputLocalState = function () {
            return this._isInputLocal;
        };
        /**
         * Creates an UI data port from the provided data port model.
         * @public
         * @param {DataPort} dataPortModel - The data port model .
         * @returns {UIGraphDataPort} The created UI graph data port.
         */
        UIGraphDataDrawer.prototype.createUIDataPort = function (dataPortModel) {
            var _this = this;
            var dataPortUI;
            if (dataPortModel.getType() === this._portType) {
                dataPortUI = new UIGraphDataPort(this, dataPortModel, this._isInputLocal);
                this._dataPorts.push(dataPortUI);
                this.addPort(dataPortUI);
                this.computeWidth();
                dataPortModel.getDataPorts().forEach(function (dataPort, index) {
                    dataPortUI.createUISubDataPort(_this, index, dataPort);
                });
            }
            return dataPortUI;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      ____  ____   ___ _____ _____ ____ _____ _____ ____                        //
        //                     |  _ \|  _ \ / _ \_   _| ____/ ___|_   _| ____|  _ \                       //
        //                     | |_) | |_) | | | || | |  _|| |     | | |  _| | | | |                      //
        //                     |  __/|  _ <| |_| || | | |__| |___  | | | |___| |_| |                      //
        //                     |_|   |_| \_\\___/ |_| |_____\____| |_| |_____|____/                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Creates the drawer view.
         * @protected
         * @override
         * @returns {UIGraphDataDrawerView} The drawer view.
         */
        UIGraphDataDrawer.prototype._createDrawerView = function () {
            return new UIGraphDataDrawerView(this);
        };
        /**
         * Dispatches each graph data ports along its drawer.
         * @protected
         */
        UIGraphDataDrawer.prototype._dispatchDataPorts = function () {
            var dataPorts = this.getUIDataPorts(true, false);
            dataPorts.forEach(function (dataPort, index) {
                var offset = UIGraphDataDrawer._kBorderToDataPortOffset + index * UIGraphDataDrawer._kPortToPortOffset;
                dataPort.setOffset(offset);
            });
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
         * Creates a graph data port according to the drawer data port type.
         * @private
         */
        UIGraphDataDrawer.prototype._createDataPort = function () {
            this._graph.getModel().createDynamicDataPort(this._portType);
            var drawer = this._graph.getDataDrawer(this._portType, this._isInputLocal);
            var dataPort = drawer._dataPorts[drawer._dataPorts.length - 1];
            this._graph.getViewer().replaceSelection(dataPort.getDisplay());
            this._graph.getViewer().getEditor().getHistoryController().registerCreateAction(dataPort);
        };
        /**
         * The callback on the model data port add event.
         * @private
         * @param {Events.DataPortAddEvent} event - The model data port add event.
         */
        UIGraphDataDrawer.prototype._onDataPortAdd = function (event) {
            this.createUIDataPort(event.getDataPort());
        };
        /**
         * The callback on the model data port remove event.
         * @private
         * @param {Events.DataPortRemoveEvent} event - The model data port remove event.
         */
        UIGraphDataDrawer.prototype._onDataPortRemove = function (event) {
            var dataPortModel = event.getDataPort();
            if (dataPortModel.getType() === this._portType) {
                var dataPortUI = this._dataPorts.find(function (dataPort) { return dataPort.getModel() === dataPortModel; });
                if (dataPortUI !== undefined) {
                    var index = this._dataPorts.indexOf(dataPortUI);
                    this._dataPorts.splice(index, 1);
                    dataPortUI.remove();
                    this.computeWidth();
                }
            }
        };
        UIGraphDataDrawer._kBorderToDataPortOffset = 20;
        UIGraphDataDrawer._kPortToPortOffset = 20;
        return UIGraphDataDrawer;
    }(UINode));
    return UIGraphDataDrawer;
});
