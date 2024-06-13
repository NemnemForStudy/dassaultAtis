/// <amd-module name='DS/EPSSchematicsUI/interactions/EPSSchematicsUIGraphBorderMoveDrag'/>
define("DS/EPSSchematicsUI/interactions/EPSSchematicsUIGraphBorderMoveDrag", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIMath"], function (require, exports, UIMath) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a graph border move drag interaction.
     * @private
     * @class UIGraphBorderMoveDrag
     * @alias module:DS/EPSSchematicsUI/interactions/EPSSchematicsUIGraphBorderMoveDrag
     */
    var UIGraphBorderMoveDrag = /** @class */ (function () {
        /**
         * @public
         * @constructor
         * @param {Element} border - The border of the graph.
         * @param {EGraphCore.Group} group - The group representing the graph.
         */
        function UIGraphBorderMoveDrag(border, group) {
            var _this = this;
            this._initialPortOffsets = [];
            this._border = border;
            this._group = group;
            this._graph = this._group.data.graph;
            this._initialLeft = this._group.geometry.left;
            this._initialTop = this._group.geometry.top;
            this._initialWidth = this._group.geometry.width;
            this._initialHeight = this._group.geometry.height;
            this._graph.getControlPorts().forEach(function (cp) { return _this._initialPortOffsets.push(cp.getOffset()); });
            // Merge the blocks and control ports boundaries
            this._graphBounds = this._group.childrenBounds;
            this._cpBounds = this._graph.getControlPortBounds();
            this._clBounds = this._graph.getControlLinkBounds(true);
            this._ymin = UIMath.getMin(this._graphBounds.ymin, this._cpBounds.ymin);
            this._ymax = UIMath.getMax(this._graphBounds.ymax, this._cpBounds.ymax);
            this._ymin = UIMath.getMin(this._clBounds.ymin, this._ymin);
            this._ymax = UIMath.getMax(this._clBounds.ymax, this._ymax);
        }
        /**
         * The graph border mouse move callback.
         * @public
         * @override
         * @param {EGraphIact.IMouseMoveData} data - The move data.
         */
        UIGraphBorderMoveDrag.prototype.onmousemove = function (data) {
            var _this = this;
            var positionX = data.graphPos[0];
            var positionY = data.graphPos[1];
            positionX = this._graph.getEditor().getOptions().gridSnapping ? UIMath.snapValue(positionX) : positionX;
            positionY = this._graph.getEditor().getOptions().gridSnapping ? UIMath.snapValue(positionY) : positionY;
            var computeTop = false, computeBottom = false, computeLeft = false, computeRight = false;
            var graphView = this._graph.getView();
            if (this._border === graphView.getBorderTop()) {
                computeTop = true;
            }
            else if (this._border === graphView.getBorderBottom()) {
                computeBottom = true;
            }
            else if (this._border === graphView.getBorderLeft()) {
                computeLeft = true;
            }
            else if (this._border === graphView.getBorderRight()) {
                computeRight = true;
            }
            else if (this._border === graphView.getCornerNW()) {
                computeTop = true;
                computeLeft = true;
            }
            else if (this._border === graphView.getCornerNE()) {
                computeTop = true;
                computeRight = true;
            }
            else if (this._border === graphView.getCornerSW()) {
                computeBottom = true;
                computeLeft = true;
            }
            else if (this._border === graphView.getCornerSE()) {
                computeBottom = true;
                computeRight = true;
            }
            if (computeTop) {
                var topLimit = void 0, top_1, height = void 0, offsetDiff_1;
                if (isNaN(this._ymin)) {
                    topLimit = (this._initialTop + this._initialHeight) - (this._graph.getPaddingTop() + this._graph.getPaddingBottom());
                }
                else {
                    topLimit = this._ymin - this._graph.getPaddingTop();
                }
                if (positionY < topLimit) {
                    top_1 = positionY;
                    height = this._initialHeight + this._initialTop - positionY;
                    offsetDiff_1 = this._initialTop - positionY;
                }
                else {
                    top_1 = topLimit;
                    height = this._initialHeight + this._initialTop - topLimit;
                    offsetDiff_1 = this._initialTop - topLimit;
                }
                this._graph.getViewer().getDisplay().updateLock();
                try {
                    this._group.multiset(['geometry', 'top'], top_1, ['geometry', 'height'], height);
                    this._graph.getControlPorts().forEach(function (controlPort, index) { return controlPort.setOffset(UIMath.snapValue(_this._initialPortOffsets[index] + offsetDiff_1)); });
                }
                finally {
                    this._graph.getViewer().getDisplay().updateUnlock();
                }
            }
            if (computeBottom) {
                var bottomLimit = void 0;
                if (isNaN(this._ymax)) {
                    bottomLimit = this._initialTop + this._graph.getPaddingTop() + this._graph.getPaddingBottom();
                }
                else {
                    bottomLimit = this._ymax + this._graph.getPaddingBottom();
                }
                var top_2 = this._initialTop;
                var height = positionY > bottomLimit ? (this._initialHeight + positionY - this._initialTop - this._initialHeight) : (bottomLimit - this._initialTop);
                this._group.multiset(['geometry', 'top'], top_2, ['geometry', 'height'], height);
            }
            var minWidth = this._graph.getMinimumGraphWidthFromDrawers();
            this._clBounds = this._graph.getControlLinkBounds(true); // Need to be called again cause of automatic links that are redrawn!
            if (computeLeft) {
                var leftLimit = void 0;
                var xmin = UIMath.getMin(this._graphBounds.xmin, this._clBounds.xmin);
                if (isNaN(xmin)) {
                    leftLimit = (this._initialLeft + this._initialWidth) - (this._graph.getPaddingLeft() + this._graph.getPaddingRight());
                }
                else {
                    leftLimit = xmin - this._graph.getPaddingLeft();
                }
                if ((this._initialLeft + this._initialWidth - leftLimit) < minWidth) {
                    leftLimit = this._initialLeft + this._initialWidth - minWidth;
                }
                var width = positionX < leftLimit ? (this._initialWidth + this._initialLeft - positionX) : (this._initialWidth + this._initialLeft - leftLimit);
                var left = positionX < leftLimit ? positionX : leftLimit;
                this._group.multiset(['geometry', 'left'], left, ['geometry', 'width'], width);
            }
            if (computeRight) {
                var rightLimit = void 0;
                var xmax = UIMath.getMax(this._graphBounds.xmax, this._clBounds.xmax);
                if (isNaN(xmax)) {
                    rightLimit = this._initialLeft + this._graph.getPaddingLeft() + this._graph.getPaddingRight();
                }
                else {
                    rightLimit = xmax + this._graph.getPaddingRight();
                }
                if ((rightLimit - this._initialLeft) < minWidth) {
                    rightLimit = this._initialLeft + minWidth;
                }
                var width = positionX > rightLimit ? (this._initialWidth + positionX - this._initialLeft - this._initialWidth) : (rightLimit - this._initialLeft);
                var left = this._initialLeft;
                this._group.multiset(['geometry', 'left'], left, ['geometry', 'width'], width);
            }
            this._graph.onUIChange();
        };
        /**
         * The graph border move end callback.
         * @public
         * @override
         * @param {boolean} cancel - True when the drag is cancel else false.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIGraphBorderMoveDrag.prototype.onend = function (cancel) {
            var update = this._graph.getTop() !== this._initialTop;
            update = update || this._graph.getLeft() !== this._initialLeft;
            update = update || this._graph.getHeight() !== this._initialHeight;
            update = update || this._graph.getWidth() !== this._initialWidth;
            if (update) {
                var historyController = this._graph.getViewer().getEditor().getHistoryController();
                historyController.registerMoveAction([this._graph]);
            }
        };
        return UIGraphBorderMoveDrag;
    }());
    return UIGraphBorderMoveDrag;
});
