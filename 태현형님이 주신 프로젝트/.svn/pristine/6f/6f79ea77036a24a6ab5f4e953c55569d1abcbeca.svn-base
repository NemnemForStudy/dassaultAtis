/// <amd-module name='DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockSubDataPortView'/>
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
define("DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockSubDataPortView", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUISubDataPortView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom"], function (require, exports, UISubDataPortView, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined a UI block sub data port view.
     * @class UIBlockSubDataPortView
     * @alias module:DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockSubDataPortView
     * @extends UISubDataPortView
     * @private
     */
    var UIBlockSubDataPortView = /** @class */ (function (_super) {
        __extends(UIBlockSubDataPortView, _super);
        /**
         * @constructor
         * @param {UIBlockSubDataPort} port - The UI block sub data port.
         */
        function UIBlockSubDataPortView(port) {
            return _super.call(this, port) || this;
        }
        /**
         * Builds the connector SVG element.
         * @protected
         * @override
         * @param {EGraphCore.Connector} connector - The UI connector.
         * @returns {SVGElement} The connector SVG element.
         */
        UIBlockSubDataPortView.prototype.buildConnElement = function (connector) {
            _super.prototype.buildConnElement.call(this, connector);
            UIDom.addClassName(this.structure.root, 'sch-block-subdata-port');
            if (this._port.isStartPort()) {
                this._createInputConnector(connector);
            }
            else {
                this._createOutputConnector(connector);
            }
            return this._element;
        };
        return UIBlockSubDataPortView;
    }(UISubDataPortView));
    return UIBlockSubDataPortView;
});
