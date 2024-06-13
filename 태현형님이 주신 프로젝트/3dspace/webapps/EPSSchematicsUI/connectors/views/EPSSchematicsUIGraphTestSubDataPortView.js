/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphTestSubDataPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphTestSubDataPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphSubDataPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "css!DS/EPSSchematicsUI/css/connectors/EPSSchematicsUIGraphTestSubDataPort"], function (require, exports, UIGraphSubDataPortView, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph test sub data port view.
     * class UIGraphTestSubDataPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphTestSubDataPortView
     * @extends UIGraphSubDataPortView
     * @private
     */
    var UIGraphTestSubDataPortView = /** @class */ (function (_super) {
        __extends(UIGraphTestSubDataPortView, _super);
        /**
         * @constructor
         * @param {UIGraphTestSubDataPort} port - The UI graph test sub data port.
         */
        function UIGraphTestSubDataPortView(port) {
            return _super.call(this, port) || this;
        }
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIGraphTestSubDataPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-connector-graph-test-sub-data-port');
            return this._element;
        };
        /**
         * Creates the connector.
         * @protected
         * @param {module:egraph/core.Connector} connector - The connector.
         */
        // eslint-disable-next-line no-unused-vars
        UIGraphTestSubDataPortView.prototype._createConnector = function (connector) {
            this._polygon = UIDom.createSVGGroup({
                className: 'sch-subdata-port-polygon',
                parent: this._element
            });
            this._rect = UIDom.createSVGRect({
                parent: this._polygon,
                attributes: { x: 0, y: -6, width: 8, height: 12 }
            });
            this._circle = UIDom.createSVGCircle({
                parent: this._polygon,
                attributes: { cx: 4, cy: 0, r: 2.5 }
            });
        };
        return UIGraphTestSubDataPortView;
    }(UIGraphSubDataPortView));
    return UIGraphTestSubDataPortView;
});
