/// <amd-module name='DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataPortShortcutDrag'/>
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
define("DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataPortShortcutDrag", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphIact"], function (require, exports, EGraphIact) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a data port shortcut drag interaction.
     * @private
     * @class UIDataPortShortcutDrag
     * @alias module:DS/EPSSchematicsUI/interactions/EPSSchematicsUIDataPortShortcutDrag
     * @extends EGraphIact.SinglePtDrag
     */
    var UIDataPortShortcutDrag = /** @class */ (function (_super) {
        __extends(UIDataPortShortcutDrag, _super);
        /**
         * @public
         * @constructor
         * @param {UIDataPort} port - The UI data port.
         */
        function UIDataPortShortcutDrag(port) {
            var _this = _super.call(this) || this;
            _this._port = port;
            _this._graph = _this._port.getParentGraph();
            _this._shortcut = _this._graph.createShortcut(_this._port, _this._port.getLeft(), _this._port.getTop());
            return _this;
        }
        /**
         * The node move callback.
         * @override
         * @protected
         * @param {EGraphIact.IMouseMoveData} data - The move data.
         */
        UIDataPortShortcutDrag.prototype.onmove = function (data) {
            if (data.inside) {
                this._shortcut.setPosition(data.graphPos[0], data.graphPos[1]);
            }
        };
        /**
         * The node move end callback.
         * @override
         * @protected
         * @param {boolean} cancel - True when the drag is cancel else false.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIDataPortShortcutDrag.prototype.onend = function (cancel) {
            if (this._shortcut !== undefined) {
                var historyController = this._graph.getViewer().getEditor().getHistoryController();
                historyController.registerCreateAction(this._shortcut);
            }
        };
        return UIDataPortShortcutDrag;
    }(EGraphIact.SinglePtDrag));
    return UIDataPortShortcutDrag;
});
