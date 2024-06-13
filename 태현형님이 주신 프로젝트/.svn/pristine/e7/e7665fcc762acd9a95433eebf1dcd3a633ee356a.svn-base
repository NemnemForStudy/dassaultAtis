/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUISubDataPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUISubDataPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIDataPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/data/EPSSchematicsUIShapes"], function (require, exports, UIDataPortView, UIDom, UIShapes) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined a UI sub data port view.
     * @class UISubDataPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUISubDataPortView
     * @extends UIDataPortView
     * @abstract
     * @private
     */
    var UISubDataPortView = /** @class */ (function (_super) {
        __extends(UISubDataPortView, _super);
        /**
         * @constructor
         * @param {UISubDataPort} port - The UI sub data port.
         */
        function UISubDataPortView(port) {
            return _super.call(this, port) || this;
        }
        /**
         * Updates the connector width.
         * @public
         */
        // eslint-disable-next-line class-methods-use-this
        UISubDataPortView.prototype.updateConnectorWidth = function () { };
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UISubDataPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-subdata-port');
            this.setVisibility(this._port.isVisible());
            return this._element;
        };
        /**
         * Creates an input connector.
         * @param {EGraphCore.Connector} connector - The connector.
         * @protected
         */
        UISubDataPortView.prototype._createInputConnector = function (connector) {
            this._polygon = UIDom.createSVGPolygon({
                className: 'sch-subdata-port-polygon',
                parent: this._element,
                attributes: { points: UIShapes.inputSubDataPortPolygonPoints }
            });
            connector.multiset(['cstr', 'aoffy'], -6);
            this._setRerouteHandlerPosition(2, -2);
        };
        /**
         * Creates an output connector.
         * @param {EGraphCore.Connector} connector - The connector.
         * @protected
         */
        UISubDataPortView.prototype._createOutputConnector = function (connector) {
            this._polygon = UIDom.createSVGPolygon({
                className: 'sch-subdata-port-polygon',
                parent: this._element,
                attributes: { points: UIShapes.outputSubDataPortPolygonPoints }
            });
            connector.multiset(['cstr', 'aoffy'], -10);
            this._setRerouteHandlerPosition(7, -2);
        };
        return UISubDataPortView;
    }(UIDataPortView));
    return UISubDataPortView;
});
