/// <amd-module name='DS/EPSSchematicsUI/interactions/EPSSchematicsUIGraphControlPortMoveDrag'/>
define("DS/EPSSchematicsUI/interactions/EPSSchematicsUIGraphControlPortMoveDrag", ["require", "exports"], function (require, exports) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines UI graph control port move drag interaction.
     * @private
     * @class UIGraphControlPortMoveDrag
     * @alias module:DS/EPSSchematicsUI/interactions/EPSSchematicsUIGraphControlPortMoveDrag
     */
    var UIGraphControlPortMoveDrag = /** @class */ (function () {
        /**
         * @public
         * @constructor
         * @param {UIGraphControlPort} controlPort - The graph control port.
         */
        function UIGraphControlPortMoveDrag(controlPort) {
            this._dragStart = true;
            this._anchorY = 0;
            this._controlPort = controlPort;
        }
        /**
         * The connector mouse move callback.
         * @public
         * @override
         * @param {EGraphIact.IMouseMoveData} data - The move data.
         */
        UIGraphControlPortMoveDrag.prototype.onmousemove = function (data) {
            var graphPosY = data.graphPos[1];
            var connector = this._controlPort.getDisplay();
            var graph = this._controlPort.getParent();
            var graphTop = graph.getDisplay().actualTop;
            if (this._dragStart) {
                var connectorHeight = this._controlPort.getView().getHandler().height.baseVal.value;
                this._anchorY = graphPosY - connector.top;
                this._anchorY = this._anchorY > 0 ? this._anchorY : 0;
                this._anchorY = this._anchorY < connectorHeight ? this._anchorY : connectorHeight;
                this._dragStart = false;
            }
            var diff = Math.abs(graphTop - graphPosY);
            var posY = diff - this._anchorY;
            posY = this._controlPort.computeValidOffset(posY);
            connector.multiset(['cstr', 'offset'], posY);
            graph.getViewer().getLabelController().clearAllLabels();
        };
        /**
         * The connector move end callback.
         * @public
         * @override
         */
        UIGraphControlPortMoveDrag.prototype.onend = function () {
            if (this._anchorY > 0) {
                var graph = this._controlPort.getParent();
                graph.onUIChange();
                var historyController = graph.getViewer().getEditor().getHistoryController();
                historyController.registerMoveAction([this._controlPort]);
            }
        };
        return UIGraphControlPortMoveDrag;
    }());
    return UIGraphControlPortMoveDrag;
});
