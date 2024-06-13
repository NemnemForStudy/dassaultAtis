/// <amd-module name='DS/EPSSchematicsUI/geometries/EPSSchematicsUIControlLinkGeometry'/>
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
define("DS/EPSSchematicsUI/geometries/EPSSchematicsUIControlLinkGeometry", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/tools/EPSSchematicsUIMath", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphControlPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphEventPort", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, EGraphCore, UIBlock, UIMath, UIGraphControlPort, UIGraphEventPort, ModelEnums) {
    "use strict";
    /**
     * This class defines a UI control link geometry.
     * @class UIControlLinkGeometry
     * @alias module:DS/EPSSchematicsUI/geometries/EPSSchematicsUIControlLinkGeometry
     * @extends EGraphCore.StairGeometry
     * @private
     */
    var UIControlLinkGeometry = /** @class */ (function (_super) {
        __extends(UIControlLinkGeometry, _super);
        /**
         * @constructor
         * @param {EGraphCore.IStairGeometryOptions} options - The stair geometry options.
         */
        function UIControlLinkGeometry(options) {
            return _super.call(this, options) || this;
        }
        /**
         * The callback on the control link geometry update.
         * @public
         * @param {EGraphCore.Edge} edge - The edge to update.
         */
        UIControlLinkGeometry.prototype.onupdate = function (edge) {
            var block1 = edge.cl1.c.data.uiElement.getParent();
            var block2 = edge.cl2.c.data.uiElement.getParent();
            var areBlocks = block1 instanceof UIBlock && block2 instanceof UIBlock;
            if (!edge.reshaped && !edge.splitted) {
                this.updateAutomaticPath(edge);
            }
            else if (areBlocks && block1.isSelected() && block2.isSelected()) {
                this.updateStaticPath(edge);
            }
            else {
                this.updateManualPath(edge);
            }
        };
        /**
         * Updates the control link path geometry with static pattern.
         * @private
         * @param {EGraphCore.Edge} edge - The edge to update.
         */
        // eslint-disable-next-line class-methods-use-this
        UIControlLinkGeometry.prototype.updateStaticPath = function (edge) {
            var newPath = edge.path.slice();
            var start = { x: edge.cl1.c.aleft, y: edge.cl1.c.atop };
            var end = { x: edge.cl2.c.aleft, y: edge.cl2.c.atop };
            var diffX = start.x - newPath[1];
            var diffY = start.y - newPath[2];
            // Set start and end points to respective port position
            newPath[1] = start.x;
            newPath[2] = start.y;
            newPath[newPath.length - 2] = end.x;
            newPath[newPath.length - 1] = end.y;
            // Update the other points
            for (var i = 3; i < newPath.length - 3; i += 3) {
                newPath[i + 1] += diffX;
                newPath[i + 2] += diffY;
            }
            edge.set('path', newPath);
        };
        /**
         * Updates the control link path geometry with manual pattern.
         * @private
         * @param {EGraphCore.Edge} edge - The edge to update.
         */
        UIControlLinkGeometry.prototype.updateManualPath = function (edge) {
            var newPath = edge.path.slice();
            var start = { x: edge.cl1.c.aleft, y: edge.cl1.c.atop };
            var end = { x: edge.cl2.c.aleft, y: edge.cl2.c.atop };
            var totalPoints = newPath.length / 3;
            // Set start and end points to respective port position
            newPath[1] = start.x;
            newPath[2] = start.y;
            newPath[newPath.length - 2] = end.x;
            newPath[newPath.length - 1] = end.y;
            if (totalPoints >= 4) {
                // Add an horizontal constraint on the start+1 and end-1 points
                newPath[5] = start.y;
                newPath[newPath.length - 4] = end.y;
                // Add a vertical contraint on the start+1 and start+2 points
                var limitStartX = UIMath.snapValue(start.x + UIControlLinkGeometry.K_BLOCKPORTMINSEGLENGTH);
                if (limitStartX > newPath[4]) {
                    newPath[4] = limitStartX;
                    newPath[7] = limitStartX;
                }
                // Add a vertical constraint on the end-1 and end-2 path and split the path if needed
                var limitEndX = UIMath.snapValue(end.x - UIControlLinkGeometry.K_BLOCKPORTMINSEGLENGTH);
                if (limitEndX < newPath[newPath.length - 5]) {
                    newPath[newPath.length - 5] = limitEndX;
                    if (newPath.length === 12 && limitStartX > limitEndX) {
                        newPath = this.getSplittedMiddlePath(newPath);
                    }
                    else {
                        newPath[newPath.length - 8] = limitEndX;
                    }
                }
            }
            edge.set('path', newPath);
            // Refine path only for paths having more than 3 segments (min 5 points)
            if (totalPoints >= 5) {
                edge.reshapeInProgress = true;
                this.refinePath(edge);
            }
        };
        /**
         * Updates the control link path geometry with automatic pattern.
         * @private
         * @param {EGraphCore.Edge} edge - The edge to update.
         */
        UIControlLinkGeometry.prototype.updateAutomaticPath = function (edge) {
            var newPath = [];
            var c1 = {};
            c1.port = edge.cl1.c.data.uiElement;
            c1.block = c1.port.getParent();
            c1.type = c1.port.getModel().getType();
            c1.left = edge.cl1.c.aleft;
            c1.top = edge.cl1.c.atop;
            var c2 = {};
            c2.port = edge.cl2.c.data.uiElement;
            c2.block = c2.port.getParent();
            c2.type = c2.port.getModel().getType();
            c2.left = edge.cl2.c.aleft;
            c2.top = edge.cl2.c.atop;
            // Manage graph port by reversing their types
            if (c1.port instanceof UIGraphEventPort) {
                c1.type = (c1.type === ModelEnums.EControlPortType.eInputEvent) ? ModelEnums.EControlPortType.eOutput : ModelEnums.EControlPortType.eInput;
            }
            else if (c1.port instanceof UIGraphControlPort) {
                c1.type = (c1.type === ModelEnums.EControlPortType.eInput) ? ModelEnums.EControlPortType.eOutput : ModelEnums.EControlPortType.eInput;
            }
            if (c2.port instanceof UIGraphEventPort) {
                c2.type = (c2.type === ModelEnums.EControlPortType.eInputEvent) ? ModelEnums.EControlPortType.eOutput : ModelEnums.EControlPortType.eInput;
            }
            else if (c2.port instanceof UIGraphControlPort) {
                c2.type = (c2.type === ModelEnums.EControlPortType.eInput) ? ModelEnums.EControlPortType.eOutput : ModelEnums.EControlPortType.eInput;
            }
            var segLength = UIControlLinkGeometry.K_BLOCKPORTMINSEGLENGTH;
            var output = c1.type === ModelEnums.EControlPortType.eOutput || c1.type === ModelEnums.EControlPortType.eOutputEvent;
            var isGraphPorts = c1.port instanceof UIGraphControlPort || c2.port instanceof UIGraphControlPort;
            if (c1.block === c2.block && c1.block !== undefined && !(c1.port instanceof UIGraphControlPort)) {
                newPath = this.computeLoopLinkPath(c1, c2);
            }
            else if (!isGraphPorts && ((output && (c2.left - segLength < c1.left + segLength)) || (!output && (c1.left - segLength < c2.left + segLength)))) {
                newPath = this.computeReverseLinkPath(c1, c2);
            }
            else {
                newPath = this.computeNormalLinkPath(c1, c2);
            }
            edge.set('path', newPath);
        };
        /**
         * Computes the path of the normal control link.
         * @private
         * @param {IConnectorSpec} c1 - The first connector.
         * @param {IConnectorSpec} c2 - The second connector.
         * @returns {Array<number>} The computed path.
         */
        // eslint-disable-next-line class-methods-use-this
        UIControlLinkGeometry.prototype.computeNormalLinkPath = function (c1, c2) {
            var output = (c1.type === ModelEnums.EControlPortType.eOutput);
            var destX = output ? c2.left - c1.left : c1.left - c2.left;
            var middleX = UIMath.snapValue(c1.left + (output ? (destX / 2) : -(destX / 2)));
            var path = [
                0 /* M */, c1.left, c1.top,
                1 /* L */, middleX, c1.top,
                1 /* L */, middleX, c2.top,
                1 /* L */, c2.left, c2.top
            ];
            return path;
        };
        /**
         * Computes the path of the reverse control link.
         * @private
         * @param {IConnectorSpec} c1 - The first connector.
         * @param {IConnectorSpec} c2 - The second connector.
         * @returns {Array<number>} The computed path.
         */
        // eslint-disable-next-line class-methods-use-this
        UIControlLinkGeometry.prototype.computeReverseLinkPath = function (c1, c2) {
            var b1Pos = c1.block.getPosition();
            var b2Pos = c2.block.getPosition();
            var x1max = b1Pos.left + c1.block.getWidth();
            var y1min = b1Pos.top;
            var y1max = b1Pos.top + c1.block.getHeight();
            var x2max = b2Pos.left + c2.block.getWidth();
            var y2min = b2Pos.top;
            var y2max = b2Pos.top + c2.block.getHeight();
            var gap = UIControlLinkGeometry.K_MINBLOCKTOLINKGAPY * 2;
            var middleY;
            var output = (c1.type === ModelEnums.EControlPortType.eOutput);
            var left1 = UIMath.snapValue(c1.left + UIControlLinkGeometry.K_BLOCKPORTMINSEGLENGTH * (output ? 1 : -1));
            var left2 = UIMath.snapValue(c2.left + UIControlLinkGeometry.K_BLOCKPORTMINSEGLENGTH * (output ? -1 : 1));
            // Manage block vertical avoidance
            if (y1min < y2min && y1max + gap <= y2min) {
                middleY = UIMath.snapValue(y1max + (y2min - y1max) / 2);
            }
            else if (y2max + gap <= y1min) {
                middleY = UIMath.snapValue(y2max + (y1min - y2max) / 2);
            }
            else {
                middleY = (y1max < y2max ? y2max : y1max) + UIControlLinkGeometry.K_MINBLOCKTOLINKGAPY;
                // Manage block horizontal avoidance
                if (output && x1max < x2max) {
                    left1 = x2max + UIControlLinkGeometry.K_MINBLOCKTOLINKGAPX;
                }
            }
            var path = [
                0 /* M */, c1.left, c1.top,
                1 /* L */, left1, c1.top,
                1 /* L */, left1, middleY,
                1 /* L */, left2, middleY,
                1 /* L */, left2, c2.top,
                1 /* L */, c2.left, c2.top
            ];
            return path;
        };
        /**
         * Computes the path of the looping control link.
         * @private
         * @param {IConnectorSpec} c1 - The first connector.
         * @param {IConnectorSpec} c2 - The second connector.
         * @returns {Array<number>} The computed path.
         */
        // eslint-disable-next-line class-methods-use-this
        UIControlLinkGeometry.prototype.computeLoopLinkPath = function (c1, c2) {
            var blockHeight = c1.block.getHeight();
            var blockPos = c1.block.getPosition();
            var linkPosY = UIMath.snapValue(blockPos.top + blockHeight - c1.top + UIControlLinkGeometry.K_MINBLOCKTOLINKGAPY);
            var output = (c1.type === ModelEnums.EControlPortType.eOutput);
            var left1 = UIMath.snapValue(c1.left + UIControlLinkGeometry.K_BLOCKPORTMINSEGLENGTH * (output ? 1 : -1));
            var left2 = UIMath.snapValue(c2.left + UIControlLinkGeometry.K_BLOCKPORTMINSEGLENGTH * (output ? -1 : 1));
            var path = [
                0 /* M */, c1.left, c1.top,
                1 /* L */, left1, c1.top,
                1 /* L */, left1, c1.top + linkPosY,
                1 /* L */, left2, c1.top + linkPosY,
                1 /* L */, left2, c2.top,
                1 /* L */, c2.left, c2.top
            ];
            return path;
        };
        /**
         * Splits the provided path in the middle.
         * @private
         * @param {Array<number>} path - The path to split.
         * @returns {Array<number>} The splitted path.
         */
        // eslint-disable-next-line class-methods-use-this
        UIControlLinkGeometry.prototype.getSplittedMiddlePath = function (path) {
            var newPath = path.slice();
            var totalPoints = newPath.length / 3;
            var middleIndex = (totalPoints / 2) * 3;
            var p1x = newPath[middleIndex - 2];
            var p1y = newPath[middleIndex - 1];
            var p2x = newPath[middleIndex + 1];
            var p2y = newPath[middleIndex + 2];
            var middleY = UIMath.snapValue(p1y + (p2y - p1y) / 2);
            newPath.splice(middleIndex, 0, 1 /* L */, p1x, middleY, 1 /* L */, p2x, middleY);
            return newPath;
        };
        /**
         * Overrides the edge reshape path function.
         * @override
         * @protected
         * @param {EGraphCore.Edge} edge - The edge.
         * @param {EGraphCore.IPickedSegmentOptions} pickedSegmentOptions - The picked segment options.
         * @param {Array<number>} reshapePosition - The reshape position.
         */
        // eslint-disable-next-line class-methods-use-this
        UIControlLinkGeometry.prototype.reshapePath = function (edge, pickedSegmentOptions, reshapePosition) {
            // TODO: Check if we can call directly the parent class function!
            /*const graph = edge.data.uiElement.graph;
            const verticalMove = pickedSegmentOptions.direction && pickedSegmentOptions.direction[1] === 0;
            const paddingLeft = 30;
            const paddingRight = 30;
            const graphMin = verticalMove ? graph.getTop() + graph.getPaddingTop() : graph.getLeft() + paddingLeft;
            const graphMax = verticalMove ? graph.getTop() + graph.getHeight() - graph.getPaddingBottom() : graph.getLeft() + graph.getWidth() - paddingRight;
            EgraphCore.StairGeometry.prototype.reshapePath.call(this, edge, pickedSegmentOptions, reshapePosition, graphMin, graphMax, function (path1, path2) {
                path1 = UIMath.snapValue(path1);
                path2 = UIMath.snapValue(path2);
            });*/
            if (edge && pickedSegmentOptions && reshapePosition) {
                var margin = UIControlLinkGeometry.K_GRAPHPORTMINSEGLENGTH;
                var verticalMove = pickedSegmentOptions.direction && pickedSegmentOptions.direction[1] === 0;
                var newPath_1 = edge.path.slice(0);
                var index = pickedSegmentOptions.index;
                var graph = edge.data.uiElement.getGraph();
                var paddingLeft = 30;
                var paddingRight = 30;
                var graphMin = verticalMove ? graph.getTop() + graph.getPaddingTop() : graph.getLeft() + paddingLeft;
                var graphMax = verticalMove ? graph.getTop() + graph.getHeight() - graph.getPaddingBottom() : graph.getLeft() + graph.getWidth() - paddingRight;
                var min = index === 6 ? (verticalMove ? newPath_1[2] : newPath_1[1]) + margin : graphMin;
                var max = index === newPath_1.length - 6 ? (verticalMove ? newPath_1[newPath_1.length - 1] : newPath_1[newPath_1.length - 2]) - margin : graphMax;
                if (verticalMove) {
                    if (reshapePosition[1] < min) {
                        newPath_1[index + 2] = UIMath.snapValue(min);
                        newPath_1[index - 1] = UIMath.snapValue(min);
                    }
                    else if (reshapePosition[1] > max) {
                        newPath_1[index + 2] = UIMath.snapValue(max);
                        newPath_1[index - 1] = UIMath.snapValue(max);
                    }
                    else {
                        newPath_1[index + 2] = UIMath.snapValue(reshapePosition[1]);
                        newPath_1[index - 1] = UIMath.snapValue(reshapePosition[1]);
                    }
                }
                else {
                    if (reshapePosition[0] < min) {
                        newPath_1[index + 1] = UIMath.snapValue(min);
                        newPath_1[index - 2] = UIMath.snapValue(min);
                    }
                    else if (reshapePosition[0] > max) {
                        newPath_1[index + 1] = UIMath.snapValue(max);
                        newPath_1[index - 2] = UIMath.snapValue(max);
                    }
                    else {
                        newPath_1[index + 1] = UIMath.snapValue(reshapePosition[0]);
                        newPath_1[index - 2] = UIMath.snapValue(reshapePosition[0]);
                    }
                }
                edge.gr.withLockedUpdate(function setPath() {
                    edge.set('path', newPath_1);
                    edge.reshaped = true;
                    edge.reshapeInProgress = true;
                });
            }
        };
        /**
         * Splits the given edge path.
         * @protected
         * @param {EGraphCore.Edge} edge - The edge to split.
         * @param {EGraphCore.IPickedSegmentOptions} pickedSegmentOptions - The picked segment options.
         * @param {[number, number]} splitPosition - The split position.
         */
        UIControlLinkGeometry.prototype.splitPath = function (edge, pickedSegmentOptions, splitPosition) {
            splitPosition[0] = UIMath.snapValue(splitPosition[0]);
            splitPosition[1] = UIMath.snapValue(splitPosition[1]);
            _super.prototype.splitPath.call(this, edge, pickedSegmentOptions, splitPosition);
        };
        /**
         * Checks whether or not the provided position is on the provided segment.
         * @private
         * @param {number} x - The x position.
         * @param {number} y - The y position.
         * @param {number} x1 - The first point x position of the segment.
         * @param {number} y1 - The first point y position of the segment.
         * @param {number} x2 - The last point x position of the segment.
         * @param {number} y2 - The last point y position of the segment.
         * @returns {boolean} True if the point is on the given segment else false.
         */
        // eslint-disable-next-line class-methods-use-this
        UIControlLinkGeometry.prototype.isOnSegment = function (x, y, x1, y1, x2, y2) {
            var margin = 5;
            var dx1 = x - x1;
            var dy1 = y - y1;
            var dx2 = x2 - x1;
            var dy2 = y2 - y1;
            if (Math.abs(dx1) < margin) {
                dx1 = 0;
            }
            if (Math.abs(dy1) < margin) {
                dy1 = 0;
            }
            var cross = dx1 * dy2 - dy1 * dx2;
            var result = false;
            // The point lies on the line if and only if cross is equal to zero.
            if (cross === 0) {
                // Now we have to check whether the point lies between the original points.
                // This can be easily done by comparing the x coordinates, if the line
                // is "more horizontal than vertical", or y coordinates otherwise!
                if (Math.abs(dx2) >= Math.abs(dy2)) {
                    result = dx2 > 0 ? x1 <= x && x <= x2 : x2 <= x && x <= x1;
                }
                else {
                    result = dy2 > 0 ? y1 <= y && y <= y2 : y2 <= y && y <= y1;
                }
            }
            return result;
        };
        /**
         * Checks if the given point is on a vertical or horizontal segment.
         * @public
         * @param {EGraphCore.Edge} edge - The edge.
         * @param {number} x - The x position on the segment.
         * @param {number} y - The y position on the segment.
         * @returns {boolean|undefined} True if the segment is vertical else false or undefined if the point is not on segment.
         */
        UIControlLinkGeometry.prototype.isSegmentVertical = function (edge, x, y) {
            var isVertical;
            var path = edge.path;
            for (var i = 3; i < path.length - 6; i += 3) {
                var x1 = path[i + 1];
                var y1 = path[i + 2];
                var x2 = path[i + 4];
                var y2 = path[i + 5];
                var result = this.isOnSegment(x, y, x1, y1, x2, y2);
                if (result) {
                    isVertical = x1 === x2;
                    break;
                }
            }
            return isVertical;
        };
        /**
         * Overrides the retrieving of the picked segment options function.
         * @private
         * @override
         * @param {EGraphCore.Edge} edge - The edge.
         * @param {Array<number>} graphPos - The picked graph position.
         * @returns {EGraphCore.IPickedSegmentOptions} The picked segment options.
         */
        UIControlLinkGeometry.prototype.getPickedSegmentOptions = function (edge, graphPos) {
            var options = { index: -1, direction: [0, 0] };
            if (edge && graphPos) {
                var lastX = edge.path[1];
                var lastY = edge.path[2];
                for (var idx = 3; idx < edge.path.length; idx += 3) {
                    var curX = edge.path[idx + 1];
                    var curY = edge.path[idx + 2];
                    if (this.isOnSegment(graphPos[0], graphPos[1], lastX, lastY, curX, curY)) {
                        options = { index: idx, direction: [edge.path[idx + 1] - lastX, edge.path[idx + 2] - lastY] };
                        break;
                    }
                    lastX = curX;
                    lastY = curY;
                }
            }
            return options;
        };
        /**
         * Gets the control link geometry bounding box.
         * @public
         * @param {EGraphCore.Edge} edge - The edge.
         * @param {boolean} fixedPath - True to limit the bounding box to fixed paths segment only else false.
         * @returns {EGraphUtils.BoundingRect} The control link bounding box.
         */
        // eslint-disable-next-line class-methods-use-this
        UIControlLinkGeometry.prototype.getBoundingBox = function (edge, fixedPath) {
            var xmin, ymin, xmax, ymax;
            var start = fixedPath ? 3 : 0;
            var stop = fixedPath ? edge.path.length - 3 : edge.path.length;
            xmin = xmax = edge.path[start + 1];
            ymin = ymax = edge.path[start + 2];
            for (var i = start; i < stop; i += 3) {
                var x = edge.path[i + 1];
                var y = edge.path[i + 2];
                xmin = UIMath.getMin(x, xmin);
                xmax = UIMath.getMax(x, xmax);
                ymin = UIMath.getMin(y, ymin);
                ymax = UIMath.getMax(y, ymax);
            }
            return { xmin: xmin + UIControlLinkGeometry.K_MINBLOCKTOLINKGAPX, ymin: ymin, xmax: xmax - UIControlLinkGeometry.K_MINBLOCKTOLINKGAPX, ymax: ymax };
        };
        UIControlLinkGeometry.K_BLOCKPORTMINSEGLENGTH = 5;
        UIControlLinkGeometry.K_GRAPHPORTMINSEGLENGTH = 10;
        UIControlLinkGeometry.K_MINBLOCKTOLINKGAPX = 20;
        UIControlLinkGeometry.K_MINBLOCKTOLINKGAPY = 30;
        return UIControlLinkGeometry;
    }(EGraphCore.StairGeometry));
    return UIControlLinkGeometry;
});
