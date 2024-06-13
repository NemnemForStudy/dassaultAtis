/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockSubDataPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockSubDataPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUISubDataPort", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore", "DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockSubDataPortBorderCstr", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockSubDataPortView", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock"], function (require, exports, UISubDataPort, EGraphCore, UIBlockSubDataPortBorderCstr, UIBlockSubDataPortView, ModelEnums, GraphBlock) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI block sub data port.
     * @class UIBlockSubDataPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockSubDataPort
     * @extends UISubDataPort
     * @private
     */
    var UIBlockSubDataPort = /** @class */ (function (_super) {
        __extends(UIBlockSubDataPort, _super);
        /**
         * @constructor
         * @param {UIBlockDataPort} parentPort - The parent UI block data port.
         * @param {UIBlock} parent - The parent UI block.
         * @param {DataPort} model - The data port model.
         */
        function UIBlockSubDataPort(parentPort, parent, model) {
            var _this = _super.call(this, parentPort, parent, model) || this;
            _this._setBorderConstraint({
                cstr: new UIBlockSubDataPortBorderCstr(_this),
                attach: _this.getParentPort().isStartPort() ? EGraphCore.BorderCstr.TOP : EGraphCore.BorderCstr.BOTTOM
            });
            return _this;
        }
        /**
         * Indicates whether the data port label should be displayed on top of the port.
         * @public
         * @abstract
         * @returns {boolean} True if the data port label should be displayed on top of the port else false.
         */
        UIBlockSubDataPort.prototype.isDataPortLabelOnTop = function () {
            return this.isStartPort();
        };
        /**
         * Checks if the port is a start port.
         * @public
         * @returns {boolean} True if the port is a start port else false.
         */
        UIBlockSubDataPort.prototype.isStartPort = function () {
            return this._model.getType() === ModelEnums.EDataPortType.eInput;
        };
        /**
         * Creates the view of the connector.
         * @protected
         * @abstract
         * @returns {UIBlockSubDataPortView} The view of the connector.
         */
        UIBlockSubDataPort.prototype._createView = function () {
            return new UIBlockSubDataPortView(this);
        };
        /**
         * The callback of the remove sub data port command.
         * It removes the subdata port from the model for blocks.
         * For graph blocks, it checks weither the external sub data port is not exposed before removing it.
         * @protected
         * @override
         */
        UIBlockSubDataPort.prototype._onRemoveSubDataPort = function () {
            var removeFromModel = true;
            var isGraphBlock = this._model.block instanceof GraphBlock;
            if (isGraphBlock) {
                var parentUIPort = this.getParentPort();
                var parentUIGraphBlock = parentUIPort.getParent();
                var portIndex = parentUIGraphBlock.getModel().getDataPorts().indexOf(parentUIPort.getModel());
                var subDataPortindex = parentUIPort.getModel().getDataPorts().indexOf(this._model);
                var internalExposedState = parentUIGraphBlock.getInternalSubDataPortExposedState(portIndex, subDataPortindex);
                if (internalExposedState) {
                    removeFromModel = false;
                    this.setExposedState(false);
                    parentUIPort.updateWidth();
                }
            }
            if (removeFromModel) {
                this._model.dataPort.removeDataPort(this._model);
            }
        };
        return UIBlockSubDataPort;
    }(UISubDataPort));
    return UIBlockSubDataPort;
});
