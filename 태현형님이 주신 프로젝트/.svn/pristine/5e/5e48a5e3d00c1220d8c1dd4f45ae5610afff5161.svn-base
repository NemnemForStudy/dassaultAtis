/// <amd-module name='DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkConnectDrag'/>
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
define("DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkConnectDrag", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphIact"], function (require, exports, EGraphIact) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a link connect drag interaction.
     * @class UILinkConnectDrag
     * @alias module:DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkConnectDrag
     * @extends EGraphIact.ConnConnectDrag
     * @abstract
     * @private
     */
    var UILinkConnectDrag = /** @class */ (function (_super) {
        __extends(UILinkConnectDrag, _super);
        /**
         * @constructor
         * @param {EGraphCore.EGraph} gr - The concerned graph.
         * @param {EGraphCore.Connector} c - The concerned connector.
         */
        function UILinkConnectDrag(gr, c) {
            var _this = _super.call(this, gr, c) || this;
            _this._port = c.data.uiElement;
            _this._graph = _this._port.getParentGraph();
            return _this;
        }
        /**
         * The connector drag end callback.
         * @override
         * @public
         * @param {boolean} cancel - True when the drag is cancel else false.
         */
        UILinkConnectDrag.prototype.onend = function (cancel) {
            _super.prototype.onend.call(this, cancel);
        };
        return UILinkConnectDrag;
    }(EGraphIact.ConnConnectDrag));
    return UILinkConnectDrag;
});
