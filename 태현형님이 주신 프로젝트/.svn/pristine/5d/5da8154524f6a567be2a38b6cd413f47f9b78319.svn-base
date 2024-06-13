/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphTestDataPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphTestDataPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphDataPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/data/EPSSchematicsUIShapes", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIDataPortView", "css!DS/EPSSchematicsUI/css/connectors/EPSSchematicsUIGraphTestDataPort"], function (require, exports, UIGraphDataPortView, UIDom, UIShapes, UIDataPortView) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines an UI graph test data port view.
     * @class UIGraphTestDataPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphTestDataPortView
     * @extends UIConnectorView
     * @private
     */
    var UIGraphTestDataPortView = /** @class */ (function (_super) {
        __extends(UIGraphTestDataPortView, _super);
        /**
         * @constructor
         * @param {UIGraphTestDataPort} port - The UI graph test data port.
         */
        function UIGraphTestDataPortView(port) {
            return _super.call(this, port) || this;
        }
        /**
         * Updates the connector width.
         * @public
         * @override
         */
        UIGraphTestDataPortView.prototype.updateConnectorWidth = function () {
            var subDataPortLength = this._port.getExposedSubDataPorts().length;
            var points = UIShapes.graphTestDataPortPathPoints;
            if (subDataPortLength > 0) {
                var width = UIDataPortView.kPortHalfWidth + subDataPortLength * UIDataPortView.kSpaceBetweenPorts;
                points = this._port.isStartPort() ? UIShapes.stretchableGraphTestDataPortPathPoints : UIShapes.stretchableReversedGraphTestDataPortPathPoints;
                points = points.replace(new RegExp('x', 'g'), String(width));
            }
            this._path.setAttribute('points', points);
            _super.prototype.updateConnectorWidth.call(this);
        };
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIGraphTestDataPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-connector-graph-test-data-port');
            return this._element;
        };
        /**
         * Creates the connector.
         * @protected
         * @param {EGraphCore.Connector} connector - The connector.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIGraphTestDataPortView.prototype._createConnector = function (connector) {
            this._polygon = UIDom.createSVGGroup({
                className: 'sch-data-port-polygon',
                parent: this._element
            });
            this._path = UIDom.createSVGPolygon({
                parent: this._polygon,
                attributes: { points: UIShapes.graphTestDataPortPathPoints }
            });
            this._circle = UIDom.createSVGCircle({
                parent: this._polygon,
                attributes: { cx: 6, cy: 0, r: 3 }
            });
        };
        return UIGraphTestDataPortView;
    }(UIGraphDataPortView));
    return UIGraphTestDataPortView;
});
