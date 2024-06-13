/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphSubDataPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphSubDataPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUISubDataPort", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphSubDataPortView", "DS/EPSSchematicsUI/constraints/EPSSchematicsUIGraphSubDataPortBorderCstr", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, UISubDataPort, UIGraphSubDataPortView, UIGraphSubDataPortBorderCstr, ModelEnums, GraphBlock, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph sub data port.
     * @class UIGraphSubDataPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphSubDataPort
     * @extends UISubDataPort
     * @private
     */
    var UIGraphSubDataPort = /** @class */ (function (_super) {
        __extends(UIGraphSubDataPort, _super);
        /**
         * @constructor
         * @param {UIGraphDataPort} parentPort - The parent UI graph data port.
         * @param {UIGraphDataDrawer} parent - The parent UI graph data drawer.
         * @param {DataPort} model - The data port model.
         */
        function UIGraphSubDataPort(parentPort, parent, model) {
            var _this = _super.call(this, parentPort, parent, model) || this;
            _this._setBorderConstraint({
                cstr: new UIGraphSubDataPortBorderCstr(_this),
                attach: _this.getParentPort().isStartPort() ? EGraphCore.BorderCstr.BOTTOM : EGraphCore.BorderCstr.TOP
            });
            return _this;
        }
        /**
         * Indicates whether the data port label should be displayed on top of the port.
         * @public
         * @abstract
         * @returns {boolean} True if the data port label should be displayed on top of the port else false.
         */
        UIGraphSubDataPort.prototype.isDataPortLabelOnTop = function () {
            return !this.isStartPort();
        };
        /**
         * Checks if the port is a start port.
         * @public
         * @returns {boolean} True if the port is a start port else false.
         */
        UIGraphSubDataPort.prototype.isStartPort = function () {
            var portType = this._model.getType();
            return (portType === ModelEnums.EDataPortType.eInput || (portType === ModelEnums.EDataPortType.eLocal && this._parent.getInputLocalState()));
        };
        /**
         * Creates the view of the connector.
         * @protected
         * @abstract
         * @returns {UIGraphSubDataPortView} The view of the connector.
         */
        UIGraphSubDataPort.prototype._createView = function () {
            return new UIGraphSubDataPortView(this);
        };
        /**
         * The callback of the remove sub data port command.
         * It removes the subdata port from the model for blocks.
         * For graph blocks, it checks weither the external sub data port is not exposed before removing it.
         * @protected
         * @override
         */
        UIGraphSubDataPort.prototype._onRemoveSubDataPort = function () {
            var removeFromModel = true;
            var isGraphBlock = this._model.block instanceof GraphBlock;
            var parentUIPort = this.getParentPort();
            var isLocalPort = parentUIPort.getModel().getType() === ModelEnums.EDataPortType.eLocal;
            if (isGraphBlock && !isLocalPort) {
                var parentGraph = parentUIPort.getParentGraph();
                var graphBlock = parentGraph.getBlockView();
                if (graphBlock !== undefined) {
                    var graphBlockPort = graphBlock.getUIDataPortFromModel(parentUIPort.getModel());
                    var graphBlocksubDataPort = graphBlockPort.getUISubDataPortFromModel(this._model);
                    var externalExposedState = graphBlocksubDataPort.isExposed();
                    if (externalExposedState) {
                        removeFromModel = false;
                        this.setExposedState(false);
                        parentUIPort.updateWidth();
                    }
                }
            }
            if (removeFromModel) {
                this._model.dataPort.removeDataPort(this._model);
            }
        };
        return UIGraphSubDataPort;
    }(UISubDataPort));
    return UIGraphSubDataPort;
});
