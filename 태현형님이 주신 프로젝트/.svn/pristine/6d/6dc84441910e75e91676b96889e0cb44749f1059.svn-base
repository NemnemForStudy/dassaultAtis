/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIPersistentLabelConnectorView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIPersistentLabelConnectorView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIConnectorView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom"], function (require, exports, UIConnectorView, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined a UI persistent label connector view.
     * @class UIPersistentLabelConnectorView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIPersistentLabelConnectorView
     * @extends UIConnectorView
     * @private
     */
    var UIPersistentLabelConnectorView = /** @class */ (function (_super) {
        __extends(UIPersistentLabelConnectorView, _super);
        /**
         * @constructor
         * @param {UIPersistentLabelConnector} connector - The persistent label connector.
         */
        function UIPersistentLabelConnectorView(connector) {
            var _this = _super.call(this) || this;
            _this._connector = connector;
            return _this;
        }
        /**
         * Destroys the connector.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view.
         */
        UIPersistentLabelConnectorView.prototype.ondestroyDisplay = function (elt, grView) {
            this._connector = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Builds the connector SVG element.
         * @protected
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIPersistentLabelConnectorView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-connector-label');
            /*const circle = UIDom.createSVGCircle({
                attributes: { cx: 5, cy: 0, r: 5 },
                className: 'sch-connector-label-circle',
                parent: this.element
            });*/
            return this._element;
        };
        return UIPersistentLabelConnectorView;
    }(UIConnectorView));
    return UIPersistentLabelConnectorView;
});
