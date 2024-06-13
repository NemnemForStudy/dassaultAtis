/// <amd-module name='DS/EPSSchematicsUI/groups/views/EPSSchematicsUIGraphView'/>
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
define("DS/EPSSchematicsUI/groups/views/EPSSchematicsUIGraphView", ["require", "exports", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUINodeView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphViews", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsContainedGraphBlock", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore", "css!DS/EPSSchematicsUI/css/groups/EPSSchematicsUIGraph"], function (require, exports, UINodeView, UIDom, EGraphViews, BlockLibrary, Events, ContainedGraphBlock, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defined a UI graph view.
     * @private
     * @class UIGraphView
     * @alias module:DS/EPSSchematicsUI/groups/views/EPSSchematicsUIGraphView
     * @extends UINodeView
     */
    var UIGraphView = /** @class */ (function (_super) {
        __extends(UIGraphView, _super);
        /**
         * @public
         * @constructor
         * @param {UIGraph} graph - The graph.
         */
        function UIGraphView(graph) {
            var _this = _super.call(this) || this;
            _this._isPositioned = false;
            _this._onBlockNameChangeCB = _this._onBlockNameChange.bind(_this);
            _this._kBorderMaskName = 'sch-graph-border-mask';
            _this._kCornerMaskName = 'sch-graph-corner-mask';
            _this._graph = graph;
            _this._isSubGraph = _this._graph.getModel().getGraphContext() !== _this._graph.getModel();
            var UIGraphTemplateViewer = require('DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphTemplateViewer');
            _this._isTemplatedGraph = _this._graph.getViewer() instanceof UIGraphTemplateViewer;
            _this._isContainedGraph = _this._graph.getModel() instanceof ContainedGraphBlock;
            if (_this._isSubGraph || _this._isTemplatedGraph) {
                _this._graph.getModel().addListener(Events.BlockNameChangeEvent, _this._onBlockNameChangeCB);
            }
            return _this;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Checks if the given element is part of the graph's border.
         * @public
         * @param {Element} element - The graph element.
         * @returns {boolean} True if the element is part of the graph's border else false.
         */
        UIGraphView.prototype.isBorder = function (element) {
            return UIDom.hasClassName(element, this._kBorderMaskName) || UIDom.hasClassName(element, this._kCornerMaskName);
        };
        /**
         * Gets the graph view container SVG element.
         * @public
         * @returns {SVGElement} The graph view container SVG element.
         */
        UIGraphView.prototype.getContainer = function () {
            return this._container;
        };
        /**
         * Gets the graph view border SVG rect element.
         * @public
         * @returns {SVGElement} The graph viewer border SVG rect element.
         */
        UIGraphView.prototype.getBorderRect = function () {
            return this._borderRect;
        };
        /**
         * Gets the graph border width.
         * @public
         * @returns {number} The graph border width.
         */
        UIGraphView.prototype.getBorderWidth = function () {
            return parseFloat(UIDom.getComputedStyle(this._borderRect, 'strokeWidth')) || 0;
        };
        /**
         * Gets the graph view grid SVG element.
         * @public
         * @returns {SVGElement} The graph view grid SVG element.
         */
        UIGraphView.prototype.getGrid = function () {
            return this._grid;
        };
        /**
         * Gets the graph border top SVG element.
         * @public
         * @returns {SVGElement} The graph border top SVG element.
         */
        UIGraphView.prototype.getBorderTop = function () {
            return this._borderTop;
        };
        /**
         * Gets the graph border bottom SVG element.
         * @public
         * @returns {SVGElement} The graph border bottom SVG element.
         */
        UIGraphView.prototype.getBorderBottom = function () {
            return this._borderBottom;
        };
        /**
         * Gets the graph border left SVG element.
         * @public
         * @returns {SVGElement} The graph border left SVG element.
         */
        UIGraphView.prototype.getBorderLeft = function () {
            return this._borderLeft;
        };
        /**
         * Gets the graph border right SVG element.
         * @public
         * @returns {SVGElement} The graph border right SVG element.
         */
        UIGraphView.prototype.getBorderRight = function () {
            return this._borderRight;
        };
        /**
         * Gets the graph corner NW SVG rect element.
         * @public
         * @returns {SVGRectElement} The graph corner NW SVG rect element.
         */
        UIGraphView.prototype.getCornerNW = function () {
            return this._cornerNW;
        };
        /**
         * Gets the graph corner NE SVG rect element.
         * @public
         * @returns {SVGRectElement} The graph corner NE SVG rect element.
         */
        UIGraphView.prototype.getCornerNE = function () {
            return this._cornerNE;
        };
        /**
         * Gets the graph corner SW SVG rect element.
         * @public
         * @returns {SVGRectElement} The graph corner SW SVG rect element.
         */
        UIGraphView.prototype.getCornerSW = function () {
            return this._cornerSW;
        };
        /**
         * Gets the graph corner SE SVG rect element.
         * @public
         * @returns {SVGRectElement} The graph corner SE SVG rect element.
         */
        UIGraphView.prototype.getCornerSE = function () {
            return this._cornerSE;
        };
        /**
         * Gets the background text wrapper SVG element.
         * @public
         * @returns {SVGElement} The background text wrapper SVG element.
         */
        UIGraphView.prototype.getBackgroundTextWrapper = function () {
            return this._backgroundTextWrapper;
        };
        /**
         * Gets the graph background name element.
         * @public
         * @returns {SVGTSpanElement} The graph background name element.
         */
        UIGraphView.prototype.getBackgroundGraphNameElement = function () {
            return this._backgroundGraphName;
        };
        /**
         * Gets the graph background sub name element.
         * @public
         * @returns {SVGTSpanElement} The graph background sub name element.
         */
        UIGraphView.prototype.getBackgroundGraphSubNameElement = function () {
            return this._backgroundGraphSubName;
        };
        /**
         * Updates the data drawer's position.
         * @public
         */
        UIGraphView.prototype.updateDataDrawersPosition = function () {
            if (this._isPositioned) {
                var inputDataDrawer = this._graph.getInputDataDrawer();
                var outputDataDrawer = this._graph.getOutputDataDrawer();
                var inputLocalDataDrawer = this._graph.getInputLocalDataDrawer();
                var outputLocalDataDrawer = this._graph.getOutputLocalDataDrawer();
                var inputDataTestDrawer = this._graph.getInputDataTestDrawer();
                var outputDataTestDrawer = this._graph.getOutputDataTestDrawer();
                var inputLocalDataDrawerPosition = void 0, outputLocalDataDrawerPosition = void 0;
                if (inputLocalDataDrawer !== undefined) {
                    inputLocalDataDrawer.computePosition();
                    inputLocalDataDrawerPosition = inputLocalDataDrawer.getLeft() + inputLocalDataDrawer.getWidth();
                }
                if (inputDataDrawer !== undefined) {
                    inputDataDrawer.computePosition(inputLocalDataDrawerPosition);
                }
                if (outputLocalDataDrawer !== undefined) {
                    outputLocalDataDrawer.computePosition();
                    outputLocalDataDrawerPosition = outputLocalDataDrawer.getLeft();
                }
                if (outputDataDrawer !== undefined) {
                    outputDataDrawer.computePosition(outputLocalDataDrawerPosition);
                }
                if (inputDataTestDrawer !== undefined) {
                    inputDataTestDrawer.computePosition();
                }
                if (outputDataTestDrawer !== undefined) {
                    outputDataTestDrawer.computePosition();
                }
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      ____  ____   ___ _____ _____ ____ _____ _____ ____                        //
        //                     |  _ \|  _ \ / _ \_   _| ____/ ___|_   _| ____|  _ \                       //
        //                     | |_) | |_) | | | || | |  _|| |     | | |  _| | | | |                      //
        //                     |  __/|  _ <| |_| || | | |__| |___  | | | |___| |_| |                      //
        //                     |_|   |_| \_\\___/ |_| |_____\____| |_| |_____|____/                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Destroys the view of the element.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UIGraphView.prototype.ondestroy = function (elt, grView) {
            if (this._isSubGraph || this._isTemplatedGraph) {
                this._graph.getModel().removeListener(Events.BlockNameChangeEvent, this._onBlockNameChangeCB);
            }
            this._graph = undefined;
            this._isPositioned = undefined;
            this._isSubGraph = undefined;
            this._isContainedGraph = undefined;
            this._isTemplatedGraph = undefined;
            this._container = undefined;
            this._borderRect = undefined;
            this._borderTop = undefined;
            this._borderBottom = undefined;
            this._borderLeft = undefined;
            this._borderRight = undefined;
            this._cornerNW = undefined;
            this._cornerNE = undefined;
            this._cornerSW = undefined;
            this._cornerSE = undefined;
            this._backgroundTextWrapper = undefined;
            this._backgroundTextElement = undefined;
            this._backgroundGraphName = undefined;
            this._backgroundGraphSubName = undefined;
            this._grid = undefined;
            this._onBlockNameChangeCB = undefined;
            _super.prototype.ondestroy.call(this, elt, grView);
        };
        /**
         * Creates the structure of the element.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UIGraphView.prototype.oncreateStructure = function (elt, grView) {
            _super.prototype.oncreateStructure.call(this, elt, grView);
            var groupLayer = new EGraphViews.SVGLayer();
            groupLayer.name += ' GroupLayer';
            this.structure.nodeLayer.parentLayer.insertBefore(groupLayer, this.structure.nodeLayer);
            this.structure.nodeLayer.remove();
            this.structure.nodeLayer = groupLayer;
        };
        /**
         * Positions the structure of the element.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.Element} nextWithView - The next sibling of 'elt' element that has view with the same key as this view. Can be null.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         * @param {EGraphViews.PerEltView|EGraphCore.GraphView} parentView - The view of the parent of the element.
         * @param {EGraphViews.PerEltView} nextView  - The view of 'nextWithView' element if not null, else null.
         */
        UIGraphView.prototype.onpositionStructure = function (elt, nextWithView, grView, parentView, nextView) {
            _super.prototype.onpositionStructure.call(this, elt, nextWithView, grView, parentView, nextView);
            this._isPositioned = true;
            this.updateDataDrawersPosition();
        };
        /**
         * Creates the display of the element.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIGraphView.prototype.oncreateDisplay = function (elt, grView) {
            this._borderRect = UIDom.createSVGRect({
                className: 'sch-graph-border-rect',
                attributes: { x: 0, y: 0, width: 800, height: 400, rx: 10, ry: 10 }
            });
            this._borderTop = UIDom.createSVGLine({ className: [this._kBorderMaskName, this._kBorderMaskName + '-top'] });
            this._borderBottom = UIDom.createSVGLine({ className: [this._kBorderMaskName, this._kBorderMaskName + '-bottom'] });
            this._borderLeft = UIDom.createSVGLine({ className: [this._kBorderMaskName, this._kBorderMaskName + '-left'] });
            this._borderRight = UIDom.createSVGLine({ className: [this._kBorderMaskName, this._kBorderMaskName + '-right'] });
            this._cornerNW = UIDom.createSVGRect({
                className: [this._kCornerMaskName, this._kCornerMaskName + '-nw'],
                attributes: { width: 10, height: 10 }
            });
            this._cornerNE = UIDom.createSVGRect({
                className: [this._kCornerMaskName, this._kCornerMaskName + '-ne'],
                attributes: { width: 10, height: 10 }
            });
            this._cornerSW = UIDom.createSVGRect({
                className: [this._kCornerMaskName, this._kCornerMaskName + '-sw'],
                attributes: { width: 10, height: 10 }
            });
            this._cornerSE = UIDom.createSVGRect({
                className: [this._kCornerMaskName, this._kCornerMaskName + '-se'],
                attributes: { width: 10, height: 10 }
            });
            this._container = UIDom.createSVGGroup({
                className: 'sch-graph-container',
                children: [this._borderRect, this._borderTop, this._borderBottom, this._borderLeft, this._borderRight,
                    this._cornerNW, this._cornerNE, this._cornerSW, this._cornerSE]
            });
            // Create background text not for root graph!
            if (this._isSubGraph || this._isTemplatedGraph) {
                this._backgroundTextWrapper = UIDom.createSVGElement();
                this._backgroundTextElement = UIDom.createSVGText({
                    className: 'sch-graph-background-text',
                    parent: this._backgroundTextWrapper
                });
                this._backgroundGraphName = UIDom.createSVGTSpan({
                    textContent: this._graph.getModel().getName(),
                    parent: this._backgroundTextElement,
                    attributes: {
                        x: 0,
                        'text-anchor': 'middle'
                    }
                });
                this._container.appendChild(this._backgroundTextWrapper);
                this._updateBackgroundSubName();
            }
            // Append the graph display
            this.display.elt = this._container;
            this.display.elt.grElt = elt;
            this.structure.nodeLayer.group.appendChild(this.display.elt);
            this._updateGrid(0, 0, 800, 400);
        };
        /**
         * The callback on the node display modification.
         * @protected
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.PathSetTrie} changes - Changes set of paths of modified properties.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         */
        UIGraphView.prototype.onmodifyDisplay = function (elt, changes, grView) {
            _super.prototype.onmodifyDisplay.call(this, elt, changes, grView);
            var isResized = false;
            if (EGraphCore.inPathSet(changes, 'actualLeft')) {
                this._borderRect.x.baseVal.value = elt.actualLeft;
                this._borderTop.x1.baseVal.value = elt.actualLeft;
                this._borderBottom.x1.baseVal.value = elt.actualLeft;
                this._borderLeft.x1.baseVal.value = elt.actualLeft;
                this._borderLeft.x2.baseVal.value = elt.actualLeft;
                this._cornerNW.x.baseVal.value = elt.actualLeft - this._cornerNW.width.baseVal.value / 2;
                this._cornerSW.x.baseVal.value = elt.actualLeft - this._cornerSW.width.baseVal.value / 2;
                this._graph.getInputControlPortButton().setLeft(elt.actualLeft);
                this._graph.getOutputControlPortButton().setLeft(elt.actualLeft + elt.actualWidth);
                isResized = true;
            }
            if (EGraphCore.inPathSet(changes, 'actualTop')) {
                this._borderRect.y.baseVal.value = elt.actualTop;
                this._borderTop.y1.baseVal.value = elt.actualTop;
                this._borderTop.y2.baseVal.value = elt.actualTop;
                this._borderLeft.y1.baseVal.value = elt.actualTop;
                this._borderRight.y1.baseVal.value = elt.actualTop;
                this._cornerNW.y.baseVal.value = elt.actualTop - this._cornerNW.height.baseVal.value / 2;
                this._cornerNE.y.baseVal.value = elt.actualTop - this._cornerNE.height.baseVal.value / 2;
                this._graph.getInputControlPortButton().setTop(elt.actualTop);
                this._graph.getOutputControlPortButton().setTop(elt.actualTop);
                isResized = true;
            }
            if (EGraphCore.inPathSet(changes, 'actualWidth')) {
                this._borderRect.width.baseVal.value = elt.actualWidth;
                this._borderTop.x2.baseVal.value = elt.actualLeft + elt.actualWidth;
                this._borderBottom.x2.baseVal.value = elt.actualLeft + elt.actualWidth;
                this._borderRight.x1.baseVal.value = elt.actualLeft + elt.actualWidth;
                this._borderRight.x2.baseVal.value = elt.actualLeft + elt.actualWidth;
                this._cornerNE.x.baseVal.value = elt.actualLeft + elt.actualWidth - this._cornerNE.width.baseVal.value / 2;
                this._cornerSE.x.baseVal.value = elt.actualLeft + elt.actualWidth - this._cornerSE.width.baseVal.value / 2;
                this._graph.getOutputControlPortButton().setLeft(elt.actualLeft + elt.actualWidth);
                isResized = true;
            }
            if (EGraphCore.inPathSet(changes, 'actualHeight')) {
                this._borderRect.height.baseVal.value = elt.actualHeight;
                this._borderBottom.y1.baseVal.value = elt.actualTop + elt.actualHeight;
                this._borderBottom.y2.baseVal.value = elt.actualTop + elt.actualHeight;
                this._borderLeft.y2.baseVal.value = elt.actualTop + elt.actualHeight;
                this._borderRight.y2.baseVal.value = elt.actualTop + elt.actualHeight;
                this._cornerSW.y.baseVal.value = elt.actualTop + elt.actualHeight - this._cornerSW.height.baseVal.value / 2;
                this._cornerSE.y.baseVal.value = elt.actualTop + elt.actualHeight - this._cornerSE.height.baseVal.value / 2;
                isResized = true;
            }
            if (isResized) {
                this._updateGrid(elt.actualLeft, elt.actualTop, elt.actualWidth, elt.actualHeight);
                this.updateDataDrawersPosition();
                // Manage toolbar position update when graph is resized
                var vpt = {
                    translationX: grView.vpt[0],
                    translationY: grView.vpt[1],
                    scale: grView.vpt[2]
                };
                this._graph.getToolbar().updatePosition(vpt);
            }
            this._updateBackgroundText();
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Updates the display of the graph grid.
         * @private
         * @param {number} left - The left position of the grid.
         * @param {number} top - The top position of the grid.
         * @param {number} width - The width of the grid.
         * @param {number} height - The height of the grid.
         */
        UIGraphView.prototype._updateGrid = function (left, top, width, height) {
            if (this._grid !== undefined) {
                this._grid.parentNode.removeChild(this._grid);
            }
            this._grid = UIDom.createSVGGroup({ className: 'sch-graph-grid' });
            var step = 10;
            for (var i = 1; i < width / step; i++) {
                var pos = left + step * i;
                var vLine = UIDom.createSVGLine({
                    className: pos % 100 === 0 ? 'sch-graph-grid-step' : '',
                    attributes: { x1: pos, y1: top, x2: pos, y2: top + height }
                });
                this._grid.appendChild(vLine);
            }
            for (var j = 1; j < height / step; j++) {
                var pos = top + step * j;
                var hLine = UIDom.createSVGLine({
                    className: pos % 100 === 0 ? 'sch-graph-grid-step' : '',
                    attributes: { x1: left, y1: pos, x2: left + width, y2: pos }
                });
                this._grid.appendChild(hLine);
            }
            this._container.appendChild(this._grid);
        };
        /**
         * Updates the background text.
         * @private
         */
        UIGraphView.prototype._updateBackgroundText = function () {
            if (this._isPositioned && this._backgroundTextWrapper !== undefined) {
                var bbox1 = this._backgroundGraphName.getBBox();
                var bboxWith = bbox1.width;
                var width = bboxWith + 1;
                var halfWidth = width / 2;
                var height = bbox1.height;
                if (this._backgroundGraphSubName !== undefined) {
                    var bbox2 = this._backgroundGraphSubName.getBBox();
                    bboxWith = bbox1.width > bbox2.width ? bbox1.width : bbox2.width;
                    width = bboxWith + 1;
                    halfWidth = width / 2;
                    height = bbox1.height + bbox2.height;
                    this._backgroundGraphSubName.setAttribute('x', String(halfWidth));
                }
                this._backgroundTextWrapper.setAttribute('viewBox', [-1, bbox1.y, width, height].join(' '));
                this._backgroundTextWrapper.setAttribute('x', String(this._graph.getDisplay().actualLeft));
                this._backgroundTextWrapper.setAttribute('y', String(this._graph.getDisplay().actualTop));
                this._backgroundTextWrapper.setAttribute('width', String(this._graph.getDisplay().actualWidth - 10));
                this._backgroundTextWrapper.setAttribute('height', String(this._graph.getDisplay().actualHeight - 10));
                this._backgroundGraphName.setAttribute('x', String(Math.trunc(halfWidth)));
            }
        };
        /**
         * The callback on the block name change event.
         * @private
         * @param {Events.BlockNameChangeEvent} event - The block name change event.
         */
        UIGraphView.prototype._onBlockNameChange = function (event) {
            if (this._backgroundGraphName !== undefined) {
                this._backgroundGraphName.textContent = event.getName();
                this._updateBackgroundSubName();
                this._updateBackgroundText();
            }
        };
        /**
         * Updates the background sub name.
         * @private
         */
        UIGraphView.prototype._updateBackgroundSubName = function () {
            if (this._isContainedGraph) {
                if (this._isPositioned && this._backgroundGraphSubName !== undefined) {
                    this._backgroundTextElement.removeChild(this._backgroundGraphSubName);
                    this._backgroundGraphSubName = undefined;
                }
                var containedGraphModel = this._graph.getModel();
                var graphContenerBlockModel = containedGraphModel.container;
                var blockNameRef = BlockLibrary.getBlock(graphContenerBlockModel.getUid()).getName();
                var areBlockNameIdentical = graphContenerBlockModel.getName() === blockNameRef;
                if (!areBlockNameIdentical) {
                    this._backgroundGraphSubName = UIDom.createSVGTSpan({
                        className: 'sch-graph-background-subname',
                        textContent: blockNameRef,
                        parent: this._backgroundTextElement,
                        attributes: {
                            x: 0,
                            dy: 6,
                            'text-anchor': 'middle'
                        }
                    });
                }
            }
        };
        return UIGraphView;
    }(UINodeView));
    return UIGraphView;
});
