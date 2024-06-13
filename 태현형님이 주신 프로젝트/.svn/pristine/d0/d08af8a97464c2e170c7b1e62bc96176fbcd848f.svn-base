/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockEventPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockEventPortView", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/data/EPSSchematicsUIShapes", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockControlPortView"], function (require, exports, UIDom, UIShapes, UIBlockControlPortView) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined the customized default view for a UI block event port.
     * @class UIBlockEventPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockEventPortView
     * @extends UIBlockControlPortView
     * @private
     */
    var UIBlockEventPortView = /** @class */ (function (_super) {
        __extends(UIBlockEventPortView, _super);
        /**
         * @constructor
         * @param {UIBlockEventPort} port - The UI block event port.
         */
        function UIBlockEventPortView(port) {
            return _super.call(this, port) || this;
        }
        /**
         * Destroys the connector.
         * @protected
         * @override
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view.
         */
        UIBlockEventPortView.prototype.ondestroyDisplay = function (elt, grView) {
            this._portHandler = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Creates the block event port shape.
         * @protected
         * @override
         */
        UIBlockEventPortView.prototype._createShape = function () {
            this._polygon = UIDom.createSVGPath({ attributes: { d: UIShapes.eventPortPathPoints } });
            this._portHandler = UIDom.createSVGPolygon({
                className: 'sch-event-port-handler',
                attributes: { points: UIShapes.controlPortPolygonPoints }
            });
            this._element.appendChild(this._portHandler);
            if (!this._port.isStartPort()) {
                UIDom.transformSVGShape(this._polygon, 15, 0, -180);
                UIDom.transformSVGShape(this._portHandler, 15, 0, -180);
            }
        };
        return UIBlockEventPortView;
    }(UIBlockControlPortView));
    return UIBlockEventPortView;
});
