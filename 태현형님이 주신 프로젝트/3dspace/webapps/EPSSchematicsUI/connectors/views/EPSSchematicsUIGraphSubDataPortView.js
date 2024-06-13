/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphSubDataPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphSubDataPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUISubDataPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom"], function (require, exports, UISubDataPortView, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined a UI graph sub data port view.
     * @class UIGraphSubDataPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphSubDataPortView
     * @extends UISubDataPortView
     * @private
     */
    var UIGraphSubDataPortView = /** @class */ (function (_super) {
        __extends(UIGraphSubDataPortView, _super);
        /**
         * @constructor
         * @param {UIGraphSubDataPort} port - The UI graph sub data port.
         */
        function UIGraphSubDataPortView(port) {
            return _super.call(this, port) || this;
        }
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIGraphSubDataPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-graph-subdata-port');
            this._createConnector(connector);
            return this._element;
        };
        /**
         * Creates the connector.
         * @protected
         * @param {module:egraph/core.Connector} connector - The connector.
         */
        UIGraphSubDataPortView.prototype._createConnector = function (connector) {
            if (this._port.isStartPort()) {
                this._createOutputConnector(connector);
            }
            else {
                this._createInputConnector(connector);
            }
        };
        return UIGraphSubDataPortView;
    }(UISubDataPortView));
    return UIGraphSubDataPortView;
});
