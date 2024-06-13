/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphDataTestDrawer'/>
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
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphDataTestDrawer", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphDataDrawer", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphDataTestDrawerView", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestDataPort", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIInputTestDialog", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIOutputTestDialog", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, UIGraphDataDrawer, UIGraphDataTestDrawerView, UIGraphTestDataPort, UIInputTestDialog, UIOutputTestDialog, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph data test drawer.
     * @class UIGraphDataTestDrawer
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphDataTestDrawer
     * @extends UIGraphDataDrawer
     * @private
     */
    var UIGraphDataTestDrawer = /** @class */ (function (_super) {
        __extends(UIGraphDataTestDrawer, _super);
        /**
         * @constructor
         * @param {UIGraph} graph - The parent graph.
         * @param {EDataPortType} portType - The data port type.
         */
        function UIGraphDataTestDrawer(graph, portType) {
            var _this = _super.call(this, graph, portType, false) || this;
            _this._drawerRef = _this.isInputPort() ? _this._graph.getInputDataDrawer() : _this._graph.getOutputDataDrawer();
            var editor = _this._graph.getEditor();
            _this._validationDialog = _this.isInputPort() ? new UIInputTestDialog(editor) : new UIOutputTestDialog(editor);
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
        UIGraphDataTestDrawer.prototype.remove = function () {
            if (this._validationDialog !== undefined) {
                this._validationDialog.remove();
                this._validationDialog = undefined;
            }
            _super.prototype.remove.call(this);
        };
        /**
         * Computes the position of the drawer.
         * @public
         */
        UIGraphDataTestDrawer.prototype.computePosition = function () {
            var drawerRefPosition = this._drawerRef.getPosition();
            var left = drawerRefPosition.left;
            //const top = this.isInputPort() ? drawerRefPosition.top - this.getHeight() : drawerRefPosition.top + this.drawerRef.getHeight();
            var top = drawerRefPosition.top;
            this.setPosition(left, top);
        };
        /**
         * Computes the width of the drawer.
         * @public
         */
        UIGraphDataTestDrawer.prototype.computeWidth = function () {
            this.setWidth(this._drawerRef.getWidth());
            this._dispatchDataPorts();
        };
        /**
         * The callback on the node click event.
         * @public
         */
        UIGraphDataTestDrawer.prototype.onNodeClick = function () {
            this._validationDialog.open();
        };
        /**
         * Get the graph data test drawer dialog.
         * @public
         * @returns {UIValidationDialog} The graph data test drawer dialog.
         */
        UIGraphDataTestDrawer.prototype.getTestDialog = function () {
            return this._validationDialog;
        };
        /**
         * Creates an UI data port from the provided data port model.
         * @public
         * @param {DataPort} dataPortModel - The data port model .
         * @returns {UIGraphDataPort} The created UI graph data port.
         */
        UIGraphDataTestDrawer.prototype.createUIDataPort = function (dataPortModel) {
            var _this = this;
            var dataPortUI;
            if (dataPortModel.getType() === this._portType) {
                dataPortUI = new UIGraphTestDataPort(this, dataPortModel);
                this._dataPorts.push(dataPortUI);
                this.addPort(dataPortUI);
                if (!this.isVisible()) {
                    dataPortUI.setVisibility(false);
                }
                this.computeWidth();
                dataPortModel.getDataPorts().forEach(function (dataPort, index) { return dataPortUI.createUISubDataPort(_this, index, dataPort); });
            }
            return dataPortUI;
        };
        /**
         * Hides the graph data test drawer with its data ports.
         * @public
         */
        UIGraphDataTestDrawer.prototype.hide = function () {
            _super.prototype.hide.call(this);
            this._dataPorts.forEach(function (dataPort) { return dataPort.setVisibility(false); });
        };
        /**
         * Shows the graph data test drawer.
         * @public
         */
        UIGraphDataTestDrawer.prototype.show = function () {
            _super.prototype.show.call(this);
            this._dataPorts.forEach(function (dataPort) { return dataPort.setVisibility(true); });
            this.computeWidth();
        };
        /**
         * Resets the test values;
         * @public
         */
        UIGraphDataTestDrawer.prototype.resetTestValues = function () {
            this._dataPorts.forEach(function (dataPort) { return dataPort.getModel().setTestValues([]); });
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
        UIGraphDataTestDrawer.prototype._createDrawerView = function () {
            return (new UIGraphDataTestDrawerView(this, this.isInputPort()));
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
         * Checks if the port is an input type.
         * @private
         * @returns {boolean} True if the port is an input type else false.
         */
        UIGraphDataTestDrawer.prototype.isInputPort = function () {
            return this._portType === ModelEnums.EDataPortType.eInput;
        };
        return UIGraphDataTestDrawer;
    }(UIGraphDataDrawer));
    return UIGraphDataTestDrawer;
});
