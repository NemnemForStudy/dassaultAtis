/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockDataPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockDataPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIDataPort", "DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockDataPortBorderCstr", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockDataPortView", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockSubDataPort", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, UIDataPort, UIBlockDataPortBorderCstr, UIBlockDataPortView, UIBlockSubDataPort, ModelEnums, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI block data port.
     * @class UIBlockDataPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockDataPort
     * @extends UIDataPort
     * @private
     */
    var UIBlockDataPort = /** @class */ (function (_super) {
        __extends(UIBlockDataPort, _super);
        /**
         * @constructor
         * @param {UIBlock} block - The UI block that owns this UI block data port.
         * @param {DataPort} model - The data port model.
         */
        function UIBlockDataPort(block, model) {
            var _this = _super.call(this, block, model) || this;
            _this._setBorderConstraint({
                cstr: new UIBlockDataPortBorderCstr(_this),
                attach: _this.isStartPort() ? EGraphCore.BorderCstr.TOP : EGraphCore.BorderCstr.BOTTOM
            });
            _this._buildFromModel();
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
         * Indicates whether the data port label should be displayed on top of the port.
         * @public
         * @abstract
         * @returns {boolean} True if the data port label should be displayed on top of the port else false.
         */
        UIBlockDataPort.prototype.isDataPortLabelOnTop = function () {
            return this.isStartPort();
        };
        /**
         * Gets the parent graph of the port.
         * @public
         * @returns {UIGraph} The parent graph of the port.
         */
        UIBlockDataPort.prototype.getParentGraph = function () {
            return this._parent.getGraph();
        };
        /**
         * Checks if the port is a start port.
         * @public
         * @returns {boolean} True if the port is a start port else false.
         */
        UIBlockDataPort.prototype.isStartPort = function () {
            return this._model.getType() === ModelEnums.EDataPortType.eInput;
        };
        /**
         * Projects the specified JSON object to the block data port.
         * @public
         * @param {IJSONDataPortUI} iJSONDataPort - The JSON projected block data port.
         */
        UIBlockDataPort.prototype.fromJSON = function (iJSONDataPort) {
            var _this = this;
            _super.prototype.fromJSON.call(this, iJSONDataPort);
            if (iJSONDataPort === null || iJSONDataPort === void 0 ? void 0 : iJSONDataPort.dataPorts) {
                iJSONDataPort.dataPorts.forEach(function (dataPort, index) {
                    var _a;
                    var subDataPort = _this._subDataPorts[index];
                    if (subDataPort) {
                        var exposedState = dataPort.outside.show;
                        subDataPort.setExposedState(exposedState);
                        if ((_a = dataPort === null || dataPort === void 0 ? void 0 : dataPort.outside) === null || _a === void 0 ? void 0 : _a.label) {
                            var label = subDataPort.createPersistentLabel();
                            label.fromJSON(dataPort.outside.label);
                        }
                    }
                });
                this.updateWidth();
            }
        };
        /**
         * Projects the block data port to the specified JSON object.
         * @public
         * @param {IJSONDataPortUI} oJSONDataPort - The JSON projected block data port.
         */
        UIBlockDataPort.prototype.toJSON = function (oJSONDataPort) {
            _super.prototype.toJSON.call(this, oJSONDataPort);
            if (this._subDataPorts.length) {
                oJSONDataPort.dataPorts = [];
                this._subDataPorts.forEach(function (subDataPort) {
                    var oJSONPort = {};
                    subDataPort.toJSON(oJSONPort);
                    oJSONDataPort.dataPorts.push({
                        //inside: { show: false },
                        outside: { show: subDataPort.isExposed(), label: oJSONPort.label }
                    });
                });
            }
        };
        /**
         * Creates the UI block sub data port.
         * @public
         * @param {DataPort} subDataPortModel - The sub data port model.
         * @param {number} index - The sub data port index.
         * @returns {UIBlockSubDataPort} The UI block sub data port.
         */
        UIBlockDataPort.prototype.createUIBlockSubDataPort = function (subDataPortModel, index) {
            var subDataPort = new UIBlockSubDataPort(this, this._parent, subDataPortModel);
            this._addSubDataPort(subDataPort, index);
            return subDataPort;
        };
        /**
         * Updates the data port width.
         * @public
         */
        UIBlockDataPort.prototype.updateWidth = function () {
            _super.prototype.updateWidth.call(this);
            this._parent.computeWidth();
        };
        /**
         * Sets the data port exposed state.
         * @public
         * @param {boolean} exposedState - True to expose the data port, false to unexpose it.
         */
        UIBlockDataPort.prototype.setExposedState = function (exposedState) {
            _super.prototype.setExposedState.call(this, exposedState);
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
         * @returns {UIBlockDataPortView} The view of the connector.
         */
        UIBlockDataPort.prototype._createView = function () {
            return new UIBlockDataPortView(this);
        };
        /**
         * The callback on the data port add event.
         * @protected
         * @param {DataPortAddEvent} event - The data port add event.
         */
        UIBlockDataPort.prototype._onDataPortAdd = function (event) {
            this.createUIBlockSubDataPort(event.getDataPort(), event.getIndex());
            this.updateWidth();
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
         * Builds the block data port from the model.
         * For template instance, we synchronize the number of data ports.
         * @private
         */
        UIBlockDataPort.prototype._buildFromModel = function () {
            var _this = this;
            this._model.getDataPorts().forEach(function (dataPort, index) {
                _this.createUIBlockSubDataPort(dataPort, index);
            });
            if (this._model.isOptional()) {
                this.setExposedState(false);
            }
        };
        return UIBlockDataPort;
    }(UIDataPort));
    return UIBlockDataPort;
});
