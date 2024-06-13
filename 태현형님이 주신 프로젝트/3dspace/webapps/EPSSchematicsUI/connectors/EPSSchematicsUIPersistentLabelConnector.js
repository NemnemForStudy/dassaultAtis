/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIPersistentLabelConnector'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIPersistentLabelConnector", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIConnector", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIPersistentLabelConnectorView", "DS/EPSSchematicsUI/constraints/EPSSchematicsUIConnectorMiddleCstr"], function (require, exports, UIConnector, UIPersistentLabelConnectorView, UIConnectorMiddleCstr) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI persistent label connector.
     * @class UIConnector
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIPersistentLabelConnector
     * @extends UIConnector
     * @private
     */
    var UIPersistentLabelConnector = /** @class */ (function (_super) {
        __extends(UIPersistentLabelConnector, _super);
        /**
         * @constructor
         * @param {UIPersistentLabel} label - The persistent label.
         */
        function UIPersistentLabelConnector(label) {
            var _this = _super.call(this) || this;
            _this._label = label;
            /*this._setBorderConstraint({
                cstr: new UIConnectorMiddleCstr(this._label.getDisplay())
            });*/
            _this._display.multiset('cstr', new UIConnectorMiddleCstr(_this._label.getDisplay())); // TODO: Rework the setBorderConstraint API to accept class not deriving from BorderCtr
            return _this;
        }
        /**
         * Removes the connector.
         * @public
         */
        UIPersistentLabelConnector.prototype.remove = function () {
            this._label = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Creates the view of the connector.
         * @protected
         * @returns {UIPersistentLabelConnectorView} The view of the connector.
         */
        UIPersistentLabelConnector.prototype._createView = function () {
            return new UIPersistentLabelConnectorView(this);
        };
        return UIPersistentLabelConnector;
    }(UIConnector));
    return UIPersistentLabelConnector;
});
