/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphDataPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphDataPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIDataPort", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphDataPortView", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphSubDataPort", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, UIDataPort, UIGraphDataPortView, UIGraphSubDataPort, ModelEnums, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph data port.
     * @class UIGraphDataPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphDataPort
     * @extends UIDataPort
     * @private
     */
    var UIGraphDataPort = /** @class */ (function (_super) {
        __extends(UIGraphDataPort, _super);
        /**
         * @constructor
         * @param {UIGraphDataDrawer} parent - The UI graph data drawer that owns this UI graph data port.
         * @param {DataPort} model - The data port model.
         * @param {boolean} [isInputLocal] - Optionnal parameter for local data port type.
         */
        function UIGraphDataPort(parent, model, isInputLocal) {
            var _this = _super.call(this, parent, model) || this;
            _this._isInputLocal = isInputLocal;
            _this._setBorderConstraint({
                attach: _this.isStartPort() ? EGraphCore.BorderCstr.BOTTOM : EGraphCore.BorderCstr.TOP
            });
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
         * Removes the port.
         * @public
         */
        UIGraphDataPort.prototype.remove = function () {
            this._isInputLocal = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Indicates whether the data port label should be displayed on top of the port.
         * @public
         * @abstract
         * @returns {boolean} True if the data port label should be displayed on top of the port else false.
         */
        UIGraphDataPort.prototype.isDataPortLabelOnTop = function () {
            return !this.isStartPort();
        };
        /**
         * Gets the view of the of.
         * @public
         * @returns {UIGraphDataPortView} The view of the port.
         */
        UIGraphDataPort.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the parent graph of the port.
         * @public
         * @returns {UIGraph} The parent graph of the port.
         */
        UIGraphDataPort.prototype.getParentGraph = function () {
            return this._parent.getGraph();
        };
        /**
         * Gets the parent of the port.
         * @public
         * @returns {UIGraph} The parent of the port.
         */
        UIGraphDataPort.prototype.getParent = function () {
            return this._parent.getGraph();
        };
        /**
         * Gets the input local state.
         * @public
         * @returns {boolean} True if the graph data port is an input local port else false.
         */
        UIGraphDataPort.prototype.getInputLocalState = function () {
            return this._isInputLocal;
        };
        /**
         * Checks if the port is a start port.
         * @public
         * @returns {boolean} True if the port is a start port else false.
         */
        UIGraphDataPort.prototype.isStartPort = function () {
            var portType = this._model.getType();
            return (portType === ModelEnums.EDataPortType.eInput || (portType === ModelEnums.EDataPortType.eLocal && this._isInputLocal));
        };
        /**
         * Projects the specified JSON object to the graph data port.
         * @public
         * @param {IJSONDataPortUI} iJSONDataPort - The JSON projected graph data port.
         */
        UIGraphDataPort.prototype.fromJSON = function (iJSONDataPort) {
            var _this = this;
            if (iJSONDataPort !== undefined && Array.isArray(iJSONDataPort.dataPorts)) {
                iJSONDataPort.dataPorts.forEach(function (dataPort, index) {
                    var _a, _b, _c;
                    var subDataPort = _this._subDataPorts[index];
                    if (subDataPort) {
                        var isLocalDataPort = subDataPort.getModel().getType() === ModelEnums.EDataPortType.eLocal;
                        var exposedState = isLocalDataPort ? (_this._isInputLocal ? (_a = dataPort === null || dataPort === void 0 ? void 0 : dataPort.localInput) === null || _a === void 0 ? void 0 : _a.show : (_b = dataPort === null || dataPort === void 0 ? void 0 : dataPort.localOutput) === null || _b === void 0 ? void 0 : _b.show) : (_c = dataPort === null || dataPort === void 0 ? void 0 : dataPort.inside) === null || _c === void 0 ? void 0 : _c.show;
                        subDataPort.setExposedState(exposedState);
                    }
                });
                this.updateWidth();
            }
        };
        /**
         * Projects the graph data port to the specified JSON object.
         * @public
         * @param {IJSONDataPortUI} oJSONDataPort - The JSON projected graph data port.
         */
        UIGraphDataPort.prototype.toJSON = function (oJSONDataPort) {
            oJSONDataPort.dataPorts = [];
            this._subDataPorts.forEach(function (subDataPort) {
                var exposedState = subDataPort.isExposed();
                var isLocalDataPort = subDataPort.getModel().getType() === ModelEnums.EDataPortType.eLocal;
                oJSONDataPort.dataPorts.push({
                    inside: !isLocalDataPort ? { show: exposedState } : undefined,
                    outside: !isLocalDataPort ? { show: false } : undefined,
                    localInput: isLocalDataPort ? { show: exposedState } : undefined,
                    localOutput: isLocalDataPort ? { show: exposedState } : undefined
                });
            });
        };
        /**
         * Creates the UI sub data port.
         * @public
         * @param {UIGraphDataDrawer} parent - The parent UI graph data drawer.
         * @param {number} index - The index of the sub data port.
         * @param {DataPort} subDataPortModel - The sub data port model.
         * @returns {UIGraphSubDataPort} The created UI sub data port.
         */
        UIGraphDataPort.prototype.createUISubDataPort = function (parent, index, subDataPortModel) {
            var subDataPortUI = new UIGraphSubDataPort(this, parent, subDataPortModel);
            this._addSubDataPort(subDataPortUI, index);
            this.updateWidth();
            return subDataPortUI;
        };
        /**
         * Updates the data port width.
         * @public
         */
        UIGraphDataPort.prototype.updateWidth = function () {
            _super.prototype.updateWidth.call(this);
            this._parent.computeWidth();
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
         * Creates the view of the connector.
         * @protected
         * @override
         * @returns {UIGraphDataPortView} The view of the connector.
         */
        UIGraphDataPort.prototype._createView = function () {
            return new UIGraphDataPortView(this);
        };
        /**
         * The callback on the data port add event.
         * @protected
         * @param {DataPortAddEvent} event - The data port add event.
         */
        UIGraphDataPort.prototype._onDataPortAdd = function (event) {
            this.createUISubDataPort(this._parent, event.getIndex(), event.getDataPort());
        };
        return UIGraphDataPort;
    }(UIDataPort));
    return UIGraphDataPort;
});
