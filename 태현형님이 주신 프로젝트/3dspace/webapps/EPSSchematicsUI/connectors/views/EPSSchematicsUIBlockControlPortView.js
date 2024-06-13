/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockControlPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockControlPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIControlPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/data/EPSSchematicsUIShapes", "css!DS/EPSSchematicsUI/css/connectors/EPSSchematicsUIBlockControlPort"], function (require, exports, UIControlPortView, UIDom, UIShapes) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined the customized default view for a UI block control port.
     * @class UIBlockControlPortView
     * @alias module:DS/EPSSchematicsUI/views/EPSSchematicsUIBlockControlPortView
     * @extends UIControlPortView
     * @private
     */
    var UIBlockControlPortView = /** @class */ (function (_super) {
        __extends(UIBlockControlPortView, _super);
        /**
         * @constructor
         * @param {UIBlockControlPort} port - The UI block control port.
         */
        function UIBlockControlPortView(port) {
            return _super.call(this, port) || this;
        }
        /**
         * Gets the port polygon SVG element.
         * @public
         * @returns {SVGElement} The port polygon SVG element.
         */
        UIBlockControlPortView.prototype.getPolygon = function () {
            return this._polygon;
        };
        /**
         * Destroys the connector.
         * @protected
         * @override
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view.
         */
        UIBlockControlPortView.prototype.ondestroyDisplay = function (elt, grView) {
            this._polygon = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIBlockControlPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, ['sch-control-port', 'sch-block-port']);
            var isStartPort = this._port.isStartPort();
            var className = isStartPort ? 'sch-input-control-port' : 'sch-output-control-port';
            UIDom.addClassName(this._element, className);
            this._createShape();
            this._element.appendChild(this._polygon);
            this._setRerouteHandlerPosition(13, -2.05);
            return this._element;
        };
        /**
         * Creates the block event port shape.
         * @protected
         */
        UIBlockControlPortView.prototype._createShape = function () {
            this._polygon = UIDom.createSVGPolygon({
                className: 'sch-block-control-port-polygon',
                attributes: { points: UIShapes.controlPortPolygonPoints }
            });
            if (!this._port.isStartPort()) {
                UIDom.transformSVGShape(this._polygon, 15, 0, -180);
            }
        };
        return UIBlockControlPortView;
    }(UIControlPortView));
    return UIBlockControlPortView;
});
