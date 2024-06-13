/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphDataPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphDataPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIDataPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "css!DS/EPSSchematicsUI/css/connectors/EPSSchematicsUIGraphDataPort"], function (require, exports, UIDataPortView, UIDom, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined a UI graph data port view.
     * @class UIGraphDataPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphDataPortView
     * @extends UIDataPortView
     * @private
     */
    var UIGraphDataPortView = /** @class */ (function (_super) {
        __extends(UIGraphDataPortView, _super);
        /**
         * @constructor
         * @param {UIGraphDataPort} port - The UI graph data port.
         */
        function UIGraphDataPortView(port) {
            return _super.call(this, port) || this;
        }
        /**
         * Updates the connector width.
         * @public
         * @override
         */
        UIGraphDataPortView.prototype.updateConnectorWidth = function () {
            var subDataPortLength = this._port.getExposedSubDataPorts().length;
            var portType = this._port.getModel().getType();
            if (portType === ModelEnums.EDataPortType.eInput ||
                (portType === ModelEnums.EDataPortType.eLocal && this._port.getInputLocalState())) {
                this._updateOutputConnectorWidth(subDataPortLength);
            }
            else if (portType === ModelEnums.EDataPortType.eOutput ||
                (portType === ModelEnums.EDataPortType.eLocal && !this._port.getInputLocalState())) {
                this._updateInputConnectorWidth(subDataPortLength);
            }
        };
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIGraphDataPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-graph-port');
            this._createConnector(connector);
            return this._element;
        };
        /**
         * Creates the connector.
         * @protected
         * @param {module:egraph/core.Connector} connector - The connector.
         */
        UIGraphDataPortView.prototype._createConnector = function (connector) {
            var portType = this._port.getModel().getType();
            if (portType === ModelEnums.EDataPortType.eInput) {
                this._createOutputConnector(connector);
            }
            else if (portType === ModelEnums.EDataPortType.eOutput) {
                this._createInputConnector(connector);
            }
            else if (portType === ModelEnums.EDataPortType.eLocal) {
                if (this._port.getInputLocalState()) {
                    this._createOutputConnector(connector);
                }
                else {
                    this._createInputConnector(connector);
                }
            }
        };
        return UIGraphDataPortView;
    }(UIDataPortView));
    return UIGraphDataPortView;
});
